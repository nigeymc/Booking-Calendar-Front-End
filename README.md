# Before you begin

Please ensure you have Webpack, Babel and NPM installed in order to run and ES6 project.

Not sure how to set up an ES6 project? Watch this [youtube video ](https://www.youtube.com/watch?v=ZFcGMZ1UuYo&list=PLdvap-sjgbTUcIn884FzmCyR-dkz7SWYv&index=3)

---

# Booking Calendar Front End

- To run this app locally, open terminal and type `npm run dev`.
- To build this app type `npm run build`.

## App structure

- build
  - css
  - bundle.js
  - index.html
- node_modules
- src
  - app.js
  - modules
    - insertTabs.js
    - insertMobileMenu.js
    - insertTimeSlots.js
    - selectMobileTabs.js
    - buildcalendar.js
    - handleBooking.js
    - book.js
    - handleCancelBooking.js
    - cancelBooking.js
- .babelrc
- gitignore
- package-lock.json
- package.json
- webpack.config.js

## Using this app

This app is built to run alongside the Greenwich booking calendars. It is a front-end app only. It requires a data source to fetch the calendar data from.

The data source is located in `app.js` as the domain - `export const domain = https://www.royalgreenwich.gov.uk/site/custom_scripts/repo/apps/pitch-bookings2/street-entertainment/;`

The calendar component will look like the following `let url = ${domain}/calendar-json.php?sport=24&todayDate=${urlDate}`;

## Dependencies

This app uses the [unfetch](https://www.npmjs.com/package/unfetch) node package and acts as a polyfill for the native fetch api.

## Using the app in Jadu

To use this app, build the project and upload bundle.js to the server/repo. In Jadu add a script tag to the form page linking to the bundle.js file.
