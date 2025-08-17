import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Speed,
  Construction,
  Hardware,
  Schedule,
  LocationOn,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ContractorPage: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Speed />,
      title: 'Same-Day Delivery',
      description: 'Get materials to job sites within hours, not days. Perfect for urgent project needs.',
    },
    {
      icon: <Schedule />,
      title: 'Flexible Scheduling',
      description: 'Schedule deliveries around your work hours. Early morning, evening, or weekend options.',
    },
    {
      icon: <LocationOn />,
      title: 'Job Site Delivery',
      description: 'Direct delivery to construction sites. No more trips to the hardware store.',
    },
    {
      icon: <Hardware />,
      title: 'Bulk Item Handling',
      description: 'We handle heavy materials, lumber, tools, and equipment safely and efficiently.',
    },
  ];

  const commonDeliveries = [
    'Lumber and building materials',
    'Plumbing supplies and fixtures',
    'Electrical components and wiring',
    'HVAC equipment and parts',
    'Tools and equipment',
    'Paint and finishing materials',
    'Concrete and masonry supplies',
    'Roofing materials',
    'Insulation and drywall',
    'Hardware and fasteners',
  ];

  const testimonials = [
    {
      name: 'Mike Johnson',
      company: 'Johnson Construction',
      text: 'East Bench Delivery has been a game-changer for our projects. Same-day delivery means we never have to stop work for supply runs.',
      rating: 5,
    },
    {
      name: 'Sarah Chen',
      company: 'Chen Plumbing',
      text: 'Reliable delivery to job sites saves us hours every week. Their bulk handling is excellent for our plumbing supplies.',
      rating: 5,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h1" sx={{ mb: 3, fontWeight: 700 }}>
            Contractor Delivery Solutions
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 400 }}>
            Keep your projects moving with reliable, same-day delivery
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            No more supply runs. No more project delays. Get materials delivered 
            directly to your job sites across the Salt Lake City MSA.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                backgroundColor: 'white',
                color: 'warning.main',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              View Contractor Pricing
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
              Get Started Today
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Why Contractors Choose East Bench Delivery
        </Typography>
        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: 'warning.main',
                    }}
                  >
                    {benefit.icon}
                  </Avatar>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Common Deliveries */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            What We Deliver
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
            From small hardware to large equipment, we handle it all
          </Typography>
          <Grid container spacing={2}>
            {commonDeliveries.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
                  <Typography variant="body1">{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contractor Package */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Contractor Pack - Most Popular
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                $500
              </Typography>
              <Typography variant="h5" sx={{ mb: 3 }}>
                50 Deliveries • 20% Savings
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="All zones covered" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Priority scheduling" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Real-time tracking" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Dedicated support" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Bulk item handling" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Job site delivery" />
                </ListItem>
              </List>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={() => navigate('/pricing')}
                sx={{ mt: 3 }}
              >
                Get Contractor Pack
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              Perfect for:
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Construction color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="General Contractors"
                  secondary="Regular material deliveries to multiple job sites"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Hardware color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Plumbing Contractors"
                  secondary="Heavy fixtures and supplies to residential and commercial sites"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="HVAC Contractors"
                  secondary="Equipment and parts delivery for installations and repairs"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalShipping color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Electrical Contractors"
                  secondary="Wiring, panels, and electrical components to job sites"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      {/* Testimonials */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
            What Contractors Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
            Ready to Streamline Your Operations?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join dozens of contractors already saving time and money with our delivery service.
          </Typography>
          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="body1">
              <strong>Special Offer:</strong> New contractors get 10% off their first package.
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
            Get Started Today
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ContractorPage;
