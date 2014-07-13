/**
 * Sets server configurations.
 *
 * Dynamically generates location values based on regular expressions,
 * removing need to update location values during deployment.
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"underscore"
], function( $, _ ) {

	"use strict";

	/**
	 * Define sever configurations.
	 *
	 * @return {object} Object of server configurations and variables.
	 * @note Partially repeated in app.js. Resolution needed.
	 */
	var SERVER = (function() {
		var config = {};

		/**
		 * Retrieves the configuration property.
		 */
		config.get = function( name ) {
			return config[ name ];
		};

		/**
		 * Configure server properties.
		 */
		config.home = "/";

		config.host = _getBase();

		config.prd = "//project.com/";

		config.beta = "//beta.project.com/";

		config.routes = {
			home: "",
			messages: "messages/"
		};

		config.basepath = _getPath();

		config.parseIni = function( ini ) {
			var settings = {};

			// Format response before parsing.
			ini = ini.split( /[\n\r]/ );

			_.each( ini, function( pair, index ) {
				if ( !pair || pair.charAt(0) === "#" ) {
					return;
				}

				pair = pair
					.toString()
					.replace( /\s/, "" )
					.split( "=" );

				// Set env & secrets on config.
				settings[ pair[0] ] = pair[ 1 ];
			});

			return settings;
		};

		config.setEnv = function( data, status, xhr ) {
			var response = data || false;

			// Handle error: Failed to Load Environment.
			if ( !response || status !== "success" ) {
				return false;
			}

			// Parse ini-style response if necessary.
			if ( typeof response === "string" && response.charAt(0) === "#" ) {
				// Format response before parsing.
				response = config.parseIni( response );
			}

			// Parse malformed JSON response if necessary.
			if ( typeof response === "string" && response.charAt(0) === "{" ) {
				response = $.parseJSON( response );
			}

			return response;
		};

		config.getEnv = function() {
			var request = {},
				// Set URI based on environment: browser vs. Node.
				url = ( ( window.location.pathname === "/tests/" )
					? "../../../config.json"
					: "../config.json" );

			request = $.ajax({
				data: {},
				url: url,
				type: "GET"
			});

			return request;
		};

		/**
		 * Construct the base URL using the window object.
		 *
		 * @private
		 */
		function _getBase() {
			var protocol = window.location.protocol + "//",
				host = window.location.host;
			return protocol + host;
		}
		/**
		 * To avoid building broken routes because window.location.pathname
		 * may contain other path variables, we manually set the path.
		 *
		 * @private
		 */
		function _getPath() {
			var path = "",
				pathname = window.location.pathname,
				port = window.location.port,
				href = window.location.href,
				basepath,
				index,
				regex,
				slash,
				subpaths;

			// Set path according to environment.
			$.each( config.routes, function( page, address ) {
				// Set this path as regular expression.
				regex = new RegExp( address );

				// If this path is found in the pathname, deduce basepath.
				if ( regex.test( pathname ) ) {
					// Find the length of the resulting array of values.
					subpaths = pathname.split( "/" );

					// Get index of the address variable.
					index = $.inArray( address, subpaths );

					// Get after first slash up to address variable's value.
					subpaths = subpaths.slice( 1, index - 1 );

					// Add port if set on window's href property.
					if ( port && /:/.test( href ) ) {
						subpaths.unshift( ":" + port );
					}

					// Join each value of new array with a slash.
					// If array is length of 1, will not join.
					path = subpaths
						.join( "/" )
						// Remove any slash prepended to the port.
						.replace( /\/:/, ":" );

					// If path does not end in slash, append slash.
					slash = path.charAt( path.length - 1 );
					path += ( ( slash === "/" ) ? "" : "/" );
				}
			});

			return path;
		}

		return config;
	})();

	return SERVER;
});
