import React from 'react';
import './FileSharing.css';

function FileSharing() {
  // Example files data
  const files = [
    { id: 1, name: 'Meeting Minutes.pdf' },
    { id: 2, name: 'Event Flyer.png' },
  ];

  return (
    <div className="file-sharing-container">
      <ul className="file-list">
        {files.map(file => (
          <li key={file.id} className="file-item">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileSharing;
