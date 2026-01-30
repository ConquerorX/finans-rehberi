import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Banks } from './pages/Banks';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/fintek" element={
          <div className="min-h-screen bg-[#0C1222]">
            <Navbar />
            <Home />
          </div>
        } />
        <Route path="/bankalar" element={<Banks />} />
      </Routes>
    </Router>
  );
}

export default App;
