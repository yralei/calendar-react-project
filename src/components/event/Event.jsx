import React, { useState } from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, hangleDeleteEvent, id }) => {
  const [deleteEventButton, setDeleteEventButton] = useState(false);

  const showDeleteButton = () => {
    setDeleteEventButton(!deleteEventButton);
  };

  const handleDelete = () => {
    console.log('delete');
    hangleDeleteEvent(id);
  };

  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      {deleteEventButton && (
        <button className="delete-event-btn" onClick={handleDelete}>
          DELETE
        </button>
      )}
      <div style={eventStyle} className="event" onClick={showDeleteButton}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
    </>
  );
};

export default Event;
