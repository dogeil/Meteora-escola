
//tratando do formulario de envio
const botaoSub = document.getElementById('cadastroForm')

botaoSub.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário para que possamos verificar os campos

    const name = document.getElementById('businessName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verificar se algum campo está vazio
    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const URL = "http://localhost:8082/user/register";

    let data = {
        name,
        email,
        password
    }

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)

            alert(data.msg)

            //Link pagina verificar codigo
            if (data.msg === 'Usuário cadastrado.') {
                return window.location.href = 'http://127.0.0.1:5500/Meteora-escola/index.html';
            }

        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.');
        });

});

$(".toggle-password").click(function() {

    $(this).toggleClass("bi-eye-fill bi-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});