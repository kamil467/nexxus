import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Footer from './components/Footer';
import Test from './pages/Test';
import WorkDetails from './pages/WorkDetails';
import ScrollToTop from './components/ScrollToTop';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<WorkDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
         <Route path="/work" element={<Test />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;