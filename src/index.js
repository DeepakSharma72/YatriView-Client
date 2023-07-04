import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from './ContextAPI/SnackBar';
import { CustomizedSnackbars } from './ContextAPI/SnackBar';
import { SearchContextProvider } from './ContextAPI/SearchContext';
import { DialogContextProvider } from './ContextAPI/DialogContext';
import AlertDialog from './Components/Alert_Dialog';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <DialogContextProvider>
      <SnackbarProvider>
        <SearchContextProvider>
          <App />
          <CustomizedSnackbars />
          <AlertDialog />
        </SearchContextProvider>
      </SnackbarProvider>
    </DialogContextProvider>
  </BrowserRouter>
);


