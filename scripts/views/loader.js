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
	"nodes",
	"loader"
], function( $, _, Backbone, Nodes, Loader ) {

	"use strict";

	var LoaderView = Backbone.View.extend({
		el: "div.content",
		model: new Loader(),
		template: Nodes.template.message,
		initialize: function() {},
		/**
		 * Sets loader on view.
		 */
		render: function( model, type ) {
            // Clear view.
            this.remove();

			// Get template.
			var template = Nodes.template[ type ] || this.template;

			// Set new view.
			this.$el.append( template( this.model.defaults ) );

			return this;
		},
		/**
		 * Sets header views, then renders.
		 */
		remove: function() {
			var loader = this.$el.find( "div.loader" );

			if ( loader ) {
				// Remove loader from view, originally set by user collection.
				loader.remove();
			}
		}
	});
	
	return LoaderView;
});