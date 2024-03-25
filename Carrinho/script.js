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

function gerarDoc() {
    const listaElement = document.getElementById('lista');
    const totalElement = document.getElementById('total');

    const listaClone = listaElement.cloneNode(true);

    $(listaClone).find('button').remove();

    const listaHtml = listaClone.innerHTML;
    const totalHtml = totalElement.innerHTML;

    const conteudoHtml = `
        <html>
            <head>
                <meta charset="UTF-8"/>
            </head>
            <body>
                <h1>Pedido Confirmado</h1>
                <h3>Agradecemos sua preferência</h3>
                <br>
                ${listaHtml}
                <br>
                <br>
                ${totalHtml}
            </body>
        </html>
    `;

    const blob = new Blob([conteudoHtml], {type: "application/msword"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "carrinho.doc";
    link.click();
    document.getElementById('pedido').style.display = 'block';

}

const successClose = () => document.getElementById('pedido').style.display = 'none';