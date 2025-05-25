import React from "react";
import Header from "./features/Header/Header";
import "./App.css";
import Home from "./features/Home/Home";
import { Provider } from "react-redux";
import store from "./store";
import Subreddits from "./features/Subreddits/Subreddits";

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;
