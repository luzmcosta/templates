/**
 * Manages DOM-related methods.
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
    "message",
    "interface"
], function( $, $ui, _, API, Message, Interface ) {

	"use strict";

	var Nodes = {
		/**
		 * Returns the alternate class of an element based on its current class.
		 *
		 * @param {string} The element's selector.
		 * @param {string} The class on the element's initial state.
		 * @param {string} The class on the element's selected state.
		 * @return {string} The element's new class.
		 * @uses DOM
		 */
		toggleClass: function( element, initial, selected ) {
			var newClass = initial;

			if ( $( element ).hasClass( initial ) ) {
				// Remove current class.
				$( element ).toggleClass( initial );
				// Set new class on element.
				newClass = selected;
			} else {
				// Remove current class.
				$( element ).toggleClass( selected );
			}

			return newClass;
		},
		/**
		 * Toggles an element's class.
		 */
		toggleTrigger: function( trigger, initial, selected ) {
			var $this = this;

			// Set classes.
			initial = initial || "fa-caret-right";
			selected = selected || "fa-caret-down";

			// Update element's class.
			trigger.toggleClass(function() {
				// Set new class on clicked element.
				return $this.toggleClass( this, initial, selected );
			});
		},
		/**
		 * Renders view into given container. Renders banner on error.
		 *
		 * @note Can be executed in conjunction with bind.
		 */
		display: function ( container, content, properties, speed, template, callback ) {
			var $this = this;

			if ( container === ( false || undefined ) ) {
				var message = {
					icon: $this.icon.alert,
					message: Message.defaults.unknown
				};

				$( ".content" ).prepend( $this.template.message( message ) );

				return this;
			}

			// If render is called by a function.
			$( container ).animate(
				properties || {},
				( speed || 500 ),
				"linear",
				function( event ) {
					if ( !content && !callback ) {
						return true;
					}

					if ( callback ) {
						callback( template );
						return true;
					}

					switch( content ) {
						case "append":
							$( container ).append( template );
							break;
						case "prepend":
							$( container ).prepend( template );
							break;
						case "empty":
							$( container ).empty();
							break;
						case false:
							// Do nothing.
							break;
						default:
							$( container ).empty().html( content );
							break;
					}
				}
			);

			// Return View.
			return this;
		},
		setTooltips: function( element, state, customProperties ) {
			var $this = this,
				properties = {
					tooltipClass: "tooltip",
					position: {
						my: "center top-60",
						at: "center"
					}
				};

			// Set additional parameters based on state
			if ( state === "initialize" ) {
				properties.items = "button";
			} else if ( customProperties ) {
				// Reset any properties on the tooltip.
				$.each( customProperties, function( key, value ) {
					properties[ key ] = value;
				});
			}

			$( element ).tooltip( properties );
		},
		setDialog: function( element, customize ) {
			var $this = this,
				properties = {
				// @bug autoOpen: false,
				title: "Template project",
				closeOnEscape: true,
				closeText: "",
				resizable: true,
				modal: true,
				close: function() {
					$( element ).empty();
					$( "body" ).css( "overflow", "scroll" );
				},
				open: function() {
					// Set overlay's position relative to the viewable window.
					var widget = $( this ),
						offset = $( window ).scrollTop(),
						height = $( document ).height(),
						overlay = {
							"height": height,
							"background": "rgba(0, 0, 0, 1)",
							"position": "relative",
							"opacity": "0.8",
							"z-index": "20"
						};

					// Positions overlay
					// Sets onclick event on area outside the dialog: dialog closes.
					$( ".ui-widget-overlay" )
					.css( overlay )
					.click(function() {
						widget.dialog( "close" );
					});

					if ( customize.subtitle ) {
						$( ".ui-dialog-title" ).append( "<br /><div class='subtitle'>" + customize.subtitle + "</div>" );
					}

					// Set dialog's closing icon.
					$( ".ui-dialog-titlebar-close .ui-button-icon-primary" )
					.removeClass( "ui-button-icon-primary ui-icon ui-icon-closethick" )
					.addClass( "icon fa fa-times-circle" );

					// Unsets default focus dialog UI sets on first button.
					$( ".ui-dialog button" ).blur();
				},
				show: {
					effect: "linear",
					duration: 500
				},
				hide: {
					effect: "linear",
					duration: 500
				},
				create: function( event, ui ) {
					var $this = $( this ).dialog( "widget" ),
						widget = $( event.target );
				},
				height: "auto",
				width: 500
			};

			// Reset any properties on the dialog.
			if ( customize !== undefined ) {
				$.each( customize, function( key, value ) {
					properties[ key ] = value;
				});
			}

			// initialize dialog.
			$( element ).dialog( properties );
		}
	};

	return Nodes;
});