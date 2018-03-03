	var map;

	// crea un nuevo array en blanco para todos los marcadores.
	var markers = [];

	function initMap(){  
		var styles = [
		   {
			featureType: 'water',
			stylers: [
			{ color: '#19a0d8'}
			]
		},{
			featureType: 'administrative',
			elementType: 'labels.text.stroke',
			stylers: [
			{color: '#ffffff'},
			{ weight: 6}
			]
		},{
			featureType: 'administrative',
			elementType: 'labels.text.fill',
			stylers: [
			{color: '#e85113'}
			]
		},{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [
			{color: '#efe9e4'},
			{lightness: -40}]
		},{
			featureType: 'transit.station',
			stylers:[
			{ weight: 9},
			{ hue: '#e85113'}
			]
		},{
			featureType: 'road.highway',
			elementType: 'labels.icon',
			stylers: [
			{ visibility: 'off'}
			]
		}
		];
		// Crea el mapa y lo posiciona en una posicion de Lat y Lng.
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -32.912951, lng: -68.862329},
			zoom: 13,
			styles: styles,
			mapTypeControl: false
		});
		// pasar a una Data base
	var locations = [
	  {title: 'La casa delGordo, se vende pastafrola y chiken diners', location: {lat: -32.946843, lng: -68.804855}},
	  {title: 'Loco Al Pollo', location: {lat: -32.911912, lng: -68.860137}},
	  {title: 'Tia Rasca', location: {lat: -32.912898, lng: -68.860165}},
	  {title: 'La granja de los Quesos', location: {lat: -32.914685, lng: -68.860201}},
	  {title: 'La casa del IONI', location: {lat: -32.908116, lng: -68.859394}}
	];

	var largeInfoWindow = new google.maps.InfoWindow();

	//Icono default para los marcadores
	var defaultIcon = makeMarkerIcon('0091ff');
	//Icono iluminado cuando el usuario señale el marcador
	var highlightedIcon = makeMarkerIcon('FFFF24');


	for(var i = 0; i< locations.length; i++){
		//pido las posiciones y los titulos del array
		var position = locations[i].location;
		var title = locations[i].title;

		// creo una nueva marca por locacion
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			icon: defaultIcon,
			animation: google.maps.Animation.DROP,
			id: i
			});

		// empuja nuestro marcador hacia nuestro array de marcadores
		markers.push(marker);

		// crea el evento que muestra informacion al hacer click en cada marcador
		marker.addListener('click', function() {
           populateInfoWindow(this, largeInfoWindow);
          });

		//eventos para cambiar de color cuando es señalado el marcador
		marker.addListener('mouseover', function() {
           this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
           this.setIcon(defaultIcon);
        });

        }
        document.getElementById('show-listings').addEventListener('click', showListings);
        document.getElementById('hide-listings').addEventListener('click', hideListings);		
	  }

	function populateInfoWindow(marker, infoWindow) {
		if (infoWindow.marker != marker) {
			infoWindow.marker = marker;
			infoWindow.setContent('<div>' + marker.title + marker.position + '</div>');
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

    function makeMarkerIcon(markerColor){
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
initMap();