import React from 'react';

export default function Tbody({ rows, opt }) {
    
  return (
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={`row-${rowIndex}`}>
          {/* Checkbox for row selection */}
          {opt.select && (
            <td>
              <input onChange={() => opt.handleSelect(rowIndex)} type="checkbox" />
            </td>
          )}
          {/* Render each cell in the row */}
          {row.map((cellData, cellIndex) => (
            <td key={`cell-${cellIndex}`}>{cellData}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
