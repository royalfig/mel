import '../../css/app.css';

if (ENV === 'development') {
  const script = document.createElement('script');
  script.src = `http://${
    (location.host || 'localhost').split(':')[0]
  }:35729/livereload.js?snipver=1`;
  document.head.append(script);
  console.log('Reload script added');
}

import { initSearch } from './search';
import { menu } from './search';
initSearch();
menu();
