import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './event.scss';
import { validationForDelete } from '../../utils/validation';

const Event = ({ height, marginTop, title, time, hangleDeleteEvent, id }) => {
  const [deleteEventButton, setDeleteEventButton] = useState(false);

  const showDeleteButton = () => {
    setDeleteEventButton(!deleteEventButton);
  };

  const handleDelete = () => {
    if (validationForDelete(time)) {
      alert("Event starts in less then 15 minutes, you cann't delete it");
    } else {
      hangleDeleteEvent(id);
    }
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

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string,
  hangleDeleteEvent: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Event;
