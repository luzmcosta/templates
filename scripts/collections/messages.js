/**
 * A collection of the the messages to the user.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"message"
], function( $, _, Backbone, Message ) {

	"use strict";

	var Messages = Backbone.Collection.extend({
		model: new Message(),
		initialize: function() {}
	});

	return Messages;
});