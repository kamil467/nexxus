import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import Test from './pages/Test';
import WorkDetails from './pages/WorkDetails';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work-details" element={<WorkDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work" element={<Test />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;