import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Content from "./components/Content";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Drawer from "./components/Header";

const UserContext = React.createContext(null);
const AppContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [customer, setCustomer] = useState([]);

  const [totalCost, setTotalCost] = useState(0.0);

  // -------------------------------------
  // PAYPAL Email ID:
  // sb-810le2669875@personal.example.com

  // System Generated Password:
  // 17.XmpU]
  // -------------------------------------

  const userContextState = {
    user,
    setUser,

    login: (user) => setUser(user),
    logout: () => setUser(null),
    loggedIn: () => !!user,
  };

  const appContext = {
    cart,
    setCart,

    totalCost,
    setTotalCost,

    customer,
    setCustomer,
  };

  return (
    <AppContext.Provider value={appContext}>
      <UserContext.Provider value={userContextState}>
        <Router>
          <header>
            <Drawer />
            <div className="menu-fixed-top">
              <Menu />
            </div>
          </header>

          <main>
            <Content />
          </main>
          <div className="padding-bottom" />
          <Footer/>
        </Router>
      </UserContext.Provider>
    </AppContext.Provider>
  );
}
export default App;
export { UserContext, AppContext };
