/**
 * This model keeps track of the app's notifications to the user.
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

	var Message = Backbone.Model.extend({
		defaults: {
			debugging: "Please excuse us while we improve the product.",
			session: "Error constructing session.",
			timeOut: "The application took too long to respond. "
                + "Please try again later.", // 504
			input: "Unexpected input.",
			noResults: "Your search returned no results.",
			notFound: "Page not found.", // 404,
			restricted: "You have entered a restricted area.",
			server: "Internal Server Error", // 500
			unauthorized: "You are not authorized.  Please " +
                "<a href='/blog/wp-login.php'>log in</a>.",
			unknown: "Unexpected error."
		},
		initialize: function() {}
	});

	return Message;
});