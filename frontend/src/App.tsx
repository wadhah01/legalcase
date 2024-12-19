import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ClientList from './components/ClientList';
import CaseDetails from './components/CaseDetails';

function App() {
  const [auth, setAuth] = useState<{ isAuthenticated: boolean; email: string; name: string }>(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : {
      isAuthenticated: false,
      email: '',
      name: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (email: string, name: string) => {
    const newAuth = {
      isAuthenticated: true,
      email,
      name,
    };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  const handleLogout = () => {
    const newAuth = {
      isAuthenticated: false,
      email: '',
      name: '',
    };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
  };

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <Layout userName={auth.name} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/:clientId/cases/:caseId" element={<CaseDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;