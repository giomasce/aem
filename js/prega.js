const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var oggi = new Date();
var anno = oggi.getFullYear();
var mese = ("0" + (oggi.getMonth() + 1)).slice(-2) //aggiunge lo zero iniziale
var giorno = ("0" + oggi.getDate()).slice(-2) //aggiunge lo zero iniziale

$('#sele_data').datepicker({
    format: {
        toDisplay: function (date, format, language) {
            var o = new Date(date);
            var a = o.getFullYear();
            var m = ("0" + (o.getMonth() + 1)).slice(-2)
            var g = ("0" + o.getDate()).slice(-2)
            return g+"/"+m+"/"+a;
        },
        toValue: function (date, format, language) {
            var o = new Date(date);
            var a = o.getFullYear();
            var m = ("0" + (o.getMonth() + 1)).slice(-2)
            var g = ("0" + o.getDate()).slice(-2)
            return g+"/"+m+"/"+a;
        }
    },
    weekStart: 1,
    todayBtn: "linked",
    language: "it",
    autoclose: true,
    todayHighlight: true,
//  defaultViewDate: { year: anno, month: mese-1, day: giorno }
});


function scaricaJson(urljson) {
  
  // mostra lo spinner
  $("#loading").show();
  
  $.ajax({
    	method: 'GET',
    	url: "http://www.ascoltaemedita.it/json/"+urljson,
    	
    	dataType: 'json',
    	success: function(data){
    		
    		console.log('successo');
    		console.log(data);
    		
    		var date_str = data.date_str.toString().replace(/\n/g, "<br />");
    		var year = data.year.toString().replace(/\n/g, "<br />");
    		var indications = data.indications.toString().replace(/\n/g, " - ");
    		var quotes = data.quotes.toString().replace(/\n/g, "<br />");
    		var curatore = data.curatore.toString().replace(/\n/g, "<br />");
    		var prevangelo = data.prevangelo.toString().replace(/\n/g, "<br />");
    		var preghiniz = data.preghiniz.toString().replace(/\n/g, "<br />");
    		var vangelo = data.vangelo.toString().replace(/\n/g, "<br />");
    		var quote_vangelo = data.quote_vangelo.toString().replace(/\n/g, "<br />");
    		var medita = data.medita.toString().replace(/\n/g, "<br />");
    		var riflettere = data.riflettere.toString().replace(/\n/g, "<br />");
    		var preghfin = data.preghfin.toString().replace(/\n/g, "<br />");        

      
      $("#date_str h1").html(date_str.substring(0, date_str.lastIndexOf(" ")));
      $("#date_str span").html(year);
      $("#indications").html(indications);
      $("#quotes").html(quotes);
      $("#curatore span").html(curatore);
      
      if (prevangelo != "") {
      $("#prevangelo").html("<hr><i>"+prevangelo+"<i>"); 
      }

      $("#preghiniz .testo").html(preghiniz);
      $("#vangelo .testo").html(vangelo);
      $("#vangelo h5 span").html(quote_vangelo);
      $("#medita .testo").html(medita);
      $("#riflettere .testo").html(riflettere);
      $("#preghfin .testo").html(preghfin);
      
      	// cambia le classi al blocco dei testi così da mostrarlo con i dati scaricati
      $(".testi-preghiera").removeClass("d-none")
      $(".testi-preghiera").addClass("d-block")
       
    	},
    	error: function (request, status, error) {
    		console.log(status);
    		$('#modalErrore').modal('show');
    	},
    	
    	complete: function() {
      
    		$("#loading").hide();	
    	}
  });
}

// cerco il parametro data nell'url e se è presente lo utilizzo per scaricare il json altrimenti imposto la data di oggi
if (urlParams.has('data') && urlParams.get('data') != "" && urlParams.get('data').length == 8 && !isNaN(urlParams.get('data'))) {
  
    date = urlParams.get('data');
    
    anno = date.substr(0,4);
    mese = date.substr(4,2);
    giorno = date.substr(6,2);
    
    $('#sele_data').datepicker('update', new Date(anno, mese-1, giorno));
    
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
  //console.log(e.target.value);
  
  // recupero il valore della data dall'url
  data = e.target.value;
  data = data.split("/");
    
  //cambio il parametro data nell'url
  dataUrl(data[2], data[1], data[0]);
}


// al cambio di data nel datapicker avvia la funzione cambiaGiorno
$('#sele_data').datepicker().on('changeDate', function(e) {
  cambiaGiorno(e);
});

// quando premo il pulsante con l'icona mostra il datapicker
$('#btt_sele_data').on('click', function(e) {
  $('#sele_data').datepicker('show');
});


/*
isInWebAppiOS = (window.navigator.standalone == true);
isInWebAppChrome = (window.matchMedia('(display-mode: standalone)').matches);
*/