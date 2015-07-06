    var resizePID;

    function clearResize() {
      clearTimeout(resizePID);
      resizePID = setTimeout(function() { adjustSlides(); }, 100);
    }

    if (!window.addEventListener) {
      window.attachEvent("resize", function load(event) {
        clearResize();
      });
    } else {
      window.addEventListener("resize", function load(event) {
        clearResize();
      });
    }

    function adjustSlides() {
      var container = document.getElementById("slides_container"),
          slide = document.querySelectorAll('.selected_slide')[0];

      if (slide) {
        if (slide.offsetHeight+169+40+80 >= window.innerHeight) {
          container.style.bottom = "80px";

          var h = container.offsetHeight;

          slide.style.height = h-169+"px";
          slide.classList.add("scrolled");
        } else {
          container.style.bottom = "auto";
          container.style.minHeight = "0";

          slide.style.height = "auto";
          slide.classList.remove("scrolled");
        }
      }
    }

    var resizeAction = O.Action(function() {
      function imageLoaded() {
        counter--;

        if (counter === 0) {
          adjustSlides();
        }
      }
      var images = $('img');
      var counter = images.length;

      images.each(function() {
        if (this.complete) {
          imageLoaded.call( this );
        } else {
          $(this).one('load', imageLoaded);
        }
      });
    });

    function click(el) {
      var element = O.Core.getElement(el);
      var t = O.Trigger();

      // TODO: clean properly
      function click() {
        t.trigger();
      }

      if (element) element.onclick = click;

      return t;
    }