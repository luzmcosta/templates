/**
 * Configures application to access API.
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"server"
], function( SERVER ) {

	"use strict";

	/**
	 * Define API configurations.
	 *
	 * @todo Set this object to accept and interpret arguments, such
	 * as different version numbers.
	 */
	var API = (function() {
		var config = {};

		// The state of the API. Application will react accordingly.
		config.debug = false;

		// The name of the represented API.
		config.module = "alpha";

		// The ssl property should be set to true during deployment.
		config.ssl = true;

		// Location method uses the stage value to set URIs.
		config.stage = "prd";

		// The version of the API the application uses in development.
		config.beta = "1";

		// Set user groups' rights to the application's data.
		config.rights = {
			subordinate: {
				group: "standard",
				type: "external"
			},
			master: {
				group: "premium",
				type: "external"
			},
			staff: {
				group: "staff",
				type: "internal"
			},
			admin: {
				group: "admin",
				type: "internal"
			}
		};

		// The latest production-ready version of the API.
		config.version = "1";

		// The path to the API endpoints.
		config.path = {
			beta: "stage/v" + config.beta + "/",
			prd: "api/v" + config.version + "/",
			test: "tests/mocks/api/"
		};

		// The paths to resources the application uses.
		config.asset = {
			media: "media/",
			scripts: "scripts/",
			styles: "styles/"
		};

		/**
		 * Gets the configuration property.
		 */
		config.get = function( property ) {
			return ( config[ property ] || false );
		};

		/**
		 * Constructs the location of an endpoint or resource.
		 *
		 * @param {string} Environment in which the code will run, such as prd.
		 * @param {string} The endpoint or, if resource, the path to it.
		 * @param {object} An object w/ the name and type of resource to get.
		 */
		config.location = function( type, resource, env ) {
			var path = ( ( config.path[ type ] ) ? "path" : "asset" ),
				properties = config.get( path ),
				basepath = SERVER.get( "basepath" ),
				uri = "";

			// Validate values. Defaults to environment variable.
			env = env || config.stage;

			// Set host on URI.
			uri += SERVER.get( env );


			if ( ( type !== "link" && type!== "api") && basepath && ( basepath !== "/" ) ) {
				uri += basepath;
			}

			// Set path to resource.
			if ( type && properties && properties[ type ] ) {
				uri += properties[ type ];
			}

			if ( type === "api") {
				uri += config.path[ config.stage ];
			}

			// Set resource identifier on path.
			if ( resource ) {
				uri += resource;
			}

			// Remove any slash that may appear before a port number.
			uri = uri.replace( /\/:/, ":" );

			return uri;
		};

		return config;
	})();

	return API;
});
