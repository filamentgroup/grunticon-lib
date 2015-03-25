/*global require:true*/
/*global __dirname:true*/
(function( exports ){
	'use strict';

	var path = require( "path" );
	var os = require( "os" );

	var Grunticon = require( path.join( __dirname, "..", "..", "lib", "grunticon-lib.js" ) );

	/*
		======== A Handy Little Nodeunit Reference ========
		https://github.com/caolan/nodeunit

		Test methods:
			test.expect(numAssertions)
			test.done()
		Test assertions:
			test.ok(value, [message])
			test.equal(actual, expected, [message])
			test.notEqual(actual, expected, [message])
			test.deepEqual(actual, expected, [message])
			test.notDeepEqual(actual, expected, [message])
			test.strictEqual(actual, expected, [message])
			test.notStrictEqual(actual, expected, [message])
			test.throws(block, [error], [message])
			test.doesNotThrow(block, [error], [message])
			test.ifError(value)
	*/

	exports.constructor = {
		setUp: function(done) {
			// setup here if necessary
			done();
		},
		noargs: function(test) {
			test.expect(1);

			test.throws(function(){
				new Grunticon();
			}, "No arguments should throw an error" );

			test.done();
		},
		twoargsFirstNotArray: function(test) {
			test.expect(1);

			test.throws(function(){
				new Grunticon("foo", "bar");
			}, "There needs to be two arguments. The first needs to be an Array" );

			test.done();
		},
		twoArgs: function( test ){
			test.expect(22);
			var grunticon = new Grunticon([path.join( __dirname, "files", "bear.svg")], path.join( __dirname, "output" ));

			// Required
			test.equal( grunticon.files[0], path.join( __dirname, "files", "bear.svg" ), "File should be set" );
			test.equal( grunticon.output, path.join( __dirname, "output" ), "Output should be set properly" );

			// Options Defaults
			test.equal( grunticon.options.datasvgcss, "icons.data.svg.css" );
			test.equal( grunticon.options.datapngcss, "icons.data.png.css" );
			test.equal( grunticon.options.urlpngcss, "icons.fallback.css" );
			test.equal( grunticon.options.previewhtml, "preview.html" );
			test.equal( grunticon.options.loadersnippet, "grunticon.loader.js" );
			test.equal( grunticon.options.cssbasepath, path.sep );
			test.equal( grunticon.options.cssprefix, ".icon-" );
			test.equal( grunticon.options.defaultWidth, "400px" );
			test.equal( grunticon.options.defaultHeight, "300px" );
			test.equal( grunticon.options.dynamicColorOnly, false );
			test.equal( grunticon.options.pngfolder, "png" );
			test.equal( grunticon.options.pngpath, "" );
			test.equal( grunticon.options.template, "" );
			test.equal( grunticon.options.tmpPath, os.tmpDir() );
			test.equal( grunticon.options.tmpDir, "grunticon-tmp" );
			test.equal( grunticon.options.previewTemplate, path.join( __dirname, "..", "..", "static", "preview.hbs" ) );
			test.equal( grunticon.options.compressPNG, false );
			test.equal( grunticon.options.optimizationLevel, 3 );
			test.equal( grunticon.options.enhanceSVG, false );
			test.equal( grunticon.options.corsEmbed, false );

			test.done();
		}
	};

}(typeof exports === 'object' && exports || this));
