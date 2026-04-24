import React, { useState } from 'react';

const ContactForm = ({ onSubmit, inputRef }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid black', padding: '10px', width: '300px', margin: '0 auto' }}>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Name <br />
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters..."
          required
        />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Number <br />
        <input
          type="tel"
          name="number"
          ref={inputRef}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits..."
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;