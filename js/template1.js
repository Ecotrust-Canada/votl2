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
		//miniMap.addTo(map);
		luplabel.addTo(map);
		onaboundary.addTo(map);
		boundarylabel.addTo(map);
		lupline.addTo(map);
		placenameslayer.addTo(map).bringToFront();
		reserves.addTo(map).bringToFront();
		map.addLayer(markers);
        //placenameslayerp.addTo(map);
        //lakenamelayer.addTo(map);
        backbutton.addTo(map);
		

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