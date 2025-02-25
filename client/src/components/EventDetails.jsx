import React from 'react';
import '../styles/EventDetails.css'

export default function EventDetails({ event, eventDate, setEvent, setEventDate, isEditing, setIsEditing, isConfirmed }) {
  return isEditing ? (
    <>
      <div className="event-details-container">
        <h2 className='event-header'>Event</h2>
        <div className='event-details-input-container'>
          <input
            type="text"
            id="event-name"
            placeholder="Event Name"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />

          {/* Wrap date input and button in a new div to keep them together */}
          <div className="event-date-group">
            <input
              type="date"
              id="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <button className="event-confirm-btn" onClick={() => setIsEditing(false)}>✔️</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="event-summary">
      <h2>{event} (Date: {eventDate})</h2>

      {/* Hide the edit button after confirmation */}
      {!isConfirmed && (
        <button className="event-form-edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
      )}
    </div>
  );
}