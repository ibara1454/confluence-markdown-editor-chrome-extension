// Enable dependency injection
import '@/inject';
import Vue from 'vue';
import store from '@/store';
import App from './App.vue';

/**
 * Setup application.
 */
function setup(): void {
  // TODO: (feat) auto enable markdown editor
  const app = document.createElement('div');
  document.body.appendChild(app);
  const vue = new Vue({
    store,
    render: (h) => h(App),
  });
  vue.$mount(app);
}

/**
 * Check the given url is whether our target page or not.
 * @param url any url
 * @returns the given url is our target or not
 */
function isTargetPage(url: string): boolean {
  // The url pattern of editpage
  const EDITPAGE_PATTERN = /editpage\.action/;
  // The url pattern of createpage
  const CREATEPAGE_PATTERN = /createpage\.action/;
  // Determine the given url whether it is "editpage" or "createpage"
  return [EDITPAGE_PATTERN, CREATEPAGE_PATTERN].some((pattern) => pattern.exec(url));
}

/**
 * The entrypoint.
 *
 * Verify current url is whether an edit page (or created page), and
 * then setup the markdown editor.
 */
function main(): void {
  // TODO: evaluate current page whether it should be applied
  // Listen messages sent from from background
  chrome.runtime.onMessage.addListener(() => {
    // Run setup if current page is editpage
    if (isTargetPage(window.location.href)) {
      setup();
    }
    return true;
  });

  if (isTargetPage(window.location.href)) {
    setup();
  }
}

main();
