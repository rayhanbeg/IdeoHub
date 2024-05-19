import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import "./index.css";
import router from "./routes/Routes";
import AuthProvider from "./provider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster/>
    </AuthProvider>
  </React.StrictMode>
);
