const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({ preset: 'default' }),
    process.env.NODE_ENV === 'production' &&
      purgecss({
        content: ['**/*.html', './src/**/*.js', './src/**/*.jsx'],
        css: ['./src/**/*.css'],
      }),
  ],
};
