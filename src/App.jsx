import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Components/Form';
import Filter from './Components/Filter';
import ContactList from './Components/ContactList';

export const ThemeContext = createContext();

const CONTACTS_KEY = 'phonebook_contacts';

const themeConfig = {
  light: {
    bg: '#ffffff',
    text: '#000000',
    btnBg: '#efefef',
    accent: '#000000'
  },
  dark: {
    bg: '#222222',
    text: '#ffffff',
    btnBg: '#444444',
    accent: '#ffffff'
  }
};

const AppContent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = themeConfig[theme];
  const mainInputRef = useRef(null);

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(CONTACTS_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (mainInputRef.current) mainInputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    if (contacts.some(c => c.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts!`);
      return;
    }
    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
    mainInputRef.current.focus();
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div style={{
      backgroundColor: colors.bg,
      color: colors.text,
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'sans-serif',
      transition: 'all 0.3s ease' 
    }}>
      <button 
        onClick={toggleTheme} 
        style={{ backgroundColor: colors.btnBg, color: colors.text, cursor: 'pointer' }}
      >
        Switch Theme
      </button>

      <h1 style={{ color: colors.text }}>Phonebook</h1>
      
      <ContactForm onSubmit={addContact} inputRef={mainInputRef} />

      <h2 style={{ color: colors.text }}>Contacts</h2>
      
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />
      
      <ContactList 
        contacts={filteredContacts} 
        onDeleteContact={deleteContact} 
      />
    </div>
  );

};

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContent />
    </ThemeContext.Provider>
  );
};

export default App;