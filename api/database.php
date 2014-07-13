<?php

/**
 * The Database Class acts as the database connector.
 * 
 * @link http://www.php.net/manual/en/mysqli.overview.php
 * 
 * @author Luz M. Costa <luzmcosta@gmail.com>
 * @updated 07.12.2014
 * @version 0.1
 */

// Error reporting.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(-1);

class Database {
	private $host = '';
	private $username = '';
	private $password = '';
	private $db = '';
	
	/**
	 * Set constructor method.
	 */
	function __construct() {
	    
	}
	
	/**
	 * Returns the table name in the database.
	 * 
	 * @todo Add validation checking that table exists.
	 */
	protected function table($type) {
	    return $type;
	}
	

    /**
     * Returns the field names and the field values as strings.
     * 
     * Logic:
     * foreach of the items in the array,
     * get the key, and add that key to a string
     * then get the value, and that to a string
     * close the foreach
     * return the resulting strings as properties of the fields variable
     */
    public function fields($query) {
        // Instantiate mysqli.
        $connect = $this->connect();
        
        // Set variables.
        $fields = (object) null;
        $fields->name = '';
        $fields->value = '';
        $irrelevant = array("resource", "__qca", "__utma");
        $numeric = array("id", "latitude", "longitude", "amount");
        $i = 0;
        
        // Loop through request object to construct db query string.
        foreach($query as $name => $property ) {
            // Set delimiter.
            $delimiter = ( ($fields->name !== '') ? ',' : '' );

            // Increment counter.
            $i++;
            
            // Ignore blacklisted columns. Do not add to db query string.
            if ( in_array($name, $irrelevant) ) {
                continue;
            }
            
            // Set db query string according to request.
            if (!is_array($property)) {
                $fields->name .= ( $name !== "*" ) ? $delimiter . '`' . $name . '`' : $name;
                    
                if (is_bool($property) || in_array($name, $numeric)) {
                    $fields->value .= $delimiter . $property;
                    continue;
                }
                
                // Build a string for a where statement.
                ( ($fields->name === '*') 
                    ? $fields->value .= $delimiter . '"' . $property . '"'
                    : $fields->value .= $delimiter . '"' . $property . '"'
                );
            } else {
                foreach($property as $subname => $subproperty ) {
                    // Set delimiter.
                    $delimiter = ( ($fields->name !== '') ? ',' : '' );
                    
                    // Set field name on string.
                    $fields->name .= $delimiter . '`' . $subname . '`';
                    
                    if (is_bool($subproperty) || in_array($subname, $numeric)) {
                        $fields->value .= $delimiter . $subproperty;
                        continue;
                    }
                    
                    ( (is_array($subproperty)) 
                        ? $fields->value .= $delimiter . '"' . $subproperty . '"'
                        : $fields->value .= $delimiter . '"' . $subproperty . '"'
                    );
                }
            }
        }

        return $fields;
    }
    
	/**
	 * Connector.
	 * 
	 * @since 0.0.1
	 * @return object Response from the database, whether an error or resource.
	 */
	public function connect() {
	    $connect = new mysqli(
            $this->host,
            $this->username,
            $this->password,
            $this->db
	    );
	    
	    return $connect;
	}
	
	public function setQuery($request, $db_table) {
        $query = '';
        
        switch ($request->type) {
            case 'POST':
                $query = 'INSERT INTO '
                    . '`' . $db_table . '`'
                    .' ' . $request->fields
                    .' VALUES ' . $request->records;
                break;
            case 'GET':
                $query = 'SELECT '
                    . ($request->fields !== '*') ? '*' : $request->fields
                    . ' FROM ' . $db_table;
                break;
            default:
                return FALSE;
        }
        
        return $query;
	}
	
	/**
	 * Construct the query string based on the given request object.
	 */
	public function request($request) {
	    $query = (object) null;
	    $query->meta = (object) null;
	    
	    // Get database table.
	    $connect = $this->connect();
	    $db_table = $this->table($request->table);
	    
	    // Validate.
        $query->meta->status = 'error';
        
        if ($connect->connect_errno) {
            $query->response = $connect->connect_error;
            
            return FALSE;
        }
        
        // Set query string according to request type.
        $query->request = $this->setQuery($request, $db_table);
        
        if ($query === FALSE) {
            return FALSE;
        }
        
        $query->connector = $connect;
        $query->request = $connect->query($query->request);
        $query->response = ($request->type === "GET")
            ? $query->request->fetch_assoc()
            : $query->request;
        $query->meta->status = 'success';
        print_r($query);
        return $query;
	}
	
	/**
	 * Queries the database.
	 * 
	 * @since 0.0.1
	 * @param string Table is the name of the table to query.
	 * @param string Request is the specific query on the given table.
	 * @return object A status and corresponding data.
	 */
	public function query($request) {
	    $database = $this;
	    $connection = (object) null;
	    $connection->meta = (object) null;
	    
	    // Validate.
	    $connection->meta->status = 'error';
	    
        // Send request.
        $query = $database->request($request);
	    
        // Validate response from request.
        if ($query === FALSE) {
            $connection->data = FALSE;
            return $connection;
        }
        
        // Set response on return object.
        $connection->meta->status = 'success';
        $connection->meta->total = ($request->type === "GET") ? $query->request->num_rows : "*";
        $connection->data = $query->response;
	    
        // Free result set.
        $query->connector->close();
        
        return $connection;
	}
	
	public function test() {
	    $connect = $this->connect();
	    $connection = (object) null;
	    
	    // Validate.
	    $connection->status = 'error';
	    if ($connect === FALSE) {
            return $connection;
        }
	    
	    $connection->status = 'success';
	    $connection->data = $connect;
	    
	    return $connection;
	}
}