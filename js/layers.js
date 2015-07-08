		/*
		 * Layers
		 */

		//Basemap layer
        var basemap = L.tileLayer(baseurl, {
          attribution: attribution
        });
		
		//Coyote Landmark Area layer
		
		
		var coyotelayer = L.geoJson(coyote, {onEachFeature: onfeature });
		
		//Place Names Layer 
		var placenameslayer = L.geoJson(placenames, {style: placenameStyle, onEachFeature: AddLabel});

        //Place Names Layer 
		var placenameslayerp = L.geoJson(places, {style: placenamepStyle, onEachFeature: AddLabelP});
        var lakenamelayer = L.geoJson(lakes, {style: placenamepStyle, onEachFeature: AddLabelP});
        
        
        //unity runs
        var unitylayer = L.geoJson(unity_runs, {style: unityrunstyle, onEachFeature:hoverClick});
        
        //photos
        var photolayer = L.geoJson(photopoints, {style: photostyle,
            pointToLayer: function(feature, latlng) {
                
                return L.circleMarker(latlng, {radius:5,  });
            }
        ,onEachFeature: PhotoPopUp});
		
		//Reserves Layer	
		var reserves = L.geoJson(geojsonreserves, {style: style, onEachFeature: rlabels});
        reserves.addData(cct);
		
		//markers with video pop up 
        var markers = L.markerClusterGroup({
            iconCreateFunction: function (cluster) {
            var childCount = cluster.getChildCount();
                return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster', iconSize: new L.Point(30, 30) });
            },         
        showCoverageOnHover:false});
        
        
        
		//var markers = L.markerClusterGroup({showCoverageOnHover:false});
		//var JsonLayer = L.geoJson(videos, {icon:greenIcon, onEachFeature: AddPopUp});
        var JsonLayer = L.geoJson(videos, {
            pointToLayer: function(feature, latlng) {
                
                return L.marker(latlng, {icon: greenIcon});
            }
        ,onEachFeature: AddPopUp});
		markers.addLayer(JsonLayer);
		
		
		//minimap
		var line2 = L.geoJson(lup, {style: lupStyleinset});
		var osm2 = new L.tileLayer(baseurl, {
        attribution: attribution,
        maxZoom: 13
        });
		var layers = new L.LayerGroup([osm2, line1, line2]);
		var miniMap = new L.Control.MiniMap(layers, { toggleDisplay: true });
		
		
		//Boundary Lines
		var onaboundary = L.geoJson(boundaryline, {style: boundaryStyle});
		var luplabel = L.marker([48.785, -117], { opacity: 0.01 }).bindLabel('LUP Boundary', { noHide: true, className: "my-label",  });	
		var boundarylabel = L.marker([49.2, -117.3],{ opacity: 0.01 }).bindLabel('ONA Territory Boundary', { noHide: true, className: "my-label2",  });
		var lupline = L.geoJson(lup, {style: lupStyle});
		
		//layer control
		//define the baselayers
		var baseLayers = {
			"Baselayer": basemap,
		};
		//define the overlay layers
		var overlays = {
			"Coyote Landmark Areas": coyotes,
			"Place Names": placenameslayer,
			"ONA reserve areas": reserves,
			"Videos": markers,
            "place2": placenameslayerp,
            "lakes": lakenamelayer
		};
		var layercontrol = L.control.layers(baseLayers, overlays);
		
		//Mouse coordinates
		var mouse = L.control.mousePosition();
		//Scale Bar
		//var scale = L.control.scale({position: 'bottomright'});
        
        
        
        
        //Back to main map
        
        var backbutton = L.control();
		backbutton.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'backbutton');
			div.innerHTML = '<a href = frontpage.html>Back to Main Map<a>'
			return div;
		};
        
        var runbutton = L.control();
		runbutton.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'backbutton');
			div.innerHTML = '<a href = unity_runs.html>Run<br>Overview<a>'
			return div;
		};
		
        
        
        
        
        
        