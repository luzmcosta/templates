<?php

/**
 * This page leverages the Database class to return a JSON response to a
 * database request.
 * 
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

// Import.
require_once('database.php');

$request = $_REQUEST;

// @todo Validate.

// Set database.
$db = new Database;
$fields = $db->fields($request);

// Set query.
$query = (object) null;
$query->type = $_SERVER['REQUEST_METHOD'];
$query->table = $request['resource'];
$query->fields = ( ($query->type === 'POST') ? '('.$fields->name.')' : $fields->name );
$query->records = '('.$fields->value.')';

// Set connection.
$connect = $db->query($query);

// Return response.
if ( $connect ) {
    $status = $connect->meta->status;
	print '{
	    status: ' . $status . ',
	    response: ' . json_encode($connect->data) . '
    }';
} else {
    print json_encode('{
        status: "error",
        response: 500,
        message: "Connection Error"
    }');
}