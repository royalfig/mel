import reframe from 'reframe.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

hljs.highlightAll();
// const hljs = require('highlight.js/lib/common');

// import hljs from 'highlight.js/lib/common';
// import javascript from 'highlight.js/lib/languages/javascript';
// import handlebars from 'highlight.js/lib/languages/handlebars';
// import css from 'highlight.js/lib/languages/css';
// console.log(hljs);

import { toc } from './toc';
import { copyHandler } from './copy';
import { galleryFormatter } from './gallery';
import { upButtonHandler } from './upButton';
import { makeTablesResponsive } from './table';

reframe('iframe');
toc();
copyHandler();
upButtonHandler();
galleryFormatter();
makeTablesResponsive();
