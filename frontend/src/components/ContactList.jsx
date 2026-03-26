import ContactItem from './ContactItem';

const ContactList = ({ contacts, deleteContact, editContact }) => {
  if (contacts.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
        <h3 style={{ marginBottom: '8px', color: 'var(--text-main)' }}>No Contacts Found</h3>
        <p>Please add a contact from the form to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="contacts-header" style={{ margin: '0 0 24px 0' }}>
        <h2>Your Contacts <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '8px' }}>({contacts.length})</span></h2>
      </div>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <ContactItem 
            key={contact._id} 
            contact={contact} 
            deleteContact={deleteContact}
            editContact={editContact}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
