import reframe from 'reframe.js';

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
