import React from 'react';

const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm) return text;
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <>
      {
        parts.map((part, index) => (
          <>
            {part.toLowerCase() === searchTerm.toLowerCase() ? (
              <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
                {part}
              </span>
            ) : (
              <span>
                {part}
              </span>
            )}
          </>
        ))
      }
    </>
  );
};

export default HighlightText;
