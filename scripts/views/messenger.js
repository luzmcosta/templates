/**
 * Oversees the application's messages.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 03.16.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"interface",
	"messages"
], function( $, _, Backbone, Interface, Messages ) {
	"use strict";

	var Messenger = Backbone.View.extend({
		el: ".content",
		collection: new Messages(),
		template: Interface.template.message,
		initialize: function() {},
		render: function( model, type ) {
			var template = Interface.template[ type ] || this.template;

			this.$el.append( template( model ) );

			return this;
		},
		/**
		 * Sets header views, then renders.
		 */
		view: function() {
			var $this = this,
				messages = $this.collection.attributes;

            // Process messages' data here if necessary.

			// Set new messages on collection.
			$this.collection.set({ messages: messages });

			// Render message.
			$this.render( messages, "message" );
		}
	});
	
	return Messenger;
});