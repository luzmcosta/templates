/**
 * This model keeps track of the header's state.
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

	var Header = Backbone.Model.extend({
		defaults: {},
		initialize: function() {}
	});

	return Header;
});