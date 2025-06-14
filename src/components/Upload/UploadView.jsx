import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../AuthContect/AuthContext';

const UploadView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    title: '',
    description: '',
    price: '',
    category: 'portrait',
    dimensions: '',
    medium: 'Graphite on paper',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
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
      // Since no file upload, just set placeholder image URL
      const imageUrl = 'https://via.placeholder.com/300x200?text=Artwork+Image';

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
            imageUrl,
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
          title: '',
          description: '',
          price: '',
          category: 'portrait',
          dimensions: '',
          medium: 'Graphite on paper',
        });
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

  const handleLogin = () => {
    navigate('/auth'); // Navigate without reload
  };

  return (
    <div className="w-8/12 mx-auto mt-5 bg-white rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-amber-600">Submit Artwork & Contact Info</h2>

      {!isLoggedIn && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800 mb-3">🔒 You must be logged in to submit artwork</p>
          <button
            onClick={handleLogin}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Login to Continue
          </button>
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
          placeholder="Artwork Title"
          disabled={isSubmitting || !isLoggedIn}
          className={`w-full py-3 px-4 rounded-lg border border-gray-300 ${
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
