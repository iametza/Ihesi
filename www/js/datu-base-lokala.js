function existitzenDaDB(tx) {
	tx.executeSql('SELECT count(*) FROM existitzenDa', [], existitzenDaDBarrakasta, ezDaExistitzenDB);
} 

function existitzenDaDBarrakasta(tx, results) {
	// Datu-basea dagoeneko existitzen da. Argitaratutako azken bertsioa den egiaztatuko dugu. 
	// Aplikazioak dagoeneko azken bertsioa erabiltzen badu, zerbitzarira konektatuko gara eguneraketarik badagoen ikusteko.
	
	
	// Datu-basearen bertsio zahar bat erabiltzen ari bada berriz, datu-basea ezabatu eta berriz sortuko dugu.
}

function ezDaExistitzenDB(tx) {
	// Datu-basea ez da existitzen. Datu-base lokal berria sortu behar da.
	tx.executeSql("CREATE TABLE `existitzenDa` (`id` INTEGER PRIMARY KEY NOT NULL, `balioa` TEXT NOT NULL);");
	tx.executeSql("INSERT INTO `existitzenDa` (`id`, `balioa`) VALUES(1, 'Bai');");
	
	prestatuHerriakAzpiatalakTaula(tx);
	prestatuLurraldeakTaula(tx);
	prestatuHerriakItzulpenaTaula(tx);
	prestatuHerriakTaula(tx);
	prestatuHerriakInteresaTaula(tx);
	prestatuHerriakElementuakTaula(tx);
	prestatuHerriakElementuakBotoakTaula(tx);
}

function ezDaExistitzenDB2() {
	console.log("Datu-basea ez da existitzen2");
}

function gehituBotoa(tx, mota, idLekua) {
	if (mota == "positiboa") {
		tx.executeSql("UPDATE herriak_elementuak_botoak SET boto_pos = boto_pos + 1 WHERE id_elementua = '" + idLekua + "'", [], gehituBotoaArrakasta, function(tx, err){errorCB(tx, err, "gehituBotoa-exec")});
	} else if (mota == "negatiboa") {
		tx.executeSql("UPDATE herriak_elementuak_botoak SET boto_neg = boto_neg + 1 WHERE id_elementua = '" + idLekua + "'", [], gehituBotoaArrakasta, function(tx, err){errorCB(tx, err, "gehituBotoa-exec")});
	}
}

function gehituBotoaArrakasta(tx) {
}

// Azpiatalak irakurri datu-base lokaletik
function eskuratuAzpiatalak(tx) {
    tx.executeSql('SELECT * FROM herriak_azpiatalak ORDER BY ordena', [], eskuratuAzpiatalakArrakasta, function(tx, err){errorCB(tx, err, "eskuratuAzpiatalak-exec")});
}

//Kategoriak datu-base lokaletik behar bezala irakurtzen direnean exekutatzen da
function eskuratuAzpiatalakArrakasta(tx, results) {
    var len = results.rows.length;
    console.log("Kategoriak table: " + len + " errenkada.");
    
    // Guztiak kategoria gehitu
    $('#kategorien-zerrenda').append('<li class="kategoria-zerrenda-li" data-id-kategoria=""><a href="lekuak-kategoriaka.html">Kategoria guztiak</a></li>');
    
    // Gainerako kategoriak gehitu
    for (var i = 0; i < len; i++) {
        console.log("ID = " + results.rows.item(i).id + " Kategoria = " + results.rows.item(i).izena);
        $('#kategorien-zerrenda').append('<li class="kategoria-zerrenda-li" data-id-kategoria=' + results.rows.item(i).id + '><a href="lekuak-kategoriaka.html">' + results.rows.item(i).izena + '</a></li>');
    }
    $('#kategorien-zerrenda').listview("refresh");
}

// Proposatu orriko atalak select-a bete.
// idKategoria parametroa existitzen bada -> kategoria hori hautatu behar da.
function zerrendatuKategoriak(tx, idKategoria) {
    tx.executeSql('SELECT id, izena FROM herriak_azpiatalak ORDER BY ordena', [], function(tx, results){zerrendatuKategoriakArrakasta(tx, results, idKategoria)}, function(tx, err){errorCB(tx, err, "zerrendatuKategoriak-exec")});
}

function zerrendatuKategoriakArrakasta(tx, results, idKategoria) {
    var len = results.rows.length;
    console.log("Kategoriak table: " + len + " errenkada.");
    
    $('#proposamen-berria-atala').selectmenu();
    
    $('#proposamen-berria-atala').append('<option value="" data-placeholder="true">Hautatu kategoria</option>');
    
    for (var i = 0; i < len; i++) {
        console.log("ID = " + results.rows.item(i).id + " Kategoria = " + results.rows.item(i).izena);
        
     // Parametro bezala pasatako kategoria bada hautatu egin behar dugu
        if (results.rows.item(i).id == idKategoria) {
			$('#proposamen-berria-atala').append('<option selected value="' + results.rows.item(i).id + '">' + results.rows.item(i).izena + '</option>');
		} else {
			$('#proposamen-berria-atala').append('<option value="' + results.rows.item(i).id + '">' + results.rows.item(i).izena + '</option>');
		}
    }
    
    $('#proposamen-berria-atala').selectmenu('refresh');
}

//Proposatu orriko atalak select-a bete
// idLurraldea parametroa existitzen bada -> lurralde horretako herriak zerrendatu behar dira.
// Aurrerago egiteko ideia: Lurralderik zehazten ez bada lurralde guztietako herri guztiak zerrendatu eta erabiltzaileak herri bat hautatzean dagokion lurraldea hautatu lurraldeen select-ean.
// idHerria parametroa existitzen bada -> herri hori hautatu behar da.
function zerrendatuHerriak(tx, idLurraldea, idHerria) {
	if (idLurraldea) {
		tx.executeSql('SELECT herriak.id as id, herriak.izena as izena FROM herriak WHERE herriak.fk_lurraldea = ' + idLurraldea + ' ORDER BY herriak.izena', [], function(tx, results){zerrendatuHerriakArrakasta(tx, results, idHerria)}, function(tx, err){errorCB(tx, err, "zerrendatuHerriak-exec")});
	} else { // Ez badugu idLurralderik pasa hutsi utziko dugu select-a (soilik placeholderrarekin)
		$('#proposamen-berria-herria').empty();
		
		$('#proposamen-berria-herria').selectmenu();
	    
	    $('#proposamen-berria-herria').append('<option value="" data-placeholder="true">Hautatu herria</option>');
	    
	    $('#proposamen-berria-herria').selectmenu("disable");
		
	    $('#proposamen-berria-herria').selectmenu('refresh');
	}
}

function zerrendatuHerriakArrakasta(tx, results, idHerria) {
    var len = results.rows.length;
    console.log("Herriak table: " + len + " errenkada.");
    
    $('#proposamen-berria-herria').empty();
    
    $('#proposamen-berria-herria').selectmenu();
    
    $('#proposamen-berria-herria').append('<option value="" data-placeholder="true">Hautatu herria</option>');
    
    for (var i = 0; i < len; i++) {
        console.log("ID = " + results.rows.item(i).id + " Herria = " + results.rows.item(i).izena + "");    
        
        // Parametro bezala pasatako herria bada hautatu egin behar dugu.
        if (results.rows.item(i).id == idHerria) {
			$('#proposamen-berria-herria').append('<option selected value="' + results.rows.item(i).id + '">' + results.rows.item(i).izena + '</option>');
		} else {
			$('#proposamen-berria-herria').append('<option value="' + results.rows.item(i).id + '">' + results.rows.item(i).izena + '</option>');
		}
    }
    
    $('#proposamen-berria-herria').selectmenu("enable");
    
    $('#proposamen-berria-herria').selectmenu('refresh');
}

// Proposatu orriko lurraldeak select-a bete
// idLurraldea parametroa existitzen bada -> lurralde hori hautatu behar da.
function zerrendatuLurraldeak(tx, idLurraldea) {
    tx.executeSql('SELECT lurraldeak.id as id, lurraldeak.izena as lurraldea FROM lurraldeak ORDER BY lurraldeak.id', [], function(tx, results){zerrendatuLurraldeakArrakasta(tx, results, idLurraldea)}, function(tx, err){errorCB(tx, err, "zerrendatuLurraldeak-exec")});
}

function zerrendatuLurraldeakArrakasta(tx, results, idLurraldea) {
    var len = results.rows.length;
    console.log("Lurraldeak taula: " + len + " errenkada.");
    
    $('#proposamen-berria-lurraldea').selectmenu();
    
    $('#proposamen-berria-lurraldea').append('<option value="" data-placeholder="true">Hautatu lurraldea</option>');
    
    for (var i = 0; i < len; i++) {
        console.log("id: " + results.rows.item(i).id + " Lurraldea = " + results.rows.item(i).lurraldea);
        
        // Parametro bezala pasatako lurraldea bada hautatu egin behar dugu.
        if (results.rows.item(i).id == idLurraldea) {
			$('#proposamen-berria-lurraldea').append('<option selected value="' + results.rows.item(i).id + '">' + results.rows.item(i).lurraldea + '</option>');
		} else {
			$('#proposamen-berria-lurraldea').append('<option value="' + results.rows.item(i).id + '">' + results.rows.item(i).lurraldea + '</option>');
		}
    }
    
    $('#proposamen-berria-lurraldea').selectmenu("refresh");
}

function bistaratuHerriarenDatuak(tx, idHerria) {
	tx.executeSql('SELECT herriak.id as id, herriak.izena as izena, herriak.argazkia as argazkia, herriak.sorrera as sorrera, herriak.biztanleak as biztanleak, herriak.gps as gps, herriak.web as web, herriak.festak as festak, herriak.testua as testua, lurraldeak.izena as lurraldea_izena FROM herriak, lurraldeak WHERE herriak.id=' + idHerria + ' AND herriak.fk_lurraldea = lurraldeak.id', [], bistaratuHerriarenDatuakArrakasta, function(tx, err){errorCB(tx, err, "bistaratuHerriarenDatuak-exec")});
}

//Herriaren datuak datu-base lokaletik behar bezala irakurtzen direnean exekutatzen da
function bistaratuHerriarenDatuakArrakasta(tx, results) {
    var len = results.rows.length;
    console.log("Herrien datuak: " + len + " errenkada.");
    for (var i=0; i<len; i++){
        console.log("ID = " + results.rows.item(i).id + " Izena = " + results.rows.item(i).izena);
        $("#info-izenburua").text(results.rows.item(i).izena);
        
        // Zein lurraldetakoa den herria
        $("#info-lurraldea").text(results.rows.item(i).lurraldea_izena);
        
        $("#info-argazkia").attr("src", "../irudiak/herriak/" + results.rows.item(i).argazkia);
        
        // Sorreraren informazioa garbitu
        $("#info-sorrera").empty();
        
        // Biztanleen informaziorik badago erakutsi
        if (results.rows.item(i).sorrera != "") {
        	$("#info-sorrera").append('<span class="txt_lodia">Sorrera urtea: </span><span>' + results.rows.item(i).sorrera + '</span>');
        } else {
        	$("#info-sorrera").append('<span class="txt_lodia">Sorrera urtea: </span><span>-</span>');
        }
        
        // Biztanleen informazioa garbitu
        $("#info-biztanleak").empty();
        
        // Biztanleen informaziorik badago erakutsi
        if (results.rows.item(i).biztanleak != "") {
        	$("#info-biztanleak").append('<span class="txt_lodia">Biztanleria kopurua: </span><span>' + results.rows.item(i).biztanleak + '</span>');
        } else {
        	$("#info-biztanleak").append('<span class="txt_lodia">Biztanleria kopurua: </span><span>-</span>');
        }
        
        // GPSaren informazioa garbitu
        $("info-gps").empty();
        
        // GPSaren informaziorik badago erakutsi
        if (results.rows.item(i).gps != "") {
            //$("#info-gps").text(results.rows.item(i).gps.replace(/&#8242;/g, "'").replace(/&#8243;/g, '"'));
            $("#info-gps").append('<div class="txt_lodia">GPS koordenatuak:</div><span>' + results.rows.item(i).gps + '</span>');
        } else {
        	$("#info-gps").append('<span class="txt_lodia">GPS koordenatuak: </span><span>-</span>');
        }
        
        // Festei buruzko atala garbitu
        $("#info-festak").empty();
        
        // Festei buruzko informaziorik badagoen begiratu, badago bakarrik bistaratu
        if (results.rows.item(i).festak != "") {
        	$("#info-festak").append('<div class="txt_lodia">Herriko festak:</div><span id="info-festak">' + results.rows.item(i).festak + '</span>');
        }
        
        // Webgunearen botoia ezabatu
        $("#info-url").empty();
        
        // Behar izanez gero webgunearen botoi berria gehitu
        if (results.rows.item(i).web != "") {
        	$("#info-url").append('<a id="info-url-botoia" class="external" data-role="button" href="' + gehituHTTP(results.rows.item(i).web) + '" data-iconpos="top" data-icon="custom">Webgune ofiziala</a>');
        	$("#info-url-botoia").button();
        }
        
        $("#info-testua").html(results.rows.item(i).testua); //<p>-ak dauzka testuak -> html erabili (beste aukerarik?)
        
        eskuratuHerriarenInteresak(tx, results.rows.item(i).id);
    }
}

function eskuratuHerriarenInteresak(tx, idHerria) {
	tx.executeSql('SELECT id, izenburua, url, ordena, fk_herria FROM herriak_interesa WHERE fk_herria=' + idHerria + ' ORDER BY ordena', [], eskuratuHerriarenInteresakArrakasta, function(tx, err){errorCB(tx, err, "eskuratuHerriarenInteresak-exec")});
}

function eskuratuHerriarenInteresakArrakasta(tx, results) {
    var len = results.rows.length;
    console.log("Herriaren interesak: " + len + " errenkada.");
    
    // Aurretik egon daitezkeen loturak kendu
    $("#info-interesak").empty();
    
    // Herri honetan interesak badaude
    if (len > 0) {
    	$("#info-interesak").append('<h2 class="info-azpizenburua">Interesa dakizuke...</h2><ul id="info-lotura-interesgarriak" data-role="listview" data-inset="true"></ul>');
    }
    
    for (var i = 0; i < len; i++) {
        console.log("ID = " + results.rows.item(i).id + " Izenburua = " + results.rows.item(i).izenburua);
        
        // Uneko herriaren loturak gehitu
        $("#info-lotura-interesgarriak").append('<li><a class="external" href="' + gehituHTTP(results.rows.item(i).url) + '">' + results.rows.item(i).izenburua + '</a></li>');
    }
    $("#info-lotura-interesgarriak").listview();
}

// Erabiltzaileak herriaren informazioa orrian Ikusi herria mapan botoian klikatzean agertzen den orriko mapa prestatu
function bistaratuHerrikoGomendioakMapan(tx, id, lat, lng, zoom_maila, idHerria) {
	tx.executeSql('SELECT * FROM herriak_elementuak WHERE fk_herria=' + idHerria, [], function(tx, results) {bistaratuHerrikoGomendioakMapanArrakasta(tx, results, id, lat, lng, zoom_maila, idHerria)}, function(tx, err){errorCB(tx, err, "bistaratuHerrikoGomendioakMapan-exec")});
}

function bistaratuHerrikoGomendioakMapanArrakasta(tx, results, id, lat, lng, zoom_maila, idHerria) {
	var len = results.rows.length;
    console.log("Herriak: " + len + " errenkada.");
    
    // Herriaren izena jarri izenburuan
    $("#informazioa-mapa-izenburua").text(unekoHerria);
    
	// Euskal herriaren mugak
	var eh_points = "kd}dGfumCiEnr@{\\nr@cB~\\lHtcAfEvXr@pnBxQ|i@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSsGlShRvYcAlH`{@dn@trAdy@cAp@vXhPzKcBxv@|}@tItNdAdc@aNxd@vI|g@mT`k@sGvYdPdM`]dXeAn^ip@|g@sVzQhRxd@pGl|@`l@wCdPdXvI`JiCpKlc@dMre@aUfn@{FnaA|Q`l@jq@?xYwIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\dAnSzK|QfCaJja@rKrt@xYd_@jPhCs@naAnHhp@rKj_AbB|x@{Ftt@?zi@zFre@|Q?hPrV|F|i@tl@?p|@ka@lf@zKfc@nTnoAePbU~MlH|i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fd}@p@|ZkPbwBhEfn@`fAfCtVgCnoAzK|o@bAm[trA?|i@l[~MhXcAjPyv@hc@oaA|Q~MiEvg@rKvX|Q`]`]f}@|QzKdBlTb`@bP?nc@fk@lTxrAcAp^wXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QtcAgMre@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVoc@b{@hCq@wg@xNka@py@mEd`@_NnaA`]hXhRpSlE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAbyAjqAbAzgAvg@pn@zKhfAxg@hEbP`e@wXlP{ZsSkp@|Fwg@|YiRp[wIzN{K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YvX`RvX|a@|x@|YsVr[_NrSePlPcPd]lThMlTxV{K~t@xg@js@{Kt_C`jAfUzZv^zKpc@vIzVwIv^mEtSmTzN{ZtSsVd]st@~a@_N~YsG`ZlEtSzKd]qGtSzKhp@lThMiRs@uIbRbAfUcAx^bPjh@dAxf@pVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@mE`b@cA~a@e_@b}@}i@nPcAvKoT~Fe_@kMor@wCwv@?oT|FqVkEoc@xCiRvn@vIpP{KpHwIf]{KzViRt[`]nXePzf@|x@t[nr@fe@nc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMuIbZtXvc@zKbZhRdRd_@|NvIxCjp@yKrt@wKrVdBzi@eBd_@eB|i@q`@|x@cRjp@~F`jAdBl}Azn@dP~FpVpH|i@jU`l@yCrt@?lTwKxg@kEvv@kMlnA_Gre@qHre@qP~\\sHpUW~MsLvXiMjSeFvXeZdP{f@`]kUdQi]dPcNbOkM~\\qHf`@VdP}FdPmAbPcJb^eFvXeBbOeJ~MkExJ_KrHqDhReB`NdFjSpH|LjMcAp@vJkA~L}JnFyCpGeFxJYrH}N`]?tH~FdBpDdBxGeBjGdB|D`G_AfBKxCjEa@xAfCpDr@~BxCvElEdDa@r@wBjCdAdBlE~DdIe@vBpDfCdBjDlCPY|E_C|D_CwBeBbAeBlEyAlEKjD_AvIdBzD_CrH~B`NpH`O}VtWr@zZXpd@eNrV?xJqHvXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@zi@wSnT}NzKjAfQqDnUbNd_@vSjp@eBvJ|FfQiQ|i@wSha@kI|ZwCtIvClb@jInUeFvXdFzKr@|i@_GdPwOzKkI`OoT|LqDfQeN~MxCnF~BjDvGeBnTtf@_z@tf@aVxYhMbOXlTeJnF}JnFcR|ZiQtIeBzK_GjDcNgCkE|[jEzw@}N~MqHfQwOnFcRqGwC~McmAqG{VlE{^jb@wKiRyn@`@}JoFkEaOaR?yC{KkIdBcJqG{RmTu[kSqD_MufAglAq@_N}NaOwKcOuSuWeB{KuO{Kyb@gQwGqVqLePix@knAaNeP{VkDkErGkEgB{ZeBs[uHgY}[{Roc@cFyYtn@cvB`^iRnH}x@vOcm@_G_NmTa@iQ{w@kh@_k@|FchBdJm`Aj`@st@tz@or@u[o`AyV}j@oPc^iUse@iIoc@qLe_@mXzh@uK|j@wj@nTs[bPm`@?{m@kb@kh@g{AyVjSeFhR~FbPmA|ZXbPkAfQbNxJyCjSmTfBiQa@eYhRcJqFaVdAuKlT?fQ_GzZiExJ?rVkIbPvKtHcJjSwCxJkEvXpDbPtOzKy}@fuCr[rHnPzKp@nT{JbPuWzKai@re@jApUtO~MbFjb@Yre@aNhRoL~L?dQkAvXeBvXuKdPaVtHuOqFyVsHk`@a@iMfCqDxJr@`N|]|[{J~MaRvXcJnc@{NpGiMvXmTzKwCzKVrG|FlExCfCpDeBpDfCbFiDjEfC|FeBbJtIeBnr@?nc@}JzZiMdPaNtHuKyJgY}ZwZoUca@{KyVxJsWsG}a@fQkAvIvG~j@iItf@wKlq@gM|LwGvX_V`{@eYdn@mPse@{N}LgQ?aNbOiI~\\jA`NqDtIgUvIiEwI{NuI}]eA{JrVp@re@hEjDjEcAvGfCtGeBnLhRoHbP{NvIw^jSyRbO{JjDeB`Op@rVqD|j@~BfQnHjS?tWiIbOyRpGmTyYuGdBkX~[gQwIsO`N_C~M`NxJzJbPiEdP{JhC}JmEmPtW}Ff`@sKlTiIhC}JzZvGfQtKnU?`NuK|LsSrHmPvIq@dPvCzi@lPbOtKjSjAxY`JhRxC`]nDnUjAzKvGjDbFeBvGtIh\\lb@`Ntu@fQ~[lPrWiI|i@qDf`@aJ`l@aR`@wm@dAc]g`@{NqUyVyJqSb^}FlT{NvXqSsH}F?aR}La]nr@YzKaa@bkAgMeBaRre@aJdB_VkS}F{KeQgC{NoTg`@_NoHlTaNnTbFhRoDzi@_CtWnHxJiEfQqDtIwCrVbFzK?zKjX~j@Y|L{JfBY~MnHtW|YjDfQ|LnHha@Xtf@jAb^aNhRyRlE_V|LoHfQr@nc@cF|[|BhRxRhRhEbm@cFpd@wVkSp@qG_NdB{NpUuGtf@jAhp@}Fre@kTlb@a]kSiIiCwCmE_V~MwCtW{YvdAiI|[uKb^?vIvVdPnH~MkAjS{F`O{NrGg\\`@{NvIuGvXeQ`OqSlEqWlEeB`]cBbPpSxJlLuI~QcObFpGnHfQuGvXgMtWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVcPrS_M`]jDvC|i@bFpd@oH`OgMeBqSpG_RzKmLkDcJtHwChRiE|L~QxJlL~MdBfQqDvX_NjS{Na@_NzKwCrVjAdn@qDd_@sKd_@VlTbFxJiz@fo@sStWe`@dP`JrVwC|[q@h|A}UnTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDzZcBvg@_Cfn@oDnd@s@nc@cBf`@uG~[_VxJqSeA}UqVWwIgMqUyNeBwVyJq@wIyRdAyNtImL~[`J|L|YpGva@rVfQrV`Yre@jTre@rKxJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJpGxRaOfM}LpO~MjAtWaFxYgQdP_RvJoWeBwVcOsOcPXiRoHqGuG?yNbPwVf`@_NjScJdAwCrHn[fQvRzKjAzh@dBtIeBtf@cBrVvVzKtGiCpf@|x@bBfQjEdPcFfQaNtIcUhCyRnFyNzKm_@jDkPzK}FlToDzKiX|ZnDzi@q@tWmLjDuZcAoWmE{]wIgIzKrKtWbYxYvCd_@nDrV`J|[X|i@ytBcjA{h@}LojBc^s`AjDwnAwIuVgCwt@mSr@lSiIhRdBdQeBrG_NnaAyN~j@{d@l`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEbO`JrHzJjS}FvXwNhRri@nTzbArt@fz@mTfXtI`YfQvGbOlWuHdQbOpDrt@`Y~y@vp@vIzJfQwR`OVhRuG~MoDdP|BpGva@bOzJoFrZc@lLdPdBxYcFxJuVbAm[`NcFbPeQfQ_NtWeQ`@sZjDcU|LuG{KsOst@_Nqd@kP{Zm[wIiTiCqOpUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIhRyNmEkPwIoS}LyNkDyNjDgXxh@{Uzh@{FjSYrVjA|[uG~[eM~MgIlTmLja@mLd_@}Q~McQha@gXa@{UvIkPdBkPrGcBgQcFmEgItIwNtHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bnc@oH~\\yJxg@yJjSgI~MvCvXtCtWqOkD}M}LqOjDkPrWhEnTdBzZiEpd@VxJq@bP}BlShEzi@Vja@{Ftf@tV~MlWtWaU|[kPhRin@rGgTzKuGvXoDd_@kAtf@kLjS{UrHcFsWiPmE{FnFnDvg@sKhR}\\mE_J|LpZl}A}B~MsK~j@qZlEk[`]eg@zKsVuH_J{KgTbAaJ`NxJvg@fTlq@aFd_@sKhRaFlTqOdP?~Mb`@dAt]lTgIhRcQtIgTlEiEd_@sGre@nOrV?jSpOrVpOzZhAfn@bFnd@oD|ZlHtf@jA`l@ij@io@}FmT_o@sViPcAc`@gQsVuI}MmSsKoFgEoF|Brt@}\\bm@eMhR}Mb^wN|ZcBbP}BtHwNjS}r@i~@aUmE_JzK_YeP}M?gIqGqKiCwNoUg_@bA?iRiE{K?sWcXyJwYjDeXoTtCe_@uh@yJwJa^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTdP{Qjb@hEd_@t_BnoAh[?tNha@hf@xYbQnT|BrW|MrVkAtWp@xv@sl@jq@uNlScQzi@zwA`{@|BvIbQnc@fj@`O|c@hmAfdAgjBhEdkA}Mnd@u]pd@_JrV{Fa@iEfQy`@vg@ubAlq@cMd_@cQrW_{AtoBcMnUus@lb@}MoaAezAhD_aAitDoOfBkLuHqVhCeIqGa}@kp@cBmTueAdBeB}LmZkp@?_]rGyYvJxC~@kD_AwB~@wBkAkD~GaGvAsHiC_FoMmE?eIe@wIvJwQ~@_FiCeB_A{DuCs@XaGqB_FbB_Gp@cH|DuH?{KtCmE}@wQb@ae@l^}nAp@mS~Ig`@bD{Zp@sVxHia@l^`GbMvBjWxJpa@tIzFiKp@ePtEmE`DmEhEwQq@yQVki@cBeBvLa@~TcH~KmL`FgCxF_MyHkx@W{p@qXqU`HgJ`D{DxJyQzDeBvY{R|B|Dp@qF_AwBiAqbAp@oFYce@uCuPwCoFmHuHWoFfE}L~@uWtCgQuC}T_Ju|@e@gXiEuWaFg~@uC_F|@{D?aGyHse@yHyCkAkKeT~Eo\\eW{DiKql@oc@aFcPvJc^ss@ef@W_]wC{K{ZsVe@nFoD`GmFuAkAbAgGbHoB?YjD}B|LiNjSgEtAcBhCuEtAkJfJwCjKWhKs@nFq@zKXjKtEdQq@zKe@~E|@rHiCnMYfQ{B~EkArH_JpGsIhCwA{DsEwB_JhDwC|Sr@fBe@rH}Ba@mH~M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsGzCcBzDmHfB{BnFwL}ZcDsAmFqFeKa@oOuIiArA_AvP{DrOgPxJ_AhD{BcAiPpNsG|LK`GeKhCyFdIcD|LgE`GY`H_HjK_HdBoDyCqKhCcB}DaHn\\d@bHiCvP{DbP{DvIiCxCmH`NlQzDtE`G|Tj_AcVjdB?pxA_JtPbBpwAnFxo@wArHwCxQgYzp@eItP?dPeBnFmFvIoBhKgPlTiCbHyJzKkH|LcDwBaFP?{KkJuPkJ|LuCQuC_Ub@gYbDa]e@yJ?aOpByQJ{SuCaVb@cViUcAiNp]kHq@uPkK}@uIcDxC_SuAmOtAyHQiCxCoBq@cD`@oBwB?}SeIPeIhDgGpFyHs@uE}DyZyRmFbA{VjK}MNd@tHkAdItEfQaFbHoBzSwLzKe@|LmDtA}B|D{DdBwJsHgGcOwJiKwJyQ}IuIoDjD{MsGiE{KaMiReIqGmZ{ZqKuHeP`NqK`@gt@~\\zMja@h^pVsGbO_QxY{MvX?xh@gEbOwJjS_JbO}IjSuC`O{FrGwJ?aq@c{@uaBopA{B|LuNvXwn@oc@wJaOiAwIcB{KiL}L?uHsGuIyF}ZrGmE?sHiEePmVhC}TxJyXvXeIpGyFhRaF`@cBzKqGlT|Ih`@sGd_@xF|Lq@lTvJzKnDpUh^~\\lDrG{BhRYzZcB~MaFzZmO|ZgLnF_JrHuCvIjSjStJ|LkOrGfEhRhLjSp@xJaXvXjAxJcMhDq@`NoKjDgEtIkH?sGtHaFgB_Xxg@mHpG}P~MmObOaF~M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYxYjZqG|IbO?nUhLhRhLvXhLpd@`M|LjH~MhLf`@nVbOfErHbBzKbB~j@dItHxXnpAcMtWnD|L|ItHjShRrYvIlVnUbBbOzF|[cBb^fE`OtCtWtUlb@z_@trAfEhD|B`NkAhRnDxYnKnc@lH|[|ItW?fQnDzK}TfCePjDoVa@{MxJ}f@fC_QfQqRtHwJnFiLnFsNbAuCxJ_JjDcTfBcIfCsY?oKvI{MiCgPjDgp@hCcx@sGov@a@qRrVaMvIwJ?qGvJsYtWcI?qRtH{MbAoRfQsNa@gEsGjHia@hA}LuCePvQiRyFqVW{KuUoc@p@_N?{KgEa]qR_N_FdBiLfB}PoTkA{KgEsH?gQcByYwQkSbB{K_F{KkSnFePrHcB_NgEkDwXkDyFmToKsHiSyJkAcOp@yJ{BuIoD}L_F{KsG{YtCcPnDwIbB}LY_NcImb@uCmTwJqs@_FoFzB{KuJpGuJgB{MvIaMjD__@rHkHgCaMjDiA{KsNyJYmEmDiRcT{KXoFhZ{KtC_MfEiR~WmEhAmEyFyYiHkSePqGfE}LkHsVp@uHoK}j@q@c^nRmTvJlEpGpGhSyYbBkp@gEmEhAqGqGyJoDal@gEuHaT{K`Ma^oKc^gLsVmOeB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZuf@{Byg@zB_NqGkSbBuf@aFsG`F_NaFeB{BuWp@yYcBaNp@{KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?KOnByCpAeAv@oBp@q@e@aCj@}A?uEd@sDGcDj@kAXwEj@sHMkDuAqCDqCVoFuBcH_@cDRoF?kDPsD_@mELaDMqCc@aCEsHaEkDaDwBEmAlCiDvAcDjA{DM{CzCkA~@Y\\s@^cA|@Gd@k@`CmEnBiCtCmBjHiCPoBsCaKiDqNiBkLgCaGcCoBkGlAgDtAk@Ne@O_@N]Y_@Pq@s@{BeBsENqH|AeGmBmE}DgMyCgEiGgMqU}@yC|IaGnBeIWgJcBgJp@eIvH}ZjF}L|BsOdEiKnKcOfL_UhCqV`DaGjO{a@bRiK|Ys{@iSiRlVio@mf@kb@hSyo@jO|Ep@sHpGQvh@kSvJ`@p@gCrEvBxDkDfEnFX~EjHeIe@kD`D_UhC_F_AgCwF{KxMcOoBaGaTuPwQkLqWkKwQzZqPmEiJiDgLc@uChCsEfJb@zC_MjS{DtAeG~FiJiD_OkDyDfCiJnTmF`GgEdIgClEuCbHgE~FeGfJ}BbHc@vBaDdA}PtP{KvB{D{D_FoFcBgIsEiD?uAcB`@k@mAwAz@KkDcAmBoBmAp@qCDkH}@aGb@mTj@}HuCgFuC}LoI}ScBkDoBr@q@{DlDc^mDcOsLsOgEyC}@mEoBeBJoFgFaNmEsKcGsOqB}AcA`@oAq@k@s@\\oBj@YQyCwA{@iBz@aCwBwBmAc@kAuCtA}AuAWmADyCp@aCPyCaDiKaE~BeF`@aEcA}@mEuB_FEmEmEaDe@wBoBwBe@uHaKaV_HaGeNcH_MiDeGhDJiDcIqFKqGwAwB|@{DiA_FwAwBoBbAiAeBJsGbBwJcBgBwAr@cBaGXiCzBq@nBs@|BxCzBkDhAwJ|B_MnB_GJmEcA}DqAj@K_Bj@mBq@a@w@p@k@a@d@s@VY|BXzBYlEwF_FeB_@mHkGaK_FuAkH}AcQ|DuBrDaCjHnBjDbAlEv@zHE|DJjAQfBqAs@w@oB_EmI}Br@gCdBq@nF|@dAcA|A_As@iA}Ew@Xw@c@cAX?`@nAdEPbA|AlHk@bAi@Pw@{@iDwEuBoBQaDyFz@sDtAgFX{AuAkA{@}@yCyEs@cAeEVsDJkDK{@RqCVs@K}A}AkAw@Ve@{@KsAaE_BoA`@_FH}@a@eA`@{Az@wB`DcBwB]oBxDqVv@yNLyQh@aGWcE}AwEdAuEiBkHwBaGmCyCEkHk@sDVeA]uAViDQyBcC{Dc@aG\\wFWgBaDmBkAqCKqCj@aCnAwB?uAaBuAGeB^gBrDiDRkDtAsDQgFyD_F_AX]s@qA`@DkAhBuEj@{CEuAhCuEPwBq@uAW}Aw@cAPgBvAmA|@eBtAgBd@kAnBz@|AlErEFpFoBhB{DbCmEPkDp@oF_GcAmCoBiCcHtC}D|AmBGa@p@mAjAQtAa@iBmIuAk@cBz@iBlAoB_Ce@sGoAcEJuAwA_F^oF\\uAWcDcB_Cv@mApAaHEuD{DgJDkDjAeBhAiC?sD^wBDsDcBsDtBz@d@}Aw@eAb@oJEqNv@oBbBeBfDdB|@FXj@bBYv@Y`CgFDkAvAuA^oBnAaCp@eFk@oBX}DbAwBwAkDEwFcAgFj@wFK{KD_JrCmLF_J_AyGeGmHqEmEYqCd@uEj@wBzAsDR{DqAmAw@wBiAyFj@iDzBwEP}HbA}Ix@_FGsDRk@e@{@?}AwAcAj@}AKyBw@a@Jq@bAeARwBVoFq@aKmDsDoCaCiAa@q@Pk@k@Dq@}@wB?cDd@{@nBmAK{@d@gC|@_BnAqCj@}EuBuEE_FeAXRmAtA{@d@}AD{@bBmE?qC}@}APwBp@s@iAyCJgBpAkAzAFjAz@zAs@dAgC|@mEDkGw@qKcC{KmDuL_EeIyEeAuDwBEkAqG}AqAcD}FiGiBlAgDoBe@qCcBsDWqCk@NeAa@LqCgD}A}AmEb@uA}@cH{AaDoDgBuAeE}@mIoCmE_GbAoCbD~@hC?p@k@r@kAi@}@k@EcA{BuAE}Aq@wB|@{CbAj@nBk@pAlAtAlAvAI|AsAhAyB|@wB^cHPgCdAsDYgF}AwBEuHcBmEoAuAuBgFmEq@e@aCR{@b@a@K}AuCgBoAeIe@kH}@mA|@wBv@uAJyCw@uImCqQiB}EqHiGoCcHgDuEgEgBaDkHeFyCmCwBk@mEV_BzCeBlDyFpG_JxEaDp@cA|AFlDbA|AG|@cAv@VnBzChCp@dFkAvAbA~E`@|G{@fEqCnBiD~L{GxFqCrE}AfD{@bJFpFyCtD_FrCiGfEwBpImAxD{DxEmLhAa@vBeIVqG|AqCbAiKvA_BJwB}@{DJwB|@iCw@wBoBePd@_C|AY|@_Ck@{@wA{@DeEpBk@M_CXa@bBxCzCxCtAO^{@PmEpH|APiCdGqCj@Pe@`D|B|D|@iC`Ci@jA`@SfF?vFj@dEnC_Fp@aOSoFoAk@cAy]oCwBEoBnAsDvAiGw@sDbBaC?cAj@k@Y{@v@uA^XnBcHe@eBPoBzCO^mE|AiCtAkDi@kD|@qCfC|Dv@k@pAr@lEs@zBkDbB{@zDuA\\}EuAcDGmBvBQ`Da@~DXq@rD|A`@pAuAVmAv@wBtBq@vAtAhCIbBX|@lE_@zGpAnBxDcHdAuDv@oFlC{@`DoBnDaDlDk@j@a@nC`ChBa@tB_BnAYj@bDfDi@bCk@pFa@|AXhBvBzDuAb@gF|AwIhB{@bKdAlCqC|B}DfD{@JqCtCgFnBi@|IvB~E}AzJGjIh@`D~[vHdBpGuAhIeIfEwBfEs@zRG|HwBd@}H}AcHzDiCbAyCuCwMp@wBj@{@nBnBnBzDpAvBv@bDfEwB|@z@tDmAtBoFtAaDrGiNnIFjAOfC?~O}OJ}HcAiKwBwBi@wBq@mE{D_Fd@`GbAzDjAfFlCzK]vEcBdBmE{DeGeAeHlA{D_CsEmEyDjAuCjDgDtHsE{@uCqCqAq`@{RlAq_@hRwGFwHtEsGfFsDhGcC|AsEj@aCrD_Fz@oDtEyD`CmLhGqAkDcJQkG`C_GdBmEcAaCsDw@}DyEHErD{EhKuBhCkHpCo@a@oClBgF{@{AcAyMQaEsAwAqCkEuAgFwIgD}AcAqCmEuAoCyC_GmAw@_C}@_Bp@eF?_BqAi@FmA\\aDq@}D^iDJkDw@iJbA{Hk@k@?eBbCiCPaDXqCp@k@zA{DbDaCnAqChAoFFsHSuL}@kHoByFaEuAoHXLGfIiLyBcGsLaIiFc@yDiG\\}EqBeECwBnBkFoBuAp@mCdGqGnAqEReC~IiVtEwBhQY`Fa@hEJ|@gAtDpNjFnArBDrDqFKmIp@aDtFcFlFqJzEe@`EeC|IgJpCoBxBcGhA}H?_Lf@gBGmCTsBvCmBj@kBtBiCtCeGIw@h@mBl@oBcBaCTyAbAkAUsByB_AS_DV_AUkBa@Pg@kBv@{BOeBNoDS{@FyFaAqAk@cNm@mCi@XWuEgDgFo@mEOcDh@{@`D\\zCiBnBcFViCfAaBlEmCbAeBFgDgBaEz@e@}AeK|@}AxCwB`@eAhAw@pCi@lCyAhAgBt@qCZeDy@mJoBaG_C]Se@SgA`EmLbA_AzCtChB]~BfA`DhCnBCzC]jEQ@aBiJ{ByAd@iCkFkB]kCiEe@oDH_A[}CVcD}C{Dw@}Bc@TkCwDa@cFaAkAg@wEWiB{AqA]uA?kF|@sFaAoD|@qC_CwGBoSf@eCzLqTr@i@zKVpDm@rIwIjFeRn@G`AFfD}A`A|A~Ar@`CYlB}Cf@qCt@o@xAr@|AY~AtAnBTdEs@RwDh@k@jCuGr@mEj@gJAwCzCuNLiI}@gFqDiKcDwDgAsBI{@To@AoBsCgJqCsBP_A~BgBZcEk@cB{AeB\\wDhCwChAqC?_EcA_A_C{EKmGl@cApA?TgBk@eB~AwBa@eCl@kQ_AwQ{@cHmAkFeBe@UgDkAkBfAmEKyCmAo@e@eBdDqCjC?rBo@~@}ASgDzBqBxBs@zOmLjCeBxBo@~FPh@yAxCuATkDT}Ac@oIlC}C?_Al@|AlDpAZxIvF`ErI{R@q@bBoB`HpAn@w@sC_A{AkByBa@wEl@e@sBlCaOnB{IC{BcE}FuD]]eBNwBhAyAlBaGjB}AlBU`KoFpAkB`C}AdA?l@UhCKxB}ATkBbAcAp@UdFcJ]cFZoDq@aB?w@bAaBdNsGdAuC|AsBnEqAn@q@LePvB}CrOcFhCqEzC_ArAcDbGaBx@wBzEeCdCmAnBaD`P}H`@v@t@yAa@sBVqA`@F^WY_B|AiBt@?xAxAj@e@OsBpC{@n@{@S}@|A{@Rf@r@]N_DiAeBCuC_@oDaDs@k@mEZe@b@cDp@]L_C]wBvCyD|@wFjAgJnB_H|DwGEcE^Qf@L`@wBkBJr@yAEiAVcAKcAg@\\I_Ap@_BlBaByA`@FcA|@w@NmAfAi@OcDy@b@EmAh@]Ea@y@z@Ik@Di@`@o@m@eBiBh@yAuAe@kD\\yEs@kH~AqEn@qL~@cAc@aATsAf@?Kg@Fm@b@k@h@_CAs@g@gA\\]nBeEdAqCCs@`EiKk@iATGl@F[eBtCyHv@gAWk@lBqAn@_CjAeCJn@w@rDp@Cd@yA|@yAhAe@NUAqAPm@|Ac@`AkFVHm@pEx@sBtAwBdBeClAqAwAoHRs@FLjBpGoAxFaHdMzHrKzGp@lAcEtBmEb@NzAgCeB]bBwG\\_JpA}Ej@uAdBaNc@u@fA_DiDkH_F]u@r@?bAUrBcEpAEuAlAqAl@Xt@cDU]uClCOUhCeDtC_AP{Am@oCv@iAqDUE]`EKZeCq@a@f@{@bAyE?eCfBqN_@e@RmEv@sFrAyAhAqCvAiGd@iAIaBPo@x@kFrAqAjFgNT{BvBgDbAYbAgB`@cCd@_AhCgDTuAbAgDd@mBPsBhBcHh@qCbAiA~Aq@d@mA|@o@t@cC|@uA`@aBt@FtBa@tBh@pAhAKbA|@`@Te@vDnBj@fChBlCtBpAn@Ul@XhBqAoGaQWiATyC_@uAdAmAk@_Cu@i@?k@^a@Ok@iAeB~@iEd@GQeATgAP}AoFcFF_C]g@N{@{@uEf@?L{@Si@n@Eh@L^GnBdB`ATn@o@tAwDd@qC~AqAvBwF\\sBdAmCPkDDgDs@qBq@g@p@gCZaCf@gAl@_Dp@}AhDgLPoDDiCTGj@o@j@]xAz@`Ad@jDXlDyAdAmCPeB?a@zLpAdGVdHj@xA\\bC|AhAn@lA?hBR`AsFqAcAiFMKXeCOaTcBUw@j@m@hAeGHsFOoDk@oByAr@eAeABmCIaHKaCaAmCk@iBuBaCUcA{CgAuDw@a@{@[d@e@e@Ep@yB}Ad@m@Iw@j@a@KaCH_A~AaE`@wBMwBi@}A^qA|@m@jAg@bByEe@eEbBiGOgA`A}Bp@kCFoDjDqJxBiIp@o@OK|FiLd@gEOw@Tk@NkA`@cB|@{Ig@aHw@cFsBwBoBtAu@k@HgAZqAl@]`@o@h@?`@Y`AOS]zAa@YuAjAcDOoB[i@_CQ{@{BHuAv@{@j@oBl@gABgFYsDaA{D}@mC{DBKe@v@cBpA}A@{@R_AJyCu@mCKmA`@cCtAkB|C{GH_Ck@yCjAsDh@iAt@oJ`@wGNmLVkAtAyC@aCUuCJeBh@aCIyCKwBd@}HG_HGgCbAkFUuABw@OcDCyAq@eBZ}Dm@uNq@}G}AeGUiAkD{Kw@sDoAuCcBmLw@mBuAo@q@yAEkBy@mBw@lBf@iKsBzBg@w@_AxAW_ATsBT{@j@}A[o@hBgLKyAnAuJiAyCEk@yFiD_AnAWi@r@iCa@gA}CNoDhCq@e@HgBd@mCYyA_BmBPgDvA{Ir@eBUgBj@oB?w@RiBhAoBAmAe@kCFsBn@}BT]zKhR|AtCjCxD|B`Br@n@rBRpAlAvBbDF\\nA`BlBtC|@r@t@IL_AwCsByAsDlEsDdB}Ev@eGuCwEmAn@g@`B~AlCkG|Hw@cA}@t@e@i@lF}HwJwM~D{FeAyAgDo@eCpAiB`I{@l@_CGdGlKQ|@eOmW@a@p@FhBeKk@qAQqAqAmB_Ad@mFiIgAl@UYTTKo@Zm@CyAUiAe@iEh@mBEiAgBeIcBsBsBs@iDXwBxAk@]eCj@oCeC?gAsAaGEoBT_CsB}LQyDoBaHu@o@E_Ck@cFm@oB{@mAe@kAR}DIu@|@{GT{Be@mCKaBTaCX?Fv@XB@m@X{C~A}AToDv@oD^cH@}E^k@NaBEgBk@_AZkAZUd@ClDyA`BoBZkBDyASuAWyAd@{@G]`BgAnAcDdAeB?yDg@e@Fe@d@YVyA\\g@hEgADw@^]nC_A\\uCU_DiA_CcCFkLaK_FbBoFg@qAqAoC\\O]~@u@@]_CeAeBn@uAo@p@i@]]T]I_BJm@Aw@xAyAbCuAp@e@@w@e@_AN]v@BNnB`@Jb@iAb@]`LrEtG{Th@GTt@pHxFU~@kIoFoEdTMhC?`BZJj@aB~GdGhAs@qBiEv@w@zClE`Az@hA^|BUbDw@b@?rEeEVs@hFsHbBqJXmEqAkHq@mGR]\\XxBoFJyAbHd@|CJzCkA`BqCfHs@rE}Cd@sBsBoFa@yB`AK[yEmB_FaEaEgA{B?e@p@FhBoDp@i@b@UDo@lA_CPcAjAeAxADZ]a@gBf@_CxA{@RaAhAq@dANrACp@BY]lASfAc@`Aj@~CB`@UpAmGDiC?aIMuGi@eMOkK[mE{A_Jy@cJ[qEgBuJOiBHiCmEe]sAaIuCmCwBz@sAgAK}AqA}AiAmAo@{BHmAf@wBA{@Js@}As@g@yAq@e@sAdC_@Yk@tAuAh@c@uAbCeBhBiCp@FrF}GIuAhBgD?mAdA_A`@eG[_Au@`@mAsDs@cAIo@`AyCTe@p@uCC}@v@kCRqE|AqJr@gFAqA`CuGt@k@tAeBtABv@Qp@q@nAX`EqCf@_B~@sAp@_@Vi@^Tj@U\\P`B{@P{@d@aAv@OJvD^\\hEPpA{@|@VZhABxAp@T`AsM_MgHiIBsBtAsJjHkCpCwErFe@a@hHmIrDyCcAgDq@mCw@mA_A`AkBg@I{@B_AcB{B_@NoC_EOyAqBg@G_Ag@z@aA_AWm@w@l@}AkFr@oBLuE[aBsCo@}@uA_Cs@iBmB`@mAq@kBXS_@]N_B?wBgAcCeAw@^a@{BkHyBYi@yA{AmAq@}AeAuAk@`@cBgDLcAOmANiBTiAi@mC_ByAkC_AwBgHRs@v@uKb@w@c@gB}AsBiBa@[s@yByAw@}ASsBZsDQ{BcAeC{@sFN_Au@wGd@w@cAwBe@oDOiD_BmCq@d@a@oBVi@Kw@K`@Us@`@cAgBcAoAcHr@gDaCoMOqCaBwDm@yCUaCiA}GPk@_@s@k@uC\\wBc@yCLo@u@}CXs@c@a@Rs@PTp@cCQs@p@w@`@mEg@k@?sArAaAZ{DEo@Ti@Js@eCiGqDaDoCg@o@yA}DTq@mABq@o@sE?iBGiAVi@]eCGcCqBqAMmAy@cC\\{GdAkAf@wBjAqAc@iAKcAiCaGy@r@e@qADaBTe@[iCg@_AVo@KuAv@i@PoBa@s@?mE[w@JyAw@uCGcCTuAi@iJk@yCaCiK{@qAAiCeA{BBkA{@qAeC_AW{AgAj@qAmAoC?w@wFTMNiBk@kH`@gBa@i@`AqAj@kHY{CwAu@t@kBe@o@yBj@MeAeDsBeAyETs@_BeDZeAKyCo@aBi@h@]wBQPoAuFaAyC@mCh@i@TcBl@DCoDj@yAEuAk@g@Lm@oAeABuAf@q@Mw@ZCOeAl@e@QgAIqAw@o@Ws@cB_AMgAi@r@y@_Di@n@YyAf@w@U{BrBEBgAp@eC?eBu@qAQn@o@mA^OJaG`@uAA_DZwBr@uANqB`@ILr@ZUe@sBk@yAXw@_@cAPcAoBiAKqAw@aB_DtAa@~@s@{@oAtA]_A`@uAm@iEEmCk@eDk@o@CaBn@qE\\iAp@e@xCaE|@]`@{@K]v@]Hd@f@SImATs@d@]~IcA~BXfF~@|As@CyCbBmIrByJdCcJl@mAa@iClApA`BcC?aCZq@Mw@b@g@ZiDUw@PuCe@iHmAeIgE{O_GcJwB_CiDqCmD]sBh@eBhEyClC{@`DcBtLb@`@eAbJa@rB}@rBu@\\A`@_@\\?gAuBxA[\\Yr@uAs@o@uCkCcDaEgA?{@}@qAk@mGe@a@a@iEj@o@N{@`@XTUpCcNc@]tBeIIe@bBkG|@cApAaBpAo@|DcCkAqEuFpCcA}@LoCBiL{@aGkG}LHe@VGTRTGIaB{EaIeCjA_@r@}DF_@a@oG]c@hA@{@oEyAIw@kArBXcBgF|AgChCiBlAiBQGz@a@LRoB_@XBF?w@l@cCpCkFNF^w@Yi@bBsIT?Hi@aAmA?s@sBUGj@_@s@{@d@GqBF_BeBr@e@}AReCeAcA^cA?k@Zs@g@q@hAoDa@]q@`B[i@?s@o@XLw@q@h@v@uCU]o@z@q@qAm@hAq@`@e@_A]`@u@cABw@l@yAN{@|HqU]]FoBrCqGgBm@hBmHsBTvBaKZKFbAvAcDp@iIHnB\\o@b@HPw@TINlAp@r@?_Al@c@d@XhAzBhBPrAmAz@uEbAiG_AaIa@iEkAq@s@l@gAoB{@q@}@~BYkBa@pAm@\\u@oBw@uKKg@e@~@AeBe@k@YyEg@h@Wa@u@eKp@~BNcEv@uA_@gHXcFi@sFMk@[~@e@wBQLPcB[i@Ti@FeEj@e@DiCpAfAjD\\z@v@l@SCmCpDg@z@kFtBuAKoDf@{BGaFq@o@?qAxAeBpA]lEl@dAHpAeCj@?Nw@f@}At@}CrA{AfCGzAm@dBcDv@qAjDf@xArDt@jLrJ|DlA`Iq@|[tCe@lAe]w@aRoEqCHsDzDeBlMwc@e@k@nD{K[mVkMeKiAiEdA{@cE_LD}BZe@fAF|AvBtBfDhBtA~C`@DyAyBa@uBaBgDsGFe@c@oB{EuC}DzGxAtj@t@rB?`@YTX`@v@LjAaA?m@VYDw@tBYH~@fDGNtEgAj@Br@w@h@DlAr@EcBdEg@a@aMzVg@o@_H|O_BxAeD]qClCcApCgArAqAm@eDrB_AnDoCxAcBo@sAtAq@e@q@~@aAw@wAlAgAeEs@i@_@h@LtA[n@c@zFeGnK{BNO~EIkFm@yCYcOX}AK]MyAXg@w@yTS}A[qFq@oAw@k@NGk@{BgAgFqDgJg@h@HqEf@e@AyBkAcA]r@uAeCL{@cCiB}DmUd@_Ae@uAPe@cAuA?o@U{@PCWoBPe@g@yCYxAa@sDc@d@eEmRiApAoCmLZ]_@e@T{@GiAsA{BcCoBUoFd@cAS_AmAt@mCiICuA}IgSGcCe@ToByF?i@kAaEk@Pa@iCv@aEcAwDiArBuAuCeBmAiB}CN~@[\\qA_CJo@w@`@kB}CFs@i@`@qAuANa@eAj@]uAoNiGKo@u@`@BkAgAl@wAiB}Dw@eDeABm@a@d@gI}Ci@\\Ko@^m@mMeCIi@ZYRwB{AuFFe@c@a@[yA{BuAcFFUe@eNgBC_AmAw@]xA_Ca@~@sHUsB_Ao@u@qCeCPoAcHmAh@aBgA?sDoB]e@{@rAYNkBkBi@Sa@rAYw@{@lBXCaAj@a@Km@t@E`CqCf@XtCgAuBaCoC]?u@mDUPo@kBKeCiAUr@wBKWw@d@o@y@gA_Ah@CmAd@GIcAs@o@oBOCw@f@]}@w@}@uAj@FhAe@oBk@|Au@r@wC_Au@\\yAp@s@j@CZc@aD{DQmCYxAsBw@^a@mByAyDoBCkAuA}A]{@n@IU_Aq@d@_CsBg@{BeD}Ae@_AhFpArCgBf@Pk@}DJ_AMcAl@a@Zd@V_Dj@]hDCrAkD{Ab@s@aA}@f@JuCyBk@ZeE_CiDeBwIElAiBs@r@zDuB_ATaBwE}Dd@xAVjBsEcFp@OE}A_B}Dw@n@IeCoByAPeB|BfAq@cAEmC}EkFp@k@sAmEgA{@?pAq@_ANo@q@yCTUwAiD`@?JgBj@T`@yAoB{BHeC@kBm@uAXaBmCqCmA}ANo@bAv@cA_C`AUhAm@a@qAt@FD{ByBkB{@j@_CoFXg@rB~@MkAd@IXcAsBi@UqAvAMx@j@QkBf@Gd@s@ZBHa@jCbBr@UyAiAw@sBsAj@D}Ae@a@K|AwAqAoA}C?oB[yAaBeAw@wDAaB|@NHYeAoCd@_@QsFwAn@k@iAuB]g@uCZyC\\{@k@{BLiAkA{DNyAOkB[s@d@uAIq@^s@a@wB@{@QqAfAgAIqCNsBTY_C}A{@_BROhAbACeBd@MJ{DuAs@mBQg@cCcAqA[r@e@oBgAr@aAgB}@yCaEqIaBeEO{EmAf@k@qA`@]Oi@w@o@AwBq@gDw@gAh@_B]kCr@l@MqCVKOkB`AF_@wBlA\\h@i@?wBu@}FzkAm@pP}LnKpGhIjA~EHzDyJhAkHyDyd@cBoT?oFk@kAD{C_Nk_AsDeM_AuE]_FiCkDe@_CvAgBE_CiBoBuBOiDlBiA~AcBc@q@wB}@j@w@jAe@cAnByC]}Av@k@v@`@\\{@i@eBiBs@cBtAkA~B{CXuAkAwAFQmAh@uA]cAoBcDiBcA_@}AXgBMcA^Yj@Pp@Y?uAj@cA?eA`B{@p@j@zEbA`BbA|AmBv@qCdAiC?uE_@eAq@gCPuAnDmAp@sDKmA?cAxDeEJwBoAPk@{@d@sD_@oF{BeA_@kDw@eBwA}AXaKVqCWwBv@cDPcA{Jk@e@_C}@NEkAJ{@W{@Ya@|@kDj@Nj@uA^wBqAuAuCq@oAeAwA_CwGoXe@yNaC{Gy@{DuAeEw@GMwB^cAv@`@JgFq@G]k@w@a@oBwFDaGhAwBuBkDiBcAaEkG?sDoBuAQwBq@H}AaG|@k@?}Ev@h@DkAyDgBkAiGLs@w@{@eA?}@aDj@sD\\{@?oF{B_F?qCcAa@SqC{AGuDeEuAqC?cLqBsGXsDq@}EiAiG_AuA?wB]{CVoFuBeBEwBq@eAVcA?mEbBsDWuHqA}E^eAQ}A?{@v@a@nAtLjAhG`BnBjAh@|AcArEzOlEsD_@s@d@q@|@rAd@W|GxGtD|DDuA{DeE}@gBQgCb@}AdAtArEeErDsK^mE?aDh@gBWwBJiGj@gBEwFwAoBw@cEnCeEDyC}AwEJuA~@b@|@c@w@uIyEiGiBsDiCkGeFeIsEgCoCX}AY}As@iHYkGhCwBvBk@|A?vBd@nFWdA}BtAq@rAFdAn@`@p@Yv@j@WjAJz@uAz@q@r@wA?w@qCiBaG}@HK{@_AiCmCyCeA?q@z@}@a@?k@j@a@?cAgE_BuAmB?iC_@a@VwBaBwES}E}AuE}@gBcAs@p@a@k@a@jAgBqAgCKmEq@gJPgBQwBw@iCb@Y]{@p@i@\\}A~@YSgBEaDp@mADoB]uAb@kA?k@qFsOkAGiAoBuBeIoCmIcBY?s@X{@}A?}@a@}AQ_@bDoBGQs@uBs@cD}AuAkDkAeBRc@|@j@YgBFcAw@oBe@qC?uAYeBRgBeAq@dAc@MyCLoFv@cAwAeEaCa@cCuAuB`@uBlAeA`DiAOEoB?}Ae@YiB?oByFJcAdAs@EkA{CwE{CmBSuAsD{@cBwBoB{CiAgCJgBkAkDqFaD{CqCkAmAoAeEk@sAuB{@k@eAQyCj@a@|@YwAcH{BwBeAqCX_C_@aCXi@_@s@Ds@c@{@P}Av@kDQ{@e@i@w@a@q@bAw@oB}A}AE{@p@k@cBq@?uA}H}LuB?cA}@}@{DkGmEkAa@PoBEmAeE{@Y{@kFOYgBuA`@wA}AcAuASgCuAiCuB}AoDGiBk@sCoBwBwBq@GoAuAk@cAcAkDqAoB{Aa@aDFyFwBmLoJiCeAeEsDgEeBgDmEcBYEmA}AoB{CwBcAHcAeAq@oBqHqGwF_CaFuAiAXk@iCiAwBsDcA_@`@k@FiAaDeFmHsFsDoC}EwFmAiBs@E_CcC{@eF{@kGgBiBsD_EuAyEsDiC{DyDqCgEuAwANi@eBiXwMwH?aDcA{Cp@uAdAkArDoBz@k@iC]`@kAHoA{@}@rAq@Ow@fFiBnBnAkDd@wEq@vBq@G|AkD?mBw@mEq@?X_BJ}ES{@v@eAFmBe@mA|@sDiAk@PcAuBs@wAsHcBa@WqCiAYJs@}@{@}AQKq@e@IuAmBgF_JuA?e@Q_@eEcAyCcAYaDmBoAuAaFFo@}Aq@p@DjD}@|AuCj@Yr@o@Iq@{@?kA_@{@?kDrEgMw@cA?uAiAwBe@i@}@cDkAi@uAmAcAcA_A?cAuAoBeAcBWaDgBiG{DgEk@gDqC?{@w@s@qAG}@a@w@mAuAq@k@?aCkD_Aa@c@s@q@gBcAPqA?aDiCiAi@}@uAuCgBaC{@e@kAeFqCsDqCw@oB_HcD]sA}@s@eNyJw@gBqA}AoBcAc@}AuBk@sFcEcAQ{IkDcBqGqFsDgDY{DgBgDjSk@tAo@XYkA?gB`EiRgKmI_UwByFxz@i@uWDyN|@mLhB}LhBeI|@kH|@}S}AkDKqC|@mEd@iGEsHJ}OEyUmLkP{I{K?wXzBePeSkSn@iR{Pmb@bIoUlKyg@lKhCjHa{@`IgB{Bwv@q@ka@pNcPzPqUjH{ZdS{KxTqUx[wXpq@iRxi@kSlDcAV_\\jAst@?sqAY}j@Xkp@~Eia@?wf@mDg`@sNse@wMwv@yMagBWg}@Vyv@xFcm@fLwg@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@k}Aae@_wAgZ_z@VaGbBwIhHuAjHq@tHeIlFmLxD{R~E{ZmDyYoIkZcByYbBwQ`KsG~L_GpGiJjF{S~LiY|GiKxF_UdEoMdGmEhHr@dGfCfEpFdGjSxDpNpGNvFoF~EaGpIcAlKhClRdIzImEpGuHtCgJ|@gJsCmL_VwXwH}LKgJp@{KpGsO|Ga@bPyBdNyCxFoF?aO}BqN_DyJc`@uHmYqGmD{ZcIyYmDuWY{h@w[uIai@{YqNkb@p@c^zPwXxFuf@_Mc|@kVaN?}[p@oFhCeAhHtAhAmAnDGv@uAhBkAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Es@dGh@jFpC~[aKpUqVtf@sGn`@ia@|s@yJ~hAwItXse@ng@or@daAkS~hAeBjVa{@|^gzA~s@_NnnA_iAdeAyv@hZwdAde@{ZpGcOqu@{fAtXe}@rUi~@deCmEn`@ehBlVeQld@}x@`m@k_A~eBsGrn@gC~w@_wA~^en@hSwIdPxYvQuIjHuWiLmb@mVg`@kV_]kHi`@hAm`Az[wg@r`@ia@hl@_\\d^_iAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@tHrYka@l]sH|TvIjeB{w@rr@{h@jAyw@xX}uAxFwdA}T_]|Iem@`X_]t\\nFzFbyA|m@l`Al~Alq@n]pdFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@tHzgAfQph@mEfb@jb@fm@yJtk@xeAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[agBbM`@fPaOpVnUx\\m`AiElb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXeiBrGezAjnIot";
	var eh_points_kosta_gabe = "wbuhGnjhHhBeI|@mH|@{S}AmDKoC|@oEd@iGEqHJ}OE{UmLkP{I{K?uXzBgPeSkSn@iR{Pkb@bIoUlK{g@lKhCjH_{@`IiB{Bwv@q@ka@pNcPzPoUjH}ZdS{KxToUx[yXpq@iRxi@kSlDaAVa\\jAqt@?sqAY_k@Xkp@~Eia@?uf@mDg`@sNue@wMwv@yMagBWg}@Vwv@xFem@fLug@zI}LkAiR{Puf@mR{h@ce@{fAoYekAqc@m}Aae@}vAgZaz@VaGbBuIhHuAjHq@tHgIlFkLxD}R~EyZmDyYoIkZcB{YbBuQ`KsG~LaGpGgJjF}S~LiY|GgKxFaUdEmMdGoEhHt@dGfCfEpFdGjSxDnNpGPvFqF~EaGpIcAlKjClRdIzIoEpGsHtCiJ|@gJsCkL_VyXwH{LKiJp@yKpGuO|Ga@bPyBdNyCxFmF?cO}BoN_DyJc`@wHmYoGmD}ZcIwYmDwWY{h@w[sIai@}YqNkb@p@c^zPuXxFwf@_Ma|@kVaN?_\\p@mFhCgAhHvAhAmAnDIv@sAhBmAfBc@dAa@|@hCv@|AtB_CtCmE|M}L~Eq@dGh@jFnC~[aKpUqVtf@sGn`@ia@|s@wJ~hAwItXse@ng@or@daAmS~hAeBjV_{@|^gzA~s@aNnnA_iAdeAyv@hZudAde@{ZpGeOqu@yfAtXe}@rUi~@deCoEn`@chBlVgQld@}x@`m@i_A~eBuGrn@eC~w@awA~^cn@hSyIdPxYvQuIjHuWiLkb@mVg`@kV_]kHk`@hAm`Az[wg@r`@ga@hl@_\\d^aiAXwu@Yse@fWmc@dP_k@p`@k|Ajs@oUx_@`@jAha@nk@vHrYma@l]sH|TxIjeB{w@rr@}h@jAww@xX_vAxFudA}Ta]|Iem@`X_]t\\pFzFbyA|m@l`Al~Alq@n]ndFvn@?b_@pUla@rH`_@~Lp]d_@j~@dBvdA`@jZlEzu@xYla@vHzgAfQph@oEfb@jb@fm@wJtk@veAzMvu@~f@jb@xn@jSb`Anc@fm@uf@nVqnBfI_wAkAqpAf[_gBbM`@fPcOpVnUx\\k`AiEjb@bBvXnDd_@Xps@`Q~MnVjp@zQbyAbkAa]bXciBrGezAjnIoT?a_EiEnr@{\\pr@cB~\\lHrcAfEvXr@rnBxQzi@zQiC~Tvg@~IqGz\\j_A~T`{@deBqGhf@hClSqGlShRvYcAlH`{@dn@rrAdy@aAp@tXhP|KcBxv@|}@rItNdAdc@_Nxd@tI|g@mT`k@qGvYdPdM`]dXgAn^ip@|g@sVzQjRxd@pGl|@~k@wCdPdXxI`JkCpKlc@dMte@aUfn@{FnaA|Q~k@jq@?xYuIn^cAiEduCfXrGn^j_Adv@zZ`Uvg@|\\bAnS|K|QfCaJja@rKrt@xYd_@jPfCs@naAnHjp@rKj_AbBzx@{Fvt@?zi@zFpe@|Q?hPtV|Fzi@tl@?p|@ka@lf@|Kfc@lTnoAePbU~MlH~i@xY|i@uC|gAbBha@hEhR_]flAq@vg@iE|x@rKztA{Fb}@p@|ZkPbwBhEfn@`fAhCtViCnoAzK|o@bAm[trA?~i@l[~MhXcAjP{v@hc@oaA|Q~MiExg@rKtX|Qb]`]f}@|QzKdBlTb`@bP?nc@fk@jTxrAcAp^uXvVhRoHlT`JlnAbh@`l@?lT_RlT|FrGeUpV}QrcAgMte@yNpG?fn@bh@lc@jc@rGdwBxcBd`@cApf@d_@tVqc@b{@jCq@yg@xNia@py@mEd`@_NnaA`]hXhRpSjE~Qlc@`]`]tKvv@lc@l}Axa@nc@dh@d_@liAdyAjqAbAzgAtg@pn@|KhfAvg@hEbP`e@uXlP}ZsSkp@|Fug@|YiRp[wIzN}K`J`NxViRjXlTlPlTnHvIlPdP|YflAhrDnhDtf@hR|YxX`RtX|a@~x@|YuVr[}MrSgPlPaPd]lThMjTxV{K~t@zg@js@}Kt_C`jAfUzZv^|Kpc@tIzVuIv^oEtSmTzNyZtSuVd]st@~a@_N~YsG`ZnEtSzKd]sGtSzKhp@lThMiRs@uIbRdAfUeAx^bPjh@fAxf@nVf]{KhMmc@jEiRlcAm}AzNe_@vKiRhx@kE`b@cA~a@e_@b}@_j@nPcAvKoT~Fe_@kMor@wCwv@?mT|FsVkEoc@xCiRvn@xIpP}KpHuIf]{KzViRt[`]nXgPzf@~x@t[nr@fe@lc@ps@naA`b@hRh`BppAnsAnaAtk@dPlx@d_@nXfCbb@paAbRa]pPmEjUbAbZhCpH`l@n`@taBjMsIbZtXvc@zKbZhRdRd_@|NtIxClp@yKrt@wKpVdB|i@eBd_@eBzi@q`@~x@cRjp@~F~iAdBl}Azn@dP~FpVpH|i@jUbl@yCpt@?lTwKzg@kEtv@kMlnA_Gre@qHte@qP|\\sHrUW~MsLtXiMjSeFxXeZbP{f@b]kUdQi]dPcN`OkM`]qHf`@VdP}FdPmAbPcJb^eFtXeBbOeJ~MkEzJ_KpHqDjReB`NdFjSpH|LjMcAp@tJkA~L}JpFyCpGeFxJYpH}N`]?vH~FdBpDdBxGeBjGdB|D`G_AdBKxCjEa@xAfCpDt@~BvCvEnEdDa@r@yBjCdAdBnE~DdIe@vBpDfCdBhDlCRYzE_C|D_CuBeBbAeBjEyAnEKjD_AvIdBxD_CtH~B~MpHbO}VrWr@|ZXnd@eNtV?xJqHtXkMvv@kItHeBpGwKzKyGhRoX|LwOjS}Rd_@}V`Nsk@|i@wSlT}NzKjAfQqDnUbNd_@vSjp@eBxJ|FdQiQ~i@wSha@kI|ZwCrIvClb@jIpUeFtXdF|Kr@|i@_GdPwOzKkI~NoT|LqDfQeN~MxCpF~BjDvGeBnTrf@_z@vf@aVvYhMbOXlTeJpF}JlFcR|ZiQvIeBxK_GlDcNgCkEz[jE|w@}N~MqHfQwOlFcRoGwC~McmAsG{VlE{^jb@wKiRyn@`@}JmFkEcOaR?yC{KkIdBcJoG{RmTu[kSqDaMufAelAq@_N}NcOwKcOuSsWeB{KuO{Kyb@gQwGqVqLgPix@inAaNeP{VmDkEtGkEgB{ZeBs[uHgY_\\{Rmc@cF{Ytn@avB`^iRnH_y@vOam@_G_NmTa@iQ}w@kh@}j@|FehBdJm`Aj`@st@tz@or@u[m`AyV}j@oPc^iUue@iImc@qLg_@mX|h@uKzj@wj@pTs[`Pm`@?{m@kb@kh@e{AyVhSeFhR~FbPmA|ZXdPkAdQbNzJyChSmTfBiQa@eYhRcJoFaVbAuKlT?fQ_GzZiEzJ?pVkIbPvKvHcJhSwCzJkEtXpDbPtOzKy}@fuCr[tHnPzKp@lT{JdPuWzKai@re@jAnUtO~MbFjb@Yte@aNhRoL~L?dQkAtXeBxXuKdPaVtHuOqFyVsHk`@a@iMfCqDvJr@`N|]|[{J`NaRtXcJpc@{NnGiMxXmTxKwCzKVtG|FjExCfCpDeBpDfCbFiDjEfC|FeBbJvIeBnr@?lc@}J|ZiMdPaNtHuKyJgY_[wZmUca@}KyVzJsWuG}a@fQkAxIvG~j@iIrf@wKlq@gM~LwGvX_V~z@eYfn@mPue@{N{LgQ?aNbOiI|\\jAbNqDtIgUvIiEwI{NuI}]gA{JtVp@pe@hEjDjEcAvGfCtGeBnLjRoH`P{NvIw^jSyRbO{JlDeB`Op@pVqD~j@~BfQnHjS?rWiIdOyRpGmT{YuGfBkX|[gQuIsO`N_C~M`NvJzJbPiEdP{JjC}JoEmPvW}Ff`@sKlTiIfC}J|ZvGfQtKnU?~MuK|LsSrHmPvIq@fPvCxi@lPbOtKjSjAzY`JfRxC`]nDnUjA|KvGhDbFcB`e@bm@`Ntu@fQ|[lPrWiI~i@qDd`@aJbl@aR^wm@dAc]e`@{NsUyVwJqS`^}FnT{NtXqSqH}F?aR}La]lr@Y|Kaa@`kAgMcBaRpe@aJfB_VkS}F}KeQgC{NoTg`@}MoHlTaNlTbFjRoDxi@_CtWnHxJiEfQqDvIwCpVbF|K?xKjX`k@Y|L{JfBY~MnHrW|YlDfQ|LnHha@Xrf@jAd^aNfRyRnE_V|LoHfQr@nc@cFz[|BjRxRfRhEbm@cFrd@wVkSp@sG_NfB{NnUuGvf@jAfp@}Fte@kTjb@a]iSiIiCwCmE_V|MwCtW{YxdAiIz[uKd^?tIvVfPnH|MkAjS{F`O{NrGg\\b@{NtIuGvXeQbOqSjEqWlEeB`]cBdPpSxJlLwI~QcObFrGnHfQuGtXgMvWcFrVbBtWiE|[wR~[aNnUiEjSfMtWnHlTtVePrS_M`]lDvCzi@bFrd@oH`OgMgBqSpG_R|KmLmDcJvHwChRiEzL~QxJlL`NdBfQqDvX_NjS{Nc@_N|KwCpVjAfn@qDd_@sKd_@VjTbFxJiz@ho@sSrWe`@fP`JrVwC|[q@f|A}UpTsOvg@}Flb@~QnpApDnT|BrHdd@`]qDxZcBxg@_Cfn@oDnd@s@nc@cBd`@uG`\\_VxJqSgA}UoVWyIgMoUyNeBwVyJq@yIyRfAyNtImL|[`J~L|YnGva@tVfQrV`Yre@jTpe@rKzJrb@iClLyYhEcOzJkD~BnT_CvsAr@bPYd_@kPh`@mP|LkPfQiIjSjAtWzYnU`]jDvG|L_Cj_AbFzKzJnGxRaOfM}LpO`NjAtWaFvYgQfP_RvJoWeBwVcOsOcPXiRoHqGuG?yN`PwVh`@_NjScJdAwCrHn[fQvRxKjA|h@dBrIeBvf@cBpVvV|KtGiCpf@zx@bBfQjEdPcFfQaNtIcUhCyRnFyN|Km_@hDkP|K}FjToD|KiX|ZnDzi@q@rWmLlDuZcAoWoE{]wIgI|KrKtWbYvYvCd_@nDtV`Jz[X|i@ytBcjA{h@}LojBa^s`AhDwnAwIuVgCwt@kSr@jSiIjRdBdQeBpG_NnaAyN`k@{d@j`Awa@ha@yJfQ_RpGaFd_@sKtHoHjScFps@hEdO`JpHzJjS}FvXwNjRri@lTzbArt@fz@mTfXvI`YfQvGbOlWwHdQbOpDtt@`Y~y@vp@tIzJfQwR`OVjRuG|MoDfP|BnGva@bOzJoFrZa@lLbPdBxYcFxJuVbAm[`NcFbPeQfQ_NvWeQ^sZjDcU~LuG}KsOqt@_Nsd@kP{Zm[wIiTgCqOnUwCjSkPgQsZsHuVmE{JnFjPzw@|Qre@jAre@eMbAuVdPgIjRyNoEkPwIoS}LyNkDyNjDgXzh@{Uzh@{FjSYrVjA|[uG|[eM`NgIjTmLja@mLd_@}Q`NcQha@gXc@{UxIkPbBkPtGcBiQcFmEgIvIwNrHgI_NyN?}QoTuCbOaJpVoDlS_Nc@}k@oU}Bpc@oH|\\yJzg@yJjSgI|MvCvXtCtWqOiD}M}LqOhDkPrWhEnTdBzZiErd@VxJq@`P}BlShEzi@Vla@{Frf@tV`NlWtWaUz[kPjRin@pGgTzKuGvXoDd_@kAtf@kLjS{UtHcFsWiPoE{FnFnDvg@sKjR}\\mE_J|LpZj}A}B`NsK~j@qZjEk[b]eg@xKsVuH_J{KgTbAaJbNxJvg@fTlq@aFd_@sKfRaFlTqOfP?|Mb`@dAt]nTgIfRcQvIgTlEiEd_@sGre@nOrV?jSpOpVpOzZhAhn@bFld@oD|ZlHtf@jA`l@ij@io@}FkT_o@sViPcAc`@gQsVuI}MoSsKmFgEqF|Btt@}\\`m@eMhR}Mb^wN|ZcBdP}BtHwNjS}r@k~@aUmE_JzK_YeP}M?gIoGqKiCwNqUg_@bA?gRiE}K?sWcXyJwYjDeXoTtCe_@uh@wJwJc^aUcOcX?wd@ia@}r@gQiLdn@}XmEgTfP{Qhb@hEd_@t_BnoAh[?tNha@hf@zYbQlT|BrW|MrVkAvWp@vv@sl@jq@uNlScQ|i@zwA~z@|BxIbQnc@fj@`O|c@hmAfdAijBhEdkA}Mpd@u]nd@_JrV{F_@iEfQy`@tg@ubAlq@cMd_@cQrW_{AtoBcMnUus@nb@}MoaAezAfD_aAgtDoOdBkLuHqVhCeIqGa}@ip@cBoTueAfBeB}LmZmp@?_]rGyYvJxC~@iD_AyB~@wBkAkD~GaGvAqHiCaFoMmE?cIe@wIvJyQ~@}EiCgB_A{DuCq@XcGqB_FbB_Gp@aH|DuH?}KtCmE}@uQb@ce@l^}nAp@mS~Ie`@bD{Zp@uVxHia@l^`GbMvBjWzJpa@rIzFiKp@ePtEmE`DmEhEuQq@{QVki@cBcBvLc@~TaH~KoL`FgCxF_MyHix@W{p@qXqU`HiJ`D{DxJwQzDgBvY{R|B|Dp@qF_AuBiAsbAp@oFYce@uCsPwCqFmHuHWoFfE{L~@wWtCgQuC}T_Js|@e@iXiEuWaFe~@uCaF|@{D?aGyHse@yHwCkAkKeT|Eo\\eW{DiKql@mc@aFePvJa^ss@gf@W}\\wC}K{ZsVe@nFoD`GmFsAkAbAgG`HoB?YjD}B|LiNjSgEtAcBjCuEtAkJdJwClKWhKs@lFq@|KXhKtEdQq@zKe@`F|@rHiCnMYfQ{B|EkArH_JpGsIjCwA{DsEwB_JfDwC~Sr@dBe@rH}B_@mH|M_HlE_AhJuCxCp@zDKdIcDvBuExQoDfCwAhRsG|CcBxDmHfB{BpFwL}ZcDsAmFqFeKc@oOuIiArA_AvP{DrOgPxJ_AjD{BcAiPpNsGzLK`GeKjCyFdIcD|LgE`GY~G_HjK_HfBoD{CqKjCcB}DaHl\\d@dHiCvP{D`P{DvIiCzCmH~MlQzDtE`G|Tj_AcVjdB?rxA_JtPbBpwAnFxo@wArHwCvQgY|p@eIrP?dPeBpFmFtIoBhKgPnTiC`HyJ|KkH|LcDwBaFN?yKkJuPkJ|LuCSuC}Tb@gYbDa]e@yJ?aOpB{QJ{SuC_Vb@eViUcAiNp]kHo@uPmK}@uIcDzC_SwAmOvAyHSiCzCoBq@cD^oBuB?_TeIPeIhDgGrFyHu@uE}DyZyRmFbA{VjK}MPd@rHkAfItEfQaF`HoBzSwL|Ke@|LmDrA}B|D{DfBwJsHgGcOwJiKwJ{Q}IuIoDlD{MuGiE{KaMiReIqGmZ{ZqKsHeP~MqKb@gt@|\\zMla@h^nVsGbO_QzY{MtX?xh@gEbOwJjS_JbO}IjSuC`O{FtGwJ?aq@c{@uaBqpA{B|LuNvXwn@mc@wJaOiAwIcB}KiL}L?uHsGuIyF}ZrGmE?sHiEcPmVfC}TzJyXvXeIpGyFfRaFb@cBxKqGnT|Ih`@sGb_@xF|Lq@lTvJzKnDrUh^|\\lDtG{BfRYzZcB`NaFxZmO|ZgLnF_JtHuCtIjSjStJ|LkOrGfEhRhLjSp@xJaXxXjAxJcMfDq@bNoKhDgEvIkH?sGtHaFgB_Xvg@mHpG}P`NmObOaF|M{BlEtU`O{Flb@nDlEtCzZjAxYuCfQYzYjZsG|IdO?nUhLfRhLvXhLrd@`M|LjH~MhLd`@nVbOfErHbB|KbB|j@dItHxXppAcMtWnD|L|ItHjSfRrYxIlVnUbBbOzFz[cBd^fE`OtCtWtUjb@z_@vrAfEfD|B`NkAjRnDxYnKlc@lH|[|IvW?fQnDxK}TfCePlDoVc@{MxJ}f@fC_QfQqRtHwJpFiLnFsNbAuCvJ_JjDcThBcIfCsY?oKtI{MiCgPlDgp@hCcx@sGov@c@qRtVaMtIwJ?qGxJsYrWcI?qRtH{MbAoRfQsN_@gEuGjHia@hA}LuCcPvQkRyFoVW}KuUoc@p@}M?}KgEa]qR}M_FbBiLfB}PoTkA{KgEsH?gQcBwYwQkSbB}K_F{KkSpFePpHcB_NgEkDwXiDyFoToKsHiSyJkAcOp@wJ{BwIoD}L_F{KsGyYtCePnDuIbB}LY_NcImb@uCoTwJqs@_FoFzB{KuJpGuJeB{MtIaMlD__@pHkHgCaMjDiAyKsNyJYmEmDkRcTyKXoFhZ{KtC_MfEiR~WmEhAmEyF{YiHkSePoGfE_MkHsVp@uHoK{j@q@e^nRkTvJlEpGnGhSwYbBmp@gEmEhAoGqGyJoDal@gEuHaT}K`Ma^oKa^gLsVmOgB}W{h@aMm`AzB}LePuf@xXsG`m@dA|IoFdWoc@x_@bAhSuu@_j@}ZgLmc@qG?kZsf@{B{g@zB}MqGkSbBwf@aFqG`FaNaFcB{BuWp@{YcB_Np@}KkH}LwQ{KgEsHymAwIq`@zK}iB`OkVkSwQmE_XjS_F?";
	var eh_levels = "PFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFEKAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFEKEDGFCFFDDFJEEDIGGJGEIFGCDGFFGIGGGKFGHEFEFDFHGMFFFJGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJDDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFJEGEFDEEIGCEEGGLDFEHECIDEHHEGBHDHFEGEEKFEFEAGEIDGHCEGCOEDBFECEHCEGDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFEBFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMFFFEGGFJEEFEFCDGEEECAEGDFEBCHEECDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFKDHBDFGFFJDF@GEBEIFEHFDEHFDFMEHDDEFHEACDHCDFDEIEGGDFFIFDFHEGEEEEHBEGECJDFDFDECAGEF?GFBHCCJ@GDFIDDHDEHEDFFIFDEEFHDKEAFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF@EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGBEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDMEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEE@DEBEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFEGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCDGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEECHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDEACEDLCEEEGECAEEEFCDEHEDEDHEEEDGDDFEPECEFGDEFBDIFBFHDECFEEHCGFDFFCICE@CCFCCDGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDJBBBAECBBACB?FCD@CBD@@CBABBFACHBDCE?D?BBCADBDIABCGDB?BBDBB@DBDGDEBBKDFCDFCCFCCEEBFEHGGGIFEDEDFEFDHECDFAFKDECGGBDICDDECGBEGDC@BC@DAFCDK@DDCDCCEDBGCCDBFCCDDFDGECCCED@?ECCAEBCHCDABDDFBCBDFDCFBCDCBDDGCDEEDHCCDECDECEDDGD?EEFBCCFDDBDCBF?CBDFEIEAFHBEBDCAAGC@FBECCFCDBBGAA?DBH@ADFBCF?CDGD@BBABECDAGDBCE@CEBLCEBDBDFACEBBBBDCDBBECFCBDCBDCDBCFDCBGBBBCECABCFBAAFCECF@DAHCEF?BBD@FED@DFBBBDACDEBCEGCACBDCEDDCBFBEBBD@FBBBBDCCCGCCECADCFDADFCABECAEBDB@EBCBCCCCEBC@FE@CBBDBGCBDBC@CECDECCABECCBDCFCBCEACJCDCFCCCECDDGBBDBDDDCCDCDBCGDECBF?BCHBCFCC?CEB@F?CDCCHABDDCACDFBCE@CDBCGDBDDDADKCCACBGBDCEBCEDCDGCD@E@DEDBECDICDCCCCFBCBDBECCDADGDBEBDEBEEDGCCFDCFACFHBEDDECADGCBBCCCDBDDCADCFDCECCAFCBI@CEDEB@CECBFCCGCAEBCFBDDBBDE@BDCDGAFCFBDDCDHDDBGFDHCECDGDECDDAGB@CEDGD?AFAAEKCECACHC??ECHDEEBFDBEGDGHDEBDDCDDDC@GDEAFDCEGDBECCGBCCJCCCCDCCDAHACD@CBACCCBFD@DBBCECAHBFCF@FDDDFDCDDKCDBCDHBBDFEBHDCECFCDBFBDBBBECBBIB?DDBDCDBACCECAABECCCCCDAHCCEBDBBFCCCFBBDBADBGCECC@EGDCDAE@ADHCDCFDAACEBBCGBC?CBEBDCDDICFCCEEGACDBDEBBECCCDGCADBACHCECADABCDFBCEBDEBEDBCECDCDDCFBDDCCDCDCICBDCEBB@ECDCF@CDCGCDDGBCFHDCDCDFAECDDFCBHBBCBDAACFCACEBCBFCDBCBFDFDCCDDC?CEDECBCBCEDBDCDCBCBCICCADDFABDBCD@DCDCADDCBADCBEBDDCBBFDCBBDC@BCDDCFCDCCCBCCABADAGABBBCCACCACECAEBCDACACACCDBEAB@EBH?ECGEFBCCHDCCACCCGEECADECCCECBGCEBCEBEECCACBCBBDBCADB@ICBCBCBACE@@AA@DBBBDAAHBCECDCCCCBEBCH@EBCDBCBBBDBCB@EDBBBGCBDAADBEBBBCFAC@DBEAAABAD@H@@D?CEDB@FA@DB?CAEKCBC?GCBCAEDCE@AD?FBDACDCCCHBBCACADADC@CDDCBACDACBBEBB@@BGAEDCFADABAABCDCFACCEBBADAE@DCGAC@DCACDAEBDAC?BDADABAC?BB@CHA@?BCCAF?AABCEBBCBDEFDDCFA?CCBBGADDEBCFCCFADBHABCCB@CCACB@H@AD?BCDAA@BHCDCEDBIDFCEDCGCFEECGDDCFCGFBCDAECCDBEBBCA@CBDGBDCCCEHBBACBDBCACAAEAB?C@GCBBD?CCBEABBCBCF@ACEAC?DABCADBBEBADCBCDHBEDFDECDBADDCJCBBAADA?DBBFCDCADFCHBFDFC@GBDFDDECAEAAHCAFBEAEBCBG@ECDDICACCEBCAGCB?CAADBBDCDBFCA@CC@CCBGBD@BAHAB@BCACAGDDEC?BDAAADCFCCCBDHBCCDCBBFDCCAAF?BBACB?BCGADACCDCBAACBBDC@BFBECECACFMDF@C@CHBE@GCCE@DCBCCCDCADFDCBECBBECBBCADBCCECBBACEDAB@CEBDHABEBCCBBFBBCBCBCECADCDBBBCCDDCDBCBB@BBAFCBBBBDBBCBCCBDCAB@GCECDCGAB@BBADCAEDBBEABDDEACBDBBBDBBBBCBBG@BCBBFBCDCCFCBCCCBCDCDFCDCEBCCBDCCBBAICBCCBDBBCDBBBBCF@DABCDCCCFCCDAECCBDBBBDBBDBBG@CBBDCBFBCDFBCACBBHADABCBCBCDCAFC@CGCCBADDDDBBBFBBCBIDEADHCCEACCDBBBGCCB@ECCDHBBBBFACBDCCBAE?C@EHDFACEDBAACDHBDBBDECCECDCACCBGB@CCBABCCABGBDCCCDADDFCDAACBFCDACCDEBDDCADBCJB@ADBCEDDEDBDCFDBBADBDBDACFC?H@ECDAECDBFB@DDABDCFDECCBDCCCBCBDBCBHBBECDFCEBBCBFBD@EBC?@DCBD?HDEEFDEIEDDFEBCGEEDCCGBD?BDDJBDCBDGECBAFBDCAADCCFDBBDCHCBCCCGDBBDDDCFDCCCCEBFBBBDDDJBCBB@BBA@FACB?CCECBECDCCECCBBCABABBEDBCDDCBBBDBEBBEDBCCCCAACECCHEBBDBDBDCBECBCCCCCDEDCACDCCDBDFBBCBDACFCBDCDDHCEBDDDCEDCDCDBGDDCBBCBDCGCCDCCBDCDBCDFBBDBDBDAEBDDCDCDABFCDDBCAECACCDCCCBHDCFBAECCBDDGCCECDDCEDDECDDAEFCDDCCEDDBEDCDDCGBBCDBCCDD?CBE@ECDDADCCECDFCDCBECEBDCBBBDCFBDDBDDEBACCECBDCCEDCDFADBBBBADBACAACCBAEBEBDBCGBDBDCCDEA@DDCCCACBCJCDCBADCDCDBGFFDBGCJ@BBBEDCBCCECHCEBDCEAFCCDCCDFDBDCCFBBDBCGBDBBDBBCFBBDF@DC?BEDB@DGDCDCDDCAEABC?HDCFAB@DCCBFCCBEDDAACEBDCDBACECFBBDDCCCFCCDEDBDBCEACDCECCCBFDCCCBDABDCBIBCDCDB@CHAEBDEFCCFCB@HCBCFCDDFABCBBBECDDCDDCDKC@BDGCACECGCADBBECBBDBDAHD?CCADDBCDBBDCHBBCCDABEBCDCABCAECBBCDACCBCAEHCDADDAFBADDECADAGCDABACABCDCACDFBEBDCG?DBDDBCECCDCDACCEB?D@CBFDADCBEBBCBAC@BFADDBDBDCCDDCDADAICCDCE@CBECBCABEABBEBCECBBECCBCCCBCEACEBDCAEBCCEADDAAECCCBHCDCECGBDCEDBCCCECHBDCEDBCDABCCBCGCCCCCCBDBDBBBDADBGABDCFBCECDBGBBDEBC@BHA?BCCBB@CDBBDBBBADBB@DADABCAECACCCC?DACBEBCADDICFCBGACGEHLBECAACECDBDA@HAFDFFEICFEFGBGBEIDCFCAIADBBEJDFDFHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEHFFNEDECCBC@E@FACECDFEFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFMGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEIP";
	var eh_levels_kosta_gabe ="PBCECDBD@AGAFDFFEICFEFGBGBEIDCFCAIADBBEDJDDEHBFEEEIADFCEBDJEBEFDAHDEDGBDFDCDBIECGD@GEAEFCFIDCGDCFBHFBCEJDCGAHCCEGEGIEEGFFCLDECCBC@E@FACFCDEGFFGDHDHFJCHGDGGIFHCJIGECI@HBHFGKFGBFGIDFHGBGEBJFHGHGFGEJEEGGFOGGHIJGEDFGCGEEBFGGIFHFDLHEFFJEGHIEBDGEFKHEJJKFFGCEIGFFGDKEEGFIFHGFFIAFFGEHFFHFIEFGFELAGFGIEEIIFGFGEDIFGEGF?FEDEJFGHFGEGIFFKEDGFCFFDDFKEEDIGGJGEIFGCDGFFGIGGGJFGFHFEFDFGJFFMFHGHFHEJEDHEGEHDEJGEFFJEHFHEDFGJDACGGFEGDJEDCIEFGGGFFCLDGDDEGCIEFFDGEGDEFFGJBFECICGEFIEGEFDEEIGCEELGGDFEGECGDEGIEGBHDHFEGEEPFEFEAGEIDHGCEICEEDBJECEECEHDBDEHEDEDDCBFCDIBGDEFHEE@EDDIBDDFECFECDAEDDFADECDHCDDE@FADDFDFGBJEDCFCDDHEDFEBCIDFBEEHDDBHEFEEIEDEEEHAEEHEHEG@EEEFEGEGDMEFFEGGFJEEFEFCDGEEECAEGDFEBCHEEDDGKDHGGEIFFFHIGFKEB@EDJEHCFIGMEGECCFEIDFFEGIECEEFFBDGEGHDFHEEHFFEGCGCAIEGAFDIDFHAEFEEEIE@FDEDDFHCFJDHBDFGFFJDF@GEBEIFEHFDEHFDFIEHEDDFHEACDHCDFDEIEGGDFFLFDHFEFEEEGFBEHECFIFDFDEBAGEFGFBHCCK?GDFIDDHDEHEDFFIFDEEFHDKEBFFCDFDEGEEHFEGEBHEDEHEFEGEJEGEHEEFHCDGIDBBHEEGDIEFEEGBJBHGAGCIDDFEF?EICHAFHCJFEDEEHCGDFHEFEHDFDFEIEEJFDGFDHCBGHD@CCBEJEGEDFDFHEFKEEGCDDIGCEJDCCHECFEIFEHEHFCHFJFDHEFFFDHD@EEI?GDEBHEGFCLEFCEEEHAEGDIEFCFJEGCDEKFHFEFDKEEECDHFDEFEEHGDDGEKEHGDEGIFFHFHFECEHFEGELEEGDDGCEIDCEIDHEGFBJFDFIEFHDAFEICDGCEGECAEEJEDCGEGDGEFGCCHEKEAFBG?HEGEIDFCCCEDEHDJCGEHDEEHGFHEFGFIGAIFEGEGFJDHEDEEHFHFDGAHEECGDEEDNEGEDCFDCJGBECECEJGFFEEDFFGDDHFGFGGGFFELGFGFIFGFEFEIDGCFJGBFGIIKEEFEEFGECDIHHMIEEGAFGHDJEFFCCDEDGDFBGCFCDEDFBCDDFCGFDDCDI?DDIDDBDFCDHDFCDHEGH@CFBEEKCDCFDCDFDCFBDDDDECDIEFFEDHFGGDFMCEEADEAEECCDGDBAEDE@DCDHCEFEDEGDCFDDFDDCEDDEIDDDGFCDDHCDFDDDFDEDECDDGEDEJCDBFBBHDFHFFGDI@EBEECCFCCCLDFEGDFHCDBCEDDJFHDEFEDCDDCGDGDCGDBEIEGCEGDEEECCJDDCFEEFCEBCJEEHFHBCFFDBBDDJEFHDHHE@DDDFEFDIDFBEELCFFEEHEEDHCDAGECEHBGGDDIFEEFEEDEFEABEBIGEECFDJGEECEFDEFDHCFEFFHAEEHBEECFEDGDDE@CEDLCEEEGEBAEEFCCEEHEDEDHEEEDFDDFMEGCEFGDEFBDIFBFHDECFEEHCGFDFFCHCE@CCFCCEGC?EEIDEEBEEHEEBFJEF?FEHCFGEDDEHGCGFIDEEFDGFGFEFEEJEGDGHIFFEHDEEEEEEECDKDDGHEGEGDP";

	// Google maps-en APIaren 3. bertsioan erabili ahal izateko deskodetu beharra dago
	var decodedPath = google.maps.geometry.encoding.decodePath(eh_points);
	var decodedPath_kosta_gabe = google.maps.geometry.encoding.decodePath(eh_points_kosta_gabe);
	var decodedLevels = decodeLevels(eh_levels);
	var decodedLevels_kosta_gabe = decodeLevels(eh_levels_kosta_gabe);
	
	var eh_polygon;
	var eh_polyline;
	
	function decodeLevels(encodedLevelsString) {
		var decodedLevels = [];
	    
		for (var i = 0; i < encodedLevelsString.length; ++i) {
		    var level = encodedLevelsString.charCodeAt(i) - 63;
		    decodedLevels.push(level);
		}
		return decodedLevels;
	}
	
	function init_polygons(map) {
		eh_polygon = new google.maps.Polygon({
		path: decodedPath,
		levels: decodedLevels,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function init_polylines(map) {
		eh_polyline = new google.maps.Polyline({
		path: decodedPath_kosta_gabe,
		levels: decodedLevels_kosta_gabe,
		strokeColor: "#0000ff",
		strokeOpacity: 1.0,
		strokeWeight: 2,
		//fillColor: "#0000ff",
		//fillOpacity: 0.15,
		fillOpacity: 0,
		map: map
		});
	};
	
	function bistaratuEH(map) {
		//alert("zoom-maila: " + map.getZoom());

		var zoomLevel =  map.getZoom();
		
		if (zoomLevel <= 13) {
			// Zoom maila txikia: EHren mugak osorik bistaratu
			if (eh_polygon) {
				eh_polygon.setVisible(true);
			} else {
				init_polygons(map);
			}
			
			if (eh_polyline) {
				eh_polyline.setVisible(false);
			}
		} else {
			// Zoom maila handia: EHren kosta ez bistaratu
			if (eh_polyline) {
				eh_polyline.setVisible(true);
			} else {
				init_polylines(map);
			}
			
			if (eh_polygon) {
				eh_polygon.setVisible(false);
			}
		}
	}

	function gehituInfoWindow(markatzailea, mezua) {
        var info = mezua;

        var infoWindow = new google.maps.InfoWindow({
            content: mezua
        });

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, markatzailea);
        });
    }
	
	var kategoriak_ikonoak = {
			/*'1': '../ikonoak/48-fork-and-knife.png' // Jatetxeak 
			'9': // Txakolindegiak
			'10': // Parrandarako lekuak
			'11': // Kultur guneak
			'7': // Tabernak
			'8': // Sagardotegiak
			'12': // Dendak
			'21': // Upategiak
			'14': // Ikusi beharrekoa
			'20': // Bainuetxeak
			'16': // Hotelak
			'17': // Ostatuak
			'18': // Kanpingak
			'19': // Inguruan egiteko planak*/
	}
	
    // Herrian gomendiorik ez badago (edo bakarra badago) baina datu-basean herriaren lat eta lng-rik ez badago????
	
	// Gomendio bakarra badago -> herriaren zoom maila erabili, bestela zoom mailarik altuena agertzen da.
	// Arazoa: Andoain-en gomendio bakarra dago Leitzaran. Herriaren erdigunetik urrun samar dago eta ez da agertzen zoom maila horretan. Zer egin? 
	if (len == 1) {
		// Herriaren posizioaren longitudea eta latitudea erabiliz
		var latLng = new google.maps.LatLng(lat, lng);
		
		// Bistaratuko dugun maparen ezaugarriak
		var mapOptions = {
			center: latLng,
			panControl: false,
			zoomControl: true,
			zoom: zoom_maila,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};
		
	    // Mapa bistaratu
		var map = new google.maps.Map(
			document.getElementById(id),
			mapOptions
		);
		
	    for (var i = 0; i < len; i++){
	        console.log("ID = " + results.rows.item(i).id + " Izena = " + results.rows.item(i).izena + "");
	        
	        console.log(kategoriak_ikonoak[results.rows.item(i).fk_azpiatala]);
	        
	        var marker = new google.maps.Marker({
	        	position: new google.maps.LatLng(results.rows.item(i).gmaps_lat, results.rows.item(i).gmaps_lng),
	        	map: map,
	        	icon: kategoriak_ikonoak[results.rows.item(i).fk_azpiatala]
	        });
	        
	        // infoWindow-an bistaratuko dugun katea
	        var katea = '<p>' + results.rows.item(i).izena + '</p><button onclick="bistaratuGomendioa(' + results.rows.item(i).id + ', ' + results.rows.item(i).gmaps_lat + ', ' + results.rows.item(i).gmaps_lng + ')">Ikusi xehetasunak</button>';

	        // Irudirik badago infoWindow-ari gehitu
	        if (results.rows.item(i).irudia) {
	        	// Irudia ez bada aplikazioak jatorriz dakartzanetakoa
	        	if (results.rows.item(i).irudiaren_bidea) {
	        		katea = '<img src="' + results.rows.item(i).irudiaren_bidea + "/" + results.rows.item(i).irudia + '">' + katea;
	        	} else { // Jatorrizko irudi bat bada berriz
	        		katea = '<img src="' + '../irudiak/' + results.rows.item(i).irudia + '">' + katea;
	        	}
	        }
	        
	        gehituInfoWindow(marker, katea);
	    }
	} else if (len > 0) { // Herrian gomendio bat baino gehiago badaude
		// Bistaratuko dugun maparen ezaugarriak
		var mapOptions = {
			panControl: false,
			zoomControl: true,
			mapTypeId: google.maps.MapTypeId.SATELLITE
		};
		
	    // Mapa bistaratu
		var map = new google.maps.Map(
			document.getElementById(id),
			mapOptions
		);
		
		// Gomendio guztiak mapan ager daitezen erabiliko dugu hau:
		var bounds = new google.maps.LatLngBounds();
		
		var gomendioaLatLng;
		
	    for (var i = 0; i < len; i++){
	        console.log("ID = " + results.rows.item(i).id + " Izena = " + results.rows.item(i).izena + "");
	        
	        console.log(kategoriak_ikonoak[results.rows.item(i).fk_azpiatala]);
	        
	        gomendioaLatLng = new google.maps.LatLng(results.rows.item(i).gmaps_lat, results.rows.item(i).gmaps_lng);
	        
	        // Gomendioaren lat eta lng gorde, gero mugak ezartzeko.
	        bounds.extend(gomendioaLatLng);
	        
	        var marker = new google.maps.Marker({
	        	position: gomendioaLatLng,
	        	map: map,
	        	icon: kategoriak_ikonoak[results.rows.item(i).fk_azpiatala]
	        });
	        
	        // infoWindow-an bistaratuko dugun katea
	        var katea = '<p>' + results.rows.item(i).izena + '</p><button onclick="bistaratuGomendioa(' + results.rows.item(i).id + ', ' + results.rows.item(i).gmaps_lat + ', ' + results.rows.item(i).gmaps_lng + ')">Ikusi xehetasunak</button>';

	        // Irudirik badago infoWindow-ari gehitu
	        if (results.rows.item(i).irudia) {
	        	// Irudia ez bada aplikazioak jatorriz dakartzanetakoa
	        	if (results.rows.item(i).irudiaren_bidea) {
	        		katea = '<img src="' + results.rows.item(i).irudiaren_bidea + "/" + results.rows.item(i).irudia + '">' + katea;
	        	} else { // Jatorrizko irudi bat bada berriz
	        		katea = '<img src="' + '../irudiak/' + results.rows.item(i).irudia + '">' + katea;
	        	}
	        }
	        
	        gehituInfoWindow(marker, katea);
	    }
	    
	    // Maparen mugak ezarri gomendio guztiak ager daitezen
	    map.fitBounds (bounds);
	    
	} else { // Gomendiorik ez badago berriz 
		// Herriaren posizioaren longitudea eta latitudea erabiliz
		var latLng = new google.maps.LatLng(lat, lng);
		
        // Bistaratuko dugun maparen ezaugarriak
        var mapOptions = {
        		center: latLng,
                panControl: false,
                zoomControl: true,
                zoom: zoom_maila,
                mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        // Mapa bistaratu
		var map = new google.maps.Map(
			document.getElementById(id),
			mapOptions
		);
		
        var marker = new google.maps.Marker({
        	position: new google.maps.LatLng(latLng),
        	map: map
        });
        
        // infoWindow-an bistaratuko dugun katea
        var katea = '<p>Ez dago herri honetarako proposamenik oraindik.</p><button onclick="bistaratuGomendiorikEzDago()">Proposatu zerbait</button>';
        
        gehituInfoWindow(marker, katea); // infoWindow-a ez da agertzen. Zergatik???
	} 
   
	// Erabiltzaileak zoom maila aldatzen duenean EHren mugak egokitu (zoom maila txikia -> muga osoa, maila handia -> kostarik gabe)
	google.maps.event.addListener(map, 'zoom_changed', function() {
		bistaratuEH(map);
	})
		
	// Kargatzen ari dela adierazten duen ikurra ezkutatu
	$.mobile.loading('hide');
}

function eskuratuXehetasunak(tx, id) {
	tx.executeSql('SELECT herriak_elementuak.id as id, herriak_elementuak.izena as izena, herriak_elementuak.url as url, herriak_elementuak.irudia as irudia, herriak_elementuak.irudiaren_bidea as irudiaren_bidea, herriak_elementuak.deskribapena as deskribapena, herriak_elementuak_botoak.boto_pos as boto_pos, herriak_elementuak_botoak.boto_neg, herriak.izena as herria_izena, lurraldeak.izena as lurraldea_izena FROM herriak_elementuak, herriak_elementuak_botoak, herriak, lurraldeak WHERE herriak_elementuak.id=' + id + ' AND herriak_elementuak.id = herriak_elementuak_botoak.id_elementua AND herriak.fk_lurraldea = lurraldeak.id AND herriak_elementuak.fk_herria = herriak.id', [], eskuratuXehetasunakArrakasta, function(tx, err){errorCB(tx, err, "eskuratuXehetasunak-exec")});
}

// Gomendio baten datuak datu-base lokaletik behar bezala irakurtzen direnean exekutatzen da
function eskuratuXehetasunakArrakasta(tx, results) {
    var len = results.rows.length;
    console.log("Gomendioak: " + len + " errenkada.");
    
    var irudia_src;
    
    for (var i=0; i<len; i++){
        console.log("ID = " + results.rows.item(i).id + " Izena = " + results.rows.item(i).izena);
        $("#xehetasunak-h1").text(results.rows.item(i).izena);
        $("#xehetasunak-izenburua").text(results.rows.item(i).izena);
        
        // Gomendioaren herria eta lurraldea
        $("#xehetasunak-herria").text(results.rows.item(i).herria_izena + " (" + results.rows.item(i).lurraldea_izena + ")");
        
        irudia_src = results.rows.item(i).irudia;
        
        //eskuratuIrudiarenAltueraZabalera(irudien_bide_erlatiboa + irudia_src);
        
        // Irudiaren span-a garbitu
        $("#xehetasunak-irudia-div").empty();
        
        // Irudirik ez badago Ihesi-ren logoa erakutsi
        /*if (!irudia_src) {
        	irudia_src = "../ikonoak/argazkirik_gabe.png";
        }*/
        
        // Irudia badago erakutsi bestela ez
        if (irudia_src) {
        	// Irudia ez bada aplikazioak jatorriz dakartzanetakoa
        	if (results.rows.item(i).irudiaren_bidea) {
        		$("#xehetasunak-irudia-div").append('<img id="xehetasunak-irudia" src="' + results.rows.item(i).irudiaren_bidea + "/" + irudia_src + '">');
        	} else { // Jatorrizko irudi bat bada berriz
        		$("#xehetasunak-irudia-div").append('<img id="xehetasunak-irudia" src="' + irudien_bide_erlatiboa + irudia_src + '">');
        	}
        }
        
        console.log("ID = " + results.rows.item(i).id + " Deskribapena = " + results.rows.item(i).deskribapena);
        
        $("#xehetasunak-deskribapena").text(results.rows.item(i).deskribapena);
        
        // Aurreko botoia ezabatu
        $("#xehetasunak-url").empty();
        
        // Behar izanez gero berria gehitu
        if (results.rows.item(i).url != "") {
        	$("#xehetasunak-url").append('<a id="xehetasunak-url-botoia" class="external" data-role="button" href="' + gehituHTTP(results.rows.item(i).url) + '">Webgunea</a>');
        	$("#xehetasunak-url-botoia").button();
        }
        
        $("#xehetasunak-bozka-pos .ui-btn-text").text(results.rows.item(i).boto_pos);
        
        $("#xehetasunak-bozka-neg .ui-btn-text").text(results.rows.item(i).boto_neg);
    }
}

function itzuliHerriaId(tx, izena) {
	tx.executeSql('SELECT id, argazkia, gmaps_zoom FROM herriak WHERE izena="' + izena + '"', [], function(tx, results) {itzuliHerriaIdArrakasta(tx, results, izena)}, function(tx, err){errorCB(tx, err, "itzuliHerriaId-exec")});
}

function itzuliHerriaIdArrakasta(tx, results, izena) {
	var len = results.rows.length;
	
	if (len == 0) {
		// Herria ez dago herriak taulan, herriak_itzulpenak taulan dagoen begiratuko dugu.
		// Baliteke gmaps-ek itzulitako izena eta gure datu-basekoa desberdinak izatea (adb: Donostia -> Donostia-San Sebastián)
		itzuliHerriaIdPorrota(tx, izena);
		
	} else {
		// Herria datu basean dago, bere id-a gordeko dugu idUnekoHerria aldagai globalean.
	    console.log("Herria table: " + len + " errenkada.");
	    for (var i=0; i<len; i++){
	        console.log("ID = " + results.rows.item(i).id + " izena: " + results.rows.item(i).izena);
	        
	        // Herriaren id-a idUnekoHerria aldagai globalean gorde
	        idUnekoHerria = results.rows.item(i).id;
	        
	        // Zuzendutako herriaren izena bistaratu
	        $("#sarrera-irudia-testua-lerroa-span").text(unekoHerria + ' (' + unekoLurraldea + ')');
	        
	        // Herriari dagokion gmaps-eko zoom-a gorde
	        unekoHerriaZoom = results.rows.item(i).gmaps_zoom;
	        
	        // Herriari dagokion irudia erakutsi.
	        // Arazoak izan ditut argazkien bidearekin. Aplikazioa lehen aldiz irekitzean geokokapen bidez lortutako
	        // herriaren argazkia ondo erakusten zuen baina 'Hautatu kokapena' orritik itzultzean ez.
	        // Zergatia erabat ulertu ez badut ere horrela funtzionatzen du.
	        if (geokokatzetik) { // hautatu-kokapena.html orrian momentuko kokapena ezartzeko eskatu du erabiltzaileak
	        	$("#sarrera-irudia").attr("src", "../irudiak/herriak/" + results.rows.item(i).argazkia);
	        	geokokatzetik = false;
	        } else { // Aplikazioa ireki berri dugu eta index.html agertzen den lehen aldia da
	        	$("#sarrera-irudia").attr("src", "irudiak/herriak/" + results.rows.item(i).argazkia);
	        }
	        
	        // Sarrerako botoiak gaitu
	        gaituSarrerakoBotoiak();
	    }
	}
}

function itzuliHerriaIdPorrota(tx, izena) {
	// Google maps-ek itzulitako herriaren izena ez dator bat gure datu-basean dauden herrien izenekin. Gerta liteke beste izen batekin egotea, adibidez, Donostia -> Donostia-San Sebastián,
	// egiaztatzeko itzulpen taulan begiratuko dugu.
	tx.executeSql('SELECT herriak_itzulpena.fk_idherria as fk_idherria, herriak.izena as gure_izena, herriak.argazkia as argazkia, herriak.gmaps_zoom as gmaps_zoom FROM herriak_itzulpena, herriak WHERE herriak_itzulpena.gmaps_izena="' + izena + '" AND herriak_itzulpena.fk_idherria = herriak.id', [], function(tx, results) {itzuliHerriaIdPorrotaArrakasta(tx, results, izena)}, function(tx, err){errorCB(tx, err, "itzuliHerriaIdPorrota-exec")});
}

function itzuliHerriaIdPorrotaArrakasta(tx, results, izena) {
	var len = results.rows.length;
	
	if (len == 0) {
		// Herriaren izena ez dator bat gure datu-baseko herrien izenekin eta ezta itzulpen-taulan dauden izenekin ere.
		// Erabiltzaileari jakinarazi behar zaio.
		console.log(izena + " ez dago Ihesiren datu-basean. Herrien zerrenda bat agertuko zaizu orain, bat aukera dezazun.");
		
		navigator.notification.alert(
			izena + " ez dago Ihesiren datu-basean. Herrien zerrenda bat agertuko zaizu orain, bat aukera dezazun.", // mezua
		    undefined,         							// atzera-deia
		    'Oharra',            						// izenburua
		    'Ados'                 	 					// botoiaren testua
		);
		
		$.mobile.changePage("html/hautatu-kokapena.html");
		
	} else {
		// Herriaren izena gure itzulpen-taulan dago, bere id-a idUnekoHerria aldagai globalean gordeko dugu.
	    console.log("Herria table: " + len + " errenkada.");
	    for (var i=0; i<len; i++){
	        console.log("fk_idherria = " + results.rows.item(i).fk_idherria);
	        idUnekoHerria = results.rows.item(i).fk_idherria;
	        
	        // Gure datu-basean herriak duen izena gorde unekoHerria aldagai globalean
	        unekoHerria = results.rows.item(i).gure_izena;
	        
	        // Herriari dagokion gmaps-eko zoom-a gorde
	        unekoHerriaZoom = results.rows.item(i).gmaps_zoom;
	        
	        // Zuzendutako herriaren izena bistaratu
	        $("#sarrera-irudia-testua-lerroa-span").text(unekoHerria + ' (' + unekoLurraldea + ')');
	        
	        // Herriari dagokion irudia erakutsi.
	        // Arazoak izan ditut argazkien bidearekin. Aplikazioa lehen aldiz irekitzean geokokapen bidez lortutako
	        // herriaren argazkia ondo erakusten zuen baina 'Hautatu kokapena' orritik itzultzean ez.
	        // Zergatia erabat ulertu ez badut ere horrela funtzionatzen du.
	        if (geokokatzetik) { // hautatu-kokapena.html orrian momentuko kokapena ezartzeko eskatu du erabiltzaileak
	        	$("#sarrera-irudia").attr("src", "../irudiak/herriak/" + results.rows.item(i).argazkia);
	        	geokokatzetik = false;
	        } else { // Aplikazioa ireki berri dugu eta index.html agertzen den lehen aldia da
	        	$("#sarrera-irudia").attr("src", "irudiak/herriak/" + results.rows.item(i).argazkia);
	        }
	        
	        // Sarrerako orriko botoiak gaitu
	        gaituSarrerakoBotoiak();
	    }
	}
}

function bistaratuHerriak(tx, idLurraldea) {
	// Lurralde guztietako herriak erakutsi
	if (idLurraldea == "" || idLurraldea == undefined) {
		tx.executeSql('SELECT * FROM herriak ORDER BY izena', [], bistaratuHerriakArrakasta, function(tx, err){errorCB(tx, err, "bistaratuHerriak-exec")});
	} else { // Lurralde jakin bateko herriak bakarrik erakutsi
		tx.executeSql('SELECT * FROM herriak WHERE fk_lurraldea = ' + idLurraldea + ' ORDER BY izena', [], bistaratuHerriakArrakasta, function(tx, err){errorCB(tx, err, "bistaratuHerriak-exec")});
	}
}

function bistaratuHerriakArrakasta(tx, results) {
	var len = results.rows.length;
    console.log("Herriak: " + len + " errenkada.");
    
    for (var i = 0; i < len; i++){
        console.log("ID = " + results.rows.item(i).id + " Izena = " + results.rows.item(i).izena + "");
                
        $("#ui-ul-herriak").append('<li data-corners="false" data-id-herria="' + results.rows.item(i).id + '" data-gmaps_lat="' + results.rows.item(i).gmaps_lat + '" data-gmaps_lng="' + results.rows.item(i).gmaps_lng + '" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" data-theme="d" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d ui-li-herria"><div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a href="../index.html" class="ui-link-inherit">' + results.rows.item(i).izena + '</a></div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></div></li>');
    }
    
    $("#ui-ul-herriak").listview("refresh");
    
    // Mezua ezkutatu
    $.mobile.loading('hide');
}



// Uneko posiziotik hurbil dauden elementuak bistaratzen ditu.
// zein parametroak bi balio onartzen ditu:
// 		* "gertukoak" katea pasatzen bazaio gertuen dauden lekuak bistaratzen ditu.
// 		* "bozkatuenak" katea pasatzen bazaio lekurik bozkatuenak bistaratzen ditu.
// idKategoria pasatzen bazaio Kategoria jakin bateko elementuak soilik bistaratzen ditu.
function bistaratuElementuak(tx, zein, idKategoria) {
	if (zein == "gertukoenak") {
		// zein == "gertukoenak" bada erabiltzailetik gertuen dauden lekuak bilatu datu-basean.
		// idKategoria zehaztu bada, kategoria horretako elementuak bakarrik bistaratuko ditugu, bestela kategoria guztietakoak.
		// SQLitek ez ditu funtzio trigonometrikoak onartzen eta beraz gutxigorabeherako distantziak erabiltzen ditugu. Gero kalkulatuko ditugu distantzia zehatzagoak.
		// Honetan oinarritu naiz:
		// http://goodenoughpractices.blogspot.com.es/2011/08/query-by-proximity-in-android.html
		// http://en.wikipedia.org/wiki/Taxicab_geometry
		if (!idKategoria) {
			tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.id as idHerria, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.irudiaren_bidea as irudiaren_bidea, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, (abs(herriak_elementuak.gmaps_lat - ' + unekoLatitudea + ') + abs(herriak_elementuak.gmaps_lng - ' + unekoLongitudea + ')) as distantzia, (herriak_elementuak_botoak.boto_pos - herriak_elementuak_botoak.boto_neg) as puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = herriak_elementuak_botoak.id_elementua ORDER BY distantzia LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
		} else {
			tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.id as idHerria, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.irudiaren_bidea as irudiaren_bidea, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, (abs(herriak_elementuak.gmaps_lat - ' + unekoLatitudea + ') + abs(herriak_elementuak.gmaps_lng - ' + unekoLongitudea + ')) as distantzia, (herriak_elementuak_botoak.boto_pos - herriak_elementuak_botoak.boto_neg) as puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = herriak_elementuak_botoak.id_elementua AND fk_azpiatala = ' + idKategoria + ' ORDER BY distantzia LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein, idKategoria)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
		}
	} else if (zein == "bozkatuenak") {
		// zein == "bozkatuenak bada lekurik bozkatuenak bistaratuko ditugu.
		// Kasu honetan ere idKategoria zehaztu bada, kategoria horretako elementuak bakarrik bistaratuko ditugu, bestela kategoria guztietakoak.
		if (!idKategoria) {
			// EHko guztiak
			//tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, herriak_elementuak_botoak.puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = fk_elementua ORDER BY herriak_elementuak_botoak.puntuazioa DESC LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
			
			// Erabiltzailetik gertu (distantzia < ~40-50km) daudenen artean bozkatuenak
			tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.id as idHerria, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.irudiaren_bidea as irudiaren_bidea, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, abs(herriak_elementuak.gmaps_lat - ' + unekoLatitudea + ') as distantzia_y, abs(herriak_elementuak.gmaps_lng - ' + unekoLongitudea + ') as distantzia_x, (herriak_elementuak_botoak.boto_pos - herriak_elementuak_botoak.boto_neg) as puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = herriak_elementuak_botoak.id_elementua AND distantzia_x < 0.5 AND distantzia_y < 0.5 ORDER BY puntuazioa DESC LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
		} else {
			// EHko guztiak
			//tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, herriak_elementuak_botoak.puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = fk_elementua AND fk_azpiatala = ' + idKategoria + ' ORDER BY herriak_elementuak_botoak.puntuazioa DESC LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein, idKategoria)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
			
			// Erabiltzailetik gertu (distantzia < ~40-50km) daudenen artean bozkatuenak
			tx.executeSql('SELECT herriak_elementuak.id as idElementua, herriak.id as idHerria, herriak.izena as herriaren_izena, herriak_elementuak.izena as izena, irudia, herriak_elementuak.irudiaren_bidea as irudiaren_bidea, herriak_elementuak.gmaps_lng as gmaps_lng, herriak_elementuak.gmaps_lat as gmaps_lat, abs(herriak_elementuak.gmaps_lat - ' + unekoLatitudea + ') as distantzia_y, abs(herriak_elementuak.gmaps_lng - ' + unekoLongitudea + ') as distantzia_x, (herriak_elementuak_botoak.boto_pos - herriak_elementuak_botoak.boto_neg) as puntuazioa FROM herriak, herriak_elementuak, herriak_elementuak_botoak WHERE herriak.id = herriak_elementuak.fk_herria AND herriak_elementuak.id = herriak_elementuak_botoak.id_elementua AND fk_azpiatala = ' + idKategoria + ' AND distantzia_x < 0.5 AND distantzia_y < 0.5 ORDER BY puntuazioa DESC LIMIT 20', [], function(tx, results) {bistaratuElementuakArrakasta(tx, results, zein, idKategoria)}, function(tx, err){errorCB(tx, err, "bistaratuElementuak-exec")});
		}
	} else {
		// Ez da 'zein' parametrorik zehaztu eta zehaztutakoak ez da baliozkoa.
		console.log("Ez da 'zein' parametrorik zehaztu edo zehaztutakoa ez da baliozkoa.");
	}
}

// Herri bateko elementuen datuak datu-base lokaletik behar bezala irakurtzen direnean exekutatzen da
function bistaratuElementuakArrakasta(tx, results, zein, idKategoria) {
    var len = results.rows.length;
    console.log("Herriko elementuak: " + len + " errenkada.");
    var irudia_src = "";
    var distKM;
    var puntuazioa;
    var lekuak = [];
    var lekua = {};
    var zerrenda_id = "#lekuak-kategoriaka-zerrenda";
    
    // Zerrenda garbitu berriz bete aurretik
    $(zerrenda_id).empty();
    
    if (zein == "gertukoenak") {
	    // Datu-basetik eskuratutako lekuen benetako distantziak kalkulatu eta array batean gorde. 
	    for (var i = 0; i < len; i++){
	        irudia_src = results.rows.item(i).irudia;
	        
	        if (!irudia_src) {
	        	irudia_src = "argazkirik_gabe.png";
	        }
	        
	        // Uneko posiziotik uneko elementura dagoen distantzia kalkulatu (km)
	        distKM = kalkulatuDistantzia(unekoLatitudea, unekoLongitudea, results.rows.item(i).gmaps_lat, results.rows.item(i).gmaps_lng);
	
	        lekua = {};
	        lekua['id'] = results.rows.item(i).idElementua;
	        lekua['izena'] = results.rows.item(i).izena;
	        lekua['id_herria'] = results.rows.item(i).idHerria;
	        lekua['herriaren_izena'] = results.rows.item(i).herriaren_izena;
	        lekua['irudia_src'] = irudia_src;
	        lekua['irudiaren_bidea'] = results.rows.item(i).irudiaren_bidea;
	        lekua['gmaps_lat'] = results.rows.item(i).gmaps_lat;
	        lekua['gmaps_lng'] = results.rows.item(i).gmaps_lng;
	        lekua['distantzia'] = results.rows.item(i).distantzia;
	        lekua['puntuazioa'] = results.rows.item(i).puntuazioa;
	        
	        // Leku batzuen latitude eta longitudea 0.00000000000000000000 da eta ~4800 km-tara daudela agertzen da. Kasu horietan distantzia ezezaguna dela adierazi.
	        // Kontutan izan beherako isNaN erabili behar dela kasu hauek saihesteko.
	        if (lekua['gmaps_lat'] != 0.00000000000000000000 && lekua['gmaps_lng'] != 0.00000000000000000000) {
	        	lekua['distKM'] = distKM;
	        } else {
	        	lekua['distKM'] = "??? km";
	        }
	        
	        lekuak.push(lekua);
	    }
	
	    // Lekuak benetako distantziaren (distKM) arabera ordenatu
	    function konparatu(a,b) {
	    	if (a.distKM < b.distKM)
	    		return -1;
	    	if (a.distKM > b.distKM)
	    		return 1;
	    	return 0;
	    }
	
	    lekuak.sort(konparatu);
	    
	    // Lekuak bistaratu benetako distantziaren arabera ordenatuta
	    for (var i = 0; i < len; i++) {
	    	// gmaps_lat eta gmaps_lng 0.000000... badira distKM "??? km" da eta beraz ez da zenbaki bat.
	    	if (!isNaN(lekuak[i].distKM)) {
	    		// Lekuak ordenatu ditugunez gero ez da beharrezko distKM zenbaki bat izatea eta orain distKMri formatua emango diogu
		        if (lekuak[i].distKM < 1) {
		        	// 1 km baino gertuago gaude, metrotan erakutsiko dugu distantzia:
		        	lekuak[i].distKM =  (Math.round(lekuak[i].distKM * 1000)) + " m";
		        } else {
		        	// 1 km baino urrutiago badago x.xx km formatua erabiliko dugu
		        	lekuak[i].distKM = (Math.round(lekuak[i].distKM * 100)/100) + " km";
		        }
	    	}
	        console.log("ID = " + lekuak[i].id + " Elementua = " + lekuak[i].izena + " Distantzia = " + lekuak[i].distantzia + " KM = " + lekuak[i].distKM);
	
	        if (lekuak[i].puntuazioa >= 0) {
	        	lekuak[i].puntuazioa = "+" + lekuak[i].puntuazioa; 
	        }

	        if (lekuak[i].irudiaren_bidea) {
	        	$(zerrenda_id).append("<li data-icon='false' class='lekuak-zerrenda-li' data-id-lekua=" + lekuak[i].id + " data-lekua-id-herria=" + lekuak[i].id_herria + " data-id-lekua-lng=" + lekuak[i].gmaps_lng + " data-id-lekua-lat=" + lekuak[i].gmaps_lat + "><a href='xehetasunak.html'> <img id='koadro-txikia' src='" + lekuak[i].irudiaren_bidea + "/" + lekuak[i].irudia_src + "'> <h1>" + lekuak[i].izena + "</h1><p>" + lekuak[i].herriaren_izena + "   " + lekuak[i].distKM + "</p><span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" + lekuak[i].puntuazioa + "</span></a></li>");	        	
	        } else {
	        	$(zerrenda_id).append("<li data-icon='false' class='lekuak-zerrenda-li' data-id-lekua=" + lekuak[i].id + " data-lekua-id-herria=" + lekuak[i].id_herria + " data-id-lekua-lng=" + lekuak[i].gmaps_lng + " data-id-lekua-lat=" + lekuak[i].gmaps_lat + "><a href='xehetasunak.html'> <img id='koadro-txikia' src='" + irudien_bide_erlatiboa + lekuak[i].irudia_src + "'> <h1>" + lekuak[i].izena + "</h1><p>" + lekuak[i].herriaren_izena + "   " + lekuak[i].distKM + "</p><span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" + lekuak[i].puntuazioa + "</span></a></li>");
	        }
	    }
    } else if (zein == "bozkatuenak") {
    	for (var i = 0; i < len; i++){
	        irudia_src = results.rows.item(i).irudia;
	        
	        if (!irudia_src) {
	        	irudia_src = "argazkirik_gabe.png";
	        }
	        
	        // Uneko posiziotik uneko elementura dagoen distantzia kalkulatu (km)
	        distKM = kalkulatuDistantzia(unekoLatitudea, unekoLongitudea, results.rows.item(i).gmaps_lat, results.rows.item(i).gmaps_lng);
	        
	        // Leku batzuen latitude eta longitudea 0.00000000000000000000 da eta ~4800 km-tara daudela agertzen da. Kasu horietan distantzia ezezaguna dela adierazi.
	        if (results.rows.item(i).gmaps_lat == 0.00000000000000000000 || results.rows.item(i).gmaps_lng == 0.00000000000000000000) {
	        	distKM = "??? km";
	        } else if (distKM < 1) {
	        	// 1 km baino gertuago gaude, metrotan erakutsiko dugu distantzia:
	        	distKM =  (Math.round(distKM * 1000)) + " m";
	        } else {
	        	// 1 km baino urrutiago badago x.xx km formatua erabiliko dugu
	        	distKM = (Math.round(distKM * 100)/100) + " km";
	        }
		    
	        if (results.rows.item(i).puntuazioa >= 0) {
	        	puntuazioa = "+" + results.rows.item(i).puntuazioa; 
	        }
	        
		    console.log("ID = " + results.rows.item(i).idElementua + " Elementua = " + results.rows.item(i).izena + " Distantzia = " + results.rows.item(i).distantzia + " KM = " + distKM);
			
	        if (results.rows.item(i).puntuazioa >= 0) {
	        	results.rows.item(i).puntuazioa = "+" + results.rows.item(i).puntuazioa; 
	        }
	        
	        if (results.rows.item(i).irudiaren_bidea) {
	        	$(zerrenda_id).append("<li data-icon='false' class='lekuak-zerrenda-li' data-id-lekua=" + results.rows.item(i).idElementua + " data-lekua-id-herria=" + results.rows.item(i).idHerria + " data-id-lekua-lng=" + results.rows.item(i).gmaps_lng + " data-id-lekua-lat=" + results.rows.item(i).gmaps_lat + "><a href='xehetasunak.html'> <img id='koadro-txikia' src='" + results.rows.item(i).irudiaren_bidea + "/" + irudia_src + "'> <h1>" + results.rows.item(i).izena + "</h1><p>" + results.rows.item(i).herriaren_izena + "   " + distKM + "</p><span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" + puntuazioa + "</span></a></li>");	        	
	        } else {
	        	$(zerrenda_id).append("<li data-icon='false' class='lekuak-zerrenda-li' data-id-lekua=" + results.rows.item(i).idElementua + " data-lekua-id-herria=" + results.rows.item(i).idHerria + " data-id-lekua-lng=" + results.rows.item(i).gmaps_lng + " data-id-lekua-lat=" + results.rows.item(i).gmaps_lat + "><a href='xehetasunak.html'> <img id='koadro-txikia' src='" + irudien_bide_erlatiboa + irudia_src + "'> <h1>" + results.rows.item(i).izena + "</h1><p>" + results.rows.item(i).herriaren_izena + "   " + distKM + "</p><span class='ui-li-count ui-btn-up-c ui-btn-corner-all'>" + puntuazioa + "</span></a></li>");
	        }
    	}
    }
    
    // Zerrenda freskatu
    $(zerrenda_id).listview("refresh");
    
    // Mezua ezkutatu
    $.mobile.loading('hide');
}

function bistaratuHerriaHerrialdea(tx, idHerria, izena, idTestua) {
	tx.executeSql('SELECT lurraldeak.izena as izena, herriak.argazkia as argazkia, herriak.gmaps_zoom as gmaps_zoom FROM herriak, lurraldeak WHERE herriak.fk_lurraldea = lurraldeak.id AND herriak.id = ' + idHerria + '', [], function(tx, results) {bistaratuHerriaHerrialdeaArrakasta(tx, results, izena, idTestua)}, function(tx, err){errorCB(tx, err, "bistaratuHerriaHerrialdea-exec")});
}

function bistaratuHerriaHerrialdeaArrakasta(tx, results, izena, idTestua) {
	var len = results.rows.length;
    
    // Helbide berria bistaratu
    for (var i = 0; i < len; i++) {
    	// Herrialdea gorde
        unekoLurraldea = results.rows.item(i).izena;
        
        // eta idTestua id-a duen elementuan bistaratu
        $("#" + idTestua).text(unekoHerria + "(" + unekoLurraldea + ")");
        
        // Herriari dagokion argazkia ere bistaratu
        $("#sarrera-irudia").attr("src", "../irudiak/herriak/" + results.rows.item(i).argazkia);
        
        // Herriari dagokion gmaps-eko zoom-a gorde
        unekoHerriaZoom = results.rows.item(i).gmaps_zoom;
        
        // Sarrerako botoiak gaituta daudela ziurtatu
		gaituSarrerakoBotoiak();
    }
}

function txertatuHerrikoElementuBerria(tx, id_gomendioa, izena, deskribapena, webgunea, irudiaren_izena, irudiaren_bidea, lat, lng, zoom_maila, herria, atala, idUnekoErabiltzailea, atzera_deia) {

	// Gomendio berria datu-base lokalean gorde
	tx.executeSql( 
		'INSERT INTO herriak_elementuak(id, izena, deskribapena, url, irudia, irudiaren_bidea, gmaps_lat, gmaps_lng, gmaps_zoom, fk_herria, fk_azpiatala, fk_erabiltzailea) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
	    [id_gomendioa, izena, deskribapena, webgunea, irudiaren_izena, irudiaren_bidea, lat, lng, zoom_maila, herria, atala, idUnekoErabiltzailea], 
	    function() {}, 
	    function(tx, err){errorCB(tx, err, "txertatuHerrikoElementuBerria-exec")}
	);
	
	// Gomendio berriari 0 boto positibo eta negatibo jarri
	tx.executeSql(
		'INSERT INTO herriak_elementuak_botoak(id_elementua, boto_pos, boto_neg) VALUES (?, ?, ?)',
		[id_gomendioa, 0, 0],
		function() {},
		function(tx, err){errorCB(tx, err, "txertatuHerrikoElementuBerriarenBotoak-exec")}
	);
	
	// Atzera-deia exekutatu
	atzera_deia();
}

// Transakzioan errore bat gertatzean exekutatzen da
function errorCB(tx, err, deitzailea) {
    console.log("Errorea SQLa prozesatzean (" + deitzailea + "): " + err.code + ": " + err.message);
}