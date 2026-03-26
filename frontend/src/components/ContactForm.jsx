import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactForm = ({ addContact, updateContact, currentContact, clearCurrent }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [activeDialCode, setActiveDialCode] = useState('');
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
      setErrorMsg('');
    } else {
      setContact({ name: '', email: '', phone: '' });
      setErrorMsg('');
    }
  }, [currentContact]);

  const { name, email, phone } = contact;

  const onChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const handlePhoneChange = (value, inputData) => {
    setContact({ ...contact, phone: value });
    if (inputData && inputData.dialCode) {
      setActiveDialCode(inputData.dialCode);
      const numberOnly = value.slice(inputData.dialCode.length);
      if (numberOnly.length === 10) setErrorMsg('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // 10-Digit Phone Length Validation
    // PhoneInput gives us just digits (e.g. '1234567890' for US +1)
    // We need to parse out the country code length to get the raw phone numbers length.
    // If the string starts with country code, subtract that from length.
    
    // Because we just have `contact.phone`, which is a continuous string of digits:
    // We could extract it natively, but a simpler enforcement approach since PhoneInput formats automatically:
    // It's tricky to get dialCode precisely on submit without state. 
    // Let's validate generally: usually numbers without dialCode should be 10.
    
    // As a strict rule: find how many digits they typed after the country code. 
    // Since we don't store inputData globally, we can use a simpler approach or store it.
    // Actually, we can just enforce it by storing raw numbers and validating against 10.
    if (currentContact) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    setContact({ name: '', email: '', phone: '' });
    setErrorMsg('');
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '24px', fontSize: '1.25rem', color: 'var(--primary-color)' }}>
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={handlePhoneChange}
            enableSearch={true}
            disableSearchIcon={false}
            searchPlaceholder="Search country..."
            inputStyle={{
              width: '100%',
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--text-main)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              height: '46px',
              fontFamily: 'Inter, sans-serif'
            }}
            buttonStyle={{
              background: 'var(--surface-color)',
              borderColor: 'var(--border-color)',
              borderRadius: '8px 0 0 8px'
            }}
            dropdownStyle={{
              background: '#1a202c',
              color: '#fff'
            }}
            isValid={(value, country) => {
              const numLength = value.replace(/\D/g, '').length - country.dialCode.length;
              if (numLength > 0 && numLength !== 10) {
                return 'Phone number must be exactly 10 digits';
              }
              return true;
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          <button 
           type="submit" 
           className="btn btn-primary" 
           style={{ flex: 1 }}
           onClick={(e) => {
              // Reliably slice out the exact active dial code to test the core number length
              const pureNumber = phone.slice(activeDialCode.length);
              
              if(pureNumber.length !== 10) {
                 e.preventDefault();
                 setErrorMsg('Mobile number must be exactly 10 digits.');
                 return;
              }
           }}
          >
            {currentContact ? 'Update' : 'Save Contact'}
          </button>
          {currentContact && (
            <button type="button" className="btn btn-outline" onClick={clearCurrent}>
              Clear
            </button>
          )}
        </div>
        
        {errorMsg && (
          <div style={{ color: 'var(--danger-color)', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
