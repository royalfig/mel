import GhostContentAPI from '@tryghost/content-api';
import * as JsSearch from 'js-search';
import readingTime from '@tryghost/helpers/lib/reading-time';

import { formatTime, setState, debounce } from './utils';
import { launchModal } from './modal';

export function initSearch() {
  const api = new GhostContentAPI({
    url: window.location.origin,
    key: SEARCH_API,
    version: 'canary',
  });

  const index = new JsSearch.Search('id');

  index.tokenizer = new JsSearch.StopWordsTokenizer(
    new JsSearch.SimpleTokenizer(),
  );

  index.addIndex('title');
  index.addIndex('plaintext');

  // HTML Elements
  const searchBtn = document.querySelector('.mel-navbar__search');
  const searchInput = document.querySelector('#search');
  const searchModal = document.querySelector('.mel-search__modal');
  const searchResult = document.querySelector('.mel-search__result');
  const clearSearchBtn = document.querySelector('.mel-search__clear');

  let cachedPosts;
  let posts;
  let searchResults;

  searchBtn.addEventListener('click', () => {
    launchModal(searchModal);
  });

  searchInput.addEventListener('input', () => {
    searchResult.innerHTML = '';
    setState('add', 'mel-searching');
  });

  searchInput.addEventListener('keyup', debounce(search));

  async function fetchPosts() {
    if (cachedPosts) {
      index.addDocuments(cachedPosts);
      return new Promise((fulfilled) => fulfilled());
    }

    // Hydrate cachedPosts in memory if available in localStorage
    if (isLocalCacheAvailable()) {
      cachedPosts = JSON.parse(localStorage.getItem('posts'));
      index.addDocuments(cachedPosts);
      return new Promise((fulfilled) => fulfilled());
    }

    if (!cachedPosts) {
      const posts = await api.posts.browse({
        limit: 'all',
        formats: ['plaintext', 'html'],
        fields: ['id', 'published_at', 'title', 'url'],
      });
      cachedPosts = posts;
      createLocalCache(posts);
      index.addDocuments(posts);
      return posts;
    }
  }

  function createLocalCache(docs) {
    localStorage.setItem('timestamp', Date.now().toString());
    localStorage.setItem('posts', JSON.stringify(docs));
  }

  10 - 8 > 2;

  function isLocalCacheAvailable() {
    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem('timestamp');
    if (
      previousTimestamp &&
      timestamp - +previousTimestamp < 1000 * 60 * 60 * 24
    ) {
      return true;
    } else {
      return false;
    }
  }

  function search(input) {
    fetchPosts().then(() => {
      setState('remove', 'mel-searching');

      searchResult.innerHTML = '';

      const res = index.search(input.target.value);
      if (!res.length && input.target.value) {
        searchResult.innerHTML = '<p>🤷‍♀️ No results</p>';
      } else {
        const els = res.map((post) => {
          return renderResultTemplate(post);
        });

        searchResult.innerHTML = els.join('');
      }
    });
  }

  const renderResultTemplate = (post) => {
    const date = formatTime(post.published_at);
    const readTime = readingTime(post, {
      minute: '1 min read',
      minutes: '% min read',
    });
    return `<a class="mel-list__container" href="${post.url}">
      <time class="mel-list__date" datetime="${post.iso}">${date.local}</time>
      <h2 class="mel-list__title">${post.title}</h2>
      <p class="mel-list__read-time">
          ${readTime}
      </p>
  </a>`;
  };

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchResult.innerHTML = '';
  });
}

export function menu() {
  const burger = document.querySelector('.mel-navbar__burger');
  const menu = document.querySelector('.mel-menu__modal');
  burger.addEventListener('click', () => {
    launchModal(menu);
  });
}
