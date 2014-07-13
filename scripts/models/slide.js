/**
 * This model keeps track of the slider's state and corresponding data.
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

	var Slide = Backbone.Model.extend({
		defaults: {},
		initialize: function() {}
	});

	return Slide;
});