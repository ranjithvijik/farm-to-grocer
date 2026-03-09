// Farm-to-Grocer MVP - PostCSS Configuration
// Path: postcss.config.js
//
// PostCSS configuration for processing CSS with:
// - Tailwind CSS for utility-first styling
// - Autoprefixer for vendor prefixes
// - CSS Nesting (optional, for native CSS nesting)

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // ============================================
    // TAILWIND CSS
    // ============================================
    // Processes Tailwind directives (@tailwind, @apply, @layer)
    // and generates utility classes
    tailwindcss: {},

    // ============================================
    // AUTOPREFIXER
    // ============================================
    // Adds vendor prefixes to CSS rules for browser compatibility
    // Uses browserslist config from package.json
    autoprefixer: {},

    // ============================================
    // OPTIONAL PLUGINS (Uncomment to enable)
    // ============================================

    // CSS Nesting - Enable native CSS nesting syntax
    // Requires: npm install postcss-nesting
    // 'postcss-nesting': {},

    // CSS Import - Inline @import rules
    // Requires: npm install postcss-import
    // 'postcss-import': {},

    // CSS Custom Media - Custom media queries
    // Requires: npm install postcss-custom-media
    // 'postcss-custom-media': {},

    // PurgeCSS - Remove unused CSS (Tailwind has this built-in)
    // Requires: npm install @fullhuman/postcss-purgecss
    // '@fullhuman/postcss-purgecss': {
    //   content: [
    //     './app/**/*.{js,ts,jsx,tsx,mdx}',
    //     './components/**/*.{js,ts,jsx,tsx,mdx}',
    //   ],
    //   defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    //   safelist: ['html', 'body'],
    // },

    // CSSNANO - Minify CSS in production
    // Requires: npm install cssnano
    // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};

module.exports = config;
