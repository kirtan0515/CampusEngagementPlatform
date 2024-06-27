import React from 'react';
import PropTypes from 'prop-types';
import './Engagements.css';

function Engagements({ engagements }) {
  return (
    <div className="container">
      {engagements.length > 0 ? (
        engagements.map(engagement => (
          <div key={engagement.EngagementID} className="engagement-card">
            <h2>{engagement.Title} - {engagement.Date}</h2>
            <p>{engagement.Description}</p>
            <p><strong>Location:</strong> {engagement.Location}</p>
          </div>
        ))
      ) : (
        <p>No engagements available.</p>
      )}
    </div>
  );
}

Engagements.propTypes = {
  engagements: PropTypes.arrayOf(
    PropTypes.shape({
      EngagementID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Date: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Engagements;
