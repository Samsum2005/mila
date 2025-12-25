import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// 1. Import Accessibility Files
import { AccessibilityProvider } from './context/AccessibilityContext';
import AccessibilityWidget from './components/AccessibilityWidget';

// Components
import Sidebar from './components/sidebar';
import Header from './components/Header';

// Pages
import First from './pages/first';
import Check from './pages/check';
import Content from './pages/content';
import Analysis from './pages/analysis';
import Settings from './pages/Settings';
import Tech from './pages/tech';
import DataBase from './pages/dataBase';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-slate-900 relative">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    // 2. Wrap EVERYTHING with AccessibilityProvider
    <AccessibilityProvider>
      <BrowserRouter>
        
        {/* 3. Place the Widget here (It floats, so it works on every page) */}
        <AccessibilityWidget />

        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* Make 'First' the default page when opening the site */}
            <Route index element={<First />} />
            
            <Route path="first" element={<First />} />
            <Route path="check" element={<Check />} />
            <Route path="content" element={<Content/>} />
            <Route path="analysis" element={<Analysis/>} />
            <Route path="settings" element={<Settings/>} />
            <Route path="tech" element={<Tech/>} />
            <Route path="data" element={<DataBase/>} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;