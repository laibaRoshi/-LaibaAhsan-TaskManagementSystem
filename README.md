# Task Management System

This is a full-stack task management system built with ASP.NET Core for the backend and React.js for the frontend.

## Features

- User Authentication & Authorization (Admin, Regular Users)
- CRUD operations for tasks (Create, Read, Update, Delete)
- Task Status (Completed, In-Progress, Pending)
- User Profiles and Dashboard
- Real-Time Updates (via SignalR)
- Logging (with Serilog)
- Unit Tests (with xUnit)
- Code Quality (with SonarQube)

## Technology Stack

**Backend:**
- ASP.NET Core 8 (LTS)
- Entity Framework Core
- SQL Server

**Frontend:**
- React.js
- TypeScript

## Depedencies for Backend

-ASP.NET Core:

Microsoft.AspNetCore.App (contains the common ASP.NET Core components)

-Entity Framework Core:

Microsoft.EntityFrameworkCore

Microsoft.EntityFrameworkCore.SqlServer (for SQL Server database)

Microsoft.EntityFrameworkCore.Tools (for EF Core commands like migrations)

-JWT Authentication:

Microsoft.AspNetCore.Authentication.JwtBearer (for JWT-based authentication)

-Serilog for Logging:

Serilog

Serilog.Extensions.Logging

Serilog.Sinks.Console (for console logging)

-Unit Testing:

xUnit (for unit testing)

xUnit.runner.visualstudio (for running xUnit tests in Visual Studio)

-Swagger (optional, for API documentation):

Swashbuckle.AspNetCore (for Swagger UI and documentation)

-Other Utilities:

Microsoft.AspNetCore.Identity.EntityFrameworkCore (for ASP.NET Core Identity)

Microsoft.AspNetCore.Mvc.NewtonsoftJson (optional, for NewtonsoftJson in ASP.NET Core)

--To install these, you can run the following commands in the Backend folder:


dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Serilog
dotnet add package Serilog.Extensions.Logging
dotnet add package Serilog.Sinks.Console
dotnet add package xunit
dotnet add package xunit.runner.visualstudio
dotnet add package Swashbuckle.AspNetCore
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson

## Depedencies for frontend
-React:

react

react-dom

react-scripts (for the create-react-app boilerplate)

-React Router (for routing):

react-router-dom (for handling frontend routing)

-Axios (for HTTP requests):

axios (for making API calls to the backend)

-State Management (optional):

redux (if you want to manage global state)

react-redux (to bind Redux with React)

@reduxjs/toolkit (for Redux Toolkit)

-UI Libraries (optional):

@mui/material (Material-UI for UI components)

@emotion/react (for styling with Material-UI)

@emotion/styled (for Material-UI styling)

-Form Handling (optional):

react-hook-form (for easier form handling)

yup (for schema validation)

-Authentication:

jwt-decode (to decode JWT tokens on the frontend)

-Development Utilities (optional):

eslint (for linting)

prettier (for code formatting)

--To install these, you can run the following command in the Frontend folder:


npm install react react-dom react-scripts react-router-dom axios
npm install @mui/material @emotion/react @emotion/styled
npm install jwt-decode
npm install redux react-redux @reduxjs/toolkit
npm install react-hook-form yup

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/laibaRoshi/-LaibaAhsan-TaskManagementSystem.git
