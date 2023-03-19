# Web-app-get-geolocation
    This document is the README for the project [Web-app-get-geolocation] which is part of the [Clock-IO application] project (a timekeeping system). This project is responsible for receiving the user's geolocation in the location gathering process.

## Purpose
    This application is a web application that is created to retrieve the user's geolocation (latitude and longitude). LINE LIFF API is integrated into this application for users to authorize access to LINE Profile, eliminating the need for users to open the application with an external browser.

## Benefits
    1. Used in timekeeping applications.
    2. The application is highly responsive, making it easy for users to clock in and out of work.
    3. [Clock-IO application] can be assured that users are authorized and have permission to use the application.


# Getting Started
## Prerequisites
    To start using the [Web-app-get-geolocation] project, you need [a list of software required to get started and how to install it].

## Installation
    The installation process of the [Web-app-get-geolocation] project is as follows:
        1. Install NodeJS via https://nodejs.org/en, which is currently the LTS version 18.15.0.
        2. Check if it has been installed correctly by opening the Command Prompt and typing node --version.
        3. Once the installation is complete, go to the current project path and use the command npm i to install the packages in the package.json file.

## Project Structure
-> Root Directory

    - public
    - src (Component store here)
        App.js <-(Entry point)
        App.css
        ...
        ..
    - package-lock.json
    - package.json
    - README_<language>.md

## Usage
    Instructions on how to use the [Web-app-get-geolocation] project:
        1. Go to the App.js file located in the src folder of the project's structure.
        2. Find the variable named "clockIOendpointUrl" on line 9 and set the value. This value is the endpoint URL used to send geolocation and userUid data to the [Clock-IO application].
        3. Find the variable named "liffId" on line 47 and set the value. This value can be obtained by creating a Liff application in the LINE Developer Console using the LINE LOGIN Service.
        4. Once the configuration is complete, run the project using the "npm start" command.
        5. If you want to deploy it on your hosting, use the "npm run build" command.


## Authors
* [Mr. Thossaporn Sukprasomjit] - [kimjonggod@hotmail.com] Thailand GMT+7