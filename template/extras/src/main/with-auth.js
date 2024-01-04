import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import "configs/HttpInterceptorConfig"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"
import store from "configs/StoreConfig"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
)
