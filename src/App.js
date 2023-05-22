import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import React from 'react';
import MakeBO from './components/MakeBO';
import BuildOrderList from "./components/BuildOrderList";


function App() {

  const [buildOrder, setBuildOrder] = useState([])
 
  useEffect(() => {
    axios
    .get("/api/buildorders/")
    .then((res) => {
      setBuildOrder(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  return(
    <div>
      <BuildOrderList buildOrder={buildOrder}/>
    </div>
  )
}

export default App;
