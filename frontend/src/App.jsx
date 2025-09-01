import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './Pages/Home';
import GuestLayout from './Layout/GuestLayout'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
