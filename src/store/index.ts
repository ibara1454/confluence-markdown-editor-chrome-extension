import Vue from 'vue';
import Vuex from 'vuex';
import { DomainModule } from './modules/domain';
import { EditorModule } from './modules/editor';

Vue.use(Vuex);

interface RootState {
  domain: DomainModule;
  editor: EditorModule;
}

// Register modules dynamically.
// See: https://championswimmer.in/vuex-module-decorators/pages/getting-started.html#access-state
export default new Vuex.Store<RootState>({});
