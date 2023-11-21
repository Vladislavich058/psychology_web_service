import { ThemeProvider } from "@material-tailwind/react";
import AppRouter from "components/AppRouter";
import Footer from "components/Footer";
import Header from "components/Header";
import { AuthContext } from "context/authContext";
import "index.css";
import Home from "pages/Home";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  return (
    <ThemeProvider>
      <div className="text-xl">
        <AuthContext.Provider
          value={{
            authUser,
            setAuthUser,
          }}
        >
          <BrowserRouter>
            <Header />
            <div className="px-8 min-h-[85vh]">
              <AppRouter />
            </div>
            <Footer />
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
