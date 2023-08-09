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
    die("Connection failed: " . $conn->connect_error);
}

// Query to retrieve data for the pie chart
$sql = "SELECT category, value FROM chart_data";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        'category' => $row['category'],
        'value' => intval($row['value'])
    ];
}

// Close the database connection
$conn->close();

echo json_encode($data);
