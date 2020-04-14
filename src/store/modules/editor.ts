import {
  VuexModule, Module, Mutation, getModule,
} from 'vuex-module-decorators';
import store from '@/store';

// TODO: make this style text modifiable
const editorStyle = `
/*

github.com style (c) Vasily Polovnyov <vast@whiteants.net>

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
}

.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #008080;
}

.hljs-string,
.hljs-doctag {
  color: #d14;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #900;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #000080;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #009926;
}

.hljs-symbol,
.hljs-bullet {
  color: #990073;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}

.hljs-meta {
  color: #999;
  font-weight: bold;
}

.hljs-deletion {
  background: #fdd;
}

.hljs-addition {
  background: #dfd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
`;

// TODO: make this style text modifiable
const globalStyle = `
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

@Module({ dynamic: true, store, name: 'Editor' })
class EditorModule extends VuexModule {
  private text = '';

  // Change the position of parent be difference from static, so that
  // the child with style `position: absolute` could works fine.
  private globalStyle = globalStyle;

  private editorStyle = editorStyle;

  public get TEXT(): string {
    return this.text;
  }

  public get GLOBAL_STYLE(): string {
    return this.globalStyle;
  }

  public get EDITOR_STYLE(): string {
    return this.editorStyle;
  }

  @Mutation
  public SET_TEXT(value: string): void {
    this.text = value;
  }
}

export default getModule(EditorModule);
