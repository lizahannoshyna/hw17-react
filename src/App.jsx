import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

const CONTACTS_KEY = 'phonebook_contacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(CONTACTS_KEY);
    return savedContacts ? JSON.parse(savedContacts) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const changeFilter = (e) => setFilter(e.target.value);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(normalizedFilter));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList 
        contacts={getFilteredContacts()} 
        onDelete={deleteContact} 
      />
    </div>
  );
};

export default App;