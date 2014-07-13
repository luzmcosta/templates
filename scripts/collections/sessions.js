/**
 * A collection of a session's states.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"session"
], function( $, _, Backbone, Session ) {

	"use strict";

	var Sessions = Backbone.Collection.extend({
		model: new Session(),
		initialize: function() {}
	});

	return Sessions;
});