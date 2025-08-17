import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import LeadList from './components/LeadList';
import AddLead from './components/AddLead';
import LeadDetail from './components/LeadDetail';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ContractorPage from './pages/ContractorPage';
import HardwareStorePage from './pages/HardwareStorePage';
import GardenCenterPage from './pages/GardenCenterPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Create a modern theme with East Bench branding
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Professional blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#2e7d32', // Green for delivery/success
      light: '#4caf50',
      dark: '#1b5e20',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          padding: '12px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  // Check if we're on a marketing page
  const isMarketingPage = window.location.pathname === '/' || 
                         window.location.pathname === '/pricing' ||
                         window.location.pathname === '/contractors' ||
                         window.location.pathname === '/hardware-stores' ||
                         window.location.pathname === '/garden-centers' ||
                         window.location.pathname === '/contact';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isMarketingPage ? (
          // Marketing layout
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Box component="main" sx={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contractors" element={<ContractorPage />} />
                <Route path="/hardware-stores" element={<HardwareStorePage />} />
                <Route path="/garden-centers" element={<GardenCenterPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        ) : (
          // Admin layout
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leads" element={<LeadList />} />
                  <Route path="/leads/add" element={<AddLead />} />
                  <Route path="/leads/:id" element={<LeadDetail />} />
                </Routes>
              </Box>
            </Box>
          </Box>
        )}
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '8px',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
