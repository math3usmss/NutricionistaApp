document.addEventListener("DOMContentLoaded", function() {
    const foodData = {
        "banana": { carbs: 27, protein: 1.3, fat: 0.4 },
        "maçã": { carbs: 25, protein: 0.5, fat: 0.3 },
        "frango": { carbs: 0, protein: 27, fat: 3.6 },
        "arroz": { carbs: 45, protein: 2.2, fat: 0.4 }
    };

    const foodInput = document.getElementById("food-input");
    const searchButton = document.getElementById("search-button");
    const foodDetails = document.getElementById("food-details");

    searchButton.addEventListener("click", function() {
        const searchTerm = foodInput.value.toLowerCase();
        if (foodData.hasOwnProperty(searchTerm)) {
            const food = foodData[searchTerm];
            foodDetails.innerHTML = `
                <h2>${searchTerm}</h2>
                <p>Carboidratos: ${food.carbs}g</p>
                <p>Proteínas: ${food.protein}g</p>
                <p>Gorduras: ${food.fat}g</p>
            `;
        } else {
            foodDetails.innerHTML = "<p>Alimento não encontrado</p>";
        }
    });
});


//contador de calorias

        const listaAlimentos = document.getElementById('lista-alimentos');
        const totalCalorias = document.getElementById('total-calorias');

        function adicionarAlimento() {
            const nomeInput = document.getElementById('nome');
            const caloriasInput = document.getElementById('calorias');

            const nome = nomeInput.value.trim();
            const calorias = parseInt(caloriasInput.value);

            if (nome && !isNaN(calorias) && calorias > 0) {
                const novoItem = document.createElement('li');
                novoItem.textContent = `${nome}: ${calorias} calorias`;
                listaAlimentos.appendChild(novoItem);

                // Atualizar o total de calorias
                const totalAtual = parseInt(totalCalorias.textContent);
                totalCalorias.textContent = totalAtual + calorias;

                // Limpar os campos de entrada
                nomeInput.value = '';
                caloriasInput.value = '';
            } else {
                alert('Por favor, insira um nome de alimento válido e um valor de calorias positivo.');
            }
        }

        document.getElementById('adicionar').addEventListener('click', adicionarAlimento);
    
//calorias necessarias
const idade = document.getElementById('idade').value
console.log(idade)