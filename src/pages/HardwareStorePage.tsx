import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  Store,
  TrendingUp,
  LocalShipping,
  Speed,
  Savings,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HardwareStorePage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <TrendingUp />,
      title: 'Expand Your Reach',
      description: 'Offer delivery to customers who can\'t visit your store. Increase sales without expanding your footprint.',
    },
    {
      icon: <Speed />,
      title: 'Same-Day Delivery',
      description: 'Get products to customers quickly. Perfect for urgent hardware needs and contractor orders.',
    },
    {
      icon: <Savings />,
      title: 'Competitive Advantage',
      description: 'Stand out from big box stores with local, reliable delivery service.',
    },
    {
      icon: <LocationOn />,
      title: 'Local Focus',
      description: 'Serve your East Bench community with personalized delivery service.',
    },
  ];

  const services = [
    'Hardware and tools delivery',
    'Lumber and building materials',
    'Plumbing supplies and fixtures',
    'Electrical components',
    'Paint and finishing materials',
    'Garden tools and supplies',
    'Small appliances',
    'Safety equipment',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Hardware Store Delivery Partner
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 400 }}>
            Expand your business with reliable delivery service
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            Offer same-day delivery to your customers. Compete with big box stores 
            while maintaining your local, personal service.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              View Pricing
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Partner With Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Why Hardware Stores Choose East Bench Delivery
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {benefits.map((benefit, index) => (
            <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Services Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            What We Deliver for You
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
            From small hardware to large materials, we handle it all
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {services.map((service, index) => (
              <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
                  <Typography variant="body1">{service}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Partnership Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Simple Partnership Process
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  1
                </Typography>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Sign Up
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Choose your delivery package and set up your account. No long-term contracts required.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  2
                </Typography>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Integrate
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We provide simple tools to schedule deliveries. No complex software needed.
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                  3
                </Typography>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  Grow Sales
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Start offering delivery to your customers. Watch your sales grow with expanded reach.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
            Ready to Expand Your Business?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join other East Bench hardware stores already growing their sales with our delivery service.
          </Typography>
          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="body1">
              <strong>Special Offer:</strong> New hardware store partners get 15% off their first month.
            </Typography>
          </Alert>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              backgroundColor: 'white',
              color: 'secondary.main',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Start Partnership Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HardwareStorePage;
