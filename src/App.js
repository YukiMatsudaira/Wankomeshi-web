// import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import Login from "./pages/Login"
import Select from './pages/Select'
import Recipe from './pages/Recipe'
import Mypage from './pages/Mypage'

function App() {
  return (
  <BrowserRouter>
    <Route exact path="/" component={Select} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/recipe" component={Recipe} />
    <Route exact path="/mypage" component={Mypage} />
  </BrowserRouter>
  );
}

export default App;
