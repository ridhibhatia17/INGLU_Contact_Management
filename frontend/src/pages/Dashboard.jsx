import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact) => {
    try {
      const res = await api.post('/contacts', contact);
      setContacts([res.data, ...contacts]);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const updateContact = async (contact) => {
    try {
      const res = await api.put(`/contacts/${contact._id}`, contact);
      setContacts(contacts.map(c => c._id === contact._id ? res.data : c));
      setCurrentContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const editContact = (contact) => {
    setCurrentContact(contact);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCurrent = () => {
    setCurrentContact(null);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 0', paddingBottom: '80px' }}>
      <div className="card profile-card">
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar" className="avatar" />
        ) : (
          <div className="avatar">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <div>
          <h2 style={{ marginBottom: '8px' }}>{user.name}</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>{user.email}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '32px', alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: '96px' }}>
          <ContactForm 
            addContact={addContact} 
            updateContact={updateContact} 
            currentContact={currentContact} 
            clearCurrent={clearCurrent}
          />
        </div>
        
        <div>
          {loading ? (
            <p>Loading contacts...</p>
          ) : (
            <ContactList 
              contacts={contacts} 
              deleteContact={deleteContact}
              editContact={editContact}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
