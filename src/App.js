
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/main/home";
import HomeRecords from "./components/records/HomeRecords"
import LoginView from "./components/login/LoginView"
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
       <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/records" element={<HomeRecords />} />
        <Route  path="/" element={<LoginView></LoginView>}></Route>
      </Routes>
    </Router>
  </DndProvider>
  );
}

export default App;
