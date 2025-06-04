import React, { useState } from 'react';

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // First, handle file upload if there's a file
      let imageUrl = '';
      if (formData.file) {
        const fileFormData = new FormData();
        fileFormData.append('file', formData.file);
        
        // file end point
        const fileResponse = await fetch('/api/upload', {
          method: 'POST',
          body: fileFormData,
        });
        
        if (fileResponse.ok) {
          const fileResult = await fileResponse.json();
          imageUrl = fileResult.url; // Adjust based on your API response structure
        }
      }

      // Send email notification
      const emailResponse = await fetch('https://email-api-gilt-one.vercel.app/send-template-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to:"singharti7648@gmail.com", // Send to the artist's email
          from: formData.email, // buyer's email
          template: 'art_submission',
          variables: {
            buyerName: formData.name,
            buyerEmail: formData.email,
            address: formData.address,
            description: formData.description,
            dimensions: formData.dimensions,
            medium: formData.medium,
            imageUrl: imageUrl || 'https://via.placeholder.com/300x200?text=Artwork+Image'
          }
        })
      });

      const emailResult = await emailResponse.json();

      if (emailResponse.ok) {
        setSubmitMessage('Form submitted and email sent successfully!');
        
        // Reset the form
        setFormData({
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
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
      } else {
        setSubmitMessage(`Error: ${emailResult.error || 'Failed to send email'}`);
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('Error: Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-8/12 mx-auto mt-5 bg-white rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-amber-600">Submit Artwork & Contact Info</h2>

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`p-4 rounded-lg text-center ${
          submitMessage.includes('Error') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          {submitMessage}
        </div>
      )}

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
          disabled={isSubmitting}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          required
          disabled={isSubmitting}
        />

        <input
          name="address"
          type="text"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"
          required
          disabled={isSubmitting}
        />

        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:border-orange-500"
          disabled={isSubmitting}
        />
      </div>

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
          disabled={isSubmitting}
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
            disabled={isSubmitting}
          />

          <select
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
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
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isSubmitting 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
            : 'bg-amber-500 text-white hover:bg-amber-600'
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Form'}
      </button>
    </div>
  );
};

export default UploadView;