// Custom Tailwind CSS plugin to handle component styles
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    // Button styles
    '.btn': {
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'font-weight': theme('fontWeight.medium'),
      'border-radius': theme('borderRadius.DEFAULT'),
      'transition-property': theme('transitionProperty.DEFAULT'),
      'transition-timing-function': theme('transitionTimingFunction.DEFAULT'),
      'transition-duration': theme('transitionDuration.200'),
      '&:focus': {
        'outline': '2px solid transparent',
        'outline-offset': '2px',
      },
      '&:disabled': {
        'opacity': '0.5',
        'cursor': 'not-allowed',
      },
    },
    
    // Input styles
    '.input': {
      'display': 'block',
      'width': '100%',
      'padding': theme('spacing.2') + ' ' + theme('spacing.3'),
      'border-radius': theme('borderRadius.DEFAULT'),
      'border': '1px solid',
      'border-color': theme('colors.gray.300'),
      'background-color': theme('colors.white'),
      'color': theme('colors.gray.900'),
      'transition-property': theme('transitionProperty.DEFAULT'),
      'transition-timing-function': theme('transitionTimingFunction.DEFAULT'),
      'transition-duration': theme('transitionDuration.200'),
      '&:focus': {
        'outline': 'none',
        'ring': '2px',
        'ring-color': theme('colors.primary.500'),
        'border-color': theme('colors.primary.500'),
      },
      '&:disabled': {
        'opacity': '0.5',
        'cursor': 'not-allowed',
      },
    },

    // Add more component styles as needed
  });
});
