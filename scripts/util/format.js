/**
 * The Format object offers application utilities that convert objects
 * to desirable formats.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 03.01.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore",
	"dates"
], function( $, _, Dates ) {

	"use strict";

	/**
	 * Format ...
	 *
	 * @todo Write method that will accept any type and format according to
	 * that type and any other passed parameters.  All arguments but the first
	 * should be callbacks.
	 */
	var Format = {
		/**
		 * Converts given array-like object into true array.
		 *
		 * @param {array} Array-like object called arguments
		 * @return {array} The given object as an array.
		 */
		array: function( args ) {
			return Array.prototype.slice.call( args );
		},
		/**
		 * Formats money as USD.
		 *
		 * @param {int} The dollar amount.
		 * @param {int} The decimal places to keep.
		 * @return {string} The given dollar amount formatted to USDs &
		 * rounded to the given decimal place.
		 */
		money: function( amount, decimals ) {
			// Set the decimal places to keep.
			decimals = decimals || 0;

			// Set decimal places; Set commas every 3 digits.
			amount = ( amount ).toFixed( decimals );
			amount = this.setCommas( amount );

			// Prepend dollar symbol.
			amount = "$" + amount;

			return amount;
		},
		/**
		 * Formats digits to have a comma every third place.
		 */
		setCommas: function( digits ) {
			digits = digits
				.toString()
				.replace( /(\d)(?=(\d\d\d)+(?!\d))/g, "$1," );

			return digits;
		},
		/**
		 * Returns given string space-delimited with title case.
		 *
		 * @usedBy Deliveries.View
		 */
		capitalize: function( word ) {
			var $this = this,
				titleCase;

			titleCase = word.replace( /([a-z])([A-Z])/g, "$1 $2" )
				.replace( /\b[a-z]/g,
					function( letter ) {
						return letter.toUpperCase();
					}
				);

			return titleCase;
		},
		/**
		 * Gets the given property from the object and moves it to the end.
		 *
		 * @param {string} The name of the property to reorganize.
		 * @param {object} The object, with the given property, to reorganize.
		 * @return {object} The reorganized object.
		 */
		prioritize: function( key, obj ) {
			var value, sorted;
			// Save the value.
			value = obj[ key ];

			// Clone the object without the given key.
			sorted = _.omit( obj, key );
			// Add the key-value pair to the cloned object.
			sorted[ key ] = value;

			// Return the object with the new order.
			return sorted;
		}
	};

	return Format;
});