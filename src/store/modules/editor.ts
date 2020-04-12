import {
  VuexModule, Module, Mutation, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

@Module({ dynamic: true, store, name: 'Editor' })
class EditorModule extends VuexModule {
  private text = '';

  // Change the position of parent be difference from static, so that
  // the child with style `position: absolute` could works fine.
  private globalStyle = `
  #rte {
    position: relative !important;
  }

  #confluence-markdown-editor {
    position: absolute !important;
    top: 80px !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: calc(100% - 80px) !important;
    border: 0 !important;
    margin: 0 !important;
  }

  #toolbar {
    display: block !important;
    height: 0 !important;
    overflow-x: hidden !important;
  }
  `;

  public get TEXT(): string {
    return this.text;
  }

  public get GLOBAL_STYLE(): string {
    return this.globalStyle;
  }

  @Mutation
  public SET_TEXT(value: string): void {
    this.text = value;
  }
}

export default getModule(EditorModule);
