# TruEstate Architecture Document

## Overview
TruEstate is a full-stack web application designed for Sales Management. It provides a dashboard to view, filter, sort, and search sales transaction data. The application is built using a decoupled client-server architecture.

## 1. Backend Architecture
The backend is a RESTful API built with Node.js and Express. It serves as the interface between the frontend application and the SQLite database.

**Tech Stack:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Utilities:** `csv-parser` (for data seeding), `cors`, `dotenv`

**Key Components:**
- **Server (`server.js`):** The entry point. specifices middleware (CORS, JSON parsing) and mounts routes.
- **Database (`database.js`):** Manages the connection to the SQLite local database file (`database.sqlite`).
- **Controllers:** Contain the business logic. `salesController.js` handles query parameter parsing, SQL query construction (dynamic filtering/sorting), and data retrieval.
- **Routes:** Define API endpoints. `salesRoutes.js` maps HTTP requests to controller functions.

## 2. Frontend Architecture
The frontend is a Single Page Application (SPA) built with React and Vite. It utilizes modern React patterns (Hooks) and client-side state management.

**Tech Stack:**
- **Build Tool:** Vite
- **Library:** React (v19)
- **Styling:** Tailwind CSS (Utility-first CSS framework)
- **State/Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios

**Key Components:**
- **`App.jsx`:** The main container. It manages the global state for filters, sorting, search, and pagination. It orchestrates the data fetching using React Query.
- **`components/DataTable.jsx`:** Responsible for rendering the sales data in a table format and handling pagination UI logic.
- **`components/FilterBar.jsx`:** Contains the filter inputs (dropdowns, range sliders). It dynamically populates options based on metadata from the backend.
- **`components/Sidebar.jsx`:** Navigation menu component (Static display for this version).
- **`components/SearchBar.jsx`:** Search input component that triggers database searches on input.

## 3. Data Flow

1.  **User Action:** A user interacts with the UI (e.g., changes a filter, types in search, clicks next page).
2.  **State Update:** `App.jsx` updates its local state (e.g., `filters`, `page`, `search`).
3.  **Data Fetching:** React Query detects the dependency change in `queryParams` and triggers `fetchSales` via Axios.
4.  **API Request:** A GET request is sent to `http://localhost:5000/api/sales` with query parameters representing the current state (e.g., `?page=2&q=John&regions=North`).
5.  **Request Handling (Backend):** 
    - `salesController` extracts parameters.
    - Input sanitization and validation occur (swapping min/max ranges if needed).
    - A dynamic SQL query is constructed using `sqlite3`.
6.  **Database Query:** The SQL query runs against `database.sqlite` to fetch:
    - The filtered data rows.
    - The total count (for pagination).
    - Metadata (distinct values for filters).
7.  **Response:** The backend returns a JSON object: `{ data: [...], pagination: {...}, meta: {...} }`.
8.  **UI Update:** React Query caches the result and updates the `App.jsx` data prop. The components (`DataTable`, `FilterBar`) re-render with the new data.

## 4. Folder Structure

### Backend (`/backend`)
```
backend/
├── controllers/          # Request logic
│   └── salesController.js
├── routes/               # API route definitions
│   └── salesRoutes.js
├── scripts/              # Utility scripts (seed/import)
│   ├── generateData.js
│   └── import_csv.js
├── database.js           # DB connection setup
├── server.js             # Entry point
├── package.json
└── truestate_assignment_dataset.csv
```

### Frontend (`/frontend`)
```
frontend/
├── public/               # Static assets
├── src/
│   ├── api/              # API calls (axios)
│   ├── components/       # React UI components
│   │   ├── DataTable.jsx
│   │   ├── FilterBar.jsx
│   │   ├── SearchBar.jsx
│   │   └── Sidebar.jsx
│   ├── App.jsx           # Main layout and logic
│   ├── main.jsx          # React entry point
│   └── index.css         # Tailwind directives
├── index.html            # HTML entry point
├── package.json
├── tailwind.config.js    # Tailwind config
└── vite.config.ts        # Vite config
```

## 5. Module Responsibilities

| Module | Responsibility |
|Nodes| Description |
|---|---|
| **salesController** | **Core Logic**: Parses complex query strings (arrays, ranges), validates inputs, handles dynamic SQL WHERE clause construction, executes DB queries, and formats the response payload. |
| **DataTable** | **Display**: Renders tabular data. **Pagination**: logic to display page numbers (including ellipses) and handle page transitions. |
| **FilterBar** | **Filtering UI**: Renders dropdowns and date pickers. It is "dumb" regarding data fetching but "smart" regarding UI state; it notifies the parent (`App`) of changes. Note: Date filters allow "invalid" ranges which are corrected by the backend. |
| **App** | **Orchestration**: Combines Search, Filter, Sort, and Pagination state. Passes this state to the API layer and distributes the response data to children components. |
