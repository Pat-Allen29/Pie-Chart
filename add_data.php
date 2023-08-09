<?php
// Replace with your database credentials
$host = "localhost";
$username = "root";
$password = "";
$database = "chart";

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array('success' => false, 'message' => 'Connection failed: ' . $conn->connect_error)));
}

// Get data from POST request
$category = $_POST['category'];
$value = $_POST['value'];

// Insert data into the database
$sql = "INSERT INTO chart_data (category, value) VALUES ('$category', $value)";
if ($conn->query($sql) === TRUE) {
    // Data added successfully
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'message' => 'Error adding data: ' . $conn->error));
}

// Close the database connection
$conn->close();
