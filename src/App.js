import React, {useEffect, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/main/home";
import HomeRecords from "./components/records/HomeRecords"
import LoginView from "./components/login/LoginView"
import Test from "./pages/Test"
function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://example-api.com/images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
       <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/records" element={<HomeRecords />} />
        <Route  path="/" element={<LoginView></LoginView>}></Route>
        <Route  path="/test" element={
         <Test></Test>
        }></Route>
      </Routes>
    </Router>
  </DndProvider>
  );
}

export default App;
