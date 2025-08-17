import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
} from '@mui/material';
import {
  LocalShipping,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShipping sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                East Bench Delivery
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Professional last-mile delivery service for the Salt Lake City Metropolitan Statistical Area.
              Serving contractors, hardware stores, and local businesses with reliable, same-day delivery.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 East Bench Delivery. All rights reserved.
            </Typography>
          </Box>
          
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link onClick={() => handleNavigation('/')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Home
              </Link>
              <Link onClick={() => handleNavigation('/pricing')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Pricing
              </Link>
              <Link onClick={() => handleNavigation('/contractors')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Contractors
              </Link>
              <Link onClick={() => handleNavigation('/hardware-stores')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Hardware Stores
              </Link>
              <Link onClick={() => handleNavigation('/garden-centers')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Garden Centers
              </Link>
              <Link onClick={() => handleNavigation('/contact')} sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, cursor: 'pointer' }}>
                Contact
              </Link>
            </Box>
          </Box>
          
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  (801) 555-0123
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  info@eastbenchdelivery.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Salt Lake City MSA<br />
                  East Bench Area
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 4, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            Serving Sugar House, Cottonwood Heights, Federal Heights, Holladay, Millcreek, and surrounding areas.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
