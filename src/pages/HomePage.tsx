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
      title: 'Salt Lake Valley Coverage',
      description: 'Complete MSA coverage from Salt Lake City to Provo, Park City to West Valley.',
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
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h1" 
            sx={{ 
              mb: 4, 
              fontWeight: 700, 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.1 
            }}
          >
            Last-mile delivery is all about the{' '}
            <Box component="span" sx={{ color: '#3B82F6' }}>
              last foot
            </Box>
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 6, 
              fontWeight: 400,
              opacity: 0.9,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.5
            }}
          >
            Over 99% on-time delivery across the Salt Lake City Metropolitan Area at a simple and transparent cost.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/contact')}
              sx={{
                backgroundColor: '#3B82F6',
                color: 'white',
                py: 2,
                px: 4,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#2563EB',
                },
              }}
            >
              Chat with Sales
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                borderColor: 'white',
                color: 'white',
                py: 2,
                px: 4,
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              View Pricing
            </Button>
          </Box>
          
          {/* Trust indicators */}
          <Box sx={{ mt: 8, opacity: 0.8 }}>
            <Typography variant="body2" sx={{ mb: 3, fontWeight: 600 }}>
              Trusted by Salt Lake City MSA businesses
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Salt Lake Hardware</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Wasatch Supply Co</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Valley Contractors</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>Utah Garden Centers</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Value Proposition Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 3, 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          A better delivery experience for{' '}
          <Box component="span" sx={{ color: '#3B82F6' }}>
            businesses and their customers
          </Box>
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            mb: 8, 
            color: 'text.secondary',
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Powered by best-in-class logistics, we provide same-day and next-day delivery solutions across the Salt Lake City MSA, 
          offering a premium customer experience at a simple, transparent cost.
        </Typography>

        {/* Key Metrics */}
        <Box 
          sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 6, 
            justifyContent: "center",
            mb: 10,
            textAlign: 'center'
          }}
        >
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#3B82F6', mb: 1 }}>
              99%
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              On-time delivery rate
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#3B82F6', mb: 1 }}>
              4.9/5
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Customer satisfaction score
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#3B82F6', mb: 1 }}>
              2hr
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Fastest delivery window
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700, color: '#3B82F6', mb: 1 }}>
              50+
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Local businesses served
            </Typography>
          </Box>
        </Box>

        {/* Features List */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {features.map((feature, index) => (
            <Box 
              sx={{ 
                width: { xs: "100%", md: "50%" },
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3
              }} 
              key={index}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3B82F6',
                  flexShrink: 0
                }}
              >
                {feature.icon}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              backgroundColor: '#3B82F6',
              color: 'white',
              py: 2,
              px: 4,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: '#F8FAFC', py: 12 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 3, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            How it works
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center', 
              mb: 10, 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Simple, efficient delivery process designed for Salt Lake City MSA businesses
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}
                >
                  01
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Business places order
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Schedule delivery through our simple booking system or call our Salt Lake City team.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}
                >
                  02
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Pickup & route optimization
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    We collect items and optimize routes for the fastest, most efficient delivery.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}
                >
                  03
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Real-time tracking
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Customers receive updates and delivery windows with live package tracking.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#3B82F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}
                >
                  04
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Delivery & confirmation
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    Professional delivery with photo proof and customer satisfaction rating.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Customer Types Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 3, 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Solutions for every Salt Lake City MSA business
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'center', 
            mb: 8, 
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Specialized delivery services for contractors, hardware stores, and businesses across the Salt Lake Valley
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {customerTypes.map((customer, index) => (
            <Box sx={{ width: { xs: "100%", md: "50%", lg: "25%" } }} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderColor: '#3B82F6',
                  },
                }}
                onClick={() => navigate(customer.path)}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#3B82F6' }}>
                    {customer.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {customer.description}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#3B82F6',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    Learn More →
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: 'white',
          py: 12,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 4, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Ready to elevate your delivery experience?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 6, 
              opacity: 0.9,
              lineHeight: 1.6,
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            Join Salt Lake City MSA businesses already saving time and money with our professional delivery service.
          </Typography>
          
          {/* Key benefits */}
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: 20, color: '#3B82F6' }} />
              <Typography variant="body2">99% on-time delivery</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: 20, color: '#3B82F6' }} />
              <Typography variant="body2">Transparent pricing</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: 20, color: '#3B82F6' }} />
              <Typography variant="body2">Salt Lake Valley expertise</Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{
              backgroundColor: '#3B82F6',
              color: 'white',
              py: 2,
              px: 4,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2563EB',
              },
            }}
          >
            Get Started Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
