/**
 * A collection of the the header's states.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"header"
], function( $, _, Backbone, Header ) {

	"use strict";

	var Headers = Backbone.Collection.extend({
		model: new Header(),
		initialize: function() {}
	});

	return Headers;
});