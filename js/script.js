	var map;
	// Crea el mapa y lo posiciona en center //
	function initMap(){  
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -32.912951, lng: -68.862329},
			zoom: 13
		});

 	var gordoHome = {lat: -32.946843,lng: -68.804855};
 	// crea un marcador //
 	var marker = new google.maps.Marker({
 		position: gordoHome,
 		map: map,
 		title: ' First Marker'
 	});
 	// crea una ventana con informacion // 
 	var infoWindow = new google.maps.InfoWindow({
 		content: 'o you ever feel like a infowindow? ' + ' ready?' 
 	});
}
 initMap();