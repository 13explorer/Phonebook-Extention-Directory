# Phonebook-Extention-Directory
Track employee extensions accross multiple locations. 
# Employee Phonebook

This documentation provides an overview of the Employee Phonebook web application, including its directory structure, how to add new extensions and locations, and how various functionalities work. This guide is intended to help anyone supporting or extending the application.

## Table of Contents

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Adding New Extensions](#adding-new-extensions)
- [Adding New Locations](#adding-new-locations)
- [Search Functionality](#search-functionality)
- [Rendering Tables](#rendering-tables)
- [Generating Email and Phone Links](#generating-email-and-phone-links)
- [Styling](#styling)

## Overview

The Employee Phonebook is a simple web application that allows users to view employee contact information, search by name or extension, and filter by location.

## Directory Structure

The project has the following directory structure:

```
SSI-WEBINT
├── wwwroot
│   └── Supreme Directory
│       ├── css
│       │   └── style.css
│       ├── data
│       │   └── employees.json
│       ├── images
│       │   └── companylogo.png
│       ├── js
│       │   └── main.js
│       └── index.html
```


## Adding New Extensions

To add new extensions, update the `employees.json` file in the `/data` directory. Add a new JSON object for each employee with the following format:

```json
{
    "firstname": "Alice",
    "lastname": "Johnson",
    "extension": 123,
    "location": "Location 1"
}
firstname: The first name of the employee.
lastname: The last name of the employee.
extension: The phone extension number for the employee.
location: The location associated with the employee.


<select id="locationSelect">
    <option value="Location 1">Location 1</option>
    <option value="New Location">New Location</option> <!-- New Location -->
</select>

