/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
  // TailwindCSS
  tailwindcss: "^3.3.5",
  autoprefixer: "^10.4.14",
  postcss: "^8.4.31",
  prettier: "^3.1.0",
  "prettier-plugin-tailwindcss": "^0.5.7",

  // Emotion
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",

  // Material-UI
  "@mui/lab": "^5.0.0-alpha.139",
  "@mui/material": "^5.14.1",
  "@mui/x-date-pickers": "^6.10.1",

  // React PDF Viewer
  "@react-pdf-viewer/core": "^3.12.0",
  "@react-pdf-viewer/default-layout": "^3.8.0",

  // State Management
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.1",

  // Form & Table Handling
  formik: "^2.4.2",
  "@tanstack/react-table": "^8.9.3",
  yup: "^1.2.0",

  // HTTP Requests
  axios: "^1.4.0",

  // Utility Libraries
  clsx: "^2.0.0",
  "crypto-js": "^4.1.1",
  "currency.js": "^2.0.4",
  "date-fns": "^2.30.0",
  "react-number-format": "^5.3.1",
  "vite-plugin-svgr": "^3.2.0",

  // UI Components
  "react-iconly": "^2.2.10",

  // Notification
  "material-ui-confirm": "^3.0.9",
  notistack: "^3.0.1",

  // PDF
  "pdfjs-dist": "2.5.207",

  // Routing
  "react-router-dom": "^6.14.2",
}
