# Mel - A [Ghost](https://ghost.org) Theme

I created this theme for my personal website -> [ryanfeigenbaum.com](https://ryanfeigenbaum.com)



## Development
1. Clone or fork this directory
2. `cd` into the directory and `npm install`

I use rollup.js and PostCSS to build assets.

`npm run watch` 
Watch for changes and compile JS and CSS assets

`npm run build`
Compile and minify JS and CSS assets

`npm run css`
Run stylelint to order CSS properties automatically and implement other auto fixes

`npm run check`
Use [gscan](https://gscan.ghost.org) to check for theme compatibility with Ghost v4

`npm run zip`
Create a zip file of the theme