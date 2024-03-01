var tempoInicial = $("#alteraTempo").text();
var digitacao = $(".campoDigitacao");

// Após o carregamento de todos os elementos da pagina ele chama esse método padrão do jquery
$(document).ready(function() {
    console.log("Página Carregada!!!")
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase()
{
    var frase = $(".frase").text();
    // Split quebra a frase removendos os espaços, como o split retorna o valor em array é possivel pegar somente o tamanho do array
    var numeroPalavras = frase.split(" ").length;
    var valorAlteravel = $("#alteraTamanho");
    // o método text pode pegar ou atribuir um valor;
    valorAlteravel.text(numeroPalavras);
}

function inicializaContadores()
{
    // on significado quando.. no caso => quando clickar
    // o envento de input diz quando estiver chegando informação no input ele entra em ação
    digitacao.on("input", function() {
        //val é o valor do campo
        var digitacaoValor = digitacao.val();
        //explisão regular /\S+/ para substituir qualquer espaço vazio, ele busca qualquer tipo de espaçamento
        var qtdPalavras = digitacaoValor.split(/\S+/).length -1;

        // exbir a qtdPalavras no campo contador
        $('#contador-palavras').text(qtdPalavras);

        var qtdCaracteres = digitacaoValor.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() 
{
    var tempoRestante = $("#alteraTempo").text();
    // focus deixar o campo focado dizendo que esta em uso// one significa que será executada a ação somente uma vez
    digitacao.one("focus", function() {
        var intervalo = setInterval(function() { //setInterval, seu segundo parametro passa o tempo em milesegundos
            tempoRestante--;
            $("#alteraTempo").text(tempoRestante);

            if(tempoRestante < 1)
            {
                clearInterval(intervalo);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo()
{
    // attr pega ou atribui um atributo
    digitacao.attr("disabled", true);
    // adiciona uma classe
    digitacao.addClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores()
{
    var frase = $(".frase").text();
    digitacao.on("input", function() {
    var digitado = digitacao.val();
    //substr pega somente um pedaço da string do começo ao tamanho digitado
    var comparavel = frase.substr(0,digitado.length);
    if(digitado == comparavel)
    {
        digitado.addClass("borda-verde");
        digitado.addClass("borda-vermelha");
    }
    else
    {
        digitado.addClass("borda-vermelha");
        digitado.addClass("borda-verde");
    }
    });
}

function inserePlacar()
{
    var corpoTabela = $(".app__placar").find("tbody");
    var usuario = "Alisson";
    var numPalavras = $("#contador-palavras").text();

    var linha = "<tr>"+
                "<td>"+ usuario +"</td>"+
                "<td>"+ numPalavras +"</td>"+
                "</tr>";
    corpoTabela.append(linha);
}



function reiniciaJogo()
{
    digitacao.attr("disabled", false);
    digitacao.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#alteraTempo").text(tempoInicial);
    inicializaCronometro();
    digitacao.removeClass("campo-desativado");
    digitacao.removeClass("borda-vermelha");
    digitacao.removeClass("borda-verde");
}