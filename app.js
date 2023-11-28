const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const verificaAutenticacao = require('./authMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'suaChaveSecreta', resave: true, saveUninitialized: true }));
app.use(express.static('views'));

app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/register' || req.path === '/uploadDocumento') {
    return next();
  }
  verificaAutenticacao(req, res, next);
});


mongoose.connect('mongodb+srv://root:UiAvQb3q6Pt6FxVe@cluster0.rbozwfn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  nomeCompleto: String,
  email: String,
  username: String,
  password: String,
  nutricionista: Boolean,
});

const Food = mongoose.model('Food', {
  nome: String,
  calorias: Number,
  carboidratos: Number,
  gorduras: Number,
  proteina: Number,
});

app.post('/salvarLista', (req, res) => {
  const dadosLista = req.body.dadosLista;
  const dadosString = dadosLista.map(item => `${item.numeroBloco}: ${item.alimento}, ${item.quantidade}, ${item.porcao}`).join('\n');

  const filePath = path.join(__dirname, 'dadosLista.txt');

  fs.writeFile(filePath, dadosString, (err) => {
    if (err) {
      console.error('Erro ao salvar arquivo:', err);
      res.status(500).send('Erro ao salvar o arquivo.');
    } else {
      console.log('Arquivo salvo com sucesso!');
      res.status(200).send('Arquivo salvo com sucesso!');
    }
  });
});

app.route('/register')
  .get((req, res) => {
    res.sendFile('register.html', { root: __dirname + '/views' });
  })
  .post(async (req, res) => {
    const { nomeCompleto, email, username, password, nutricionista } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send('');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nomeCompleto,
      email,
      username,
      password: hashedPassword,
      nutricionista: nutricionista === 'on',
    });

    await newUser.save();

    if (newUser.nutricionista) {
      return res.redirect('/uploadDocumento.html');
    }

    res.redirect('/login');
  });

app.route('/uploadDocumento')
  .get((req, res) => {
    const filePath = path.join(__dirname, 'views/uploadDocumento.html');
    res.sendFile(filePath);
  })
  .post((req, res) => {
    // Lógica para salvar o arquivo aqui...

    // Enviar resposta ao cliente para exibir o alerta e redirecionar
    res.send('<script>alert("Documento em análise, você receberá um email"); window.location.href = "/index.html";</script>');
  });

  app.route('/login')
  .get((req, res) => {
    res.sendFile('login.html', { root: __dirname + '/views' });
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;

      if (user.nutricionista) {
        return res.redirect('/nutricionista-dashboard');
      }

      return res.redirect('/contadorCalorias');
    }

    // Se as credenciais estiverem incorretas, exiba a mensagem de erro
    const errorMessage = 'Nome de usuário ou senha incorretos';
    res.sendFile('login.html', {
      root: __dirname + '/views',
      error: errorMessage,
    });
  });

app.get('/nutricionista-dashboard', (req, res) => {
  const filePath = path.join(__dirname, 'views/nutricionistaDashboard.html');
  res.sendFile(filePath);
});

app.get('/contadorCalorias', (req, res) => {
  const filePath = path.join(__dirname, 'views/contadorCalorias.html');
  res.sendFile(filePath);
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views/index.html');
  res.sendFile(filePath);
});

app.get('/api/food/:nome', async (req, res) => {
  const nome = req.params.nome;

  const food = await Food.findOne({ nome });

  if (food) {
    res.json({
      nome: food.nome,
      calorias: food.calorias,
      carboidratos: food.carboidratos,
      gorduras: food.gorduras,
      proteina: food.proteina,
    });
  } else {
    res.status(404).json({ message: 'Alimento não encontrado' });
  }
});

app.get('/perfil', (req, res) => {
  const filePath = path.join(__dirname, 'views/PerfilCliente.html');
  res.sendFile(filePath);
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao fazer logout:', err);
    }
    res.redirect('/');
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
