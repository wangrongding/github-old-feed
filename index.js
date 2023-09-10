// ==UserScript==
// @name         Github Old Feed
// @description  Replace the shit💩 new feed with the old one.
// @author       荣顶
// @version      1.5
// @license      MIT
// @homepage      https://github.com/wangrongding/github-old-feed.git
// @namespace    http://tampermonkey.net/
// @match        https://github.com/
// @match        https://github.com/dashboard
// ==/UserScript==

(function () {
  'use strict';

  const feedContent = document.querySelector('.feed-content')
  const feedMain = document.querySelector('.feed-main')
  const sidebar = document.querySelector('.feed-right-sidebar')

  feedContent.style.maxWidth = "unset"
  feedMain.style.maxWidth = "100%"
  sidebar.style.maxWidth = "unset"
  sidebar.style.width = "900px"

  fetch('https://github.com/dashboard-feed')
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      // Preserving the SSO container
      const dashboard = document.querySelector("#dashboard feed-container");
      const main = doc.querySelector('main');
      if (dashboard && main) dashboard.replaceWith(main);
    })
    .catch(error => {
      console.error('Fetching the dashboard feed:', error);
    });
})();