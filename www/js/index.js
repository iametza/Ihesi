/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        ihesidb = window.openDatabase("Ihesi", "1.0", "IhesiDB", 5000000);
        
        // Datu-basea ez bada existitzen edo zaharra bada berriz sortu behar da
        ihesidb.transaction(eskuratuBertsioaDB, ezDaExistitzenDB2);
        
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        
        // Geokokapena eskuratzen ari garela adierazi
        $("#sarrera-irudia-testua-lerroa-span").text('Kokapena eskuratzen...');
        
        // Uneko posizioa eskuratzen saiatu eta mapa edo errore-mezua bistaratu
        // timeout: milisegundo kopuru hori igarotakoan ez bada posizioa eskuratu google_maps_errorea atzera-dei funtzioa exekutatuko da.
        navigator.geolocation.getCurrentPosition(onSuccess, google_maps_errorea, {timeout: 10000});
        
        // Posizioa eskuratu bitartean sarrerako orriko botoiak desgaitu behar dira
        desgaituSarrerakoBotoiak();
        
        // Datu-base lokala eguneratu behar dugun egiaztatuko dugu.
        // Denbora-muga bat igaro ondoren exekutatuko dugu, bestela arazoak ematen baitzituen (Sarrerako orriko irudia ez zen kargatzen Androidetan).
        // Gainera honela denbora ematen diogu eguneratuDB funtzioari exekutatzeko datu-basearen bertsio zahar bat badago edo datu-baserik ez badago.
        var eguneraketarenAtzerapena = window.setTimeout(function() {
                ihesidb.transaction(function(tx){eguneratuBeharOteDa(tx)},
                                    function(tx, err){errorCB(tx, err, "eguneratuBeharOteDa-exec")}
                );
            }, 10000
        )
        
        function onSuccess(position) {
            // Erabiltzailearen uneko posizioaren longitudea eta latitudea
            unekoLatitudea = position.coords.latitude;
            unekoLongitudea = position.coords.longitude;
            
            var latLng = new google.maps.LatLng(
                position.coords.latitude,
                position.coords.longitude);
            
            // Helbidea eskuratzeko atzera-dei funtzio bat erabili beharra dago, geokodetzailearen funtzioa asinkronoa baita.
            // Atzera-dei funtzioak botoiak berriz gaitu behar ditu -> Ikusi herriarenDatuakGorde funtzioa
            itzuliUnekoHelbidea(latLng, herriarenDatuakGorde);
        }

        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failFS);
        
        function failFS() {
            console.log("failed to get filesystem");
        }
         
        function gotFS(fileSystem) {
            console.log("filesystem got");
            fileSystem.root.getDirectory(ezarpenak.rootDirektorioa, {
            create : true,
            exclusive : false
            }, dirReady, failFS);
        }
             
        function dirReady(entry) {
            window.appRootDir = entry;
            console.log(JSON.stringify(window.appRootDir));
        }
    }
};
