const enter = (event) => {if (event.keyCode === 13) login();}

const showPass = () => {
    var inputSenha = document.querySelector('#senha');

    if (inputSenha.getAttribute('type') === 'password')
        inputSenha.setAttribute('type', 'text');
    else
        inputSenha.setAttribute('type', 'password');
    
}

function login() {
    var nome = $('#nome').val();
    var senha = $('#senha').val();

    if (!(nome && senha && nome === 'admin' && senha === '12345')) {
        document.getElementById('error-modal').style.display = 'flex';
        return;
    }

    var a = new Date();

    const user = {
        name: nome,
        dataEntrada: formatDate(new Date()),
        id: Math.floor(Math.random() * 100000)
    }

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '../Loja'
}

function formatDate(data) {
    var options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    return data.toLocaleString('pt-BR', options);
}

const fecharModal = () => $('#error-modal').css('display', 'none');


