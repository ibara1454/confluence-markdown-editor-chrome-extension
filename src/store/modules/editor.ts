import {
  VuexModule, Module, Mutation, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, store, name: 'Editor' })
class EditorModule extends VuexModule {
  private text = '';

  public get TEXT(): string {
    return this.text;
  }

  @Mutation
  public SET_TEXT(value: string): void {
    this.text = value;
  }
}

export default getModule(EditorModule);
