import AsyncStorage from '@react-native-async-storage/async-storage';
import { LiteUI } from '@storybook/react-native-ui-lite';

import { view } from './storybook.requires';

/**
 * This file is user-editable. Metro maps the development entry import to this
 * module only when STORYBOOK_ENABLED=true, keeping Storybook out of normal
 * example-app bundles.
 */
const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
  CustomUIComponent: LiteUI,
});

export default StorybookUIRoot;
