import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  People,
  AttachMoney,
  LocalShipping,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data - replace with real data from your backend
const mockData = {
  totalLeads: 23,
  activeLeads: 17,
  closedWon: 3,
  totalRevenue: 15420,
  monthlyGrowth: 15.3,
  leadsByNeighborhood: [
    { name: 'Sugar House', value: 8, color: '#1976d2' },
    { name: 'Cottonwood Heights', value: 5, color: '#42a5f5' },
    { name: 'Holladay', value: 4, color: '#90caf9' },
    { name: 'Millcreek', value: 3, color: '#e3f2fd' },
    { name: 'Other', value: 3, color: '#f5f5f5' },
  ],
  leadsByStatus: [
    { name: 'New Lead', value: 8 },
    { name: 'Contacted', value: 6 },
    { name: 'Qualified', value: 4 },
    { name: 'Proposal Sent', value: 3 },
    { name: 'Closed Won', value: 2 },
  ],
  recentLeads: [
    {
      id: 'LEAD_001',
      businessName: 'Ace Hardware - Sugar House',
      contactPerson: 'Store Manager',
      neighborhood: 'Sugar House',
      status: 'New Lead',
      score: 85,
      revenuePotential: 540,
    },
    {
      id: 'LEAD_002',
      businessName: 'Cottonwood Plumbing',
      contactPerson: 'John Smith',
      neighborhood: 'Cottonwood Heights',
      status: 'Contacted',
      score: 78,
      revenuePotential: 720,
    },
    {
      id: 'LEAD_003',
      businessName: 'Holladay Garden Center',
      contactPerson: 'Sarah Johnson',
      neighborhood: 'Holladay',
      status: 'Qualified',
      score: 92,
      revenuePotential: 480,
    },
  ],
};

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}> = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
      {subtitle && (
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700 }}>
        Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Box  sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }}>
          <StatCard
            title="Total Leads"
            value={mockData.totalLeads}
            icon={<People />}
            color="#1976d2"
            subtitle="+3 this week"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }}>
          <StatCard
            title="Active Leads"
            value={mockData.activeLeads}
            icon={<TrendingUp />}
            color="#2e7d32"
            subtitle="74% of total"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }}>
          <StatCard
            title="Revenue Potential"
            value={`$${mockData.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#ed6c02"
            subtitle="Monthly"
          />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "50%", md: "33.33%" } }}>
          <StatCard
            title="Closed Won"
            value={mockData.closedWon}
            icon={<CheckCircle />}
            color="#9c27b0"
            subtitle="This month"
          />
        </Box>
      </Box>

      {/* Charts Row */}
      <Box  sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Leads by Neighborhood
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.leadsByNeighborhood}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: { name: string; percent?: number }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.leadsByNeighborhood.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Leads by Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.leadsByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recent Leads */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Recent Leads
          </Typography>
          
          {mockData.recentLeads.map((lead) => (
            <Box
              key={lead.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 2,
                borderRadius: 2,
                backgroundColor: 'background.default',
                '&:last-child': { mb: 0 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <People />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {lead.businessName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {lead.contactPerson} • {lead.neighborhood}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                  label={lead.status}
                  size="small"
                  color={
                    lead.status === 'New Lead' ? 'primary' :
                    lead.status === 'Contacted' ? 'warning' :
                    lead.status === 'Qualified' ? 'info' :
                    'success'
                  }
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Score: {lead.score}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${lead.revenuePotential}/mo
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
