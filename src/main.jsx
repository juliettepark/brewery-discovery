import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './pages/Layout';
import DetailView from './pages/DetailView.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path='/brewDetails/:breweryID' element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
