/**
 * The Interface object offers application utilities.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

define([
	"jquery",
	"underscore",
	"backbone",
	"format",
	"message"
], function( $, _, Backbone, Format, Message ) {

	/**
	 * - Manages module lifecycle.
	 * - Extends other objects.
	 */
	var Interface = {
		/**
		 * Subscribers.
		 *
		 * The modules the application is manipulating at any given time.
		 */
		modules: {},
		/**
		 * Enables retrieving a module.
		 *
		 * @todo Add validation.
		 */
		get: function( type ) {
			return this.modules[ type ];
		},
		/**
		 * Constructor method adds default views to this.modules.
		 */
		start: function() {
			var $this = this,
				args = this.array( arguments ),
				type = args.shift(),
				modules = args;

			$.each( modules, function( index, module ) {
				$this.subscribe( type, module );
			});

			$this.publish( type );
		},
		/**
		 * Subscribes modules by adding them to this.modules.
		 */
		subscribe: function( type, fn ) {
			type = type || "view";
			if ( typeof this.modules[ type ] === "undefined" ) {
				this.modules[ type ] = [];
			}

			// Adds new modules to current.
			// @todo Repair this condition.
			this.modules[ type ] = fn;

            return this.modules[ type ];
        },
		/**
		 * Publish by initializing each registered module.
		 */
		publish: function( type ) {
			// Set each view on the DOM.
			$.each( this.modules[ type ], function( type, Module ) {
				new Module();
			});

			return this.modules;
		},
		/**
		 * Unsubscribe by removing modules from subscription.
		 */
		unsubscribe: function() {
			var $this = this;

			$.each( arguments, function( key, value ) {
				if ( $this.modules[ key ] ) {
					delete $this.modules[ key ];
				}
			});

			return this.modules;
		},
		/**
		 * Extend object with another object's functionality.
		 */
		lesson: function( fn ) {
			_.extend( this, fn );
			return this;
		},
		/**
		 * Extend 'this' with any number of objects. 'this' can be set w/ bind.
		 *
		 * The method can take any number of arguments, but 'this' must be
		 * an object.
		 */
		learn: function() {
			var $this = this,
				fns = Format.array( arguments );

			_.each( fns, function( fn ) {
				$this.lesson( fn );
			});

			return this;
		},

		/**
		 * Posts a request
		 *
		 * @param {obj|string} data object or serialized array
		 * @param {string} url or path
		 * @return {obj} request
		 */
		request: function( data, url, type, customProp ) {
			// Cache model; Set request object.
			var $this = this,
				request,
				properties = {
					type: type || "POST",
					url: url,
					data: data
				};

			// Set custom parameters on request before sending it.
			if ( customProp !== ( false || undefined ) ) {
				properties = $this.loop( properties, customProp );
			}

			request = $.ajax( properties );

			// Return AJAX request object
			return request;
		},
		/**
		 * Uses this.request to execute an AJAX GET request for JSON data.
		 */
		getJSON: function( data, url ) {
			var request = this.request( data, url, "GET", {
				dataType: "json"
			});

			return request;
		},
		/**
		 * Parses the response to an AJAX request.
		 *
		 * @param {object} The request object returned by the $.ajax call.
		 */
		getResponse: function( request ) {
			var response = {
					status: "error",
					data: null
				},
				text;

			// Catch for malformed JSON.
			text = ( request.responseJSON || request.responseText );

			if ( !text || text == ( null || "undefined" ) ) {
				var error = ( ( typeof text === "string" )
						? $.parseJSON( text )
						: text
					),
					message = ( ( !error || !error.message )
						? Message.defaults.unknown
						: error.message
					);

				response.data = message;
			} else {
				response.data = (
					( ( text === "" ) || $.isArray( text ) || request.responseJSON )
					? text
					: $.parseJSON( text )
				);

				// Reset status.
				if ( response.data && ( request.status === 200 ) ) {
					response.status = "success";
				}
			}

			return response;
		},
	};

	return Interface;
});