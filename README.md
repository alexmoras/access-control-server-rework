# Access Control API (rewritten)
This is a basic server which acts as the backend for the ESP32 access control
system. The ESP32 makes a simple API call to this server which checks the
unique ID and returns whether access is authorised. It also returns whether
offline access is authorised for that user - if it is, this is written to the
card by the ESP32 and will allow access to the room even if the server is
offline.