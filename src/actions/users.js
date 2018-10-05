// de action type
// RECEIVE_USERS benaming ivm het ontvangen van de users uit de api / database
export const RECEIVE_USERS = 'RECEIVE_USERS'

// actioncreator
export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}