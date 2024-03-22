$(document).ready(function () {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const listaElement = $('#lista');
    const totalElement = $('#total');

    function exibirCarrinho() {
        listaElement.empty();

        let totalPreco = 0;

        $.each(carrinho, function (index, item) {
            const listItem = $("<li>").text(
                `${item.desc} - Preço: R$ ${item.preco}`
            )

            const removeButton = $("<button>").text('❌').css('margin-left', '10px').click(function () {
                removeItemFromCart(index);
            })

            listItem.append(removeButton)

            listaElement.append(listItem)

            totalPreco += item.preco;

        });
        totalElement.text(`Total: R$ ${totalPreco.toFixed(2)}`);
    }

    function removeItemFromCart(index) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();
    }

    exibirCarrinho();
});

const succesClose = () => document.getElementById('pedido').style.display = 'none';