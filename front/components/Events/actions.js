import axios from 'axios'


export function getAllEvents() {
  return new Promise((resolve, reject) => {
    let url = 'http://localhost:8000/events/get-list/'

    axios.get(url)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function createEvent(name, startDate, endDate) {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append('name', name);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    let url = 'http://localhost:8000/events/create-event/'

    axios.post(url, data)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function editEvent(eventId, name, startDate, endDate) {
  return new Promise((resolve, reject) => {
    console.log(eventId, name, startDate, endDate)

    let data = new FormData();
    data.append('name', name);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    let url = `http://localhost:8000/events/${eventId}/`

    axios.put(url, data)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteEvent(eventId) {
  return new Promise((resolve, reject) => {
    let url = `http://localhost:8000/events/${eventId}/`

    axios.delete(url)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}


export function getSomeEvents(eventIds) {
  return new Promise((resolve, reject) => {
    let params = eventIds.join(',')
    params = 'ids=' + params
    let url = `http://localhost:8000/events/get-some/?${params}`

    axios.get(url)
      .then(result => {
        resolve(result.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
