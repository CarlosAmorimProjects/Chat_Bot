//  Import dependencies
import React, { useEffect } from "react";
import "./App.css";

// Import redux components
import { Provider } from "react-redux";
import store from "./store";

// Import chat component
import Chat from "./components/chat";
import LandingPage from "./components/landingPage";

// Import action
import { createSession } from "./actions/watson";

// Import axios
import axios from "axios";

if (localStorage.session) {
  delete axios.defaults.headers.common["session"];
  //localStorage.removeItem("session_id");
  axios.defaults.headers.common["session_id"] = localStorage.session;
} else {
  delete axios.defaults.headers.common["session"];
}

// Connect application to redux
const App = () => {
  useEffect(() => {
    // Check if there session
    if (!localStorage.session) {
      // Create
      store.dispatch(createSession());
    }
  });
  return (
    <Provider store={store}>
      <div className="container">
        <LandingPage />
        <Chat />
      </div>
    </Provider>
  );
};

export default App;