// ==UserScript==
// @name         Github Old Feed
// @description  Replacing the shit💩 new version of the feed with the old one
// @author       荣顶
// @version      1.2
// @license      MIT
// @homeurl      https://github.com/wangrongding/github-old-feed.git
// @namespace    http://tampermonkey.net/
// @match        https://github.com/
// @match        https://github.com/dashboard
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  fetch('https://github.com/dashboard-feed')
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const dashboard = document.querySelector("#dashboard");
      const main = doc.querySelector('main');
      if (dashboard && main) dashboard.innerHTML = main.innerHTML;
    })
    .catch(error => {
      console.error('Fetching the dashboard feed:', error);
    });
})();
