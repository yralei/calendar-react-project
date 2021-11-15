import React, { useState } from 'react';
import { getDateTime } from '../../utils/dateUtils';
import PropTypes from 'prop-types';
import { durationOfEvent, multiples } from '../../utils/validation';

import './modal.scss';

const Modal = ({ toggleModal, handleAddEvent }) => {
  const [modalState, setModalState] = useState({
    id: Date.now(),
    title: '',
    date: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  });

  const handleChangeState = e => {
    setModalState({
      ...modalState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (dateFrom > dateTo) {
      alert('You should to done it in one day');
      return;
    }

    if (durationOfEvent(dateFrom, dateTo)) {
      alert("It's very long, you should to done it in 6 houres");
      return;
    }

    if (multiples(dateFrom, dateTo)) {
      alert('The start of event and duration must be multiples to 15');
      return;
    }

    handleAddEvent({
      id,
      title,
      description,
      dateFrom: getDateTime(date, dateFrom),
      dateTo: getDateTime(date, dateTo),
    });
    toggleModal();
  };

  const { id, date, title, dateFrom, dateTo, description } = modalState;
  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={toggleModal}>
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={title}
              onChange={handleChangeState}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleChangeState}
              />
              <input
                type="time"
                name="dateFrom"
                className="event-form__field"
                value={dateFrom}
                onChange={handleChangeState}
              />
              <span>-</span>
              <input
                type="time"
                name="dateTo"
                className="event-form__field"
                value={dateTo}
                onChange={handleChangeState}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={description}
              onChange={handleChangeState}
            ></textarea>
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  handleAddEvent: PropTypes.func.isRequired,
};

export default Modal;
