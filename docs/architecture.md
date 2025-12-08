# Architecture Document

## Overview
This document outlines the architecture for the Retail Sales Management System.

## Backend Architecture
- **Framework**: Express.js
- **Pattern**: MVC (Model-View-Controller) - simplified to Controller-Service logic.
- **Data Flow**:
    - Request -> Route -> Controller -> Service (Business Logic) -> Data Access (In-Memory) -> Response
- **Modules**:
    - `server.js`: Entry point.
    - `routes/salesRoutes.js`: API definitions.
    - `controllers/salesController.js`: Request handling.
    - `services/salesService.js`: Core logic for Search, Filter, Sort.

## Frontend Architecture
- **Framework**: React (Vite)
- **Styling**: TailwindCSS
- **State**: React Query (Server State) + React Context/Hooks (UI State).
- **Structure**:
    - `components/`: Reusable UI elements (FilterPanel, DataTable).
    - `pages/`: Route views (Dashboard).
    - `services/`: API client (Axios/Fetch).

## Folder Structure
```
root/
├── backend/
│   └── src/
├── frontend/
│   └── src/
└── docs/
```
