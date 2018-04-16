var map;
// crea un nuevo array en blanco para todos los marcadores.
var markers = [];
// this global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;
// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];

function initMap(){
//estilos
		var styles =[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0e1626"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
];
		// Crea el mapa y lo posiciona en una posicion de Lat y Lng
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -32.912951, lng: -68.862329},
      zoom: 15,
      styles: styles,
      mapTypeControl: false
    });

    // This autocomplete is for use in the search within time entry box.
    var timeAutoCompleteGet = document.getElementsByClassName('search-within-time-text');
    var timeAutoComplete = new google.maps.places.Autocomplete(timeAutoCompleteGet[0]);
    // This autocomplete is for use in the seach in the geocoder entry box.
    var zoomAutocompleteGet = document.getElementsByClassName('zoom-to-area-text');
    var zoomAutocomplete = new google.maps.places.Autocomplete(zoomAutocompleteGet[0]);
    // Bias the boundaries within the map for the zoom to area text.
    zoomAutocomplete.bindTo('bounds', map);
    // create a searchbox in order to execute a places search
    var searchBoxGet = document.getElementsByClassName('places-search');
    var searchBox = new google.maps.places.SearchBox(searchBoxGet[0]);
    // Bias the searchbox to ithin the bounds of the map.
    searchBox.setBounds(map.getBounds());
    
    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    var locations = [
      {title: 'Loco Al Pollo', location: {lat: -32.911912, lng: -68.860137}},
      {title: 'Tia Rasca', location: {lat: -32.912898, lng: -68.860165}},
      {title: 'La granja de los Quesos', location: {lat: -32.914685, lng: -68.860201}},
      {title: 'La casa del IONI', location: {lat: -32.908116, lng: -68.859394}}
    ];
    var largeInfowindow = new google.maps.InfoWindow();

    // Initialize the drawing manager
    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [
          google.maps.drawing.OverlayType.POLYGON
        ]
      }
    });

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      var position = locations[i].location;
      var title = locations[i].title;
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      });
      // Push the marker to our array of markers.
      markers.push(marker);
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
      });
      // Two event listeners - one for mouseover, one for mouseout,
      // to change the colors back and forth.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
    }
    // new syntax, dunno how to make it work yet
      //var [hide_listings] = document.getElementsByClassName('hide-listings');
      //from [hide_listing].addEventListener('click',show_listings);
    
      // added event listener on click to the buttons, this way, because.. classes...
    var show_listingGet = document.getElementsByClassName('show-listings');
    var show_listing = show_listingGet[0];
    show_listing.addEventListener('click',showListings);

    var hide_listingGet = document.getElementsByClassName('hide-listings');
    var hide_listing = hide_listingGet[0];
    hide_listing.addEventListener('click', function(){
      hideMarkers(markers);
    });

    var toggle_drawingGet = document.getElementsByClassName('toggle-drawing');
    var toggle_drawing = toggle_drawingGet[0];
    toggle_drawing.addEventListener('click', function(){
      toggleDrawing(drawingManager);
    });

    var zoom_to_areaGet = document.getElementsByClassName('zoom-to-area');
    var zoom_to_area = zoom_to_areaGet[0];
    zoom_to_area.addEventListener('click', function(){
      zoomToArea();
    });

    var search_within_timeGet = document.getElementsByClassName('search-within-time');
    var search_within_time = search_within_timeGet[0];
    search_within_time.addEventListener('click', function(){
      searchWithinTime();
    });

    // Listen for the event fired when the user selects a prediction from the
    // picklist and retrieve more details for that place.
    searchBox.addListener('places_changed',function(){
      searchBoxPlaces(this);
    });
    
    // Listen for the event fired when the user selects a preictions and clicks
    // "Go" more details for that palce.
    var go_placesGet = document.getElementsByClassName('go-places');
    go_placesGet[0].addEventListener('click', textSearchPlaces);

    // add an event listener so that the polygon is captured, call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hie any outside of it.

    drawingManager.addListener('overlaycomplete',function(event){
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      // esto limita el polygon a 1, se puede eliminar para permitir varios
      if (polygon) {
        polygon.setMap(null);
        hideMarkers(markers);
      }
      // Switching the rawing moed to the HAND.
      drawingManager.setDrawingMode(null);
      // Creating a new editable polygon from the overlay.
      polygon = event.overlay;
      // el polygon tambien puede ser draggable
      polygon.setEditable(true);
      // Searching within the polygon.
      searchWithinPolygon();
      // Make sure the search is re-done if the poly is changed.
      polygon.getPath().addListener('set_at', searchWithinPolygon);
      polygon.getPath().addListener('insert_at', searchWithinPolygon);
      var Area = google.maps.geometry.spherical.computeArea(polygon.getPath());
      alert(Area);
    });
  }
  // This function populates the infowindow when the marker is clicked. We'll only allow
  // one infowindow which will open at the marker that is clicked, and populate based
  // on that markers position.
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      // Clear the infowindow content to give the streetview time to load.
      infowindow.setContent('');
      infowindow.marker = marker;
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
      var streetViewService = new google.maps.StreetViewService();
      var radius = 50;
      // In case the status is OK, which means the pano was found, compute the
      // position of the streetview image, then calculate the heading, then get a
      // panorama from that and set the options
      function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
              position: nearStreetViewLocation,
              pov: {
                heading: heading,
                pitch: 30
              }
            };
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
          infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
      }
      // Use streetview service to get the closest streetview image within
      // 50 meters of the markers position
      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
      // Open the infowindow on the correct marker.
      infowindow.open(map, marker);
    }
  }
  // This function will loop through the markers array and display them all.
  function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }
  // This function will loop through the listings and hide them all.
  function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
  // This function takes in a COLOR, and then creates a new marker
  // icon of that color. The icon will be 21 px wide by 34 high, have an origin
  // of 0, 0 and be anchored at 10, 34).
  function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  // this shows and hides the drawing options
  function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
      drawingManager.setMap(null);
      if (polygon){
        polygon.setMap(null);
      }
    } else {
      drawingManager.setMap(map);
    }
  }

  function searchWithinPolygon(){
    for (let i = 0; i < markers.length; i++) {
      if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)){
        markers[i].setMap(map);
      } else {
        markers[i].setMap(null);
      }
    }
  }

  // Thi function takes the input value and locate it and zooms into that area.
  function zoomToArea(){
    // inicializo el geocoder
    var geocoder = new google.maps.Geocoder();
    // Agarro la ubicacion o lugar que el usuario escribio.
    var zoom_to_area_texts = document.getElementsByClassName('zoom-to-area-text');
    var address = zoom_to_area_texts[0].value;
    //revisa si escribio en blanco
    if (address == ''){
      window.alert('You must enter an area, or address.');
    } else {
      //Geocodeo la ubicacion para obtener el centro, luego, le hago zoom.
      geocoder.geocode(
        { address: address,
        componentRestrictions: {locality: 'Mendoza'}
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(15);
          } else {
            window.alert('We could not find that location - try entering a more' +
             'especific place.');
          }
        });
    }
  }
  // This functions allows the user to input a desired travel time,
  // a travel mode and a location and only show the listings that are
  //within that travel time ( via that travel mode) of the location.
  function searchWithinTime(){
    // initialize the distance matrix service.
    var distanceMatrixService = new google.maps.DistanceMatrixService;
    var search_within_time_texts = document.getElementsByClassName('search-within-time-text');
    var address = search_within_time_texts[0].value;
    // check to make sure the place entered isn't blank.
    if (address == ''){
      window.alert('You must enter an address');
    } else {
      hideMarkers(markers);
      // Use the distance matrix service to calculate the duration of the
      // routes between all oour markers, and the destination address entered
      // by the user. Then put all the origins into an origin matrix.
      var origins = [];
      for (var i = 0; i < markers.length; i++) {
        origins[i] = markers[i].position;
      }
      var destination = address;
      var modesGet = document.getElementsByClassName('mode');
      var mode = modesGet[0].value;
      // Now whit origin and destination defined, get all info for distances between.
      
      distanceMatrixService.getDistanceMatrix({
        origins: origins,
        destinations: [destination],
        travelMode: google.maps.TravelMode[mode],
        unitSystem: google.maps.UnitSystem.METRIC,
      }, function(response, status){
        if (status != google.maps.DistanceMatrixStatus.OK){
          window.alert('Error was: ' + status);
        } else {
          displayMarkersWithinTime(response);
        }
      });
    }
  }
  
  // This function will go through each of the results and
  // if the distance is LESS than the value in the picker, show it on the map.
  function displayMarkersWithinTime(response) {
    var maxDurationsGet = document.getElementsByClassName('max-duration');
    var maxDuration = maxDurationsGet[0].value;
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    // Parse through the results, and the the distance and duration of each
    // loop in case multiple origins and destinations, make sure at least 1 result was found.
    var atLeastOne = false;
    for (var i=0; i<origins.length; i++){
      var results = response.rows[i].elements;
      for (var j=0; j<results.length; j++){
        var element = results[j];
        if (element.status === "OK"){
          // The distance is returned in metters. we only using text here.
          var distanceText = element.distance.text; 
          // Duration value is given in seconds so we make it MINUTES. we need 
          // both the value and the text.
          var duration = element.duration.value / 60;
          var durationText = element.duration.text;
          if (duration <= maxDuration) {
            // the origin [i] should = the makers[i]
            markers[i].setMap(map);
            atLeastOne = true;
            // Create a mini infowindow to open immediately and contain
            // the distance and duration.
             var infowindow = new google.maps.InfoWindow({
               content: durationText + ' away, ' + distanceText + '<div><input type=\"button\" value=\"View Route\" onclick=' +
               '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
             });
             infowindow.open(map, markers[i]);
             // put this in so that this samll window closes if the user clicks
             // the marker, when the big infowindow opens
             markers[i].infowindow = infowindow;
             google.maps.event.addListener(markers[i],'click',function(){
              this.infowindow.close();
             });
          }
        }
      }
    }
    if (!atLeastOne) {
      window.alert('We could not find any locations within that distance!');
    }
  }

  // this function is in response to the user selecting " show route" on one
  // of the markers within the calculated distance. This will display the route on the map.
  function displayDirections(origin) {
    hideMarkers(markers);
    var directionsService = new google.maps.DirectionsService;
    // Get the destination address from the user entered value.
    var destinationAddressGet = document.getElementsByClassName('search-within-time-text');
    var destinationAddress = destinationAddressGet[0].value;
    // Get the mode again from the user entered value.
    var modesGet = document.getElementsByClassName('mode');
    var mode = modesGet[0].value;
    directionsService.route({
      // The origin is the passed in marker's position.
      origin: origin,
      // the destination is the user entered address.
      destination: destinationAddress,
      travelMode: google.maps.TravelMode[mode]
    }, function(response, status ){
      if (status === google.maps.DirectionsStatus.OK) {
        var directionsDsiaplys = new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          draggable: true,
          polylineOptions: {
            strokeColor: '#6633FF',
            strokeWeight: 7
          }
        });
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // This function fires when the user selects a searchbox picklist item.
  // It will do a nearby search using the selected query string or place.
  function searchBoxPlaces(searchBox) {
    hideMarkers(placeMarkers);
    var places = searchBox.getPlaces();
    // for each place, get the icon, name and location.
    createMarkersForPlaces(places);
    if (places.length === 0) {
      window.alert('We did not find any places matching that search!');
    }
  }

  // this function firest twhen the user select "go" on the places search.
  // It will do a nearby search using the entered query string or place.
  function textSearchPlaces(){
    var bounds = map.getBounds();
    hideMarkers(placeMarkers);
    var placesService = new google.maps.places.PlacesService(map);
    var queryGet = document.getElementsByClassName('places-search');
    placesService.textSearch({
      query: queryGet[0].value,
      bounds: bounds
    }, function(results, status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkersForPlaces(results);
      }
    });
  }

  // this function creates markers for each plane found in either places search.
  function createMarkersForPlaces(places) {
    var bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < places.length; i++) {
      var place = places[i];
      var icon = {
        url: place.icon,
        size: new google.maps.Size(35, 35),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(15, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      // Create a marker for each place.
        var marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
          id: place.place_id
        });
        // create a single infowindow to be used with the place details information
        // so that only one is open at once.
        var placeInfoWindow = new google.maps.InfoWindow();
        // If a marker is clicked, do a place details serach on it in the next function.
        marker.addListener('click', function(){
          if (placeInfoWindow.marker == this) {
            console.log("This infowindow already is on this marker!")
          } else {
            getPlacesDetails(this, placeInfoWindow);
          }
        });
        placeMarkers.push(marker);
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);        
        } else {
          bounds.extend(place.geometry.location);
        }
    }
    map.fitBounds(bounds);
  }
  // This is the PLACE DETAILS search- it's the most detailed so it's only
  // executed when a marker is selected, indicating the user wants more
  // details about that place.
  function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: marker.id
    }, function(place,status){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Set the marker property on this infowindow so it isn't created again.
        infowindow.marker = marker;
        var innerHTML = '<div>';
        if (place.name) {
          innerHTML += '<strong>' + place.name + '</strong>';
        }
        if (place.formatted_address) {
          innerHTML += '<br>' + place.formatted_address;
        }
        if (place.formatted_phone_number) {
          innerHTML += '<br>' + place.formatted_phone_number;
        }
        if (place.opening_hours) {
          innerHTML += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6] + '<br>' ;
        }
        if (place.photos) {
          innerHTML += '<br><br><img src="'+ place.photos[0].getUrl(
            {maxHeight:100, maxWidth: 200}) + '">';
        }
        innerHTML += '</div>';
        infowindow.setContent(innerHTML);
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is close.
        infowindow.addListener('closeclick', function(){
          infowindow.marker = null;
        });
      }
    });
  }