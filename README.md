# React# WMS Project - Educational Implementation

A personal learning project implementing a Warehouse Management System (WMS) using modern web technologies. This project is created for educational purposes to learn and practice web development concepts and technologies.

## Overview

This is a personal learning project that implements a Warehouse Management System. It's designed to help me learn and practice various web development technologies and concepts, including React, Redux, and modern web development practices. While it has WMS functionality, it's not intended for production use and is purely for educational purposes.

## Features

- Modern, responsive UI built with Material-UI
- State management with Redux Toolkit
- Real-time data fetching with Axios
- Route-based navigation with React Router
- FontAwesome icons for enhanced UI
- Development environment with Vite

## Note

This is a personal learning project and is not intended for production use. The code and implementation may not follow all enterprise-level best practices as it's primarily focused on learning and experimentation.

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn package manager
- ASP.NET Core 8.0(for running the REST API backend)

### Backend Setup

This project requires a separate ASP.NET REST API backend to function properly. Before running the frontend application, you need to:

1. Set up the ASP.NET REST API backend
2. Ensure the API is running on the correct port
3. Configure the frontend to connect to the API endpoint

The backend API should include endpoints for:
- User authentication
- Warehouse management
- Inventory operations
- Other WMS-related functionality

### Frontend Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

This will start the Vite development server with hot module replacement.

### Building for Production

To build the application for production:

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Previewing Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
wms-project/
├── src/
│   ├── components/     # React components
│   ├── data/           # Application data and configurations
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── public/            # Static files served directly
├── package.json       # Project dependencies and scripts
├── vite.config.js     # Vite configuration
└── README.md          # This file
```

## Technologies

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **UI Framework**: Material-UI (@mui/material)
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: FontAwesome
- **Styling**: Emotion
- **Development Tools**: ESLint

## Development Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint for code quality checks

## Learning Objectives

This project aims to help me learn and practice:

- React and modern JavaScript development
- State management with Redux
- Material-UI for UI development
- API integration with Axios
- Modern development workflows with Vite
- Code organization and project structure
- Best practices in web development

## Note

This is a personal learning project and is not intended for production use. The code and implementation may not follow all enterprise-level best practices as it's primarily focused on learning and experimentation.

## Important

This project requires a separate ASP.NET REST API backend to function. The frontend application will not work without the corresponding backend API endpoints. Make sure to set up and run the backend API before using this frontend application.
