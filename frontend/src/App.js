import React from 'react';
import './App.css';
import RegistrarProducto from './components/RegistrarProducto';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <RegistrarProducto />
      </div>
    </AuthProvider>
  );
}

export default App;
