module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        '7xl': '6rem',
        '8xl': '10rem',
        '9xl': '8rem',
      },

      colors: {
        darkPrimary: '#223C5F',
        darkSecondary: {
          100: '#F4B3A6',
          DEFAULT: '#E3927F',
          700: '#B26B63',
        },
        pinker: 'red',
        lucky: 'green',
        rama: 'purple',
      },
      transitionProperty: {
        width: 'width',
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      margin: ['last'],
      transform: ['responsive', 'group-hover'],
      transformOrigin: ['responsive', 'group-hover'],
      transitionDelay: ['responsive', 'group-hover'],
      transitionDuration: ['responsive', 'group-hover'],
      transitionProperty: [
        'responsive',
        'group-hover',
        'motion-safe',
        'motion-reduce',
      ],
      transitionTimingFunction: ['responsive', 'group-hover'],
      translate: ['responsive', 'hover', 'focus', 'group-hover'],
      width: ['responsive', 'hover', 'focus', 'group-hover'],
      backgroundOpacity: ['dark'],
    },
  },
  plugins: [],
};
