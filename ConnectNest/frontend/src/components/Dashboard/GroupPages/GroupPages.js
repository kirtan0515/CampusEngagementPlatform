import React from 'react';
import './GroupPages.css';

function GroupPages() {
  // Example group data
  const groups = [
    { id: 1, name: 'Chess Club' },
    { id: 2, name: 'Science Club' },
  ];

  return (
    <div className="group-pages-container">
      <ul className="group-list">
        {groups.map(group => (
          <li key={group.id} className="group-item">
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupPages;
