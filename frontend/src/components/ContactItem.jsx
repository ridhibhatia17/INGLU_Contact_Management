import { useState } from 'react';
import { Mail, Phone, Edit2, Trash2, User, AlertTriangle } from 'lucide-react';

const ContactItem = ({ contact, deleteContact, editContact }) => {
  const { _id, name, email, phone } = contact;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="card contact-card animate-fade-in">
      <div className="contact-header">
        <h3 className="contact-name">{name}</h3>
        <div style={{ padding: '6px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
          <User size={20} />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {email && (
          <div className="contact-info">
            <Mail size={16} />
            <span>{email}</span>
          </div>
        )}
        <div className="contact-info">
          <Phone size={16} />
          <span>{phone}</span>
        </div>
      </div>
      
      <div className="contact-actions">
        <button 
          className="btn btn-outline" 
          style={{ flex: 1, padding: '8px', fontSize: '0.9rem' }}
          onClick={() => editContact(contact)}
        >
          <Edit2 size={14} /> Edit
        </button>
        <button 
          className="btn btn-danger" 
          style={{ flex: 1, padding: '8px', fontSize: '0.9rem' }}
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash2 size={14} /> Delete
        </button>
      </div>

      {showDeleteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="card animate-fade-in" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', padding: '32px' }}>
            <div style={{ color: 'var(--danger-color)', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <AlertTriangle size={48} />
            </div>
            <h3 style={{ marginBottom: '8px', fontSize: '1.4rem' }}>Delete Contact</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                className="btn btn-outline" 
                style={{ flex: 1 }} 
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                style={{ flex: 1 }} 
                onClick={() => {
                  deleteContact(_id);
                  setShowDeleteModal(false);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactItem;
