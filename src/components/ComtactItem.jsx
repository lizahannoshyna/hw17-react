import React from 'react';

const ContactItem = ({ id, name, number, onDelete }) => (
  <li style={{ marginBottom: '10px' }}>
    {name}: {number} 
    <button 
      onClick={() => onDelete(id)} 
      style={{ marginLeft: '10px' }}
    >
      Delete
    </button>
  </li>
);

export default ContactItem;