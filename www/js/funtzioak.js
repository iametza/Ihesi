// http:// gehitu horrela hasten ez diren URLei
function gehituHTTP(url) {
	if (url.indexOf("http://") !== 0) {
        url = "http://" + url;
    }
	
	return url;
}

function irekiURLnabigatzailean(url){
    var ref = window.open(url, '_system');
    console.log("Nabigatzailean irekiko da: " + url);
}

function eskuratuIrudiarenAltueraZabalera(bidea) {
    var t = new Image();
    t.src = bidea;
    //alert("altuera: " + t.height + " - zabalera: " + t.width);
    //return t.width;
}

// html entitateak deskodetzen ditu.
// Adibidea:
// htmlDecode("&lt;img src='myimage.jpg'&gt;"); -> "<img src='myimage.jpg'>"
function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}