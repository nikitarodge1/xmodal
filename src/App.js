import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate form data
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !formData.email.includes('@')) newErrors.email = 'Invalid email. Please check your email address.';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.phone && formData.phone.length !== 10) newErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    if (formData.dob && new Date(formData.dob) > new Date()) newErrors.dob = 'Invalid date of birth. Please enter a valid date of birth.';

    if (Object.keys(newErrors).length === 0) {
      // Reset form if no errors
      setIsOpen(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="app">
    <h1>User Details Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

