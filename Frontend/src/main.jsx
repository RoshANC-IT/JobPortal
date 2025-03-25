// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css'; // Tailwind and custom styles
// import App from './App';
// import { Toaster } from 'sonner'; // Toast notifications library

// import { Provider } from 'react-redux';
// import store from './components/redux/store';
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//       <Toaster /> {/* Toast notifications */}
//     </Provider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Tailwind and custom styles
import App from "./App";
import { Toaster } from "sonner"; // Toast notifications library
import { Provider } from "react-redux";
import store from "./components/redux/store";
import { persistStore } from "redux-persist"; // Correct import
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);  // Initialize persistor
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
