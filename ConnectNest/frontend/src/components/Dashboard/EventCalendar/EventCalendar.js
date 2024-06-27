import React from 'react';
import './EventCalendar.css';

function EventCalendar() {
  // Example event data
  const events = [
    { id: 1, title: 'Chess Tournament', date: '2024-07-01' },
    { id: 2, title: 'Science Fair', date: '2024-07-15' },
  ];

  return (
    <div className="event-calendar-container">
      <ul className="event-list">
        {events.map(event => (
          <li key={event.id} className="event-item">
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventCalendar;
