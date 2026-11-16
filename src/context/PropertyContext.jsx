import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import defaultProperties from '../data/properties.js';

export const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [propertiesList, setPropertiesList] = useState(defaultProperties || []);
  const [filters, setFilters] = useState({
    purpose: 'sale',
    category: 'all',
    locality: 'all',
    budget: 'all',
    minArea: '',
    maxArea: '',
    areaUnit: 'sqyd',
    bedrooms: 'any',
    furnishing: 'any',
    minBudget: '',
    maxBudget: '',
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    let result = [...propertiesList];

    // Filter by purpose
    if (filters.purpose && filters.purpose !== 'all') {
      result = result.filter(p => p.purpose === filters.purpose);
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    // Filter by locality
    if (filters.locality && filters.locality !== 'all') {
      result = result.filter(p => p.locality === filters.locality);
    }

    // Filter by min budget
    if (filters.minBudget) {
      result = result.filter(p => p.price >= Number(filters.minBudget));
    }

    // Filter by max budget
    if (filters.maxBudget) {
      result = result.filter(p => p.price <= Number(filters.maxBudget));
    }

    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      result = result.filter(p => p.bedrooms && p.bedrooms >= Number(filters.bedrooms));
    }

    // Filter by furnishing
    if (filters.furnishing && filters.furnishing !== 'any') {
      result = result.filter(p =>
        p.furnishing && p.furnishing.toLowerCase().includes(filters.furnishing.toLowerCase())
      );
    }

    // Text search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.locality && p.locality.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        // recommended: featured first, then newest
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
    }

    return result;
  }, [propertiesList, filters, sortBy, searchQuery]);

  const getPropertyById = useCallback((id) => {
    return propertiesList.find(p => p.id === id);
  }, [propertiesList]);

  const addProperty = useCallback((propertyData) => {
    const code = Math.random().toString(16).substring(2, 10).toUpperCase();
    const newProperty = {
      ...propertyData,
      id: propertyData.id || `RPH-${propertyData.purpose === 'rent' ? 'R' : 'S'}-${code}`,
      verified: true,
      sample: false,
      featured: false,
      createdAt: new Date().toISOString(),
      owner: propertyData.owner || {
        name: 'Anil Chaudhary',
        phone: '9817486280',
      },
    };

    setPropertiesList(prev => [newProperty, ...prev]);
    return newProperty;
  }, []);

  const value = useMemo(() => ({
    properties: filteredProperties,
    allProperties: propertiesList,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    getPropertyById,
    addProperty,
  }), [filteredProperties, propertiesList, filters, sortBy, searchQuery, getPropertyById, addProperty]);

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider');
  }
  return context;
}

export default PropertyContext;
