const cardLogin = document.getElementById('card-login');
const cardRegistro = document.getElementById('registro');
const trocarDivsLink = document.getElementById('trocarDivs');
const chamada = document.getElementById('chamada');

let loginVisivel = true;

trocarDivsLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (loginVisivel) {
        cardLogin.style.display = 'none';
        cardRegistro.style.display = 'block';
        chamada.style.display = 'none';
    } else {
        cardLogin.style.display = 'block';
        cardRegistro.style.display = 'none';
        chamada.style.display = 'block';
    }

    loginVisivel = !loginVisivel;
});


