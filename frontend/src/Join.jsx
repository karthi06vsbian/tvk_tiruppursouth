import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';

export default function Join() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: '',
    address: '',
    area: 'Tiruppur South',
    occupation: '',
    interests: [],
    photo_data: '',
    photo_name: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          photo_data: event.target.result,
          photo_name: file.name
        }));
        setPhotoPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData(prev => ({
      ...prev,
      photo_data: '',
      photo_name: ''
    }));
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? ''
      : 'https://tvk-tiruppursouth.onrender.com';

    try {
      const response = await fetch(`${API_BASE}/api/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          dob: '',
          gender: '',
          address: '',
          area: 'Tiruppur South',
          occupation: '',
          interests: [],
          photo_data: '',
          photo_name: ''
        });
        setPhotoPreview(null);
        window.scrollTo(0, 0);
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="join-page" style={{ background: '#f8f8f8', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #c61515 0%, rgba(198, 21, 27, 0.9) 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            color: '#ffd700',
            fontWeight: '900',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>Stand with us</span>
          <h1 style={{
            fontSize: '3rem',
            margin: '20px 0',
            fontWeight: '900',
            lineHeight: '1.2',
            color: 'white'
          }}>Join TVK Tiruppur South</h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.95,
            marginBottom: 0
          }}>Become a primary member of Tamilaga Vettri Kazhagam – the people's party for a better Tamil Nadu</p>
        </div>
      </section>

      {/* Main Form Section */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'start'
          }}>
            {/* Form Column */}
            <div>
              {!submitted ? (
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '40px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ marginBottom: '30px' }}>
                    <h2 style={{
                      fontSize: '1.8rem',
                      color: '#333',
                      marginBottom: '8px',
                      fontWeight: '900'
                    }}>உறுப்பினர் விண்ணப்பம்</h2>
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                      Complete this form to join TVK and be counted as a primary member.
                    </p>
                  </div>

                  {error && (
                    <div style={{
                      background: '#ffebee',
                      border: '1px solid #ef5350',
                      color: '#c62828',
                      padding: '12px',
                      borderRadius: '4px',
                      marginBottom: '20px',
                      fontSize: '0.9rem'
                    }}>
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Full Name */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '8px', display: 'block' }}>
                        Gender
                      </label>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        {['Male', 'Female', 'Other'].map(g => (
                          <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={formData.gender === g}
                              onChange={handleChange}
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your residential address"
                        rows="3"
                        required
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    {/* Area */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Ward / Area *
                      </label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Tiruppur South">Tiruppur South</option>
                        <option value="Tiruppur North">Tiruppur North</option>
                        <option value="Tiruppur West">Tiruppur West</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Occupation */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Occupation / Profession
                      </label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder="e.g. Engineer, Business, Student"
                        style={{
                          padding: '10px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          fontSize: '0.95rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    {/* Interests */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '8px', display: 'block' }}>
                        Area of Interest *
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { id: 'social_dev', label: 'Social Development' },
                          { id: 'community', label: 'Community Service' },
                          { id: 'digital', label: 'Digital & Technology' },
                          { id: 'political', label: 'Political Training' },
                          { id: 'events', label: 'Event Management' },
                          { id: 'other', label: 'Other' }
                        ].map(interest => (
                          <label key={interest.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={formData.interests.includes(interest.id)}
                              onChange={() => handleInterestChange(interest.id)}
                            />
                            {interest.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <label style={{ fontWeight: '700', color: '#333', marginBottom: '6px', display: 'block' }}>
                        Profile Photo
                      </label>
                      <label style={{
                        border: '2px dashed #ddd',
                        borderRadius: '6px',
                        padding: '30px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Camera size={24} />
                        <span style={{ display: 'block', marginTop: '8px', color: '#666' }}>Click to upload photo</span>
                        <small style={{ color: '#999' }}>JPG, PNG up to 5 MB</small>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                      />
                      {photoPreview && (
                        <div style={{ marginTop: '10px' }}>
                          <img src={photoPreview} alt="Preview" style={{ width: '100%', borderRadius: '6px' }} />
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            style={{
                              marginTop: '8px',
                              background: '#ff4444',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <X size={16} /> Remove
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Terms */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <input type="checkbox" required style={{ marginTop: '4px' }} />
                      <label style={{ fontSize: '0.9rem', color: '#555' }}>
                        I agree to TVK membership terms and conditions
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        background: '#ffd700',
                        color: '#000',
                        border: 'none',
                        padding: '14px 28px',
                        borderRadius: '6px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        textTransform: 'uppercase',
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '40px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  background: '#e8f5e9'
                }}>
                  <h2 style={{ color: '#2e7d32', fontSize: '1.5rem', marginBottom: '10px' }}>
                    ✓ Application Submitted!
                  </h2>
                  <p style={{ color: '#555', marginBottom: '8px' }}>
                    Your membership application has been received.
                  </p>
                  <p style={{ color: '#555' }}>
                    We'll contact you soon with next steps.
                  </p>
                </div>
              )}
            </div>

            {/* Info Column */}
            <div>
              {/* Why Join Card */}
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                marginBottom: '30px'
              }}>
                <h3 style={{ color: '#c61515', fontSize: '1.5rem', marginBottom: '20px', fontWeight: '900' }}>
                  Why Join TVK?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { num: '1', title: 'Be Part of a Movement', desc: 'Join thousands working to transform Tamil Nadu' },
                    { num: '2', title: 'Contribute Your Skills', desc: 'Apply your expertise in areas that matter' },
                    { num: '3', title: 'Access Resources', desc: 'Get training and direct communication' },
                    { num: '4', title: 'Shape Policy', desc: 'Help shape initiatives that drive change' }
                  ].map((benefit, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '15px' }}>
                      <div style={{
                        background: '#ffd700',
                        color: '#c61515',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '1.4rem',
                        flexShrink: 0
                      }}>
                        {benefit.num}
                      </div>
                      <div>
                        <h4 style={{ color: '#333', fontWeight: '700', marginBottom: '4px' }}>
                          {benefit.title}
                        </h4>
                        <p style={{ color: '#666', fontSize: '0.9rem' }}>
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help Card */}
              <div style={{
                background: 'linear-gradient(135deg, #c61515 0%, rgba(198, 21, 27, 0.8) 100%)',
                borderRadius: '8px',
                padding: '30px',
                color: 'white',
                boxShadow: '0 4px 20px rgba(198, 21, 27, 0.3)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', fontWeight: '900' }}>
                  Need Help?
                </h3>
                <p style={{ marginBottom: '15px', opacity: 0.9 }}>
                  Have questions about membership?
                </p>
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderLeft: '3px solid #ffd700',
                  padding: '15px',
                  borderRadius: '4px'
                }}>
                  <p style={{ fontWeight: '700', marginBottom: '6px' }}>Call us</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '800' }}>9150781685</p>
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.85rem', opacity: 0.8 }}>
                  Available 9 AM - 6 PM, Every day
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
