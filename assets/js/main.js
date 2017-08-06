/*
* Tipeo en section de Bienvenida (made by vipul mirajkar thevipulm.appspot.com)
*/
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};
window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.02em solid #235764}";
    document.body.appendChild(css);
};


/*
* Mapa
*/
$( document ).ready(function() {
    map();
});

/*
 * Mapa
 */
function map() {
    var latitud = -33.4724728;
    var longitud = -70.9100251;
    var latitudColombia = 4.6482837;
    var longitudColombia = -74.2478955;

    var map = new google.maps.Map(document.getElementById("map"),{
        zoom: 2,
        center: {lat: latitud, lng: longitud},
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl:false
    });

    var icono = {
        url: 'http://www.myiconfinder.com/uploads/iconsets/256-256-6096188ce806c80cf30dca727fe7c237.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
    };

    var markerColombia = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icono,
        anchorPoint: new google.maps.Point(0, -29)
    });

    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icono,
        anchorPoint: new google.maps.Point(0, -29)
    });

    marker.setPosition(new google.maps.LatLng(latitud,longitud));
    markerColombia.setPosition(new google.maps.LatLng(latitudColombia,longitudColombia));
}

// Scrollspy
$('body').scrollspy({ target: '.navbar', offset: 100 });

/*
 * Scroll variations
 */


$(window).scroll(function() {
    /*$("span").css("display", "inline").fadeOut("slow");*/
    if($(window).scrollTop() > 100) {
        $(".navbar").removeClass('navbar--transparent');
    } else {
        $(".navbar").addClass('navbar--transparent');
    }
});

$(".navbar__item").on("click", function(event){
    var destino = $(this.getAttribute('href'));

    if( destino.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: destino.offset().top-50
        }, 1000);
    }
    
    /* ANIMACIÓN DE SECCIONES */
    var section = destino[0].id;
    $("#"+section).fadeOut();
    $("#"+section).fadeIn("slow");
    /*$("#"+section).slideUp();
    $("#"+section).slideDown();*/
    /*$("#"+section).animate({opacity: '0.5'});
    $("#"+section).animate({opacity: '1'});*/
});