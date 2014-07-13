/**
 * Contains validation utilities.
 *
 * @author Luz M Costa <luzmcosta@gmail.com>
 * @updated 03.01.2014
 * @version 0.1.0
 */

define([
	"jquery",
	"underscore"
], function( $, _ ) {

	var Validator = {
		validate: function( condition ) {
			if ( condition ) {
				return true;
			}

			return false;
		},
	};

	return Validator;
});