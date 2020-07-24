# badge-printing-backend

## Setup

`npm i`

## Testing Locally

`npm start`

## Usage

This API consists of one endpoint, which takes information supplied via URL Parameters, and generates a PDF badge you can print via a compatible label printer (typical labels are 2.25" x 4", but you can adjust the size with width and height parameters).

`http://localhost:5000/badge?name=John%20Doe&company=Acme,%20Inc.&host=HR%20Department&date=7/9/20&attachment=false`

## Deployment

This is ready for deployment via Heroku, Now.sh (Vercel), or Dokku. Port may need to be changed in index.js

## License

This codebase is not licensed for external use by entities other than the author.
