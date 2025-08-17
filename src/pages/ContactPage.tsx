import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,

} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ContactPage: React.FC = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Contractor',
    'Hardware Store',
    'Garden Center',
    'Auto Parts Store',
    'Plumbing Supply',
    'Electrical Supply',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.businessName) newErrors.businessName = 'Business name is required';
    if (!formData.message) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', formData);
    toast.success('Thank you! We\'ll get back to you within 24 hours.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      businessName: '',
      businessType: '',
      message: '',
    });
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
            Contact Us
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 400 }}>
            Ready to get started with East Bench Delivery?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Let\'s discuss how we can help grow your business with reliable delivery service.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {/* Contact Form */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
                  Get Started Today
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Fill out the form below and we\'ll get back to you within 24 hours to discuss your delivery needs.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </Box>
                    <Box sx={{ width: { xs: "100%", sm: "50%" } }}>
                      <TextField
                        fullWidth
                        label="Business Name"
                        value={formData.businessName}
                        onChange={(e) => handleChange('businessName', e.target.value)}
                        error={!!errors.businessName}
                        helperText={errors.businessName}
                        required
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormControl fullWidth>
                        <InputLabel>Business Type</InputLabel>
                        <Select
                          value={formData.businessType}
                          label="Business Type"
                          onChange={(e) => handleChange('businessType', e.target.value)}
                        >
                          {businessTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        error={!!errors.message}
                        helperText={errors.message}
                        placeholder="Tell us about your delivery needs, estimated volume, and any questions you have..."
                        required
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ py: 2 }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Contact Information */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Card>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Phone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          (801) 555-0123
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          info@eastbenchdelivery.com
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Service Area
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Salt Lake City MSA<br />
                          East Bench Area
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      <strong>Response Time:</strong> We typically respond within 24 hours during business days.
                    </Typography>
                  </Alert>

                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Service Areas
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {['Sugar House', 'Cottonwood Heights', 'Federal Heights', 'Holladay', 'Millcreek'].map((area) => (
                      <Chip key={area} label={area} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
