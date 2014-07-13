/**
 * The RequireJS configuration of this template project.
 *
 * This file handles the configuration of JavaScript module loader,
 * RequireJS, at http://requirejs.org.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

/**
 * Dynamically generates path's value based on regex, removing the
 * the need to update it manually when moving between environments.
 *
 * @return {string} The path of the current environment.
 */

var BASEPATH = (function() {
	"use strict";

	/**
	 * Update path and routes variables as needed.
	 */
	var path = "/",
		pathname = window.location.pathname,
		basepath,
		index,
		slash,
		subpaths,
		regex = "",
		routes = {
			home: /^$(?!\w)/g,
			messages: /messages/
		};

	// Set path according to environment.
	for ( var here in routes ) {
		// Get value from object.
		regex = routes [ here ];

		// If current route does not represent current path, skip.
		if ( !regex.test( pathname ) ) {
			// If home, return pathname.
			// @note Problematic when paths become more numerous.
			if ( !routes.messages.test( pathname ) ) {
				return pathname;
			}

			continue;
		}

		// Find the length of the resulting array of values.
		subpaths = pathname.split( "/" );

		// Get index of the here variable.
		index = subpaths.indexOf( here );

		// Get after first slash up to here variable's value.
		subpaths = ( ( index !== -1 )
			? subpaths.slice( 1, index )
			: [ "" ] );

		// Join each value of new array with a slash.
		// If array is length of 1, will not join.
		path += subpaths.join( "/" );

		// If path does not end in slash, append slash.
		slash = path.charAt( path.length - 1 );
		path += ( ( slash === "/" ) ? "" : "/" );
	}

	console.log( "BASEPATH path %o", path );

	return path;
})();

/**
 * Sets script locations to the path key define() references.
 *
 * @constructor
 */
var config = {
	baseUrl: "includes/scripts",
	paths: {
		// Get application.
		bootstrap: "bootstrap",
		routers: "routers",
		templates: "templates",

		// Get configurations.
		api: "config/api",
		server: "config/server",

		// Get utilities.
		format: "util/format",
		icons: "util/icons",
		interface: "util/interface",
		nodes: "util/nodes",

		// Get models.
		header: "models/header",
		loader: "models/loader",
		menu: "models/menu",
		message: "models/message",
		session: "models/session",
		slide: "models/slide",

		// Get collections.
		headers: "collections/header",
		menus: "collections/menus",
		messages: "collections/messages",
		sessions: "collections/sessions",
		slides: "collections/slides",

		// Get views and routers.
		viewHeader: "views/header",
		viewLoader: "views/loader",
		viewMenu: "views/menu",
		viewMessenger: "views/messenger",
		viewSession: "views/session",
		viewSlider: "views/slider",

		// Get libraries.
		jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
		jqueryui: "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min",
		modernizr: "libraries/builds/modernizr",
		underscore: "libraries/builds/underscore",
		backbone: "libraries/builds/backbone"
	},
	// Identify dependencies and export variables for libraries using globals.
	shim: {
		jqueryui: {
            deps: [ "jquery" ],
            exports: "$"
        },
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore"],
			exports: "Backbone"
		}
	}
};

/**
 * Configure RequireJS.
 */
require.config( config );

// Load application logic after its dependencies.
require([ "bootstrap" ], function( Bootstrap ) {
	"use strict";

	Bootstrap.initialize( BASEPATH );
});