// Argazki bat behar bezala ateratzen denean deitzen da
function argazkiaAteratzean(argazkiarenURI) {
	// Kendu iruzkina irudi-fitxategiaren URIa ikusteko
	console.log(argazkiarenURI);

	// Argazkiaren aurrebista erakusteko erabiliko dugun elementua eskuratu
	var aurrebista = document.getElementById('proposamen-berria-argazkia-aurrebista');

	// Argazkiaren aurrebista erakusteko erabiliko dugun elementua bistaratu
	aurrebista.style.display = 'block';

	// Erakutsi ateratako argazkia
	// Barneko CSS arauak erabiltzen dira irudiaren tamaina aldatzeko
	aurrebista.src = argazkiarenURI;
	
	// Irudirik ez dela oraindik gehitu dioen mezua ezkutatu
	$("#proposamen-berria-argazkia-mezua").hide();

	// Aurretik egon daitekeen botoia kendu
	$("#proposamen-berria-kendu-argazkia-botoia-span").empty();
	
	// Argazkia kendu ahal izateko botoia gehitu
	$("#proposamen-berria-kendu-argazkia-botoia-span").append('<button id="proposamen-berria-kendu-argazkia-botoia" type="button" onclick="kenduArgazkia()">Kendu argazkia</button>');
	$("#proposamen-berria-kendu-argazkia-botoia").button();
}

// Argazki bat bildumatik behar bezala eskuratzean deitzen da
function argazkiaBildumatikEskuratzean(argazkiarenURI) {
	// Kendu iruzkina irudi-fitxategiaren URIa ikusteko
	console.log(argazkiarenURI);

	// Argazkiaren aurrebista erakusteko erabiliko dugun elementua eskuratu
	var aurrebista = document.getElementById('proposamen-berria-argazkia-aurrebista');

	// Argazkiaren aurrebista erakusteko erabiliko dugun elementua bistaratu
	aurrebista.style.display = 'block';

	// Erakutsi ateratako argazkia
	// Barneko CSS arauak erabiltzen dira irudiaren tamaina aldatzeko
	aurrebista.src = argazkiarenURI;
	
	// Irudirik ez dela oraindik gehitu dioen mezua ezkutatu
	$("#proposamen-berria-argazkia-mezua").hide();
	
	// Aurretik egon daitekeen botoia kendu
	$("#proposamen-berria-kendu-argazkia-botoia-span").empty();
	
	// Argazkia kendu ahal izateko botoia gehitu
	$("#proposamen-berria-kendu-argazkia-botoia-span").append('<button id="proposamen-berria-kendu-argazkia-botoia" type="button" onclick="kenduArgazkia()">Kendu argazkia</button>');
	$("#proposamen-berria-kendu-argazkia-botoia").button();
}

// Argazki kamara irekitzeko botoia sakatzean exekutatzen da hau
function ateraArgazkia() {
	// Atera argazki bat gailuaren kamara erabiliz eta eskuratu 64 oinean kodetutako kate bezala 
	navigator.camera.getPicture(argazkiaAteratzean, argazkiakHutsegitean, { //quality: 50, // Argazkiaren kalitatea: 0-100 artean
		// destinationType: Argazkia nola itzuli behar duen.
		// Aukerak: DATA_URL -> 64 oinean kodetutako katea
		//			FILE_URI -> argazkiaren bidea
		// Lehenetsia DATA_URL da baina argazki handiekin arazoak eman ditzake memoria asko beharko baitu.
		// FILE_URIk argazkiak aldi baterako karpetan gordetzen ditu IOSn. Behar izanez gero ezabatu bukatzean. 
		destinationType: destinationType.FILE_URI//,
		
		// Eskalatuko dugu edo ez?
		// Argazkia eskalatu beharrezko tamainara targetWidth eta targetHeight erabiliz
		//targetWidth: 100,
		//targetHeight: 100
	});
}

// Argazkien bilduma irekitzeko botoia sakatzean exekutatzen da hau
function eskuratuArgazkia(iturburua) {
	// Eskuratu emandako kokapeneko argazkia
	navigator.camera.getPicture(argazkiaBildumatikEskuratzean, argazkiakHutsegitean, { quality: 50, // Argazkiaren kalitatea: 0-100 artean
		// destinationType: Argazkia nola itzuli behar duen.
		// Aukerak: DATA_URL -> 64 oinean kodetutako katea
		//			FILE_URI -> argazkiaren bidea
		// Lehenetsia DATA_URL da baina argazki handiekin arazoak eman ditzake memoria asko beharko baitu.
		// FILE_URIk argazkiak aldi baterako karpetan gordetzen ditu IOSn. Behar izanez gero ezabatu bukatzean.
		destinationType: destinationType.FILE_URI,
		
		// sourceType: Argazkiaren iturburua.
		// Aukerak: PHOTOLIBRARY -> Androiden kasuan SAVEDPHOTOALBUMen bilduma berdina erakusten du. iPhonen?
	    // 			CAMERA -> Argazki kamara (lehenetsia)
	    //			SAVEDPHOTOALBUM -> Androiden kasuan PHOTOLIBRARYren bilduma berdina erakusten du. iPhonen?
		sourceType: iturburua//,
		
		// Argazkia eskalatu beharrezko tamainara targetWidth eta targetHeight erabiliz
		//targetWidth: 300,
		//targetHeight: 300 
	});
}

// Zerbaitek huts egitean deitzen da hau
function argazkiakHutsegitean(message) {
	console.log('Huts egin du: ' + message);
}

function kenduArgazkia() {
	//alert("Argazkia kentzen");
	
	// Argazkiaren src-a hustu eta ezkutatu
	$('#proposamen-berria-argazkia-aurrebista').src = '';
	$('#proposamen-berria-argazkia-aurrebista').hide();
	
	// Argazkirik ez dagoela dioen mezua erakutsi
	$('#proposamen-berria-argazkia-mezua-span').show();
	
	// Argazkia kentzeko botoia kendu
	$("#proposamen-berria-kendu-argazkia-botoia-span").empty();
}