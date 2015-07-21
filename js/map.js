
		/*
		 * Map and Layer Control
		 */
		var map = this.map = L.map('map',{layers: [basemap]}).setView([50.17, -120.8], 7);
		
		
		/*
		 * Add all the layers and other stuff to the map
		 */
		layercontrol.addTo(map);
		mouse.addTo(map);
		//luplabel.addTo(map);
		onaboundary.addTo(map);
		boundarylabel.addTo(map);
		//lupline.addTo(map);
		placenameslayer.addTo(map).bringToFront();
		reserves.addTo(map).bringToFront();
		map.addLayer(markers);
		//coyotes.addTo(map);
		
		

