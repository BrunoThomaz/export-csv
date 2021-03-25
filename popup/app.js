var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
var currentUrl = '';
var output = document.querySelector('.output');
gettingActiveTab.then((result) => {
        currentUrl = result[0].url;
        if(currentUrl === 'https://pje.jfce.jus.br/pje/ConsultaPublica/listView.seam') {
            output.textContent = 'Você pode salvar os dados deste site'
        } else {
            output.textContent = 'Indisopnível neste site'
            console.log(currentUrl)
        
        }
    }
)



// var output = document.querySelector('output');
// var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});

// gettingActiveTab.then((result) => {
//     output.textContent = result[0].url;
// })

