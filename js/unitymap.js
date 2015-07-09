
		/*
		 * Map and Layer Control
		 */
		var map = this.map = L.map('map',{layers: [basemap]}).setView([49.73, -119.79], 7);
		
		
		/*
		 * Add all the layers and other stuff to the map
		 */
		layercontrol.addTo(map);
		mouse.addTo(map);
		//miniMap.addTo(map);
		//luplabel.addTo(map);
		onaboundary.addTo(map);
		//boundarylabel.addTo(map);
		//lupline.addTo(map);
		//placenameslayer.addTo(map).bringToFront();
		reserves.addTo(map).bringToFront();
		//map.addLayer(markers);
		//scale.addTo(map);
        //placenameslayerp.addTo(map);
        //lakenamelayer.addTo(map);
        //year1.addTo(map);
        unitylayer.addTo(map);
		//coyotes.addTo(map);
        photolayer.addTo(map);
        backbutton.addTo(map);
        
		
		
		
		/*
		 *Add a title
		 */
		var titleslide = L.control();
		titleslide.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'titleslide2');
			div.innerHTML = '<p><font size="30"; color="#363434"><i>Unity Runs</i></font></p><hr><p><font size = "3"; color="#363434">'
			return div;
		};
		titleslide.addTo(map);
		
		/*var llist = new L.control.locationlist({locationsList: [ { title: "Okanagan Nation Territory", latlng: [50.485316, -119.518520], zoom:7 }, {title: 'Upper Nicola Band' , latlng: [ 50.141730, -120.785737 ], zoom: 10 },   {title: 'Okanagan Indian Band' , latlng: [ 50.356162, -119.319863 ], zoom: 10 },  {title: 'Westbank First Nation' , latlng: [ 49.882108, -119.534552 ], zoom: 10 },   {title: 'Penticton Indian Band' , latlng: [ 49.480076, -119.601690 ], zoom: 10 },  {title: 'Osoyoos Indian Band' , latlng: [ 49.181749, -119.535686 ], zoom: 10 },    {title: 'Lower Similkameen Indian Band' , latlng: [ 49.207326, -119.832317 ], zoom: 10 },       {title: 'Upper Similkameen Indian Band' , latlng: [ 49.356317, -120.079440 ], zoom: 10 }], showList:true});
			 
		map.addControl(llist);*/
		

