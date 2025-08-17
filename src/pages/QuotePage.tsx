import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  LocationOn,
  LocalShipping,
  AccessTime,
  AttachMoney,
  CheckCircle,
  Business,
  Home,
  Add,
  Delete,
  ExpandMore,
  Route,
  Analytics,
  CallSplit,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface AddressData {
  businessName: string;
  streetNumber: string;
  streetName: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  lat?: number;
  lng?: number;
}

interface DeliveryStop {
  id: string;
  address: AddressData;
  packageType: string;
  packageDescription: string;
  customerName: string;
  contactPhone: string;
}

interface MultiDropQuote {
  baseFee: number;
  totalMiles: number;
  totalCost: number;
  deliveryStops: DeliveryStop[];
  optimizedRoute: { lat: number; lng: number; stopId: string }[];
  costPerCustomer: number;
  estimatedTime: string;
  elevationAdjustment: number;
  terrainMultiplier: number;
}

interface TerrainInfo {
  elevationGain: number;
  terrainType: 'flat' | 'hilly' | 'mountainous';
  multiplier: number;
  description: string;
}

const QuotePage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [deliveryType, setDeliveryType] = useState<'single' | 'multi'>('single');
  const [tabValue, setTabValue] = useState(0);
  
  // Single delivery state
  const [pickupData, setPickupData] = useState<AddressData>({
    businessName: '',
    streetNumber: '',
    streetName: '',
    addressLine2: '',
    city: '',
    state: 'UT',
    zipCode: '',
  });
  
  const [deliveryData, setDeliveryData] = useState<AddressData>({
    businessName: '',
    streetNumber: '',
    streetName: '',
    addressLine2: '',
    city: '',
    state: 'UT',
    zipCode: '',
  });

  // Multi-drop state
  const [businessData, setBusinessData] = useState<AddressData>({
    businessName: '',
    streetNumber: '',
    streetName: '',
    addressLine2: '',
    city: '',
    state: 'UT',
    zipCode: '',
  });

  const [deliveryStops, setDeliveryStops] = useState<DeliveryStop[]>([
    {
      id: '1',
      address: {
        businessName: '',
        streetNumber: '',
        streetName: '',
        addressLine2: '',
        city: '',
        state: 'UT',
        zipCode: '',
      },
      packageType: '',
      packageDescription: '',
      customerName: '',
      contactPhone: '',
    }
  ]);

  const [packageType, setPackageType] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [packageDescription, setPackageDescription] = useState('');
  const [quote, setQuote] = useState<any>(null);
  const [multiDropQuote, setMultiDropQuote] = useState<MultiDropQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCostSplitting, setShowCostSplitting] = useState(false);
  
  const [mapCenter] = useState<[number, number]>([40.7608, -111.8910]); // Salt Lake City

  const steps = deliveryType === 'single' 
    ? ['Pickup Details', 'Delivery Details', 'Package Info', 'Get Quote']
    : ['Business Details', 'Delivery Stops', 'Review & Quote'];

  // Salt Lake City area elevation zones and terrain data
  const ELEVATION_ZONES = {
    // Valley floor - Salt Lake City, West Valley, Murray, etc.
    valley: {
      elevationRange: [4200, 4400],
      areas: ['salt lake city', 'west valley', 'murray', 'midvale', 'south salt lake', 'taylorsville'],
      multiplier: 1.0,
      description: 'Valley floor - standard rates'
    },
    // Foothills - Cottonwood Heights, Holladay, East bench areas
    foothills: {
      elevationRange: [4400, 5200],
      areas: ['cottonwood heights', 'holladay', 'millcreek', 'east millcreek', 'sugar house'],
      multiplier: 1.15,
      description: 'Foothills - moderate elevation gain'
    },
    // Canyon areas - Park City, Alta, Brighton, Solitude
    canyon: {
      elevationRange: [5200, 7000],
      areas: ['park city', 'alta', 'brighton', 'solitude', 'snowbird'],
      multiplier: 1.35,
      description: 'Canyon routes - significant elevation gain'
    },
    // Mountain communities - Deer Valley, Canyons, etc.
    mountain: {
      elevationRange: [7000, 9000],
      areas: ['deer valley', 'canyons', 'brian head', 'sundance'],
      multiplier: 1.6,
      description: 'Mountain communities - steep terrain'
    }
  };

  // Calculate terrain difficulty based on origin and destination
  const calculateTerrainInfo = (fromLat: number, fromLng: number, toLat: number, toLng: number, fromCity: string, toCity: string): TerrainInfo => {
    const fromCityLower = fromCity.toLowerCase();
    const toCityLower = toCity.toLowerCase();
    
    let maxMultiplier = 1.0;
    let terrainType: 'flat' | 'hilly' | 'mountainous' = 'flat';
    let description = 'Valley route - standard rates';
    
    // Determine terrain based on cities involved
    for (const [zoneKey, zone] of Object.entries(ELEVATION_ZONES)) {
      const isFromZone = zone.areas.some(area => fromCityLower.includes(area));
      const isToZone = zone.areas.some(area => toCityLower.includes(area));
      
      if (isFromZone || isToZone) {
        if (zone.multiplier > maxMultiplier) {
          maxMultiplier = zone.multiplier;
          description = zone.description;
          
          if (zone.multiplier >= 1.5) terrainType = 'mountainous';
          else if (zone.multiplier >= 1.15) terrainType = 'hilly';
        }
      }
    }
    
    // Special routes with known elevation challenges
    const specialRoutes = [
      {
        from: 'salt lake city',
        to: 'park city',
        multiplier: 1.45,
        description: 'SLC to Park City - I-80 mountain pass (2,000ft elevation gain)',
        type: 'mountainous' as const
      },
      {
        from: 'salt lake city',
        to: 'alta',
        multiplier: 1.65,
        description: 'SLC to Alta - Little Cottonwood Canyon (3,200ft elevation gain)',
        type: 'mountainous' as const
      },
      {
        from: 'salt lake city',
        to: 'brighton',
        multiplier: 1.6,
        description: 'SLC to Brighton - Big Cottonwood Canyon (3,000ft elevation gain)',
        type: 'mountainous' as const
      },
      {
        from: 'salt lake city',
        to: 'snowbird',
        multiplier: 1.7,
        description: 'SLC to Snowbird - Little Cottonwood Canyon (3,500ft elevation gain)',
        type: 'mountainous' as const
      }
    ];
    
    for (const route of specialRoutes) {
      if ((fromCityLower.includes(route.from) && toCityLower.includes(route.to)) ||
          (fromCityLower.includes(route.to) && toCityLower.includes(route.from))) {
        maxMultiplier = route.multiplier;
        description = route.description;
        terrainType = route.type;
        break;
      }
    }
    
    // Estimate elevation gain (rough calculation)
    let elevationGain = 0;
    if (terrainType === 'mountainous') elevationGain = 2000 + Math.random() * 1500;
    else if (terrainType === 'hilly') elevationGain = 500 + Math.random() * 800;
    else elevationGain = Math.random() * 300;
    
    return {
      elevationGain: Math.round(elevationGain),
      terrainType,
      multiplier: maxMultiplier,
      description
    };
  };

  // Address autocomplete using OpenStreetMap Nominatim
  const getAddressSuggestions = async (query: string): Promise<any[]> => {
    if (query.length < 3) return [];
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Salt Lake City, UT')}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      return data.map((item: any) => ({
        display_name: item.display_name,
        address: item.address,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon),
      }));
    } catch (error) {
      console.error('Address autocomplete error:', error);
      return [];
    }
  };

  // Multi-drop pricing structure
  const MULTI_DROP_PRICING = {
    baseFee: 25, // Base fee to start the route
    perDropFee: 8, // Minimum fee per delivery (0-5 miles)
    mileageRates: [
      { maxMiles: 5, rate: 0 }, // Included in per-drop fee
      { maxMiles: 30, rate: 1 }, // $1/mile for 5-30 miles
      { maxMiles: Infinity, rate: 5 }, // $5/mile for 30+ miles
    ],
  };

  // Single delivery pricing
  const ZONE_PRICING = {
    'Zone 1': { baseRate: 15, perMile: 2.5 },
    'Zone 2': { baseRate: 18, perMile: 3.0 },
    'Zone 3': { baseRate: 22, perMile: 3.5 },
  };

  const geocodeAddress = async (addressData: AddressData): Promise<{ lat: number; lng: number } | null> => {
    const fullAddress = `${addressData.streetNumber} ${addressData.streetName} ${addressData.addressLine2}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const optimizeRoute = (business: { lat: number; lng: number }, stops: { lat: number; lng: number; id: string }[]) => {
    // Simple nearest neighbor optimization (for demo - in production use proper TSP solver)
    const optimizedRoute = [{ lat: business.lat, lng: business.lng, stopId: 'business' }];
    const unvisited = [...stops];
    let current = business;

    while (unvisited.length > 0) {
      let nearest = unvisited[0];
      let nearestDistance = calculateDistance(current.lat, current.lng, nearest.lat, nearest.lng);

      for (let i = 1; i < unvisited.length; i++) {
        const distance = calculateDistance(current.lat, current.lng, unvisited[i].lat, unvisited[i].lng);
        if (distance < nearestDistance) {
          nearest = unvisited[i];
          nearestDistance = distance;
        }
      }

      optimizedRoute.push({ lat: nearest.lat, lng: nearest.lng, stopId: nearest.id });
      current = nearest;
      unvisited.splice(unvisited.indexOf(nearest), 1);
    }

    return optimizedRoute;
  };

  const calculateMultiDropQuote = async () => {
    setLoading(true);
    setError('');

    try {
      // Geocode business address
      const businessCoords = await geocodeAddress(businessData);
      if (!businessCoords) {
        throw new Error('Unable to find business address');
      }

      // Geocode all delivery stops
      const geocodedStops = [];
      for (const stop of deliveryStops) {
        const coords = await geocodeAddress(stop.address);
        if (!coords) {
          throw new Error(`Unable to find address for stop: ${stop.address.streetNumber} ${stop.address.streetName}`);
        }
        geocodedStops.push({ ...coords, id: stop.id });
      }

      // Optimize route
      const optimizedRoute = optimizeRoute(businessCoords, geocodedStops);

      // Calculate total distance and terrain factors
      let totalDistance = 0;
      let maxTerrainMultiplier = 1.0;
      let totalElevationAdjustment = 0;
      const terrainInfos: TerrainInfo[] = [];

      for (let i = 0; i < optimizedRoute.length - 1; i++) {
        const current = optimizedRoute[i];
        const next = optimizedRoute[i + 1];
        const segmentDistance = calculateDistance(current.lat, current.lng, next.lat, next.lng);
        totalDistance += segmentDistance;

        // Get cities for terrain calculation
        const currentCity = current.stopId === 'business' ? businessData.city : 
          deliveryStops.find(s => s.id === current.stopId)?.address.city || businessData.city;
        const nextCity = next.stopId === 'business' ? businessData.city : 
          deliveryStops.find(s => s.id === next.stopId)?.address.city || businessData.city;

        const terrainInfo = calculateTerrainInfo(
          current.lat, current.lng, next.lat, next.lng,
          currentCity,
          nextCity
        );
        
        terrainInfos.push(terrainInfo);
        maxTerrainMultiplier = Math.max(maxTerrainMultiplier, terrainInfo.multiplier);
        
        // Add elevation-based cost adjustment
        const elevationCost = (terrainInfo.elevationGain / 1000) * 3; // $3 per 1000ft elevation gain
        totalElevationAdjustment += elevationCost;
      }

      // Calculate base cost
      let totalCost = MULTI_DROP_PRICING.baseFee;

      // Calculate per-drop costs with terrain adjustments
      for (const stop of deliveryStops) {
        const stopCoords = geocodedStops.find(s => s.id === stop.id)!;
        const distanceFromBusiness = calculateDistance(
          businessCoords.lat, businessCoords.lng,
          stopCoords.lat, stopCoords.lng
        );

        // Get terrain info for this specific route
        const terrainInfo = calculateTerrainInfo(
          businessCoords.lat, businessCoords.lng,
          stopCoords.lat, stopCoords.lng,
          businessData.city,
          stop.address.city
        );

        let dropCost = MULTI_DROP_PRICING.perDropFee;
        
        // Add mileage cost for this drop
        for (const rate of MULTI_DROP_PRICING.mileageRates) {
          if (distanceFromBusiness <= rate.maxMiles) {
            dropCost += Math.max(0, distanceFromBusiness - 5) * rate.rate;
            break;
          }
        }

        // Apply terrain multiplier
        dropCost *= terrainInfo.multiplier;

        totalCost += dropCost;
      }

      // Add total elevation adjustment
      totalCost += totalElevationAdjustment;

      // Apply urgency multiplier
      if (urgency === 'express') totalCost *= 1.5;
      else if (urgency === 'same-day') totalCost *= 1.25;

      const estimatedTime = Math.ceil((totalDistance / 25) * 60 + (deliveryStops.length * 10)); // 25 mph + 10 min per stop

      setMultiDropQuote({
        baseFee: MULTI_DROP_PRICING.baseFee,
        totalMiles: Math.round(totalDistance * 10) / 10,
        totalCost: Math.round(totalCost * 100) / 100,
        deliveryStops,
        optimizedRoute,
        costPerCustomer: Math.round((totalCost / deliveryStops.length) * 100) / 100,
        estimatedTime: `${Math.floor(estimatedTime / 60)}h ${estimatedTime % 60}m`,
        elevationAdjustment: Math.round(totalElevationAdjustment * 100) / 100,
        terrainMultiplier: Math.round(maxTerrainMultiplier * 100) / 100,
      });

      setActiveStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to calculate multi-drop quote');
    } finally {
      setLoading(false);
    }
  };

  const addDeliveryStop = () => {
    const newStop: DeliveryStop = {
      id: Date.now().toString(),
      address: {
        businessName: '',
        streetNumber: '',
        streetName: '',
        addressLine2: '',
        city: '',
        state: 'UT',
        zipCode: '',
      },
      packageType: '',
      packageDescription: '',
      customerName: '',
      contactPhone: '',
    };
    setDeliveryStops([...deliveryStops, newStop]);
  };

  const removeDeliveryStop = (id: string) => {
    if (deliveryStops.length > 1) {
      setDeliveryStops(deliveryStops.filter(stop => stop.id !== id));
    }
  };

  const updateDeliveryStop = (id: string, field: string, value: any) => {
    setDeliveryStops(deliveryStops.map(stop => 
      stop.id === id 
        ? { ...stop, [field]: value }
        : stop
    ));
  };

  const updateDeliveryStopAddress = (id: string, field: string, value: string) => {
    setDeliveryStops(deliveryStops.map(stop => 
      stop.id === id 
        ? { ...stop, address: { ...stop.address, [field]: value } }
        : stop
    ));
  };

  const renderAddressForm = (
    data: AddressData,
    setData: React.Dispatch<React.SetStateAction<AddressData>>,
    title: string,
    icon: React.ReactNode
  ) => (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {icon}
        <Typography variant="h5" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Business/Contact Name"
          value={data.businessName}
          onChange={(e) => setData(prev => ({ ...prev, businessName: e.target.value }))}
          placeholder="Business name or contact person"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            sx={{ flex: '0 0 30%' }}
            required
            label="Street Number"
            value={data.streetNumber}
            onChange={(e) => setData(prev => ({ ...prev, streetNumber: e.target.value }))}
            placeholder="123"
          />
          <TextField
            sx={{ flex: 1 }}
            required
            label="Street Name"
            value={data.streetName}
            onChange={(e) => setData(prev => ({ ...prev, streetName: e.target.value }))}
            placeholder="Main Street"
          />
        </Box>
        <TextField
          fullWidth
          label="Address Line 2"
          value={data.addressLine2}
          onChange={(e) => setData(prev => ({ ...prev, addressLine2: e.target.value }))}
          placeholder="Apt, suite, floor, building, etc."
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            sx={{ flex: 1 }}
            required
            label="City"
            value={data.city}
            onChange={(e) => setData(prev => ({ ...prev, city: e.target.value }))}
            placeholder="Salt Lake City"
          />
          <FormControl sx={{ flex: '0 0 100px' }}>
            <InputLabel>State</InputLabel>
            <Select
              value={data.state}
              onChange={(e) => setData(prev => ({ ...prev, state: e.target.value }))}
              label="State"
            >
              <MenuItem value="UT">UT</MenuItem>
              <MenuItem value="ID">ID</MenuItem>
              <MenuItem value="WY">WY</MenuItem>
              <MenuItem value="CO">CO</MenuItem>
              <MenuItem value="NV">NV</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ flex: '0 0 120px' }}
            required
            label="ZIP Code"
            value={data.zipCode}
            onChange={(e) => setData(prev => ({ ...prev, zipCode: e.target.value }))}
            placeholder="84101"
          />
        </Box>
      </Box>
    </Box>
  );

  const renderDeliveryStopForm = (stop: DeliveryStop, index: number) => (
    <Accordion key={stop.id} defaultExpanded={index === 0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Typography variant="h6">
            Stop {index + 1}: {stop.customerName || 'New Delivery'}
          </Typography>
          <Box sx={{ ml: 'auto', mr: 2 }}>
            {deliveryStops.length > 1 && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeDeliveryStop(stop.id);
                }}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={{ flex: 1 }}
              label="Customer Name"
              value={stop.customerName}
              onChange={(e) => updateDeliveryStop(stop.id, 'customerName', e.target.value)}
              placeholder="Customer or recipient name"
            />
            <TextField
              sx={{ flex: 1 }}
              label="Contact Phone"
              value={stop.contactPhone}
              onChange={(e) => updateDeliveryStop(stop.id, 'contactPhone', e.target.value)}
              placeholder="(801) 555-0123"
            />
          </Box>
          
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Delivery Address</Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={{ flex: '0 0 30%' }}
              required
              label="Street Number"
              value={stop.address.streetNumber}
              onChange={(e) => updateDeliveryStopAddress(stop.id, 'streetNumber', e.target.value)}
              placeholder="123"
            />
            <TextField
              sx={{ flex: 1 }}
              required
              label="Street Name"
              value={stop.address.streetName}
              onChange={(e) => updateDeliveryStopAddress(stop.id, 'streetName', e.target.value)}
              placeholder="Main Street"
            />
          </Box>
          
          <TextField
            fullWidth
            label="Address Line 2"
            value={stop.address.addressLine2}
            onChange={(e) => updateDeliveryStopAddress(stop.id, 'addressLine2', e.target.value)}
            placeholder="Apt, suite, floor, building, etc."
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              sx={{ flex: 1 }}
              required
              label="City"
              value={stop.address.city}
              onChange={(e) => updateDeliveryStopAddress(stop.id, 'city', e.target.value)}
              placeholder="Salt Lake City"
            />
            <FormControl sx={{ flex: '0 0 100px' }}>
              <InputLabel>State</InputLabel>
              <Select
                value={stop.address.state}
                onChange={(e) => updateDeliveryStopAddress(stop.id, 'state', e.target.value)}
                label="State"
              >
                <MenuItem value="UT">UT</MenuItem>
                <MenuItem value="ID">ID</MenuItem>
                <MenuItem value="WY">WY</MenuItem>
                <MenuItem value="CO">CO</MenuItem>
                <MenuItem value="NV">NV</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ flex: '0 0 120px' }}
              required
              label="ZIP Code"
              value={stop.address.zipCode}
              onChange={(e) => updateDeliveryStopAddress(stop.id, 'zipCode', e.target.value)}
              placeholder="84101"
            />
          </Box>

          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Package Details</Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ flex: 1 }} required>
              <InputLabel>Package Type</InputLabel>
              <Select
                value={stop.packageType}
                onChange={(e) => updateDeliveryStop(stop.id, 'packageType', e.target.value)}
                label="Package Type"
              >
                <MenuItem value="envelope">Envelope/Documents</MenuItem>
                <MenuItem value="small">Small Package (under 20 lbs)</MenuItem>
                <MenuItem value="medium">Medium Package (20-50 lbs)</MenuItem>
                <MenuItem value="large">Large Package (50+ lbs)</MenuItem>
                <MenuItem value="fragile">Fragile Items</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ flex: 1 }}
              label="Package Description"
              value={stop.packageDescription}
              onChange={(e) => updateDeliveryStop(stop.id, 'packageDescription', e.target.value)}
              placeholder="Brief description of items"
            />
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );

  const handleNext = () => {
    setError('');
    
    if (deliveryType === 'single') {
      if (activeStep === 0) {
        if (!pickupData.streetNumber || !pickupData.streetName || !pickupData.city || !pickupData.zipCode) {
          setError('Please fill in all required pickup address fields');
          return;
        }
        setActiveStep(1);
      } else if (activeStep === 1) {
        if (!deliveryData.streetNumber || !deliveryData.streetName || !deliveryData.city || !deliveryData.zipCode) {
          setError('Please fill in all required delivery address fields');
          return;
        }
        setActiveStep(2);
      } else if (activeStep === 2) {
        if (!packageType) {
          setError('Please select a package type');
          return;
        }
        // calculateSingleQuote(); // You'd implement this similar to before
        setActiveStep(3);
      }
    } else {
      if (activeStep === 0) {
        if (!businessData.streetNumber || !businessData.streetName || !businessData.city || !businessData.zipCode) {
          setError('Please fill in all required business address fields');
          return;
        }
        setActiveStep(1);
      } else if (activeStep === 1) {
        // Validate all delivery stops
        for (const stop of deliveryStops) {
          if (!stop.address.streetNumber || !stop.address.streetName || !stop.address.city || !stop.address.zipCode || !stop.packageType) {
            setError('Please complete all delivery stop information');
            return;
          }
        }
        calculateMultiDropQuote();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
        AI-Powered Delivery Quotes
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
          <Tab 
            label="Single Delivery" 
            onClick={() => {
              setDeliveryType('single');
              setActiveStep(0);
            }}
          />
          <Tab 
            label="Multi-Drop Route" 
            onClick={() => {
              setDeliveryType('multi');
              setActiveStep(0);
            }}
          />
        </Tabs>
      </Paper>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: '300px' }}>
          <Paper sx={{ p: 3 }}>
            {deliveryType === 'single' ? (
              <>
                {activeStep === 0 && renderAddressForm(
                  pickupData,
                  setPickupData,
                  'Pickup Location',
                  <Business sx={{ color: 'primary.main' }} />
                )}
                {activeStep === 1 && renderAddressForm(
                  deliveryData,
                  setDeliveryData,
                  'Delivery Location',
                  <Home sx={{ color: 'secondary.main' }} />
                )}
                {/* Single delivery package info and quote display would go here */}
              </>
            ) : (
              <>
                {activeStep === 0 && renderAddressForm(
                  businessData,
                  setBusinessData,
                  'Business Location',
                  <Business sx={{ color: 'primary.main' }} />
                )}
                
                {activeStep === 1 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h5">Delivery Stops</Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={addDeliveryStop}
                      >
                        Add Stop
                      </Button>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Delivery Speed</InputLabel>
                        <Select
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value)}
                          label="Delivery Speed"
                        >
                          <MenuItem value="standard">Standard (Next Day)</MenuItem>
                          <MenuItem value="same-day">Same Day (+25%)</MenuItem>
                          <MenuItem value="express">Express (2-4 hours) (+50%)</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    {deliveryStops.map((stop, index) => renderDeliveryStopForm(stop, index))}
                  </Box>
                )}

                {activeStep === 2 && multiDropQuote && (
                  <Box>
                    <Typography variant="h5" sx={{ mb: 3 }}>
                      AI-Optimized Multi-Drop Route
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: 1, minWidth: '200px' }}>
                        <Card>
                          <CardContent sx={{ textAlign: 'center' }}>
                            <Route sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{multiDropQuote.totalMiles} miles</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Optimized Route
                            </Typography>
                            {multiDropQuote.terrainMultiplier > 1.1 && (
                              <Chip 
                                size="small" 
                                label={`${multiDropQuote.terrainMultiplier}x terrain`}
                                color="warning"
                                sx={{ mt: 1 }}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: '200px' }}>
                        <Card>
                          <CardContent sx={{ textAlign: 'center' }}>
                            <AccessTime sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{multiDropQuote.estimatedTime}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Est. Time
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: '200px' }}>
                        <Card>
                          <CardContent sx={{ textAlign: 'center' }}>
                            <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6">{multiDropQuote.deliveryStops.length} stops</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Deliveries
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                      <Box sx={{ flex: 1, minWidth: '200px' }}>
                        <Card>
                          <CardContent sx={{ textAlign: 'center' }}>
                            <AttachMoney sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              ${multiDropQuote.totalCost}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Total Cost
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={showCostSplitting}
                            onChange={(e) => setShowCostSplitting(e.target.checked)}
                          />
                        }
                        label="Show Cost Splitting Options"
                      />
                    </Box>

                    {showCostSplitting && (
                      <Card sx={{ mb: 4 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CallSplit sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="h6">Cost Per Customer</Typography>
                          </Box>
                          <Typography variant="h4" sx={{ color: 'success.main', mb: 2 }}>
                            ${multiDropQuote.costPerCustomer}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Split equally among {multiDropQuote.deliveryStops.length} customers
                          </Typography>
                          <Divider sx={{ my: 2 }} />
                          <Typography variant="body2">
                            <strong>Pricing Breakdown:</strong><br />
                            • Base route fee: ${multiDropQuote.baseFee}<br />
                            • Per-delivery charges: ${(multiDropQuote.totalCost - multiDropQuote.baseFee - multiDropQuote.elevationAdjustment).toFixed(2)}<br />
                            {multiDropQuote.elevationAdjustment > 0 && (
                              <>• Elevation/terrain adjustment: ${multiDropQuote.elevationAdjustment}<br /></>
                            )}
                            • Divided by {multiDropQuote.deliveryStops.length} customers = ${multiDropQuote.costPerCustomer} each
                          </Typography>
                          
                          {multiDropQuote.terrainMultiplier > 1.1 && (
                            <>
                              <Divider sx={{ my: 2 }} />
                              <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'warning.main' }}>
                                <strong>Terrain Notice:</strong> This route includes mountainous terrain or significant elevation changes. 
                                Additional charges account for increased fuel consumption and vehicle wear in steep areas.
                              </Typography>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    <TableContainer component={Paper} sx={{ mb: 4 }}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Stop</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Package</TableCell>
                            <TableCell align="right">Individual Cost</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {multiDropQuote.deliveryStops.map((stop, index) => (
                            <TableRow key={stop.id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{stop.customerName}</TableCell>
                              <TableCell>
                                {stop.address.streetNumber} {stop.address.streetName}
                                {stop.address.addressLine2 && `, ${stop.address.addressLine2}`}
                              </TableCell>
                              <TableCell>{stop.packageType}</TableCell>
                              <TableCell align="right">${multiDropQuote.costPerCustomer}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CheckCircle />}
                        sx={{ px: 4, py: 1.5 }}
                        onClick={() => alert('Multi-drop booking system coming soon! Please call (801) 555-0123 to book this route.')}
                      >
                        Book Multi-Drop Route
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
              >
                Back
              </Button>
              {(deliveryType === 'single' && activeStep < 3) || (deliveryType === 'multi' && activeStep < 2) ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Next'}
                </Button>
              ) : null}
            </Box>
          </Paper>
        </Box>

        <Box sx={{ flex: '0 0 300px' }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              AI-First Delivery Advantages
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              <Chip label="Route Optimization" color="primary" size="small" />
              <Chip label="Terrain Analysis" color="warning" size="small" />
              <Chip label="Cost Transparency" color="primary" size="small" />
              <Chip label="Multi-Drop Efficiency" color="primary" size="small" />
              <Chip label="Elevation Aware" color="info" size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Our AI optimizes routes considering Salt Lake City's unique mountainous terrain, factoring elevation changes and fuel costs.
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontStyle: 'italic' }}>
              <strong>Terrain Examples:</strong><br />
              • SLC to Park City: +45% (I-80 mountain pass)<br />
              • SLC to Alta: +65% (Little Cottonwood Canyon)<br />
              • Valley routes: Standard rates
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Service Map
            </Typography>
            <Box sx={{ height: '300px', borderRadius: 2, overflow: 'hidden' }}>
              <MapContainer
                center={mapCenter}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Add markers and routes based on current state */}
              </MapContainer>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default QuotePage;