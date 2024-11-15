console.log("Hello World!")

const fetch = require('node-fetch');

fetch('https://www.wgi.org/2025-wgi-color-guard-calendar/').then(function(response) {
  return response.text();
}).then(function(html) {
  console.log(html);
});

