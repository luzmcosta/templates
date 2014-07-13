/**
 * Renders header area at the top of the application.
 *
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"interface",
	"header",
	"menu"
], function( $, _, Backbone, Interface, Header, Menu ) {

	"use strict";

	var HeaderView = Backbone.View.extend({
		el: "div.content",
		model: new Header(),
		template: Interface.template.list,
		initialize: function() {
            this.view();
		},
		render: function( model, type ) {
			if ( $( ".loader" ) ) {
				// Remove loader from view, originally set by user collection.
				$( ".loader" ).remove();
			}

			var template = Interface.template[ type ] || this.template;

			this.$el.append( template( model ) );

			return this;
		},
		/**
		 * Sets header views, then renders.
		 */
		view: function() {
			var $this = this,
				items = $this.menu.attributes.items;

			// Render logo.
			$this.render( $this.model, "message" );

			// Set new menu as model.
			$this.menu.set({ items: items });

			// Render menu.
			$this.render( $this.menu, "list" );
		}
	});
	
	return HeaderView;
});