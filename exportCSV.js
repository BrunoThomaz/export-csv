//Variável para armazenamento dos dados da consulta.
var resultado = [];


//Botão para exportar o resultado.
var exportCSV = document.createElement('div');


//Função para mostrar um botão no canto superior da tela
function showButton () {
    exportCSV.innerText = "Salvar CSV";
    exportCSV.style.position = "absolute";
    exportCSV.style.padding = ".5em";
    exportCSV.style.fontSize = ".8em";
    exportCSV.style.top = "115px";
    exportCSV.style.left = "250px";
    exportCSV.style.backgroundColor = "#FFFFFF";
    exportCSV.style.borderRadius = "5px";
    exportCSV.style.border = "#000 solid 1.5px";
    exportCSV.style.cursor = "pointer";
    document.body.appendChild(exportCSV);
    exportCSV.addEventListener("click", callRequest, true);
}


//Chamada do showButton, verifica se já existe um resultado de pesquisa, se sim, inicia o processo de coleta dos dados e exportação.
function callRequest () {
    if (document.querySelectorAll("tr.rich-table-row").length != 0) {
        let count=2;
        exportCSV.innerText = "Pesquisando...";
        requestPages (count);
        //Se não existir um resultado de pesquisa, imprime uma mensagem de alerta.
    } else {
        alert ("Por favor, primeiro, realize uma pesquisa.");
    }
}


//Função para requisição de todas as páginas restantes do resultado.
//Faz uma requisição recursiva XMLHttpRequest em todas as páginas que faltam e coloca o resultado na tela para posterior coleta.
function requestPages (count) {
    var temp = document.getElementsByClassName("tableArea")[0];
    var numPag = document.querySelectorAll(".rich-inslider-right-num")[0].textContent;
    if (count==1) {temp.innerHTML = "";};
    if (count<=numPag) {
        var http = new XMLHttpRequest();
        var url = 'https://pje.jfce.jus.br/pjeconsulta/ConsultaPublica/listView.seam';
        var params = `AJAXREQUEST=j_id307&j_id428%3Aj_id429=${count}&j_id428=j_id428&autoScroll=
        &javax.faces.ViewState=j_id1&j_id428%3Aj_id430=j_id428%3Aj_id430&AJAX%3AEVENTS_COUNT=1&`;
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        ;
        http.onloadend = function () {
            temp.innerHTML += http.response;
            //chamada novamente da função para todas as outras páginas.
            requestPages(count+1);
            }
        http.send(params);
    }   else {
        //imprime no botão a mensagem 'preparando..' e inicia o prepado dos dados
            exportCSV.innerText = "Preparando..";
            prepareData();
        };
}


//Prepara os dados que a requestPages() colocou na tela
function prepareData () {
    if (document.querySelectorAll("tr.rich-table-row").length != 0) {
        var numlinha = document.querySelectorAll("tr.rich-table-row");
        for (let i = 0; i < numlinha.length; i++) {
            let texto = numlinha[i].innerText;
            while (texto.indexOf("\t") != -1) {texto = texto.replace("\t", "");}
            while (texto.indexOf("\n\n\n") != -1) {texto = texto.replace("\n\n\n", ",");}
            while (texto.indexOf("\n\n") != -1) {texto = texto.replace("\n\n", ",");}
            while (texto.indexOf("\n") != -1) {texto = texto.replace("\n", ",");}
            resultado[i] = texto;
            resultado[i] = resultado[i].split(",");
        }
        var csv = ',Decisao,Processo,Exequente,Executado,Vara,Assunto,Ultimo Evento\n';
        resultado.forEach(function (row) {
        csv += row.join(',');
        csv += "\n";});
        download_csv(csv);
        exportCSV.innerText = "Baixando..";
        exportCSV.addEventListener("click", ()=>{alert('Para baixar novamente, atualize a página.')}, true);

    }
}


//Salva os dados em um arquivo CSV.
function download_csv(csv) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();

}


//Mostra o botão na tela.
showButton();

