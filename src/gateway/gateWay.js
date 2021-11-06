const baseUrl = 'https://61828cb284c2020017d89f21.mockapi.io/events';

export const fetchEventsList = () => {
  return fetch(baseUrl)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(alert("Internal Server Error. Can't display events"));
      }
    })
    .then(eventsList =>
      eventsList.map(({ dateFrom, dateTo, ...eventsList }) => ({
        ...eventsList,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      })),
    );
};

export const createEvent = eventData => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  }).then(response => {
    if (!response.ok) {
      throw new Error(alert("Internal Server Error. Can't display events"));
    }
  });
};

export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error(alert("Internal Server Error. Can't display events"));
    }
  });
};
