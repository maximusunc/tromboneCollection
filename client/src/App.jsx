import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';

import './App.css';
import './pages/pages.css'
import MainLayout from './layouts/mainLayout/MainLayout';
import EmptyLayout from './layouts/emptyLayout/EmptyLayout';
import Home from './pages/home/Home';
import Instruments from './pages/instruments/Instruments';
import Details from './pages/instruments/details/Details';
import MinDetails from './pages/MinDetails';
import HowToUse from './pages/HowToUse';
import Bibliography from './pages/Bibliography';
import Contact from './pages/contact/Contact';

import useTrombones from './utils/useTrombones';
import TromboneContext from './context/trombones';

export default function App() {
  const trombones = useTrombones();

  return (
    <BrowserRouter>
      <TromboneContext.Provider value={trombones}>
        <Routes>
          {/* this loads minimal css and just the information for a specific instrument */}
          <Route element={<EmptyLayout><Outlet /></EmptyLayout>}>
            <Route path="/api/details/:id" element={<MinDetails />} />
          </Route>
          {/* everything else gets the full layout */}
          <Route element={<MainLayout><Outlet /></MainLayout>}>
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/bibliography" element={<Bibliography />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </TromboneContext.Provider>
    </BrowserRouter>
  );
}
