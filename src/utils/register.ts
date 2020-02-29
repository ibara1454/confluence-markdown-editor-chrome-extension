import Vue from 'vue';
import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';

const requireComponent = require.context(
  // The relative path of the components folder
  '@/basics',
  // Whether or not to look in subfolders
  false,
  // The regular expression used to match base component filenames
  /\.(vue|js)$/,
);

/**
 * Convert given string into pascal case.
 * @param str any string
 * @returns string with pascal case
 */
const pascalCase = (str: string): string => upperFirst(camelCase(str));

// The prefix of registered components
const PREFIX = 'V';

/**
 * Register (user-defined) basic vue components globally.
 */
// eslint-disable-next-line import/prefer-default-export
export function registerGlobalComponent(): void {
  requireComponent.keys().forEach((path) => {
    // Get component config
    const componentConfig = requireComponent(path);
    const fileName = path.split('/').pop()?.replace(/\.\w+$/, '');
    if (fileName) {
      // Get PascalCase name of component
      const componentName = pascalCase(PREFIX + fileName);
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      Vue.component(componentName, componentConfig.default || componentConfig);
    }
  });
}
