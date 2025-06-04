import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const UploadView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    file: null,
    title: '',
    description: '',
    price: '',
    category: 'portrait',
    dimensions: '',
    medium: 'Graphite on paper',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted form:', formData);
    alert('Form submitted successfully! (Demo only)');
    // Reset the form
    setFormData({
      name: '',
      email: '',
      phone: '',
      file: null,
      description: '',
      dimensions: '',
      medium: 'Graphite on paper',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-7/12 mx-auto mt-5 bg-white rounded-xl p-6 shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-amber-600">Submit Artwork & Contact Info</h2>

      {/* Contact Fields */}
      <div className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          required
        />

        <input
          name="address"
          type="text"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          required
        />

        <input
          name="file"
          type="file"
          onChange={handleChange}
          className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-orange-500"
        />
      </div>

   
      {/* Artwork Upload Section */}
      {/* <div  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600">Click to upload artwork or drag and drop (optional)</p>
        <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
      </div> */}

      {/* Artwork Fields */}
      <div className="space-y-4">
    

        <textarea
          name="description"
          placeholder="Artwork Description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />


        <div className="grid grid-cols-2 gap-4">
          <input
            name="dimensions"
            type="text"
            placeholder="Dimensions (e.g., 12x16 inches)"
            value={formData.dimensions}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
           
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
             <option value="Graphite on paper" defaultValue>Select</option>
            <option value="Graphite on paper">Graphite on paper</option>
            <option value="Charcoal and graphite">Charcoal and graphite</option>
            <option value="Pencil on sketch paper">Pencil on sketch paper</option>
            <option value="Mixed graphite">Mixed graphite</option>
            <option value="Graphite on textured paper">Graphite on textured paper</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
      >
        Submit Form
      </button>
    </form>
  );
};

export default UploadView;
