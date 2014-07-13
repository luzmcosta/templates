/**
 * Renders menu area through which navigation occurs.
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
	"menu"
], function( $, _, Backbone, Interface, Menu ) {
	"use strict";

	var MenuView = Backbone.View.extend({
		el: ".content",
		model: new Menu(),
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
	
	return MenuView;
});