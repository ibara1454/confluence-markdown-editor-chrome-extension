import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, store, name: 'User' })
export default class EditorModule extends VuexModule {
  private text = '';

  public get TEXT(): string {
    return this.text;
  }

  @Mutation
  public SET_TEXT(value: string): void {
    this.text = value;
  }
}
