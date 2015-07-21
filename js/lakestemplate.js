O.Template({
      init: function() {
        var seq = O.Triggers.Sequential();

		/*
		 * Map and Layer Control
		 */
		var map = this.map = L.map('map',{layers: [basemap]}).setView([50.485316, -119.518520], 7);
		
		
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
        //backbutton.addTo(map);
        
        
        function riverlabel(feature, layer) {
            
            var label = "";
            if (feature.properties && feature.properties.nsyilxcen) {
				label = label.concat(feature.properties.nsyilxcen);
			}
			if (feature.properties && feature.properties.name) {
				label = label.concat('<br>' + feature.properties.name);
			}
            layer.bindLabel(label);
            if (feature.properties.name == 'Douglas Lake')
            {
                var mark = L.marker([50.15766, -120.22614],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Columbia River')
            {
                var mark = L.marker([48.64743, -118.0808105],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Kettle River')
            {
                var mark = L.marker([49.43331, -118.85834],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Granby River')
            {
                var mark = L.marker([49.38237, -118.49167],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Similkameen River')
            {
                var mark = L.marker([49.39578, -120.20966],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Mission Creek')
            {
                var mark = L.marker([49.86632, -119.13506],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Arrow Lakes')
            {
                var mark = L.marker([50.18921, -117.8064],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Spotted Lake')
            {
                var mark = L.marker([49.0782, -119.56541],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Osoyoos Lake')
            {
                var mark = L.marker([49.04394, -119.44885],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }
            if (feature.properties.name == 'Okanagan Lake')
            {
                var mark = L.marker([50.08534, -119.47769],{ opacity: 0.01 }).bindLabel(label, { noHide: true}).addTo(map);
            }

            
		}


    var places2 = L.geoJson(lakes, {onEachFeature: riverlabel, 
    style: function (feature) {
        return {color: '#1F9C85', opacity: 1, weight: 5, fillColor:'#1F9C85'};
    },
    
    }).addTo(map).bringToBack();
        
        
        
        
        
        
		

        // enable keys to move
        O.Keys().on('map').left().then(seq.prev, seq)
        O.Keys().on('map').right().then(seq.next, seq)

        click(document.querySelectorAll('.next')).then(seq.next, seq)
        click(document.querySelectorAll('.prev')).then(seq.prev, seq)

        var slides = O.Actions.Slides('slides');
        var story = O.Story()

        this.story = story;
        this.seq = seq;
        this.slides = slides;
        this.progress = O.UI.DotProgress('dots').count(0);
      },

      update: function(actions) {
        var self = this;

        if (!actions.length) return;

        this.story.clear();

        if (this.baseurl && (this.baseurl !== actions.global.baseurl)) {
          this.baseurl = actions.global.baseurl || 'http://{s}.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYWxleC1hbm5lam9obiIsImEiOiI1RUlqSWJBIn0.jjngxL3yuZ9zl9RGjqfr9w';

          this.basemap.setUrl(this.baseurl);
        }

        this._resetActions(actions);
      },

      _resetActions: function(actions) {
        // update footer title and author
        var //title_ = actions.global.title === undefined ? '' : actions.global.title,
            author_ = actions.global.author === undefined ? 'Using' : 'By '+actions.global.author+' using';

        //document.getElementById('title').innerHTML = title_;
        //document.getElementById('author').innerHTML = author_;
        //document.title = title_ + " | " + author_ +' Odyssey.js';

        var sl = actions;

        document.getElementById('slides').innerHTML = ''
        this.progress.count(sl.length);

        // create new story
        for(var i = 0; i < sl.length; ++i) {
          var slide = sl[i];
          var tmpl = "<div class='slide' style='diplay:none'>";

          tmpl += slide.html();
          tmpl += "</div>";
          document.getElementById('slides').innerHTML += tmpl;

          this.progress.step(i).then(this.seq.step(i), this.seq)

          var actions = O.Parallel(
            this.slides.activate(i),
            slide(this),
            this.progress.activate(i),
            resizeAction
          );

          actions.on("finish.app", function() {
            adjustSlides();
          });

          this.story.addState(
            this.seq.step(i),
            actions
          )
        }

        this.story.go(this.seq.current());
      },

      changeSlide: function(n) {
        this.seq.current(n);
      }
    });