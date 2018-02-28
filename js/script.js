	var map;

	// crea un nuevo array en blanco para todos los marcadores.
	var markers = [];

	// Crea el mapa y lo posiciona en center
	function initMap(){  
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -32.912951, lng: -68.862329},
			zoom: 13,
			mapTypeControl: false
		});

	var locations = [
	  {title: 'La casa delGordo', location: {lat: -32.946843, lng: -68.804855}},
	  {title: 'Loco Al Pollo', location: {lat: -32.911912, lng: -68.860137}},
	  {title: 'Tia Rasca', location: {lat: -32.912898, lng: -68.860165}},
	  {title: 'La granja de los Quesos', location: {lat: -32.914685, lng: -68.860201}},
	  {title: 'La casa del IONI', location: {lat: -32.908116, lng: -68.859394}}
	];

	var largeInfoWindow = new google.maps.InfoWindow();


	for(var i = 0; i< locations.length; i++){
		//pido las posiciones y los titulos del array
		var position = locations[i].location;
		var title = locations[i].title;
		// creo una nueva marca por locacion
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			id: i
			});

		// empuja nuestro marcador hacia nuestro array de marcadores
		markers.push(marker);
		// crea el evento que muestra informacion al hacer click en cada marcador
		 marker.addListener('click', function() {
            populateInfoWindow(this, largeInfoWindow);
          });
        }
        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', hideListings);		
	  }

	function populateInfoWindow(marker, infoWindow) {
		if (infoWindow.marker != marker) {
			infoWindow.marker = marker;
			infoWindow.setContent('<div>' + marker.title + '</div>');
			infoWindow.open(map, marker);

			infoWindow.addListener('closeclick',function(){
				infoWindow.setMarker = null;
			});
		}
	}

	// funcion que muestra todas las marcas en el mapa
	function showListings() {
        var bounds = new google.maps.LatLngBounds();
      	// extiende los limites del mapa por cada marcador y muestra el marcador
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }
      // funcion que pasa por toda la lista y la esconde
	function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
initMap();