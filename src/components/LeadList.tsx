import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  FilterList as FilterIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - replace with real data from your backend
const mockLeads = [
  {
    id: 'LEAD_001',
    businessName: 'Ace Hardware - Sugar House',
    contactPerson: 'Store Manager',
    phone: '(801) 487-2000',
    email: 'sugarhouse@acehardware.com',
    neighborhood: 'Sugar House',
    businessCategory: 'Hardware Store',
    leadStatus: 'New Lead',
    leadScore: 85,
    estimatedMonthlyDeliveries: 20,
    zone: 1,
    revenuePotential: 540,
    recommendedPackage: 'Contractor Pack',
    notes: 'High priority - contractors need delivery service',
    lastContact: '2024-08-16',
    nextFollowUp: '2024-08-20',
    createdDate: '2024-08-15',
  },
  {
    id: 'LEAD_002',
    businessName: 'Cottonwood Plumbing',
    contactPerson: 'John Smith',
    phone: '(801) 555-0123',
    email: 'john@cottonwoodplumbing.com',
    neighborhood: 'Cottonwood Heights',
    businessCategory: 'Plumbing Contractor',
    leadStatus: 'Contacted',
    leadScore: 78,
    estimatedMonthlyDeliveries: 25,
    zone: 2,
    revenuePotential: 720,
    recommendedPackage: 'Pro Pack',
    notes: 'Interested in bulk pricing for parts delivery',
    lastContact: '2024-08-14',
    nextFollowUp: '2024-08-18',
    createdDate: '2024-08-12',
  },
  {
    id: 'LEAD_003',
    businessName: 'Holladay Garden Center',
    contactPerson: 'Sarah Johnson',
    phone: '(801) 555-0456',
    email: 'sarah@holladaygarden.com',
    neighborhood: 'Holladay',
    businessCategory: 'Garden Center',
    leadStatus: 'Qualified',
    leadScore: 92,
    estimatedMonthlyDeliveries: 15,
    zone: 1,
    revenuePotential: 480,
    recommendedPackage: 'Business Pack',
    notes: 'Seasonal business - peak in spring/summer',
    lastContact: '2024-08-13',
    nextFollowUp: '2024-08-17',
    createdDate: '2024-08-10',
  },
];

const neighborhoods = [
  'All Neighborhoods',
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

const statuses = [
  'All Statuses',
  'New Lead',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Trial Scheduled',
  'Trial Completed',
  'Negotiating',
  'Closed Won',
  'Closed Lost',
  'Follow Up',
];

const LeadList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All Neighborhoods');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, leadId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedLeadId(leadId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLeadId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New Lead': return 'primary';
      case 'Contacted': return 'warning';
      case 'Qualified': return 'info';
      case 'Proposal Sent': return 'secondary';
      case 'Trial Scheduled': return 'info';
      case 'Trial Completed': return 'success';
      case 'Negotiating': return 'warning';
      case 'Closed Won': return 'success';
      case 'Closed Lost': return 'error';
      case 'Follow Up': return 'default';
      default: return 'default';
    }
  };

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch = lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNeighborhood = selectedNeighborhood === 'All Neighborhoods' || 
                               lead.neighborhood === selectedNeighborhood;
    const matchesStatus = selectedStatus === 'All Statuses' || 
                         lead.leadStatus === selectedStatus;
    
    return matchesSearch && matchesNeighborhood && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Sales Leads
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/leads/add')}
          sx={{ borderRadius: 2 }}
        >
          Add Lead
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <TextField
                fullWidth
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <FormControl fullWidth>
                <InputLabel>Neighborhood</InputLabel>
                <Select
                  value={selectedNeighborhood}
                  label="Neighborhood"
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                >
                  {neighborhoods.map((neighborhood) => (
                    <MenuItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={selectedStatus}
                  label="Status"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography variant="body2" color="text.secondary">
                {filteredLeads.length} leads
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Leads List */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {filteredLeads.map((lead) => (
          <Box sx={{ width: "100%" }} key={lead.id}>
            <Card sx={{ '&:hover': { boxShadow: 4 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <PeopleIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {lead.businessName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {lead.contactPerson} • {lead.phone} • {lead.email}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={lead.neighborhood}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={lead.businessCategory}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={`Score: ${lead.leadScore}`}
                          size="small"
                          color="primary"
                        />
                        <Chip
                          label={`$${lead.revenuePotential}/mo`}
                          size="small"
                          color="success"
                        />
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={lead.leadStatus}
                      color={getStatusColor(lead.leadStatus) as any}
                      size="small"
                    />
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, lead.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { navigate(`/leads/${selectedLeadId}`); handleMenuClose(); }}>
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Lead</MenuItem>
        <MenuItem onClick={handleMenuClose}>Schedule Follow-up</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark as Contacted</MenuItem>
      </Menu>
    </Box>
  );
};

export default LeadList;
