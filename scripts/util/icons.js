/**
 * Manages icons.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"jqueryui",
	"underscore",
	"api",
	"validation",
	"text!templates/footer.html",
	"text!templates/input.html",
	"text!templates/list.html",
	"text!templates/message.html"
], function( $, $ui, _, API, Validator, Input, List, Message ) {
	"use strict";

	var Icons = {
		/** 
		 * Icon classes.
		 */
		alert: "icon fa fa-exclamation-sign",
		asc: "icon fa fa-sort-asc",
		caveat: "icon fa fa-asterisk",
		comment: "icon fa fa-comment",
		edit: "icon fa fa-pencil",
		email: "icon fa fa-envelope",
		error: "icon fa fa-exclamation",
		exit: "icon fa fa-times",
		filter: "icon fa fa-filter",
		help: "icon fa fa-question",
		info: "icon fa fa-info-circle",
		menu: "icon fa fa-bars",
		person: "icon fa fa-user",
		people: "icon fa fa-group",
		refresh: "icon fa fa-rotate-right",
		schedule: "icon fa fa-calendar-o",
		search: "icon fa fa-search",
		settings: "icon fa fa-cog",
		sort: "icon fa fa-sort",
		toggleUp: "icon fa fa-caret-right",
		toggleDown: "icon fa fa-caret-down",
		trash: "icon fa fa-trash",
		warn: "icon fa fa-warning"
	};

	return Icons;
});