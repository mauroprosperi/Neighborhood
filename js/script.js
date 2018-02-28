	var map;

	// crea un nuevo array en blanco para todos los marcadores.
	var markers = [];

	// Crea el mapa y lo posiciona en center
	function initMap(){  
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -32.912951, lng: -68.862329},
			zoom: 13
		});
	var locations = [
	{title: 'La casa delGordo', location: {lat: -32.946843, lng: -68.804855}}
	{title: 'Loco Al Pollo', location: {lat: -32.911912, lng: -68.860137}}
	{title: 'Tia Rasca', location: {lat: -32.912898, lng: -68.860165}}
	{title: 'La granja de los Quesos', location: {lat: -32.914685, lng: -68.860201}}
	{title: 'La casa del IONI', location: {lat: -32.908116, lng: -68.859394}}
	];

	var largeInfoWindow = new google.maps.InfoWindow();


	for(var i = 0; i< locations.length; i++){
		//pido las posiciones y los titulos del array
		var position = locations[i].location;
		var title = locations[i].title;
		// creo una nueva marca por locacion
		var marker = new google.maps.Marker({
		map: map,
		position: position,
		title: title,
		animation: google.maps.Animation.DROP,
		id: i

	});
	}

}
 initMap();