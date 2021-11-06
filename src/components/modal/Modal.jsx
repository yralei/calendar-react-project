import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './modal.scss';
import { getDateTime } from '../../utils/dateUtils';

const Modal = ({ toggleModal, handleAddEvent }) => {
  const [modalState, setModalState] = useState({
    id: Date.now(),
    title: '',
    date: moment().format('YYYY-MM-DD'),
    dateFrom: moment().format('HH:mm'),
    dateTo: moment().add(1, 'h').format('HH:mm'),
    description: '',
  });

  const handleChangeState = e => {
    setModalState({
      ...modalState,
      [e.target.name]: e.target.value,
    });
  };

  const { id, date, title, dateFrom, dateTo, description } = modalState;

  const updatedEvent = {
    id,
    title,
    description,
    dateFrom: getDateTime(date, dateFrom),
    dateTo: getDateTime(date, dateTo),
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(modalState);
    handleAddEvent(updatedEvent);
  };

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

export default Modal;
