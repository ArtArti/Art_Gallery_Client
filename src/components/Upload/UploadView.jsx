import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContect/AuthContext';
import { Link } from 'react-router';

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

  const { isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(true);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    // 🔐 Check again before submitting
    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitMessage('❌ You must be logged in to submit artwork.');
      return;
    }

    if (!formData.name || !formData.email || !formData.address || !formData.description || !formData.dimensions) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // File upload
      let imageUrl = '';
      if (formData.file) {
        const fileFormData = new FormData();
        fileFormData.append('file', formData.file);

        const fileResponse = await fetch('/', {
          method: 'POST',
          body: fileFormData,
        });

        if (fileResponse.ok) {
          const fileResult = await fileResponse.json();
          imageUrl = fileResult.url;
        }
      }

      // Email send
      const emailResponse = await fetch('https://email-api-gilt-one.vercel.app/send-template-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: "singharti7648@gmail.com",
          from: formData.email,
          template: 'art_submission',
          variables: {
            buyerName: formData.name,
            buyerEmail: formData.email,
            address: formData.address,
            title: formData.title,
            description: formData.description,
            dimensions: formData.dimensions,
            medium: formData.medium,
            price: formData.price,
            category: formData.category,
            imageUrl: imageUrl || 'https://via.placeholder.com/300x200?text=Artwork+Image',
          },
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResponse.ok) {
        setSubmitMessage('✅ Artwork submitted successfully! We will contact you soon.');

        // Reset form
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

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitMessage(`❌ Error: ${emailResult.error || 'Failed to send email'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('❌ Error: Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

 

  if (loading) {
    return (
      <div className="w-8/12 mx-auto mt-5 bg-white rounded-xl p-6 shadow-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-8/12 mx-auto mt-5 bg-white rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-amber-600">Submit Artwork & Contact Info</h2>

      {!isLoggedIn && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800 mb-3">🔒 You must be logged in to submit artwork</p>
          <Link
           to="/auth"
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Login to Continue
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-green-800">✅ You are logged in and can submit artwork</p>
        </div>
      )}

      {submitMessage && (
        <div
          className={`p-4 rounded-lg text-center ${
            submitMessage.includes('❌') || submitMessage.includes('Error')
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}
        >
          {submitMessage}
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-3 px-4 rounded-lg border border-gray-300 ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-3 px-4 rounded-lg border border-gray-300 ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        <input
          name="address"
          type="text"
          placeholder="Shipping Address *"
          value={formData.address}
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-3 px-4 rounded-lg border border-gray-300 ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        <input
          name="title"
          type="text"
          placeholder="Artwork Title"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-3 px-4 rounded-lg border border-gray-300 ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        <input
          name="file"
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-2 px-4 rounded-lg border border-gray-300 text-gray-700 ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />
      </div>

      <div className="space-y-4">
        <textarea
          name="description"
          placeholder="Artwork Description *"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
            !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="dimensions"
            type="text"
            placeholder="Dimensions (e.g., 12x16 inches) *"
            value={formData.dimensions}
            onChange={handleChange}
            disabled={isSubmitting || !isLoggedIn}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
              !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />

          <input
            name="price"
            type="text"
            placeholder="Expected Price"
            value={formData.price}
            onChange={handleChange}
            disabled={isSubmitting || !isLoggedIn}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
              !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            disabled={isSubmitting || !isLoggedIn}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
              !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="Graphite on paper">Graphite on paper</option>
            <option value="Charcoal and graphite">Charcoal and graphite</option>
            <option value="Pencil on sketch paper">Pencil on sketch paper</option>
            <option value="Mixed graphite">Mixed graphite</option>
            <option value="Graphite on textured paper">Graphite on textured paper</option>
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={isSubmitting || !isLoggedIn}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
              !isLoggedIn ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="abstract">Abstract</option>
            <option value="still-life">Still Life</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={isLoggedIn ? handleSubmit : handleLogin}
        disabled={isSubmitting}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          isSubmitting
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : isLoggedIn
            ? 'bg-amber-500 text-white hover:bg-amber-600'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSubmitting ? 'Submitting...' : isLoggedIn ? 'Submit Artwork' : 'Login to Submit'}
      </button>

      {!isLoggedIn && (
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{' '}
          <a href="/auth" className="text-amber-600 hover:underline">
            Sign up here
          </a>
        </p>
      )}
    </div>
  );
};

export default UploadView;
