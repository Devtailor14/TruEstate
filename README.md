# TruEstate Sales Management System

## 1. Overview
TruEstate is a full-stack sales management dashboard designed to efficiently handle and visualize large transaction datasets. It features dynamic filtering, server-side pagination, and real-time search capabilities to ensure high performance. The application leverages a decoupled architecture with a React frontend and a Node.js/SQLite backend for scalability.

## 2. Tech Stack
- **Frontend:** React (v19), Vite, Tailwind CSS, TanStack Query, Axios.
- **Backend:** Node.js, Express, SQLite3.
- **Tools:** ESLint, Nodemon, CSV Parser.

## 3. Search Implementation Summary
Search is implemented server-side using SQL `LIKE` queries targeting `customerName` and `phoneNumber` columns. The frontend captures user input and triggers a request, while the backend sanitizes the input and constructs a dynamic `WHERE` clause to filter the dataset efficiently.

## 4. Filter Implementation Summary
Filtering supports both multi-select text fields (e.g., Region, Category) and numeric/date ranges (e.g., Age, Date). The backend dynamically builds SQL conditions based on present parameters and includes logic to automatically swap inverted min/max range values to prevent errors.

## 5. Sorting Implementation Summary
Sorting is handled server-side via `ORDER BY` clauses. The backend accepts a `sort` query parameter (key:direction), validates the sort key against a whitelist to prevent SQL injection, and applies the requested order to the SQL query.

## 6. Pagination Implementation Summary
Pagination utilizes SQL `LIMIT` and `OFFSET` to fetch only the necessary subset of records. The frontend receives total page counts from the backend and renders a smart pagination control that displays a window of surrounding pages with ellipses for better navigation.

## 7. Setup Instructions
### Backend
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. (Optional) Seed database: `npm run seed`
4. Start the server: `npm run dev`

### Frontend
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
