// Wait until the DOM content is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const employeeTable1 = document.getElementById('employeeTable1');
    const employeeTable2 = document.getElementById('employeeTable2');
    const searchInput = document.getElementById('searchInput');
    const locationSelect = document.getElementById('locationSelect');
    const officeInfoSection = document.getElementById('officeInfoSection');

    // Initialize an empty array to hold employee data
    let employees = [];

    // Fetch employee data from a JSON file
    fetch('data/employees.json')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            employees = data; // Store the fetched data in the employees array
            displayEmployees(employees, locationSelect.value); // Display employees based on the selected location
            displayOfficeInfo(locationSelect.value); // Display office info based on the selected location

            // Add event listener to filter employees based on search input
            searchInput.addEventListener('input', () => {
                filterEmployees(employees);
            });

            // Add event listener to update displayed employees and office info when location changes
            locationSelect.addEventListener('change', () => {
                displayEmployees(employees, locationSelect.value); // Update employee display
                displayOfficeInfo(locationSelect.value); // Update office info display
                searchInput.value = ''; // Clear search input on location change
            });
        })
        .catch(error => console.error('Error fetching employee data:', error)); // Handle any errors in fetching data

    // Function to display employees based on location
    function displayEmployees(employees, location) {
        // Filter employees by location if a location is selected
        const filteredEmployees = location ? filterByLocation(employees, location) : employees;
        renderTables(filteredEmployees); // Render the filtered employees in the tables
    }

    // Function to filter employees based on search input
    function filterEmployees(employees) {
        const searchTerm = searchInput.value.toLowerCase(); // Get the search term in lowercase
        // Filter employees based on search term matching their firstname, lastname, or extension
        const filteredEmployees = employees.filter(employee =>
            employee.firstname.toLowerCase().includes(searchTerm) ||
            employee.lastname.toLowerCase().includes(searchTerm) ||
            employee.extension.toString().includes(searchTerm)
        );
        renderTables(filteredEmployees); // Render the filtered employees in the tables

        // Display general office info when searching
        if (searchTerm) {
            displayOfficeInfo(null); // Display generic office info when there is a search term
        } else {
            displayOfficeInfo(locationSelect.value); // Display location-specific info if no search term
        }
    }

    // Function to filter employees by location
    function filterByLocation(employees, location) {
        return employees.filter(employee => employee.location === location); // Return employees matching the selected location
    }

    // Function to render employee tables
    function renderTables(data) {
        const sortedEmployees = data.sort((a, b) => a.extension - b.extension); // Sort employees by extension number
        const midIndex = Math.ceil(sortedEmployees.length / 2); // Calculate midpoint for splitting data into two tables
        const table1Data = sortedEmployees.slice(0, midIndex); // Data for the first table
        const table2Data = sortedEmployees.slice(midIndex); // Data for the second table

        renderTable(employeeTable1, table1Data); // Render the first table
        renderTable(employeeTable2, table2Data); // Render the second table

        // Update heading names to display extension ranges for each table
        updateHeading(employeeTable1, table1Data);
        updateHeading(employeeTable2, table2Data);
    }

    // Function to render a table with employee data
    function renderTable(table, data) {
        table.innerHTML = ''; // Clear existing table content

        // Create and add table header
        const header = document.createElement('tr');
        header.innerHTML = `
            <th>Employee Name</th>
            <th>Extension Number</th>
        `;
        table.appendChild(header);

        // Create and add rows for each employee
        data.forEach(employee => {
            const fullName = employee.lastname ? `${employee.firstname} ${employee.lastname}` : employee.firstname; // Construct full name
            const emailLink = employee.lastname ? `<a href="mailto:${employee.firstname}.${employee.lastname}@company.com" title="Email ${fullName}"><i class="fas fa-envelope"></i></a>` : ''; // Email icon link if lastname exists
            const phoneLink = `<a href="tel:${employee.extension}" title="Call ${employee.extension}"><i class="fas fa-phone"></i></a>`; // Phone icon link

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${fullName} ${emailLink}</td>
                <td>${employee.extension} ${phoneLink}</td>
            `;
            table.appendChild(tr); // Append the row to the table
        });
    }

    // Function to display office info based on selected location
    function displayOfficeInfo(location) {
        // Predefined office data for different locations
        const officeData = {
            'Location 1': {
                address: '123 Main St, City, State, ZIP',
                phoneNumber: '(123) 456-7890'
            },
            'Location 2': {
                address: '456 Elm St, City, State, ZIP',
                phoneNumber: '(123) 456-7891'
            },
            'Location 3': {
                address: '789 Oak St, City, State, ZIP',
                phoneNumber: '(123) 456-7892'
            },
            'Location 4': {
                address: '101 Pine St, City, State, ZIP',
                phoneNumber: '(123) 456-7893'
            },
            'Location 5': {
                address: '202 Maple St, City, State, ZIP',
                phoneNumber: '(123) 456-7894'
            },
            'Location 6': {
                address: '303 Birch St, City, State, ZIP',
                phoneNumber: '(123) 456-7895'
            },
            'Location 7': {
                address: '404 Cedar St, City, State, ZIP',
                phoneNumber: '(123) 456-7896'
            },
            'Location 8': {
                address: '505 Spruce St, City, State, ZIP',
                phoneNumber: '(123) 456-7897'
            },
            'Location 9': {
                address: '606 Willow St, City, State, ZIP',
                phoneNumber: '(123) 456-7898'
            }
        };

        // Check if location exists in officeData and update the officeInfoSection accordingly
        if (location && officeData[location]) {
            officeInfoSection.innerHTML = `
                <div class="office-info">
                    <h2>${location.replace('-', ' ').toUpperCase()} Contact Info</h2>
                    <div class="office-details">
                        <p><strong>Address:</strong> ${officeData[location].address}</p>
                        <p><strong>Phone Number:</strong> ${officeData[location].phoneNumber} <a href="tel:${
