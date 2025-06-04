import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadView = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'portrait',
    dimensions: '',
    medium: 'Graphite on paper'
  });

  const handleSubmit = () => {
    console.log('Artwork submitted:', formData);
    alert('Artwork submitted successfully! (This is a demo)');
    setFormData({
      title: '',
      description: '',
      price: '',
      category: 'portrait',
      dimensions: '',
      medium: 'Graphite on paper'
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Upload New Artwork</h2>
      <div className="space-y-6">
        {/* Upload field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Artwork Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {/* Text inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="nature">Nature</option>
              <option value="urban">Urban</option>
              <option value="abstract">Abstract</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
            <input
              type="text"
              placeholder="e.g., 12x16 inches"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
            <select
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Graphite on paper">Graphite on paper</option>
              <option value="Charcoal and graphite">Charcoal and graphite</option>
              <option value="Pencil on sketch paper">Pencil on sketch paper</option>
              <option value="Mixed graphite">Mixed graphite</option>
              <option value="Graphite on textured paper">Graphite on textured paper</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Upload Artwork
        </button>
      </div>
    </div>
  );
};

export default UploadView;
