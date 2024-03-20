let produtos;

window.onload = function() {
    var storedUser = localStorage.getItem('user');
    var user = JSON.parse(storedUser)
    
    console.log(user);
    document.getElementById('user').textContent = user.name;
    document.getElementById('perfil').textContent = user.name + ' - Registro de Login: ' + user.dataEntrada;
    document.getElementById('idPerfil').textContent = user.id;
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('../Dados/loja.json')
        .then((response) => response.json())
        .then((data) => {
            produtos = data;
            console.log(data);
            console.log(produtos);
            const produtosContainer = document.getElementById('produtos-container');

            produtos.forEach((produto, index) => {
                var cardDiv = document.createElement('div');
                cardDiv.className = 'card';
                cardDiv.style.width = '18rem';
                cardDiv.innerHTML = `
                    <img src="${produto.img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${produto.desc}</h5>
                        <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                        <a href="#" data-indice="${index}" class="btn btn-primary btn-adicionar-ao-carrinho">Adicionar ao carrinho</a>
                    </div>
                `;

                produtosContainer.appendChild(cardDiv);
            });
        }).catch((error) => console.log('Erro ao carregar o arquivo JSON', error));


        $('#produtos-container').on('click', '.btn-adicionar-ao-carrinho', function() {
            const indexProduto = $(this).data('indice');
            const produtoSelecionado = produtos[indexProduto];

            let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
            carrinho.push(produtoSelecionado);
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            alert('Produto adicionado ao carrinho');
        })

})

