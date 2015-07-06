		/*
		 * add a legend
		 */
		var legend = L.control({position: 'topright'});
		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend');
			div.style.width = "120px";
			div.style.height = "120px";
			div.innerHTML = 'Legend<br>'
			div.innerHTML += '<i style="background: #AD59B5"></i> reserves <br>';
			div.innerHTML += '<l style="background: #8C2823"></l> Land Use Planning Boundary <br> ';
			div.innerHTML += '<l style="background: #595EB5"></l> ONA Territory <br> ';
			div.innerHTML += '<i style="background: #6076B3"></i> Places <br> ';
			return div;
		};
		legend.addTo(map);