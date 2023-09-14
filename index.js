// ==UserScript==
// @name         Github Old Feed
// @description  Replace the shit💩 new feed with the old one.
// @author       荣顶
// @version      1.7
// @license      MIT
// @homepage     https://github.com/wangrongding/github-old-feed.git
// @namespace    https://github.com/wangrongding
// @grant        none
// @run-at       document-start
// @match        https://github.com/
// @match        https://github.com/dashboard
// ==/UserScript==

(function () {
  'use strict';

  function fetchAndReplace() {
    // Preserving the SSO container
    const dashboard = document.querySelector('#dashboard feed-container');
    if (!dashboard) return;
    const loading = dashboard.querySelector(
            'feed-container > div >' +
            'include-fragment[src="/conduit/for_you_feed"] >' +
            'div:first-child'
          ) || document.createTextNode(
            'Loading your activity, one moment please...'
          );
    // Stop for_you_feed as fast as possible
    dashboard.replaceWith(loading);

    const feedContent = document.querySelector('.feed-content');
    const feedMain = document.querySelector('.feed-main');
    const sidebar = document.querySelector('.feed-right-sidebar');
    if (feedContent) feedContent.style.maxWidth = "unset";
    if (feedMain) feedMain.style.maxWidth = "100%";
    if (sidebar) {
      sidebar.style.maxWidth = "unset";
      sidebar.style.width = "900px";
    }

    fetch('https://github.com/dashboard-feed', {
      // Smaller response
      headers: {'x-requested-with': 'XMLHttpRequest' }
    })
      .then(response => response.text())
      .then(text => {
        const main = new DOMParser().parseFromString(text, 'text/html')
                                    .querySelector('div[data-hpc]');
        if (!main) throw('querySelector() failed');
        loading.replaceWith(main);
      })
      .catch(error => {
        console.error('Fetching the dashboard feed:', error);
        loading.replaceWith(dashboard);
      });
  }

  (document.readyState != 'loading') ? fetchAndReplace() :
  document.addEventListener('readystatechange', fetchAndReplace, {once: true});

})();
