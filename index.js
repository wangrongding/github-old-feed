// ==UserScript==
// @name         Github Old Feed
// @description  Replacing the shit💩 new version of the feed with the old one
// @author       荣顶
// @license      MIT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @match        https://github.com/
// @match        https://github.com/dashboard
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const dashboard = document.getElementById("dashboard");
  fetch('https://github.com/dashboard-feed')
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const mainContent = doc.querySelector('main');

      if (dashboard && mainContent) {
        dashboard.innerHTML = mainContent.innerHTML;
      }
    })
    .catch(error => {
      console.error('Error fetching the dashboard feed:', error);
    });
})();
