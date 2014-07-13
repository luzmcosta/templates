/**
 * Oversees the slider.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"interface",
	"sliders"
], function( $, _, Backbone, Interface, Sliders ) {
	"use strict";

	var Slider = Backbone.View.extend({
		el: ".content",
		collection: new Sliders(),
		template: Interface.template.list,
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
				slides = $this.collection.attributes;

            // Process slides data here if necessary.

			// Set new slides on collection.
			$this.collection.set({ slides: slides });

			// Render slider.
			$this.render( slides, "list" );
		}
	});
	
	return Slider;
});