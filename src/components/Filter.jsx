import React from 'react';

const Filter = ({ value, onChange }) => (
  <label style={{ display: 'block', marginBottom: '20px' }}>
    Find contacts by name <br />
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;