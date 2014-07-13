/**
 * A collection of the slider's states.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"slide"
], function( $, _, Backbone, Slide ) {

	"use strict";

	var Slides = Backbone.Collections.extend({
		model: new Slide(),
		initialize: function() {}
	});

	return Slides;
});