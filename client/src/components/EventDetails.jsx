import React from 'react';
import '../styles/EventDetails.css';


export default function EventDetails({ event, eventDate, setEvent, setEventDate, isEditing, setIsEditing }) {
  return isEditing ? (
    <div className="event-details-container">
      <input
        type="text"
        id="event-name"
        placeholder="Event Name"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <input
        type="date"
        id="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button className="add-btn" onClick={() => setIsEditing(false)}>✔️</button>
    </div>
  ) : (
    <div className="event-summary">
      <h2>Event: {event} (Date: {eventDate})</h2>
      <button className="event-form-edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
    </div>
  );
}
