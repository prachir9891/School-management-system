import { useState } from 'react';
import { Save, Building2, Mail, Phone, Globe, MapPin, Calendar, Clock, Bell, Shield, Key } from 'lucide-react';

export default function AdminSettings() {
  const [formData, setFormData] = useState({
    schoolName: 'EduManage International School',
    email: 'admin@edumanage.edu',
    phone: '+1 (555) 123-4567',
    website: 'www.edumanage.edu',
    address: '123 Education Ave, Springfield, SP 12345',
    academicYear: '2026-2027',
    termStarted: '2026-08-01',
    schoolTimeStart: '08:00',
    schoolTimeEnd: '15:30',
    notifyEmail: true,
    notifySms: true,
    twoFactorAuth: false
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">School Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage global configuration, preferences, and school profile.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Profile */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
            <Building2 className="h-5 w-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">General Information</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">School Name</label>
              <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><Mail className="h-4 w-4 mr-1 text-gray-400" /> Primary Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><Phone className="h-4 w-4 mr-1 text-gray-400" /> Contact Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><Globe className="h-4 w-4 mr-1 text-gray-400" /> Website</label>
              <input type="text" name="website" value={formData.website} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><MapPin className="h-4 w-4 mr-1 text-gray-400" /> Address</label>
              <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500"></textarea>
            </div>
          </div>
        </div>

        {/* Academic Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
            <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
            <h2 className="text-lg font-bold text-gray-900">Academic & Timings</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Current Academic Year</label>
              <select name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                <option>2025-2026</option>
                <option>2026-2027</option>
                <option>2027-2028</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Term Start Date</label>
              <input type="date" name="termStarted" value={formData.termStarted} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><Clock className="h-4 w-4 mr-1 text-gray-400" /> School Start Time</label>
              <input type="time" name="schoolTimeStart" value={formData.schoolTimeStart} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center"><Clock className="h-4 w-4 mr-1 text-gray-400" /> School End Time</label>
              <input type="time" name="schoolTimeEnd" value={formData.schoolTimeEnd} onChange={handleChange} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        {/* Notifications & Security */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <Bell className="h-5 w-5 text-amber-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" name="notifyEmail" checked={formData.notifyEmail} onChange={handleChange} className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">Email Notifications</span>
                  <span className="block text-xs text-gray-500">Send automated emails for important events</span>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" name="notifySms" checked={formData.notifySms} onChange={handleChange} className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">SMS Alerts</span>
                  <span className="block text-xs text-gray-500">Send text messages to parents for urgent updates</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center">
              <Shield className="h-5 w-5 text-rose-500 mr-2" />
              <h2 className="text-lg font-bold text-gray-900">Security</h2>
            </div>
            <div className="p-6 space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" name="twoFactorAuth" checked={formData.twoFactorAuth} onChange={handleChange} className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">Two-Factor Auth (2FA)</span>
                  <span className="block text-xs text-gray-500">Require 2FA for all administrative accounts</span>
                </div>
              </label>
              
              <div className="pt-4 border-t border-gray-100">
                <button type="button" className="text-sm font-bold text-indigo-600 flex items-center hover:text-indigo-800 transition-colors">
                  <Key className="h-4 w-4 mr-1" /> Change Admin Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={isSaving}
            className={`px-6 py-3 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-md ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <Save className={`h-5 w-5 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
            {isSaving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
