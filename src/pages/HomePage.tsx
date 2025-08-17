import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Avatar,
} from '@mui/material';
import {
  LocalShipping,
  Speed,
  Savings,
  LocationOn,
  CheckCircle,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Speed />,
      title: 'Same-Day Delivery',
      description: 'Get your deliveries within hours, not days. Perfect for urgent contractor needs.',
    },
    {
      icon: <Savings />,
      title: 'Transparent Pricing',
      description: 'No hidden fees. Clear zone-based pricing with bulk discounts available.',
    },
    {
      icon: <LocationOn />,
      title: 'East Bench Focus',
      description: 'Local expertise in Sugar House, Cottonwood Heights, Holladay, and surrounding areas.',
    },
    {
      icon: <CheckCircle />,
      title: 'Reliable Service',
      description: 'Professional drivers with real-time tracking and delivery confirmation.',
    },
  ];

  const customerTypes = [
    {
      title: 'Contractors',
      description: 'Hardware, tools, and supplies delivered to job sites',
      image: '/contractor.jpg',
      path: '/contractors',
    },
    {
      title: 'Hardware Stores',
      description: 'Expand your reach with local delivery service',
      image: '/hardware.jpg',
      path: '/hardware-stores',
    },
    {
      title: 'Garden Centers',
      description: 'Plants, soil, and garden supplies delivered safely',
      image: '/garden.jpg',
      path: '/garden-centers',
    },
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
            East Bench Delivery
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 400 }}>
            Professional Last-Mile Delivery for Salt Lake City MSA
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            Serving contractors, hardware stores, and local businesses with reliable, 
            same-day delivery across the East Bench and beyond.
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
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Why Choose East Bench Delivery?
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {features.map((feature, index) => (
            <Box item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'primary.main',
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Customer Types Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            Solutions for Every Business
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {customerTypes.map((customer, index) => (
              <Box item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                  onClick={() => navigate(customer.path)}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" color="text.secondary">
                      {customer.title}
                    </Typography>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {customer.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {customer.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(customer.path)}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

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
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join dozens of East Bench businesses already using our reliable delivery service.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/pricing')}
            sx={{
              backgroundColor: 'white',
              color: 'secondary.main',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            View Pricing & Packages
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
