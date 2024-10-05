import React from 'react';

export default function Thead({ headers }) {
  return (
    <thead className='sticky-top table-info'>
      <tr>
        <th></th>
        {headers.map((header, index) => (
          <th key={`header-${index}`} >{header}</th>
        ))}
      </tr>
    </thead>
  );
}
