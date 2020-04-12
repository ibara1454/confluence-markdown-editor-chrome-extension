// Enable dependency injection
import '@/inject';
import Vue from 'vue';
import store from '@/store';
import DomainRepository from '@/models/domain-repository-impl';
import { container } from 'tsyringe';
import App from './App.vue';

const domainRepository = container.resolve(DomainRepository);

/**
 * Setup application.
 */
function setup(): void {
  // TODO: (feat) auto enable markdown editor
  // Use the extension's id to avoid collisions
  const id = chrome.runtime.id;
  // Avoid double launch
  if (document.getElementById(id) === null) {
    const wrapper = document.createElement('div');
    wrapper.id = id;
    document.body.appendChild(wrapper);

    const app = document.createElement('div');
    wrapper.appendChild(app);
    const vue = new Vue({
      store,
      render: (h) => h(App),
    });
    vue.$mount(app);
  }
}

/**
 * Escape the special characters from given Regexp string.
 * @param any string of regular expression
 */
function escapeRegExp(str: string): string {
  // $& means the whole matched string
  return str.replace(/[.*+?^=!:${}()|[\]/\\]/g, '\\$&');
}

/**
 * Check the given url is whether our target page or not.
 * @param url any url
 * @returns the given url is our target or not
 */
async function isTargetPage(url: string): Promise<boolean> {
  const domains = await domainRepository.findAll();

  return Object.values(domains)
    .map((x) => x.name)
    .map(escapeRegExp)
    // The url pattern of
    //  Confluence 6.15.x - editpage.action or createpage.action
    //  Confluence 6.13.x - resumedraft.action
    .map((domain) => new RegExp(String.raw`https?://${domain}/(.*/)?(editpage|createpage|resumedraft).action`))
    // Determine the given url whether it is "editpage" or "createpage"
    .some((regexp) => regexp.test(url));
}

/**
 * The entrypoint.
 *
 * Verify current url is whether an edit page (or created page), and
 * then setup the markdown editor.
 */
async function main(): Promise<void> {
  // TODO: evaluate current page whether it should be applied
  // Listen messages sent from from background
  chrome.runtime.onMessage.addListener(() => {
    (async () => {
      // Run setup if current page is editpage
      if (await isTargetPage(window.location.href)) {
        setup();
      }
    })();
    return true;
  });

  if (await isTargetPage(window.location.href)) {
    setup();
  }
}

main();
