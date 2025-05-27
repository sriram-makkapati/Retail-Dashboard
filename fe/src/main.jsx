import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import AppRoutes from "./routes/AppRoutes";
import App from "./App"
import { AppContext } from "./context/AppContext"; // Import AppContext
// import theme from "./context/theme"; // Import the custom theme
import "./index.css";
import {BrowserRouter} from "react-router-dom";
 
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    
    <BrowserRouter>
    <ChakraProvider >
      <AppContext>
        {/* <AppRoutes /> */}
        <App/>
      </AppContext>
    </ChakraProvider>
    </BrowserRouter>
  // </StrictMode>
);