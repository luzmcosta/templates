/**
 * A collection of the the menu's states.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"menu"
], function( $, _, Backbone, Menu ) {

	"use strict";

	var Menus = Backbone.Collection.extend({
		model: new Menu(),
		initialize: function() {}
	});

	return Menus;
});