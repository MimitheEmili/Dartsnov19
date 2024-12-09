import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DartsListPage from './DartsListPage';  
import HomePage from './HomePage'; 
import Navbar from './Navbar'; 
import DartsSingle from'./DartsSingle';
import DartsCreate from './DartsCreate';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/darts" element={<DartsListPage />} />  
        <Route path='/darts/:dartsId' element={<DartsSingle/>}/>
        <Route path="/create-darts" element={<DartsCreate />} />
       
      </Routes>
    </Router>
  );
}

export default App;
