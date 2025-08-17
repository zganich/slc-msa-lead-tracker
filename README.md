# East Bench Delivery - Lead Tracker

A modern, sleek web application for tracking sales leads for the East Bench Delivery Service. Built with React, TypeScript, and Material-UI.

## Features

### 🎯 Lead Management
- **Neighborhood-based sorting** (Sugar House, Cottonwood Heights, Federal Heights, Holladay, etc.)
- **Lead status tracking** (New Lead → Closed Won/Lost)
- **Follow-up scheduling** with reminders
- **Lead scoring** based on neighborhood, business type, delivery volume
- **Revenue potential calculation** using zone-based pricing
- **Bulk package recommendations** (Starter Pack, Contractor Pack, etc.)

### 📊 Dashboard & Analytics
- **Real-time statistics** with beautiful charts
- **Lead distribution** by neighborhood and status
- **Revenue tracking** and projections
- **Activity timeline** for each lead
- **Follow-up reminders**

### 🎨 Modern UI/UX
- **Material-UI design** with custom theme
- **Responsive layout** for desktop and mobile
- **Smooth animations** with Framer Motion
- **Toast notifications** for user feedback
- **Professional color scheme** with East Bench branding

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## App Structure

### Pages
- **Dashboard** - Overview with charts and statistics
- **Lead List** - All leads with filtering and search
- **Add Lead** - Multi-step form for adding new leads
- **Lead Detail** - Detailed view of individual leads

### Components
- **Header** - Navigation and user menu
- **Sidebar** - Main navigation menu
- **Dashboard** - Charts and statistics
- **LeadList** - Lead table with filters
- **AddLead** - Multi-step form
- **LeadDetail** - Lead details and activity

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Material-UI** - Component library
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## Features in Detail

### Lead Scoring System
- **Neighborhood scoring** (Sugar House: +25, Cottonwood Heights: +20, etc.)
- **Business category scoring** (Contractors: +25, Hardware: +20, etc.)
- **Delivery volume scoring** (30+ deliveries: +25, 20+ deliveries: +20, etc.)
- **Zone scoring** (Zone 1: +20, Zone 2: +15, etc.)

### Revenue Calculation
- **Zone-based pricing** (Zone 1: $9, Zone 2: $12, etc.)
- **Bulk package discounts** (10-30% off)
- **Monthly revenue projections**

### Neighborhoods Supported
1. Sugar House
2. Cottonwood Heights
3. Federal Heights
4. Holladay
5. Millcreek
6. East Millcreek
7. Canyon Rim
8. Mount Olympus
9. Wasatch Hollow
10. Emigration Canyon
11. Other

### Business Categories
1. Hardware Store
2. Auto Parts Store
3. Plumbing Contractor
4. HVAC Contractor
5. Electrical Contractor
6. Garden Center
7. Small Appliance Store
8. Tile/Flooring Store
9. Lighting Store
10. Industrial Supply
11. Other

## Customization

### Theme Colors
The app uses a custom Material-UI theme with:
- **Primary**: Professional blue (#1976d2)
- **Secondary**: Accent color (#dc004e)
- **Background**: Light gray (#f5f5f5)
- **Text**: Dark gray (#1a1a1a)

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `src/App.tsx`
3. Update the sidebar navigation in `src/components/Sidebar.tsx`

## Backend Integration

This is currently a frontend-only application with mock data. To integrate with a backend:

1. **Replace mock data** with API calls
2. **Add authentication** for user login
3. **Connect to database** (Airtable, Google Sheets, or custom backend)
4. **Add real-time updates** with WebSocket

## Deployment

### Netlify
```bash
npm run build
# Upload build folder to Netlify
```

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve build folder
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please contact the development team.

---

**Built with ❤️ for East Bench Delivery Service**
