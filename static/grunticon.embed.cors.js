/*global grunticon:true*/
(function(grunticon, window){
	"use strict";
	var document = window.document;

	// x-domain get (with cors if available)
	var ajaxGet = function( url, cb ) {
		var xhr = new window.XMLHttpRequest();
		if ( "withCredentials" in xhr ) {
			xhr.open( "GET", url, true );
		} else if ( typeof window.XDomainRequest !== "undefined" ) { //IE
			xhr = new window.XDomainRequest();
			xhr.open( "GET", url );
		}
		if( cb ){
			xhr.onload = cb;
		}
		xhr.send();
		return xhr;
	};

	var svgLoadedCORSCallback = function(callback){
		if( grunticon.method !== "svg" ){
			return;
		}

		grunticon.ready(function(){
			var existingStyle = window
				.document
				.querySelector( 'style[data-href$="'+ grunticon.href +'"]' );

			var ref = grunticon.getCSS( grunticon.href );
			callback = callback || function(){};

			if( existingStyle ){
				// NOTE this will do nothing at all if the embeds are already there
				// and the embed attribute has been removed. The only purpose for this
				// is if the markup has been "rerendered" in the page after the
				// initial embed at which point the embed attributes should exist and
				// the existing embeds should be gone
				grunticon.embedIcons( grunticon.getIcons( existingStyle ) );
				callback();
			} else if ( ref ) {
				ajaxGet( grunticon.href, function() {
					var style = document.createElement( "style" );
					style.innerHTML = this.responseText;
					style.setAttribute("data-href", grunticon.href);
					ref.parentNode.insertBefore( style, ref );
					ref.parentNode.removeChild( ref );
					grunticon.embedIcons( grunticon.getIcons( style ) );
					callback();
				});
			}
		});
	};

	grunticon.ajaxGet = ajaxGet;
	grunticon.svgLoadedCORSCallback = svgLoadedCORSCallback; //TODO: Deprecated
	grunticon.embedSVGCors = svgLoadedCORSCallback;

}(grunticon, this));
