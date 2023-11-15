const cardLogin = document.getElementById('card-login');
const cardRegistro = document.getElementById('registro');
const trocarDivsLink = document.getElementById('trocarDivs');

let loginVisivel = true;

trocarDivsLink.addEventListener('click', (e) => {
    e.preventDefault();

    if (loginVisivel) {
        cardLogin.style.display = 'none';
        cardRegistro.style.display = 'block';
    } else {
        cardLogin.style.display = 'block';
        cardRegistro.style.display = 'none';
    }

    loginVisivel = !loginVisivel;
});
// document.getElementById("btn-login").addEventListener("click", function() {
//   // Aqui você pode redirecionar o usuário para a próxima etapa
//   window.location.href = "https://www.drogariasaopaulo.com.br/durateston-250mg-1x1ml/p";
// });

//   document.getElementById("btn-register").addEventListener("click", function() {
//     // Aqui você pode redirecionar o usuário para a próxima etapa
//     window.location.href = "https://www.drogariasaopaulo.com.br/durateston-250mg-1x1ml/p";
//   });

