import reframe from 'reframe.js';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import bash from 'highlight.js/lib/languages/bash';
import handlebars from 'highlight.js/lib/languages/handlebars';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('handlebars', handlebars);

hljs.highlightAll();

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
