import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const neighborhoods = [
  'Sugar House',
  'Cottonwood Heights',
  'Federal Heights',
  'Holladay',
  'Millcreek',
  'East Millcreek',
  'Canyon Rim',
  'Mount Olympus',
  'Wasatch Hollow',
  'Emigration Canyon',
  'Other',
];

const businessCategories = [
  'Hardware Store',
  'Auto Parts Store',
  'Plumbing Contractor',
  'HVAC Contractor',
  'Electrical Contractor',
  'Garden Center',
  'Small Appliance Store',
  'Tile/Flooring Store',
  'Lighting Store',
  'Industrial Supply',
  'Other',
];

const steps = ['Business Information', 'Contact Details', 'Delivery Estimates', 'Review & Save'];

const AddLead: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessCategory: '',
    neighborhood: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: '',
    estimatedMonthlyDeliveries: '',
    zone: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    if (activeStep === 0) {
      if (!formData.businessName) newErrors.businessName = 'Business name is required';
      if (!formData.businessCategory) newErrors.businessCategory = 'Business category is required';
      if (!formData.neighborhood) newErrors.neighborhood = 'Neighborhood is required';
    } else if (activeStep === 1) {
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact person is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.email) newErrors.email = 'Email is required';
    } else if (activeStep === 2) {
      if (!formData.estimatedMonthlyDeliveries) newErrors.estimatedMonthlyDeliveries = 'Monthly deliveries is required';
      if (!formData.zone) newErrors.zone = 'Zone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateStep()) {
      // Here you would typically save to your backend
      console.log('Saving lead:', formData);
      toast.success('Lead added successfully!');
      navigate('/leads');
    }
  };

  const calculateLeadScore = () => {
    let score = 0;
    
    // Neighborhood scoring
    if (formData.neighborhood === 'Sugar House') score += 25;
    else if (formData.neighborhood === 'Cottonwood Heights') score += 20;
    else if (formData.neighborhood === 'Holladay') score += 20;
    else if (formData.neighborhood === 'Millcreek') score += 15;
    else score += 10;
    
    // Business category scoring
    if (formData.businessCategory.includes('Contractor')) score += 25;
    else if (formData.businessCategory === 'Hardware Store') score += 20;
    else if (formData.businessCategory === 'Auto Parts Store') score += 15;
    else if (formData.businessCategory === 'Garden Center') score += 15;
    else score += 10;
    
    // Delivery volume scoring
    const deliveries = parseInt(formData.estimatedMonthlyDeliveries) || 0;
    if (deliveries >= 30) score += 25;
    else if (deliveries >= 20) score += 20;
    else if (deliveries >= 10) score += 15;
    else if (deliveries >= 5) score += 10;
    else score += 5;
    
    // Zone scoring
    const zone = parseInt(formData.zone) || 1;
    if (zone === 1) score += 20;
    else if (zone === 2) score += 15;
    else if (zone === 3) score += 10;
    else score += 5;
    
    return Math.min(score, 100);
  };

  const calculateRevenuePotential = () => {
    const deliveries = parseInt(formData.estimatedMonthlyDeliveries) || 0;
    const zone = parseInt(formData.zone) || 1;
    
    const zonePricing = { 1: 9, 2: 12, 3: 16, 4: 22, 5: 28 };
    const basePrice = zonePricing[zone as keyof typeof zonePricing] || 9;
    const discountedPrice = basePrice * 0.85; // 15% discount
    
    return deliveries * discountedPrice;
  };

  const recommendPackage = () => {
    const deliveries = parseInt(formData.estimatedMonthlyDeliveries) || 0;
    
    if (deliveries >= 40) return 'Enterprise Pack';
    if (deliveries >= 20) return 'Pro Pack';
    if (deliveries >= 15) return 'Contractor Pack';
    if (deliveries >= 8) return 'Business Pack';
    return 'Starter Pack';
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Business Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                error={!!errors.businessName}
                helperText={errors.businessName}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <FormControl fullWidth error={!!errors.businessCategory}>
                <InputLabel>Business Category</InputLabel>
                <Select
                  value={formData.businessCategory}
                  label="Business Category"
                  onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                >
                  {businessCategories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <FormControl fullWidth error={!!errors.neighborhood}>
                <InputLabel>Neighborhood</InputLabel>
                <Select
                  value={formData.neighborhood}
                  label="Neighborhood"
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                >
                  {neighborhoods.map((neighborhood) => (
                    <MenuItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                multiline
                rows={2}
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <TextField
                fullWidth
                label="Contact Person"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                error={!!errors.contactPerson}
                helperText={errors.contactPerson}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <TextField
                fullWidth
                label="Estimated Monthly Deliveries"
                type="number"
                value={formData.estimatedMonthlyDeliveries}
                onChange={(e) => setFormData({ ...formData, estimatedMonthlyDeliveries: e.target.value })}
                error={!!errors.estimatedMonthlyDeliveries}
                helperText={errors.estimatedMonthlyDeliveries}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <FormControl fullWidth error={!!errors.zone}>
                <InputLabel>Zone</InputLabel>
                <Select
                  value={formData.zone}
                  label="Zone"
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                >
                  <MenuItem value={1}>Zone 1 (0-5 miles)</MenuItem>
                  <MenuItem value={2}>Zone 2 (5-10 miles)</MenuItem>
                  <MenuItem value={3}>Zone 3 (10-20 miles)</MenuItem>
                  <MenuItem value={4}>Zone 4 (20-30 miles)</MenuItem>
                  <MenuItem value={5}>Zone 5 (30+ miles)</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                multiline
                rows={3}
                placeholder="Any additional notes about this lead..."
              />
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              Review the information below before saving the lead.
            </Alert>
            
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Business Information</Typography>
                <Typography><strong>Name:</strong> {formData.businessName}</Typography>
                <Typography><strong>Category:</strong> {formData.businessCategory}</Typography>
                <Typography><strong>Neighborhood:</strong> {formData.neighborhood}</Typography>
                <Typography><strong>Address:</strong> {formData.address}</Typography>
              </Box>
              
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Contact Information</Typography>
                <Typography><strong>Contact:</strong> {formData.contactPerson}</Typography>
                <Typography><strong>Phone:</strong> {formData.phone}</Typography>
                <Typography><strong>Email:</strong> {formData.email}</Typography>
              </Box>
              
              <Box sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Lead Analysis</Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label={`Lead Score: ${calculateLeadScore()}`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`Revenue Potential: $${calculateRevenuePotential()}/mo`}
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    label={`Recommended Package: ${recommendPackage()}`}
                    color="info"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        Add New Lead
      </Typography>

      <Card>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ borderRadius: 2 }}
                >
                  Save Lead
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ borderRadius: 2 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddLead;
