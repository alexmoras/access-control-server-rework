# Database Models

## Card
- `_id` - this is the card ID stored in Sector 0.
- `secret` - random value, created with UUID, and stored on the card. NEVER return this to a user.
- `owner` - string containing the UUID of the owning user.
- `description` - a non-unique value which can be used to describe the card.
- `enabled` - boolean value which sets whether the card can be used. Defaults to "true".


## Client
- `_id` - client ID used in logs, requests, etc. Generated using UUID.
- `secret` - random value generated on creation and used to authenticate clients. Uses a different random generation 
  technique to UUID for resiliency.
- `description` - a non-unique value which can be used to describe the client.


## User
- `_id` - user ID is random and unique. Provides a non-human-readable way to identify a user.
- `username` - unique value which provides a hum-readable way to identify a user. Populated from OpenID. This is 
  implemented as legacy support for LDAP in case the organisation moves from the current OIDC Provider.
- `offline` - boolean value for whether the user can access a client offline, will be written to card.

## Log
- `_id` - uses UUID for a unique log identifier.
- `client_id` - allows the access to be associated with a specific client.
- `client_description` - provides a human-readable description for a client, such as location.
- `card_id` - allows the access to be associated with a specific card.
- `user` - the associated user for the card.
- `verified` - boolean value "true" if the system was online and card secret verified, "false" if the system was 
  online/card secret was invalid, also "false" if the system was offline.
- `access` - boolean value "true" if the access was granted.
- `online` - boolean value "true" if the API was online.
- `timestamp` - date value for when the client made the access request.

