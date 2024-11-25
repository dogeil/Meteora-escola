var userJson;

// Checkando existência do token na home, se nao existir nao acessar painel
function checkHome(token) {
    return new Promise((resolve) => { // Retorna uma Promise
        if (token) {
            fetch("http://localhost:8082/user/check", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: "Verificando..."
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return res.json();
                })
                .then(data => {
                    const resposta = data.sucess;

                    switch (resposta) {
                        case true:
                            userJson = data.user; // Armazena os dados na variável
                            window.globalJson = userJson; //
                            console.log("Token válido!");
                            resolve(userJson); // Resolve a Promise com userJson
                            break;
                        case false:
                            localStorage.removeItem('token');
                            reject('Token inválido');
                            break;
                        default:
                            localStorage.removeItem('token');
                            window.location.href = "http://127.0.0.1:5500/Meteora-escola/index.html";
                            break;
                    }
                })
                .catch(err => {
                    console.log(err);
                    window.location.href = "http://127.0.0.1:5500/Meteora-escola/pages/index.html";
                });
        } else {
            console.log('Token inválido');
        }
    });
}

// Checkando existência do token ADMS, se nao existir nao acessar
function checkMain(token) {
    return new Promise((resolve, reject) => { // Retorna uma Promise
        if (token) {
            fetch("http://localhost:8082/user/check", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    msg: "Verificando..."
                })
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return res.json();
                })
                .then(data => {
                    const resposta = data.sucess;

                    switch (resposta) {
                        case true:
                            userJson = data.user; // Armazena os dados na variável
                            window.globalJson = userJson; // 
                            console.log("Token válido!");
                            resolve(userJson); // Resolve a Promise com userJson
                            break;
                        case false:
                            localStorage.removeItem('token');
                            reject('Token inválido');
                            break;
                        default:
                            localStorage.removeItem('token');
                            window.location.href = "./pages/login.html";
                            break;
                    }
                })
                .catch(err => {
                    reject(err); // Rejeita a Promise em caso de erro
                    window.location.href = "/";
                });
        } else {
            reject('Token não fornecido'); // Rejeita se não houver tokens
            window.location.href = "/";

        }
    });
}


// Executa ao carregar a página
window.onload = function () {
    const token = localStorage.getItem('token');

    const cHeader = document.getElementById('cHeader')


    checkHome(token)
        .then(user => {
            cHeader.innerHTML = ``;
        })
        .catch(err => {
            console.error(err);
            alert(err); // Exibe um alerta se houver erro
        });
};

export default checkMain;



