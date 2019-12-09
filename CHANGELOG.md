# Change log

This document provides the changes made on the LookBackr app at the server end.

## Changes made by class 32

- Authentication and Authorization:
  - Added a POST (/users) endpoint to add new users
  - Added a POST (/login) endpoint to login a new user
  - Added authentication middleware to PUT (/enter-room)to track
    user is in which room/retro
- Delete Cards and Rooms
  - Added a DELETE (/card) endpoint to delete cards
  - Modified DELETE (/rooms) endpoint to reflect deletion of a room in the stream.
- Error Messages
  - Modified POST (/login) endpoint with error messages to indicate invalid user or incorrect password.
