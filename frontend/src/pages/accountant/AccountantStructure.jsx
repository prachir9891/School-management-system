import { useState } from 'react';
import { Layers, Plus, Edit2, X, Trash2 } from 'lucide-react';

export default function AccountantStructure() {
  const [structures, setStructures] = useState([
    { 
      grade: 'Primary (Grades 1-5)', 
      total: 800,
      breakdown: [
        { item: 'Tuition Fee', amount: 500 },
        { item: 'Library Fee', amount: 50 },
        { item: 'Computer Lab', amount: 100 },
        { item: 'Extracurricular', amount: 150 },
      ]
    },
    { 
      grade: 'Middle (Grades 6-8)', 
      total: 1000,
      breakdown: [
        { item: 'Tuition Fee', amount: 650 },
        { item: 'Library Fee', amount: 75 },
        { item: 'Computer/Science Lab', amount: 150 },
        { item: 'Extracurricular', amount: 125 },
      ]
    },
    { 
      grade: 'High School (Grades 9-12)', 
      total: 1200,
      breakdown: [
        { item: 'Tuition Fee', amount: 750 },
        { item: 'Library Fee', amount: 100 },
        { item: 'Advanced Labs', amount: 200 },
        { item: 'Extracurricular', amount: 150 },
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ grade: '', total: 0, breakdown: [] });

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      setEditingIndex(index);
      setFormData({ ...structures[index] });
    } else {
      setEditingIndex(null);
      setFormData({ grade: '', total: 0, breakdown: [] });
    }
    setShowModal(true);
  };

  const handleAddBreakdownItem = () => {
    setFormData({
      ...formData,
      breakdown: [...formData.breakdown, { item: '', amount: 0 }]
    });
  };

  const handleRemoveBreakdownItem = (index) => {
    const newBreakdown = formData.breakdown.filter((_, i) => i !== index);
    setFormData({ ...formData, breakdown: newBreakdown });
  };

  const handleBreakdownChange = (index, field, value) => {
    const newBreakdown = [...formData.breakdown];
    newBreakdown[index][field] = field === 'amount' ? Number(value) : value;
    
    // Auto-calculate total
    const newTotal = newBreakdown.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    setFormData({ ...formData, breakdown: newBreakdown, total: newTotal });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...structures];
      updated[editingIndex] = formData;
      setStructures(updated);
    } else {
      setStructures([...structures, formData]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Structure</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view the fee breakdown across all grades.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors flex items-center shadow-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Structure
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {structures.map((structure, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-indigo-100 p-2.5 rounded-lg text-indigo-700">
                  <Layers className="h-5 w-5" />
                </div>
                <button onClick={() => handleOpenModal(i)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{structure.grade}</h3>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-black text-indigo-600">${structure.total}</span>
                <span className="text-sm font-medium text-gray-500 ml-1">/ year</span>
              </div>
            </div>
            <div className="p-6 flex-1 bg-white">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Breakdown</h4>
              <ul className="space-y-3">
                {structure.breakdown.map((item, j) => (
                  <li key={j} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-600">{item.item}</span>
                    <span className="font-bold text-gray-900">${item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-2xl">
              <h3 className="font-bold text-gray-900 text-lg">
                {editingIndex !== null ? 'Edit Structure' : 'Create New Structure'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-rose-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Grade Level</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Primary (Grades 1-5)"
                  value={formData.grade} 
                  onChange={(e) => setFormData({...formData, grade: e.target.value})} 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-gray-700">Fee Breakdown</label>
                  <button 
                    type="button" 
                    onClick={handleAddBreakdownItem}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Component
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.breakdown.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input 
                        required 
                        type="text" 
                        placeholder="Component Name"
                        value={item.item} 
                        onChange={(e) => handleBreakdownChange(index, 'item', e.target.value)} 
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                      />
                      <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input 
                          required 
                          type="number" 
                          min="0"
                          value={item.amount} 
                          onChange={(e) => handleBreakdownChange(index, 'amount', e.target.value)} 
                          className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveBreakdownItem(index)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.breakdown.length === 0 && (
                    <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500">
                      No breakdown components added yet.
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm font-bold text-gray-500">
                  Total Auto-Calculated: <span className="text-indigo-600 text-lg ml-1">${formData.total}</span>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm font-semibold rounded-xl transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold rounded-xl transition-colors">
                    Save Structure
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
