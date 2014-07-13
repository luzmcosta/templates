/**
 * @fileoverview Defines routers for Skylands Primary Pet Care.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

// Load dependencies.
define([
	"jquery",
	"underscore",
	"backbone",
	"server",
	"interface"
], function( $, _, Backbone, Server, Interface ) {
	"use strict";

	/**
	 * Define Controller.
	 *
	 * Calls the view at the appropriate routes.
	 */
	var Controller = Backbone.Router.extend({
		/**
		 * Prepare the environment path to use as a route.
		 */
		basepath: function( env ) {
			// Remove the starting slash.
			env = env.substring( 1 );

			return env;
		}
	});

	/**
	 * Define Controller's constructor.
	 */
	var initialize = function( env ) {
		console.log( "Controller has been initialized." );

		var controller = new Controller(),
            basepath = controller.basepath( env );

		/**
		 * Define routes.
		 */
		controller.route( basepath, "home" );
		controller.route( /^$(?!\w)/g, "home" );
		controller.route( /messages/, "messages" );

		/**
		 * Initialize routes.
		 */
		controller.on( "route:home", function() {
		});

		controller.on( "route:messages", function() {
		});

		/**
		 * Instantiate history and routers at document.ready.
		 */
		$(function() {
			if ( !Backbone.history.started ) {
				Backbone.history.start({ pushState: true });
			}
			
			console.log( "You are here: %o", Backbone.history.fragment );
		});
	};

	return {
		initialize: initialize
	};
});