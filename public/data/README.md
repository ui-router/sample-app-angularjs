## Contents

This directory contains the fake data used by the fake REST services.

### Data
- *contacts.json*: The users' contacts (currently they share the contact list)
- *folders.json*: Folder list (and meta-data, such as columns to display for a folder)
- *messages.json*: The users' messages
- *corpora*: Directory containing markov chain seed corpora for generating styles of messages

### Scripts
- *fetch.sh*: Fetches original contacts list and non-markov messages from json-generator.com
- *generate.sh*: Fetches `jsmarkov` project and re-generates markov messages
- *generate.js*: Driver code for `jsmarkov`


