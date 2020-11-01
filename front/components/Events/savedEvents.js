import _ from 'lodash'
import {getSomeEvents} from './actions'


function getSavedEvents() {
  try {
    return JSON.parse(localStorage.savedEvents)
  } catch (e) {
    setSavedEvents([])
    return getSavedEvents()
  }
}

function setSavedEvents(value) {
  localStorage.savedEvents = JSON.stringify(value)
}


function checkAndInitSavedEvents() {
  let savedEvents = getSavedEvents()
  return new Promise((resolve, reject) => {
    if (!_.isArray(savedEvents)) {
      setSavedEvents([])
    }
    resolve()
  })
}

export function addEventToLocalStorage(eventId) {
  return new Promise((resolve, reject) => {
    checkAndInitSavedEvents()
      .then(() => {
        let savedEvents = getSavedEvents()
        savedEvents.push(eventId)
        setSavedEvents(savedEvents)
        resolve()
      })
  })
}

export function removeEventFromLocalStorage(eventId) {
  return new Promise((resolve, reject) => {
    checkAndInitSavedEvents()
      .then(() => {
        let savedEvents = getSavedEvents()
        savedEvents = savedEvents.filter(id => id !== eventId)
        setSavedEvents(savedEvents)
        resolve()
      })
  })
}

export function getSavedEventsIds() {
  return new Promise((resolve, reject) => {
    checkAndInitSavedEvents()
      .then(() => {
        resolve(getSavedEvents())
      })
  })
}


export function eventIdInLocalStorage(eventId) {
  return new Promise((resolve, reject) => {
    checkAndInitSavedEvents()
      .then(() => {
        let savedEvents = getSavedEvents()
        resolve(savedEvents.includes(eventId))
      })
  })
}

export function getSavedEventsData() {
  return new Promise((resolve, reject) => {
    let eventsIds = getSavedEvents()
    if (_.isEmpty(eventsIds)) {
      resolve([])
    } else {
      getSomeEvents(eventsIds)
        .then(data => {
          resolve(data)
        })
    }
  })
}


