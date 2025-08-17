import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  People as PeopleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

// Mock data - replace with real data from your backend
const mockLead = {
  id: 'LEAD_001',
  businessName: 'Ace Hardware - Sugar House',
  contactPerson: 'Store Manager',
  phone: '(801) 487-2000',
  email: 'sugarhouse@acehardware.com',
  address: '1100 E 2100 S, Salt Lake City, UT 84106',
  neighborhood: 'Sugar House',
  businessCategory: 'Hardware Store',
  leadStatus: 'New Lead',
  leadScore: 85,
  estimatedMonthlyDeliveries: 20,
  zone: 1,
  revenuePotential: 540,
  recommendedPackage: 'Contractor Pack',
  notes: 'High priority - contractors need delivery service. Store manager is interested in bulk pricing for contractor accounts.',
  lastContact: '2024-08-16',
  nextFollowUp: '2024-08-20',
  createdDate: '2024-08-15',
  updatedDate: '2024-08-16',
};

const activityLog = [
  {
    id: 1,
    date: '2024-08-16 14:30',
    action: 'Lead created',
    description: 'Lead added to system',
    type: 'created',
  },
  {
    id: 2,
    date: '2024-08-16 15:45',
    action: 'Initial contact made',
    description: 'Called store manager, discussed delivery needs',
    type: 'contact',
  },
  {
    id: 3,
    date: '2024-08-16 16:20',
    action: 'Proposal sent',
    description: 'Sent Contractor Pack proposal via email',
    type: 'proposal',
  },
];

const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(mockLead);
  const [newNote, setNewNote] = useState('');

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

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving lead:', editedLead);
    setIsEditing(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      // Here you would typically save the note to your backend
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Lead Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
          {isEditing && (
            <Button
              variant="contained"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          )}
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* Main Lead Information */}
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
                  <PeopleIcon />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {editedLead.businessName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={editedLead.neighborhood}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={editedLead.businessCategory}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={editedLead.leadStatus}
                      color={getStatusColor(editedLead.leadStatus) as any}
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Contact Information
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.contactPerson}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.address}</Typography>
                  </Box>
                </Box>

                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Business Details
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.businessCategory}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TrendingUpIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{editedLead.estimatedMonthlyDeliveries} deliveries/month</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>Zone {editedLead.zone}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Notes
              </Typography>
              <Typography sx={{ mb: 3 }}>
                {editedLead.notes}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Add Note
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Add a new note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  multiline
                  rows={2}
                />
                <Button
                  variant="contained"
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          {/* Lead Score & Revenue */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Lead Analysis
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Lead Score
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    {editedLead.leadScore}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Revenue Potential
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    ${editedLead.revenuePotential}/mo
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Recommended Package
                  </Typography>
                  <Chip
                    label={editedLead.recommendedPackage}
                    color="info"
                    variant="outlined"
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Follow-up Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Follow-up
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Last Contact
                  </Typography>
                  <Typography variant="body1">
                    {editedLead.lastContact}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Next Follow-up
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {editedLead.nextFollowUp}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  Schedule Follow-up
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Activity Timeline
              </Typography>
              <Timeline>
                {activityLog.map((activity, index) => (
                  <TimelineItem key={activity.id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < activityLog.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {activity.action}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.date}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadDetail;
