import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  LocalShipping,
  Speed,
  Savings,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone] = useState(1);

  const zones = [
    { zone: 1, distance: '0-5 miles', color: '#4caf50' },
    { zone: 2, distance: '5-10 miles', color: '#2196f3' },
    { zone: 3, distance: '10-20 miles', color: '#ff9800' },
    { zone: 4, distance: '20-30 miles', color: '#f44336' },
    { zone: 5, distance: '30+ miles', color: '#9c27b0' },
  ];

  const pricing = {
    urgent: { 1: 12, 2: 16, 3: 22, 4: 30, 5: 40 },
    same_day: { 1: 9, 2: 12, 3: 16, 4: 22, 5: 28 },
    next_day: { 1: 6, 2: 8, 3: 11, 4: 15, 5: 19 },
  };

  const packages = [
    {
      name: 'Starter Pack',
      price: 100,
      deliveries: 10,
      savings: '10%',
      popular: false,
      features: [
        '10 deliveries',
        'Zone 1-3 coverage',
        'Same-day delivery',
        'Real-time tracking',
        'Email support',
      ],
    },
    {
      name: 'Business Pack',
      price: 250,
      deliveries: 25,
      savings: '15%',
      popular: false,
      features: [
        '25 deliveries',
        'All zones covered',
        'Priority scheduling',
        'Real-time tracking',
        'Phone & email support',
        'Delivery reports',
      ],
    },
    {
      name: 'Contractor Pack',
      price: 500,
      deliveries: 50,
      savings: '20%',
      popular: true,
      features: [
        '50 deliveries',
        'All zones covered',
        'Priority scheduling',
        'Real-time tracking',
        'Dedicated support',
        'Delivery reports',
        'Bulk item handling',
        'Job site delivery',
      ],
    },
    {
      name: 'Pro Pack',
      price: 1000,
      deliveries: 100,
      savings: '25%',
      popular: false,
      features: [
        '100 deliveries',
        'All zones covered',
        'Priority scheduling',
        'Real-time tracking',
        'Dedicated account manager',
        'Custom reporting',
        'Bulk item handling',
        'Job site delivery',
        'API integration',
      ],
    },
  ];

  const itemSizes = [
    { size: 'Small', weight: '<25 lbs', multiplier: 1.0 },
    { size: 'Medium', weight: '25-75 lbs', multiplier: 1.3 },
    { size: 'Large', weight: '75-150 lbs', multiplier: 1.6 },
    { size: 'XL', weight: '150+ lbs', multiplier: 2.2 },
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
            Transparent Pricing
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 400 }}>
            Clear, competitive rates with bulk discounts for volume
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            No hidden fees. No surprises. Just reliable delivery at fair prices.
          </Typography>
        </Container>
      </Box>

      {/* Zone-Based Pricing */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Zone-Based Pricing
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
          Pricing based on delivery distance from our East Bench hub
        </Typography>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {zones.map((zone) => (
            <Grid item xs={12} sm={6} md={2.4} key={zone.zone}>
              <Card
                sx={{
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: selectedZone === zone.zone ? 3 : 1,
                  borderColor: selectedZone === zone.zone ? 'primary.main' : 'divider',
                  backgroundColor: selectedZone === zone.zone ? 'primary.50' : 'white',
                }}
                onClick={() => setSelectedZone(zone.zone)}
              >
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: zone.color }}>
                    Zone {zone.zone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {zone.distance}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Pricing Table */}
        <Paper sx={{ mb: 8 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Service Level</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Urgent (2hr)
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Same Day
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Next Day
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>
                    Zone {selectedZone} ({zones[selectedZone - 1].distance})
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
                      ${pricing.urgent[selectedZone as keyof typeof pricing.urgent]}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      ${pricing.same_day[selectedZone as keyof typeof pricing.same_day]}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                      ${pricing.next_day[selectedZone as keyof typeof pricing.next_day]}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Item Size Multipliers */}
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
          Item Size Adjustments
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {itemSizes.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.size}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.weight}
                  </Typography>
                  <Chip
                    label={`${item.multiplier}x multiplier`}
                    color="primary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Bulk Packages */}
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 600 }}>
          Bulk Delivery Packages
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 6, color: 'text.secondary' }}>
          Save money with prepaid delivery credits
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {packages.map((pkg) => (
            <Grid item xs={12} md={6} lg={3} key={pkg.name}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: pkg.popular ? 2 : 1,
                  borderColor: pkg.popular ? 'primary.main' : 'divider',
                }}
              >
                {pkg.popular && (
                  <Chip
                    label="Most Popular"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                    }}
                  />
                )}
                <CardContent sx={{ pt: pkg.popular ? 6 : 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {pkg.name}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    ${pkg.price}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {pkg.deliveries} deliveries • {pkg.savings} savings
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 3 }}>
                    {pkg.features.map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Button
                    variant={pkg.popular ? 'contained' : 'outlined'}
                    fullWidth
                    onClick={() => navigate('/contact')}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Additional Services */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
            Additional Services
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Pickup Service Premium
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    In-store pickup, item selection, and loading service
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    +40% to base price
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Rush Delivery
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    Guaranteed delivery within 2 hours for urgent needs
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
                    +50% to base price
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* CTA */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Need a custom package? Contact us for enterprise pricing and custom solutions.
            </Typography>
          </Alert>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/contact')}
            sx={{ mr: 2 }}
          >
            Contact Us
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPage;
