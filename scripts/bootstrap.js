/**
 * Initializes application.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"backbone",
	"routers"
], function( $, Backbone, Router ) {
	"use strict";

	var initialize = function( env ) {
		// Initialize Router.
		Router.initialize( env );
	};

	return {
		initialize: initialize
	};
});