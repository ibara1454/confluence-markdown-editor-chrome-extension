import Vue, { VNode } from 'vue';
import { registerGlobalComponent } from '@/utils/register';
import { EditorState, Message } from '@/model/types';
import App from './App.vue';

const state: EditorState = {
  text: '',
  style: '',
};

function sendMessage(message: Message): void {
  // TODO: fix eslint errors / warnings
  const option = { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT };
  // Notify text changed via chrome.tabs.sendMessage
  chrome.tabs.query(option, (result) => {
    const currentTab = result.shift()!;
    // Send message to content script
    // https://developer.chrome.com/extensions/tabs#method-sendMessage
    chrome.tabs.sendMessage(currentTab.id!, message);
  });
}

function initEditor(): void {
  registerGlobalComponent();

  const vm = new Vue({
    data: state,

    render(h): VNode {
      return h(App, {
        props: {
          text: this.text,
        },

        on: {
          // eslint-disable-next-line func-names
          'update:text': function (value: string): void {
            const message: Message = {
              event: 'ContentChanged',
              payload: { text: value },
            };
            sendMessage(message);
          },
        },
      });
    },
  });

  vm.$mount('#app');
}

// Don't know why `onMessage` can works here
// Guess: maybe the reason is that this is imported by a html provided
//  by chrome extension (web_accessible_resources)
// See https://pjchender.github.io/2019/10/02/chrome-%E5%9C%A8-contentscript-%E4%B8%AD%E6%B3%A8%E5%85%A5-iframe/
chrome.runtime.onMessage.addListener((message: Message) => {
  if (message.event === 'ContentChanged') {
    const text = message.payload.text;
    state.text = text;
  } else if (message.event === 'EditorInit') {
    const text = message.payload.text;
    state.text = text;
    initEditor();
  }
  return true;
});

sendMessage({
  event: 'EditorInit',
});
