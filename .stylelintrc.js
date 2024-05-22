import { propertyGroups } from 'stylelint-config-clean-order';

const propertiesOrder = propertyGroups.map((properties) => ({
  noEmptyLineBetween: true,
  emptyLineBefore: 'never', // Don't add empty lines between order groups.
  properties,
}));

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-clean-order',
  ],
  plugins: [
    'stylelint-scss',
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  "ignoreFiles": [
    "node_modules/materialize-css/**/*"
  ],
  rules: {
    "no-duplicate-selectors": false,
    "no-descending-specificity": false,
    'order/order': [
      [
        'custom-properties',
        'dollar-variables',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        'rules',
        {
          type: 'at-rule',
          name: 'media',
        },
      ],
      { severity: 'warning' },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
    'order/properties-alphabetical-order': null,
    'order/properties-order': [
      propertiesOrder,
      {
        severity: 'warning',
        unspecified: 'bottomAlphabetical',
      },
    ],
  },
};
