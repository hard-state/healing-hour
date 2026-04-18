'use client';

import { useState, useEffect } from 'react';
import PricingForm from '../../components/PricingForm';
import LocationForm from '../../components/LocationForm';
import AdminAuth from '../../components/AdminAuth';
import '../../styles/admin.css';

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  specialties: string[];
  experience: string;
  order: number;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('team');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  
  // Load active tab from localStorage on mount
  useEffect(() => {
    const savedTab = localStorage.getItem('adminActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);
  
  // Hero section state
  const [heroData, setHeroData] = useState<any>(null);
  const [editingHero, setEditingHero] = useState(false);
  
  // Services state
  const [services, setServices] = useState<any[]>([]);
  const [editingService, setEditingService] = useState<any>(null);
  
  // Pricing state
  const [pricingData, setPricingData] = useState<any>(null);
  const [editingPricing, setEditingPricing] = useState(false);
  
  // Location state
  const [locationData, setLocationData] = useState<any>(null);
  const [editingLocation, setEditingLocation] = useState(false);
  
  // Delete confirmation state
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    show: boolean;
    type: 'team' | 'service';
    id?: string;
    name?: string;
  }>({ show: false, type: 'team' });
  
  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityStatus, setSecurityStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  // Contacts/Messages state
  const [contacts, setContacts] = useState<any[]>([]);
  const [isDeletingContact, setIsDeletingContact] = useState(false);

  useEffect(() => {
    fetchTeamMembers();
    fetchHeroData();
    fetchServices();
    fetchPricing();
    fetchLocation();
    fetchContacts();
  }, [activeTab]); // Refetch when tab changes

  const fetchLocation = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/location');
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleSaveLocation = async (locationFormData: any) => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/admin/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationFormData),
      });

      if (response.ok) {
        await fetchLocation();
        setEditingLocation(false);
      }
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  const fetchPricing = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/pricing');
      const data = await response.json();
      setPricingData(data);
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    }
  };

  const handleSavePricing = async (pricingFormData: any) => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/admin/pricing', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pricingFormData),
      });

      if (response.ok) {
        await fetchPricing();
        setEditingPricing(false);
      }
    } catch (error) {
      console.error('Error saving pricing data:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSaveService = async (serviceData: any) => {
    try {
      const url = editingService?._id 
        ? `https://dmtart.pro/healthy/api/admin/services/${editingService._id}`
        : 'https://dmtart.pro/healthy/api/admin/services';
      
      const method = editingService?._id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        await fetchServices();
        setEditingService(null);
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const fetchHeroData = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/hero');
      const data = await response.json();
      setHeroData(data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  const handleSaveHero = async (heroFormData: any) => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/admin/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroFormData),
      });

      if (response.ok) {
        await fetchHeroData();
        setEditingHero(false);
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('https://dmtart.pro/healthy/api/team');
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      // Try local server first, then fallback
      const response = await fetch('http://localhost:5000/api/contact');
      const data = await response.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setContacts([]);
        console.error('Data received is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await fetch(`https://dmtart.pro/healthy/api/admin/contact/${id}`, {
        method: 'DELETE',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSaveMember = async (memberData: Partial<TeamMember>) => {
    try {
      const isNewMember = !editingMember?._id || editingMember._id === '';
      
      // Remove _id field for new members to avoid Mongoose ObjectId casting error
      const dataToSend = isNewMember 
        ? { ...memberData, _id: undefined }
        : memberData;
      
      const url = isNewMember 
        ? 'https://dmtart.pro/healthy/api/admin/team'
        : `https://dmtart.pro/healthy/api/admin/team/${editingMember._id}`;
      
      const method = isNewMember ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        await fetchTeamMembers();
        setEditingMember(null);
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDeleteMember = async (id: string, name: string) => {
    setDeleteConfirmation({ show: true, type: 'team', id, name });
  };

  const handleDeleteService = async (id: string, name: string) => {
    setDeleteConfirmation({ show: true, type: 'service', id, name });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.id) {
      try {
        const url = deleteConfirmation.type === 'team' 
          ? `https://dmtart.pro/healthy/api/admin/team/${deleteConfirmation.id}`
          : `https://dmtart.pro/healthy/api/admin/services/${deleteConfirmation.id}`;
        
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (response.ok) {
          if (deleteConfirmation.type === 'team') {
            await fetchTeamMembers();
          } else {
            await fetchServices();
          }
        }
      } catch (error) {
        console.error('Error deleting:', error);
      } finally {
        setDeleteConfirmation({ show: false, type: 'team' });
      }
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      setSecurityStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    setIsUpdatingPassword(true);
    setSecurityStatus({ type: null, message: '' });

    try {
      const response = await fetch('http://localhost:5000/api/admin/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: securityData.currentPassword,
          newPassword: securityData.newPassword
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSecurityStatus({ type: 'success', message: 'Password updated successfully!' });
        setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setSecurityStatus({ type: 'error', message: data.message || 'Update failed' });
      }
    } catch (error) {
      setSecurityStatus({ type: 'error', message: 'Connection error' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gradient-to-br mt-12 from-warm-cream via-amber-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-soft-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-elegant font-bold text-matte-black">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-charcoal">Healthy Massage Therapy</span>
              <button
                onClick={() => {
                  localStorage.removeItem('isAdminAuthenticated');
                  localStorage.removeItem('adminLoginTime');
                  window.location.href = '/admin/login';
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-soft-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 py-4">
            {['team', 'hero', 'services', 'pricing', 'location', 'contacts', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-semibold text-sm capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black shadow-lg transform scale-105'
                    : 'bg-white border-2 border-soft-gold/30 text-charcoal hover:border-soft-gold hover:text-soft-gold hover:shadow-md'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'team' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-3xl font-elegant font-bold text-matte-black">Team Members</h2>
              <button
                onClick={() => setEditingMember({
                  _id: '',
                  name: '',
                  role: '',
                  image: '',
                  description: '',
                  specialties: [],
                  experience: '',
                  order: 0
                })}
                className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Team Member
              </button>
            </div>

            <div className="space-y-8">
              {teamMembers.map((member, index) => (
                <div key={member._id} className="relative">
                  <div className={`relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} flex items-center gap-8 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/30 hover:bg-white/40 transition-all duration-500`}>
                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Photo Side */}
                    <div className="relative z-10 w-32 h-32 flex-shrink-0">
                      <div className="relative w-full h-full mx-auto rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                      
                      {/* Role Badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                        {member.role}
                      </div>
                    </div>
                    
                    {/* Text Side */}
                    <div className="relative z-10 flex-1 text-left">
                      <h3 className="font-elegant text-2xl font-bold text-matte-black mb-2">
                        {member.name}
                      </h3>
                      
                      <p className="text-charcoal leading-relaxed mb-3 text-base">
                        {member.description}
                      </p>
                      
                      {/* Specialties */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {member.specialties?.map((specialty: string, i: number) => (
                            <span
                              key={specialty}
                              className="px-3 py-1 bg-soft-gold/20 text-matte-black text-xs rounded-full border border-soft-gold/30 backdrop-blur-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Experience */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-soft-gold rounded-full" />
                        <span className="text-sm text-charcoal font-medium">{member.experience} experience</span>
                      </div>
                    </div>
                    
                    {/* Admin Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                      <button
                        onClick={() => setEditingMember(member)}
                        className="px-3 py-1 bg-soft-gold border-2 border-black/40 text-matte-black rounded-full text-xs font-semibold hover:bg-yellow-400 transition-colors shadow-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(member._id, member.name)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition-colors shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-3xl font-elegant font-bold text-matte-black">Hero Section</h2>
              <button
                onClick={() => setEditingHero(true)}
                className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Edit Hero
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-soft-gold/20 hover:shadow-3xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-elegant font-bold text-matte-black mb-4">Main Content</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Main Heading:</p>
                      <p className="text-lg font-semibold text-matte-black">{heroData?.mainHeading || 'Not set'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Sub Heading:</p>
                      <p className="text-lg font-semibold text-soft-gold">{heroData?.subHeading || 'Not set'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-elegant font-bold text-matte-black mb-4">Carousel Images</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {heroData?.carouselImages?.map((img: any, index: number) => (
                      <div key={index} className="relative">
                        <img src={img.url} alt={img.alt} className="w-full h-24 object-cover rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-elegant font-bold text-matte-black mb-4">Floating Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {heroData?.floatingPhotos?.map((photo: any, index: number) => (
                    <div key={index} className="relative">
                      <img src={photo.url} alt={`Floating ${index}`} className="w-full h-20 object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Services</h2>
              <button
                onClick={() => setEditingService({
                  name: '',
                  image: '',
                  description: '',
                  order: 0
                })}
                className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Add Service
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {services.map((service) => (
                  <li key={service._id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service._id, service.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
              <button
                onClick={() => setEditingPricing(true)}
                className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Edit Pricing
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Travel Fee Package</h3>
                  <p className="text-gray-600">{pricingData?.travelFeePackage?.title || 'Not set'}</p>
                  <p className="text-sm text-gray-500 mb-2">{pricingData?.travelFeePackage?.timeRange || 'Not set'}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-lg text-gray-400 line-through">£{pricingData?.travelFeePackage?.originalPrice || 0}</span>
                    <span className="text-2xl font-bold text-soft-gold">£{pricingData?.travelFeePackage?.discountedPrice || 0}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {pricingData?.travelFeePackage?.options?.map((option: any, index: number) => (
                      <p key={index} className="text-sm text-gray-600">• {option.duration} - {option.price}</p>
                    )) || <p className="text-gray-600">No options set</p>}
                  </div>
                  <p className="text-amber-800 font-semibold mt-2">{pricingData?.safetyNotice?.heading || ''}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Uber Package</h3>
                  <p className="text-gray-600">{pricingData?.uberPackageComplex?.title || 'Not set'}</p>
                  <p className="text-sm text-gray-500 mb-2">{pricingData?.uberPackageComplex?.timeRange || 'Not set'}</p>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-lg text-gray-400 line-through">£{pricingData?.uberPackageComplex?.originalPrice || 0}</span>
                    <span className="text-2xl font-bold text-soft-gold">£{pricingData?.uberPackageComplex?.discountedPrice || 0}</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {pricingData?.uberPackageComplex?.options?.map((option: any, index: number) => (
                      <p key={index} className="text-sm text-gray-600">• {option.duration} - {option.price}</p>
                    )) || <p className="text-gray-600">No options set</p>}
                  </div>
                  <p className="text-amber-800 font-semibold mt-2">{pricingData?.safetyNotice?.heading || ''}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'location' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Location</h2>
              <button
                onClick={() => setEditingLocation(true)}
                className="bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Edit Location
              </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    {locationData?.address?.line1 || 'Not set'}<br />
                    {locationData?.address?.line2 || 'Not set'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-600">
                    {locationData?.contact?.phone || 'Not set'}<br />
                    {locationData?.contact?.email || 'Not set'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">{locationData?.hours || 'Not set'}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Background Image</h3>
                  <p className="text-gray-600 text-sm truncate">{locationData?.backgroundImage || 'Not set'}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Map Embed URL</h3>
                  <p className="text-gray-600 text-sm truncate">{locationData?.mapEmbedUrl || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-elegant font-bold text-matte-black">Messages & Appointments</h2>
              <button 
                onClick={fetchContacts}
                className="text-sm bg-soft-gold/20 hover:bg-soft-gold/40 px-4 py-2 rounded-lg transition-colors"
              >
                Refresh List
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-soft-gold/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-soft-gold/10 to-yellow-400/10">
                      <th className="px-6 py-4 text-sm font-bold text-matte-black uppercase">Date</th>
                      <th className="px-6 py-4 text-sm font-bold text-matte-black uppercase">Client</th>
                      <th className="px-6 py-4 text-sm font-bold text-matte-black uppercase">Service / Time</th>
                      <th className="px-6 py-4 text-sm font-bold text-matte-black uppercase">Message</th>
                      <th className="px-6 py-4 text-sm font-bold text-matte-black uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-soft-gold/10">
                    {!Array.isArray(contacts) || contacts.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-charcoal italic">
                          No messages received yet or error loading data.
                        </td>
                      </tr>
                    ) : (
                      contacts.map((contact: any) => (
                        <tr key={contact._id} className="hover:bg-amber-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <p className="text-xs text-gray-400">{new Date(contact.createdAt || Date.now()).toLocaleDateString()}</p>
                            <p className="text-sm font-bold text-soft-gold">{contact.preferredDate}</p>
                            <p className="text-xs text-charcoal">{contact.preferredTime}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-matte-black">{contact.fullName}</p>
                            <p className="text-xs text-charcoal">{contact.phone}</p>
                            <p className="text-xs text-gray-500">{contact.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-2 py-1 bg-soft-gold/20 rounded text-xs font-bold text-matte-black mb-1">
                              {contact.massageType}
                            </span>
                            <p className="text-xs text-charcoal">{contact.duration}</p>
                            <p className="text-xs text-charcoal italic">{contact.location}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-charcoal line-clamp-2 max-w-xs" title={contact.message}>
                              {contact.message || 'No message'}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                             <button 
                              onClick={() => handleDeleteContact(contact._id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              title="Delete Message"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-elegant font-bold text-matte-black mb-2">Account Security</h2>
              <p className="text-charcoal uppercase tracking-wider text-sm">Update your administrator credentials</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-soft-gold/20">
              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-matte-black mb-2 uppercase tracking-tight">Current Password</label>
                  <input
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) => setSecurityData({ ...securityData, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-soft-gold/30 rounded-xl focus:ring-2 focus:ring-soft-gold/50 focus:border-soft-gold transition-all bg-white/50"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-matte-black mb-2 uppercase tracking-tight">New Password</label>
                    <input
                      type="password"
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({ ...securityData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-soft-gold/30 rounded-xl focus:ring-2 focus:ring-soft-gold/50 focus:border-soft-gold transition-all bg-white/50"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-matte-black mb-2 uppercase tracking-tight">Confirm Password</label>
                    <input
                      type="password"
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({ ...securityData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-soft-gold/30 rounded-xl focus:ring-2 focus:ring-soft-gold/50 focus:border-soft-gold transition-all bg-white/50"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {securityStatus.type && (
                  <div className={`p-4 rounded-xl text-sm font-semibold ${
                    securityStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {securityStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full py-4 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}

        {editingMember && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editingMember._id ? 'Edit Team Member' : 'Add Team Member'}
              </h3>
              
              <TeamMemberForm
                member={editingMember}
                onSave={handleSaveMember}
                onCancel={() => setEditingMember(null)}
              />
            </div>
          </div>
        )}

        {editingHero && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Hero Content</h3>
              
              <HeroForm
                heroData={heroData}
                onSave={handleSaveHero}
                onCancel={() => setEditingHero(false)}
              />
            </div>
          </div>
        )}

        {editingService && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editingService._id ? 'Edit Service' : 'Add Service'}
              </h3>
              
              <ServiceForm
                service={editingService}
                onSave={handleSaveService}
                onCancel={() => setEditingService(null)}
              />
            </div>
          </div>
        )}

        {editingPricing && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Pricing</h3>
              
              <PricingForm
                pricingData={pricingData}
                onSave={handleSavePricing}
                onCancel={() => setEditingPricing(false)}
              />
            </div>
          </div>
        )}

        {editingLocation && (
          <div className="fixed inset-0 bg-gray-600/40 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Edit Location</h3>
              
              <LocationForm
                locationData={locationData}
                onSave={handleSaveLocation}
                onCancel={() => setEditingLocation(false)}
              />
            </div>
          </div>
        )}

        {/* Custom Delete Confirmation Modal */}
        {deleteConfirmation.show && (
          <div className="fixed inset-0 bg-black/40 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-soft-gold/20 transform transition-all duration-300 scale-100">
              {/* Warning Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-elegant font-bold text-matte-black mb-3">
                  Delete {deleteConfirmation.type === 'team' ? 'Team Member' : 'Service'}
                </h3>
                <p className="text-charcoal mb-2">
                  Are you sure you want to delete <span className="font-semibold text-soft-gold">{deleteConfirmation.name}</span>?
                </p>
                <p className="text-sm text-gray-500">
                  This action cannot be undone. The {deleteConfirmation.type === 'team' ? 'team member' : 'service'} will be permanently removed from the system.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setDeleteConfirmation({ show: false, type: 'team' })}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Delete {deleteConfirmation.type === 'team' ? 'Member' : 'Service'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminAuth>
  );
}

function TeamMemberForm({ member, onSave, onCancel }: {
  member: Partial<TeamMember>;
  onSave: (member: Partial<TeamMember>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(member);

  const addSpecialty = (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue && !formData.specialties?.includes(trimmedValue)) {
      const newSpecialties = [...(formData.specialties || []), trimmedValue];
      setFormData({ ...formData, specialties: newSpecialties });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input
          type="text"
          value={formData.role || ''}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.image || ''}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
        <div className="border border-gray-300 rounded-md p-2 min-h-[42px]">
          {/* Tags Display */}
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.specialties?.map((specialty: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-soft-gold text-matte-black rounded-full text-sm"
              >
                {specialty}
                <button
                  type="button"
                  onClick={() => {
                    const newSpecialties = formData.specialties?.filter((_: string, i: number) => i !== index) || [];
                    setFormData({ ...formData, specialties: newSpecialties });
                  }}
                  className="ml-1 text-matte-black hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          
          {/* Input Field with Add Button */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a specialty..."
              className="flex-1 border-none outline-none text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSpecialty(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
              id="specialty-input"
            />
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('specialty-input') as HTMLInputElement;
                addSpecialty(input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Add
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Press Enter or click Add to add a specialty, click × to remove</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Experience</label>
        <input
          type="text"
          value={formData.experience || ''}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-soft-gold text-matte-black rounded-full font-semibold hover:bg-soft-gold/10 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function HeroForm({ heroData, onSave, onCancel }: { heroData: any, onSave: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    carouselImages: heroData?.carouselImages || [{ url: '', alt: '' }],
    floatingPhotos: heroData?.floatingPhotos || [{ url: '', x: '10%', y: '10%', size: 60, delay: 0 }],
    mainHeading: heroData?.mainHeading || '',
    subHeading: heroData?.subHeading || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addCarouselImage = () => {
    setFormData({
      ...formData,
      carouselImages: [...formData.carouselImages, { url: '', alt: '' }]
    });
  };

  const removeCarouselImage = (index: number) => {
    const newImages = formData.carouselImages.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, carouselImages: newImages });
  };

  const updateCarouselImage = (index: number, field: string, value: string) => {
    const newImages = [...formData.carouselImages];
    newImages[index] = { ...newImages[index], [field]: value };
    setFormData({ ...formData, carouselImages: newImages });
  };

  const addFloatingPhoto = () => {
    setFormData({
      ...formData,
      floatingPhotos: [...formData.floatingPhotos, { url: '', x: '10%', y: '10%', size: 60, delay: 0 }]
    });
  };

  const removeFloatingPhoto = (index: number) => {
    const newPhotos = formData.floatingPhotos.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, floatingPhotos: newPhotos });
  };

  const updateFloatingPhoto = (index: number, field: string, value: any) => {
    const newPhotos = [...formData.floatingPhotos];
    newPhotos[index] = { ...newPhotos[index], [field]: value };
    setFormData({ ...formData, floatingPhotos: newPhotos });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
      {/* Main Heading */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Main Heading</label>
        <input
          type="text"
          value={formData.mainHeading}
          onChange={(e) => setFormData({ ...formData, mainHeading: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      {/* Sub Heading */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Sub Heading</label>
        <input
          type="text"
          value={formData.subHeading}
          onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      {/* Carousel Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">🎠 Carousel Images</label>
        {formData.carouselImages.map((image: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-md p-3 mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">🖼️ Image {index + 1}</span>
              {formData.carouselImages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCarouselImage(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            
            {/* Image Preview */}
            {image.url && (
              <div className="mb-3 p-2 bg-gray-50 rounded-md">
                <img
                  src={image.url}
                  alt={image.alt || 'Preview'}
                  className="w-full h-24 object-cover rounded-md border border-gray-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x100.png?text=Invalid+Image';
                  }}
                />
                <p className="text-xs text-gray-500 mt-1 text-center">Preview</p>
              </div>
            )}
            
            <input
              type="url"
              value={image.url}
              onChange={(e) => updateCarouselImage(index, 'url', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
              placeholder="Image URL"
              required
            />
            <input
              type="text"
              value={image.alt}
              onChange={(e) => updateCarouselImage(index, 'alt', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Alt text"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addCarouselImage}
          className="mt-2 px-3 py-1 bg-soft-gold text-matte-black rounded-md text-sm hover:bg-yellow-400"
        >
          Add Carousel Image
        </button>
      </div>

      {/* Floating Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎈 Floating Photos (Decorative Images)
        </label>
        <p className="text-xs text-gray-500 mb-3">
          These are the decorative floating images that appear on your home page hero section
        </p>
        
        {formData.floatingPhotos.map((photo: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-3 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-gray-700">
                📸 Floating Photo {index + 1}
              </span>
              {formData.floatingPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFloatingPhoto(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              {/* Image Preview */}
              {photo.url && (
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <img
                    src={photo.url}
                    alt={`Floating Photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-white shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80.png?text=Error';
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">🎈 Preview</p>
                </div>
              )}
              
              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  🖼️ Image URL
                </label>
                <input
                  type="url"
                  value={photo.url}
                  onChange={(e) => updateFloatingPhoto(index, 'url', e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                />
              </div>
              
              {/* Size */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  📏 Size (pixels) - How big the photo appears
                </label>
                <input
                  type="number"
                  value={photo.size}
                  onChange={(e) => updateFloatingPhoto(index, 'size', parseInt(e.target.value))}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="120"
                  min="40"
                  max="200"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Recommended: 80-150px</p>
              </div>
              
              {/* Position */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    ↔️ X Position (Left-Right)
                  </label>
                  <input
                    type="text"
                    value={photo.x}
                    onChange={(e) => updateFloatingPhoto(index, 'x', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="10%"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">10% = left, 50% = center, 90% = right</p>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    ↕️ Y Position (Top-Bottom)
                  </label>
                  <input
                    type="text"
                    value={photo.y}
                    onChange={(e) => updateFloatingPhoto(index, 'y', e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    placeholder="20%"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">10% = top, 50% = middle, 80% = bottom</p>
                </div>
              </div>
              
              {/* Animation Delay */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  ⏱️ Animation Delay (seconds) - When it starts floating
                </label>
                <input
                  type="number"
                  value={photo.delay}
                  onChange={(e) => updateFloatingPhoto(index, 'delay', parseFloat(e.target.value))}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="0"
                  min="0"
                  max="5"
                  step="0.5"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">0 = starts immediately, 1 = starts after 1 second</p>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addFloatingPhoto}
          className="mt-3 px-4 py-2 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black rounded-md text-sm font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-md"
        >
          ➕ Add Another Floating Photo
        </button>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-soft-gold text-matte-black rounded-full font-semibold hover:bg-soft-gold/10 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}

function ServiceForm({ service, onSave, onCancel }: { service: any, onSave: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    image: service?.image || '',
    description: service?.description || '',
    order: service?.order || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Service Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Order</label>
        <input
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border-2 border-soft-gold text-matte-black rounded-full font-semibold hover:bg-soft-gold/10 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-soft-gold to-yellow-400 text-matte-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  );
}
