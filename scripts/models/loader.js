/**
 * This model keeps track of the loader.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone"
], function( $, _, Backbone ) {

	"use strict";

	var Loader = Backbone.Model.extend({
		defaults: {
    		icon: false,
			image: false,
			message: "Loading",
			type: "overlay loader"
		},
		initialize: function() {}
	});

	return Loader;
});