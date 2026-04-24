import React from 'react';
import ContactItem from './ComtactItem';

const ContactList = ({ contacts, onDelete }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <ContactItem 
        key={id} 
        id={id} 
        name={name} 
        number={number} 
        onDelete={onDelete} 
      />
    ))}
  </ul>
);

export default ContactList;