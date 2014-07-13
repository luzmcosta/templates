/**
 * Manages application's templates.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"underscore",
	"text!templates/dialog.html",
	"text!templates/input.html",
	"text!templates/list.html",
	"text!templates/message.html",
	"text!templates/table.html"
], function( $, _, Dialog, Input, List, Message, Table ) {

	"use strict";

	var Templates = {
		dialog: _.template( $( Dialog ).html() ),
		input: _.template( $( Input ).html() ),
		list: _.template( $( List ).html() ),
		message: _.template( $( Message ).html() ),
		table: _.template( $( Table ).html() )
	};

	return Templates;
});