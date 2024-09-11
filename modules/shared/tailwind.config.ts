import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        logo: ['Grobold'],
        sans: ['Londrina Solid', 'DM Sans', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'orange': {
          '50': '#fffbec',
          '100': '#fff6d3',
          '200': '#ffe9a5',
          '300': '#ffd76d',
          '400': '#ffba32',
          '500': '#ffa20a',
          '600': '#ff8a00',
          '700': '#cc6502',
          '800': '#a14e0b',
          '900': '#82410c',
          '950': '#461f04',
        },
        'black': {
          '500': '#303030',
        }
      },
      fontSize: {
        'hlogo': '45px',
      },
      boxShadow: {
        'input-orange': 'inset 0 0 0 1px #ffa20a',
      },
    }
  }
}
