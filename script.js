document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from PHP script
    function fetchData() {
        fetch('generate_chart.php')
            .then(response => response.json())
            .then(data => {
                const labels = data.map(item => item.category);
                const values = data.map(item => item.value);

                // Create pie chart using Chart.js
                var ctx = document.getElementById('myPieChart').getContext('2d');
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: values,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                // Add more colors as needed
                            ],
                        }],
                    },
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Add event listener to form submission
    const dataForm = document.getElementById('dataForm');
    dataForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const category = document.getElementById('category').value;
        const value = document.getElementById('value').value;

        // Add data to the database using fetch
        fetch('add_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `category=${encodeURIComponent(category)}&value=${encodeURIComponent(value)}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Data added successfully, fetch updated chart data and redraw the chart
                fetchData();
            } else {
                console.error('Error adding data:', data.message);
            }
        })
        .catch(error => console.error('Error adding data:', error));
    });

    // Initial fetch and chart creation
    fetchData();
});
