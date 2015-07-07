        //Basemap
		var baseurl = 'http://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxleC1hbm5lam9obiIsImEiOiI1RUlqSWJBIn0.jjngxL3yuZ9zl9RGjqfr9w';
		var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'; 		
		
		
		//Coyote Layer
		var coyotes = L.layerGroup();
		function onfeature(feature, layer) {
		var coyotelabel;
		if (feature.properties && feature.properties.label) {
				coyotelabel = feature.properties.label;
			}
        // Check if feature is a polygon
        if (feature.geometry.type === 'MultiPolygon') {
            // Don't stroke and do opaque fill
            layer.setStyle({
                'weight': 0,
                'fillOpacity': 0
            });
            // Get bounds of polygon
            var bounds = layer.getBounds();
            // Get center of bounds
            var center = bounds.getCenter();
            // Use center to put marker on map
            var marker = L.marker(center, 
                    { icon : L.divIcon({
                                         iconSize : [ 15, 15 ], className: 'circledivicon'}
									)
					}
				).bindLabel(coyotelabel, { noHide: true}).addTo(coyotes);
        }
		}
		
		//Place Names Layer
		function AddLabel(feature, layer) {
			
			if (feature.properties && feature.properties.name) {
				layer.bindLabel('Place Name: <br>' + feature.properties.name);
			}
		}
		var placenameStyle = {
			"color": "#6076B3",
			"opacity": 0,
			"fillOpacity": 0.5
		};
        
        
        
        //Place Names Layer2
		function AddLabelP(feature, layer) {
			
			if (feature.properties && feature.properties.Name) {
				layer.bindLabel('Place Name: <br>' + feature.properties.Name);
			}
		}
		var placenamepStyle = {
			"color": "#6076B3",
			"opacity": 0,
			"fillOpacity": 0.9
		};
		
		//Reserves Layer
		function style(feature) {
			return {
				fillColor: '#8C2823',
				weight: 1,
				opacity: .6,
				color: '#8C2823',
				fillOpacity: 0.3
			};
		}
		function rlabels(feature, layer) {
			if (feature.properties && feature.properties.nglshnm) {
				layer.bindLabel('Reserve Area: <br>' + feature.properties.nglshnm);
			}
		}
		
		//Markers video popup
		function AddPopUp(feature, layer) {
			
			if (feature.properties && feature.properties.right) {
				layer.bindPopup('<iframe width="288" height="162" src=' + '"' + 'https://www.youtube.com/embed/' +feature.properties.right +'?feature=player_detailpage'  +'"' + 'frameborder="0" allowfullscreen></iframe>');
			}
			
		}
		
		//Inset Map
		var boundaryStyleinset = {
			"color": "#595EB5",
			"weight": 2,
			"opacity": 0.6
		};
		var line1 = L.geoJson(boundaryline, {style: boundaryStyleinset});
		var lupStyleinset = {
			"color": "#8C2823",
			"weight": 2,
			"opacity": 0.6,
			"fillOpacity": 0
		};
		
		//Boundary Lines
		var boundaryStyle = {
			"color": "#595EB5",
			"weight": 3,
			"opacity": 0.6
		};
		var lupStyle = {
			"color": "#8C2823",
			"weight": 3,
			"opacity": 0.6,
			"fillOpacity": 0
		};
        
        var greenIcon = L.icon({
            iconUrl: 'MB__video_rec.png',

            iconSize:     [30,30], // size of the icon
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            popupAnchor:  [0,-15] // point from which the popup should open relative to the iconAnchor
        });
		
		//unity runs
        
        function getRunColor(x) {
          return x == 'Year 1'     ?    '#9F170C':
                 x == 'Year 2'     ?   '#87911E':
                 x == 'Year 3'     ?   '#E0BF3C':
                 x == 'Year 4'     ?   '#734DB3':
                 x == 'Year 5'     ?   '#26A4F1':
                 x == 'Year 6'     ?   '#031738':
                 x == 'Year 7'     ?   '#FE5936':
                                  '#ffffb2' ;
        };
        
        function unityrunstyle(feature) {
			return {
				"color": getRunColor(feature.properties.Name),
                "opacity": 1,
                "weight": 3,
			};
		}
        
        
        
        
        function highlightFeature(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 7,
			});
		}
		//and reset
		function resetHighlight(e) {
			unitylayer.resetStyle(e.target);
		}
		
		
		//function to add functionality for each feature in provinces layer
		function hoverClick(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
			});
			layer.on({
				mouseout: resetHighlight
			});
			layer.on('click', function (e) {
			window.location = feature.properties.url;
			});	
		}
        
        
        
        
        
        
        
        
        
        //photo popups
        function PhotoPopUp(feature, layer) {
			
			if (feature.properties && feature.properties.image) {
				layer.bindPopup('<img src="images/' +feature.properties.image + '" width="300px">');
			}
			
		}
        
        function photostyle(feature) {
			return {
				"fillColor": getRunColor(feature.properties.Name),
                //"fillColor": '#FE5936',
                "color": '#282729',
                "opacity": .5,
                "fillOpacity": .6,
                "weight": 3,
			};
		}
        
        /*var photostyle = {
			//"color": getRunColor(feature.properties.Name),
            "fillColor": '#FE5936',
            "color": '#282729',
            "opacity": .3,
            "fillOpacity": .6,
            "weight": 2,
		};*/
                
		
        
        
        
        
        
        
        
		//A comment!