import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './App.css';
import Register from './pages/Register';


// Componente para rutas protegidas
const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  
  console.log('PrivateRoute - Loading:', loading);  
  console.log('PrivateRoute - User:', user);
  
  if(loading) {
    return <div>Cargando...</div>;
  }
  return user ? children : <Navigate to="/login"/>
};



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element= {
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;