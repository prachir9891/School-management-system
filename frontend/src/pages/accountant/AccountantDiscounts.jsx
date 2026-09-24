import { useState } from 'react';
import { Tag, Plus, Edit2, Shield, User, Trash2 } from 'lucide-react';

export default function AccountantDiscounts() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', type: 'Scholarship', value: '', criteria: '' });

  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Merit Scholarship', type: 'Scholarship', value: '50% off Tuition', criteria: 'Above 95% in previous grade', activeStudents: 12 },
    { id: 2, name: 'Sibling Discount', type: 'Discount', value: '15% off Total', criteria: '2nd or 3rd child enrolled', activeStudents: 45 },
    { id: 3, name: 'Staff Child Benefit', type: 'Waiver', value: '100% off Tuition', criteria: 'Child of permanent staff', activeStudents: 8 },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setDiscounts(discounts.map(d => d.id === editingId ? { ...d, ...formData } : d));
    } else {
      setDiscounts([...discounts, { ...formData, id: Date.now(), activeStudents: 0 }]);
    }
    setShowForm(false);
    setFormData({ name: '', type: 'Scholarship', value: '', criteria: '' });
    setEditingId(null);
  };

  const handleOpenForm = (discount = null) => {
    if (discount) {
      setFormData({ name: discount.name, type: discount.type, value: discount.value, criteria: discount.criteria });
      setEditingId(discount.id);
    } else {
      setFormData({ name: '', type: 'Scholarship', value: '', criteria: '' });
      setEditingId(null);
    }
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDiscounts(discounts.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discounts & Scholarships</h1>
          <p className="text-sm text-gray-500 mt-1">Manage fee waivers, sibling discounts, and academic scholarships.</p>
        </div>
        <button onClick={() => handleOpenForm()} className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Add New Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <div key={discount.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-lg ${discount.type === 'Scholarship' ? 'bg-amber-100 text-amber-700' : discount.type === 'Discount' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {discount.type === 'Scholarship' ? <Shield className="h-5 w-5" /> : <Tag className="h-5 w-5" />}
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-gray-200 text-gray-700 uppercase tracking-wider">
                  {discount.type}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{discount.name}</h3>
              <p className="text-2xl font-black text-indigo-600">{discount.value}</p>
            </div>
            <div className="p-6 flex-1 bg-white space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Eligibility Criteria</p>
                <p className="text-sm font-medium text-gray-700">{discount.criteria}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center text-sm font-bold text-gray-600">
                  <User className="h-4 w-4 mr-1.5 text-gray-400" /> {discount.activeStudents} Beneficiaries
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenForm(discount)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(discount.id)} className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Policy' : 'Create New Policy'}</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-rose-600">×</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Policy Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500">
                    <option>Scholarship</option>
                    <option>Discount</option>
                    <option>Waiver</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Value (e.g. 20% off)</label>
                  <input required type="text" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Eligibility Criteria</label>
                <textarea required rows="2" value={formData.criteria} onChange={(e) => setFormData({...formData, criteria: e.target.value})} className="w-full border-gray-200 rounded-xl text-sm focus:ring-indigo-500"></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border text-sm font-semibold rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl">Save Policy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
