const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var oggi = new Date();
var anno = oggi.getFullYear();
var mese = ("0" + (oggi.getMonth() + 1)).slice(-2) //aggiunge lo zero iniziale
var giorno = ("0" + oggi.getDate()).slice(-2) //aggiunge lo zero iniziale

console.log(giorno);


function scaricaJson(urljson) {
  
  $.ajax({
    	method: 'GET',
    	url: "http://www.ascoltaemedita.it/json/"+urljson,
    	
    	dataType: 'json',
    	success: function(data){
    		
    		console.log('successo');
    		console.log(data);
    		
    		var date_str = data.date_str.toString().replace(/\n/g, "<br />");
    		var indications = data.indications.toString().replace(/\n/g, "<br />");
    		var quotes = data.quotes.toString().replace(/\n/g, "<br />");
    		var curatore = data.curatore.toString().replace(/\n/g, "<br />");
    		var prevangelo = data.prevangelo.toString().replace(/\n/g, "<br />");
    		var preghiniz = data.preghiniz.toString().replace(/\n/g, "<br />");
    		var vangelo = data.vangelo.toString().replace(/\n/g, "<br />");
    		var medita = data.medita.toString().replace(/\n/g, "<br />");
    		var riflettere = data.riflettere.toString().replace(/\n/g, "<br />");
    		var preghfin = data.preghfin.toString().replace(/\n/g, "<br />");        

      
      $("#date_str").html(date_str);
      $("#indications").html(indications);
      $("#quotes").html(quotes);
      $("#curatore span").html(curatore);
      $("#prevangelo").html(prevangelo);

      $("#preghiniz .testo").html(preghiniz);
      $("#vangelo .testo").html(vangelo);
      $("#medita .testo").html(medita);
      $("#riflettere .testo").html(riflettere);
      $("#preghfin .testo").html(preghfin);
       
    	},
    	error: function (request, status, error) {
    		console.log(status);						
    	},
    	
    	complete: function() {
    				
    	}
  });

}

/*
function inserisciHtml(html) {
  $("#testi-preghiera").append(html)
}
*/



// cerco il parametro data nell'url e se è presente lo utilizzo per scaricare il json
if (urlParams.has('data') && urlParams.get('data') != "" && urlParams.get('data').length == 8) {
  
    date = urlParams.get('data');
    
    anno = date.substr(0,4);
    mese = date.substr(4,2);
    giorno = date.substr(6,2);
    
    scaricaJson(anno+"/"+mese+"/"+giorno+".json");
  
} else {
  //imposto la data di oggi nell'url
  dataUrl(anno, mese, giorno);
  
}

function dataUrl(anno, mese, giorno) {
  // imposta il parametro data all'url con la data passata
  urlParams.set('data', anno+mese+giorno);
  window.location.search = urlParams.toString();
}
 
  
function cambiaGiorno(e){
  console.log(e.target.value);
  
  data = e.target.value;
  data = data.split("-");
  
  //scaricaJson(data[0]+"/"+data[1]+"/"+data[2]+".json");
  
  //cambio il parametro data nell'url
  dataUrl(data[0], data[1], data[2]);
}


var dateControl = $("#sele_data")[0]; //[0].value;
dateControl.value = anno+"-"+mese+"-"+giorno;
  
  