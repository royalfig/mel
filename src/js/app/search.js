import GhostContentAPI from '@tryghost/content-api';
import * as JsSearch from 'js-search';
import { readingTime } from '@tryghost/helpers';

import { formatTime, setState, debounce } from './utils';
import { launchModal } from './modal';

export function initSearch() {
  const api = new GhostContentAPI({
    url: 'http://localhost:2368',
    key: '002c1b3ae10e2b87ff4201ace8',
    version: 'canary',
  });

  const index = new JsSearch.Search('id');

  index.tokenizer = new JsSearch.StopWordsTokenizer(
    new JsSearch.SimpleTokenizer(),
  );

  index.addIndex('title');
  index.addIndex('plaintext');

  // HTML Elements
  const searchBtn = document.querySelector('.navbar__search');
  const searchInput = document.querySelector('#search');
  const searchModal = document.querySelector('.mel-overlay');
  const searchResult = document.querySelector('.search__result');
  const clearSearchBtn = document.querySelector('.mel-search__clear');

  let cachedPosts;
  let searchResults;

  searchBtn.addEventListener('click', () => {
    launchModal(searchModal);
  });

  searchInput.addEventListener('input', () => {
    if (!searchResults) {
      setState('add', 'searching');
    }
  });

  searchInput.addEventListener('keyup', debounce(search));

  if (cachedPosts) {
    index.addDocuments(cachedPosts);
  }

  // Hydrate cachedPosts in memory if available in localStorage
  if (!cachedPosts && isLocalCacheAvailable()) {
    cachedPosts = JSON.parse(localStorage.getItem('posts'));
    index.addDocuments(cachedPosts);
  }

  if (!cachedPosts) {
    console.log('fetching new posts');
    api.posts
      .browse({
        limit: 'all',
        formats: ['plaintext', 'html'],
        fields: ['id', 'published_at', 'title', 'url'],
      })
      .then((posts) => {
        cachedPosts = posts;
        createLocalCache(posts);
        index.addDocuments(posts);
      });
  }

  function createLocalCache(docs) {
    localStorage.setItem('timestamp', Date.now().toString());
    localStorage.setItem('posts', JSON.stringify(docs));
  }

  function isLocalCacheAvailable() {
    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem('timestamp');
    if (
      previousTimestamp &&
      timestamp - +previousTimestamp > 1000 * 60 * 60 * 24
    ) {
      return false;
    } else {
      return true;
    }
  }

  function search(input) {
    console.log('searching');
    searchResult.innerHTML = '';

    const res = index.search(input.target.value);

    if (!res.length) {
      searchResult.innerHTML = '<p>No results</p>';
    } else {
      const els = res.map((post) => {
        console.log(post);
        return renderResultTemplate(post);
      });

      searchResult.innerHTML = els.join('');
    }
    searchResults = true;
    setState('remove', 'searching');
  }

  const renderResultTemplate = (post) => {
    const date = formatTime(post.published_at);
    const readTime = readingTime(post, {
      minute: '1 min read',
      minutes: '% min read',
    });
    return `<a class="list__container" href="${post.url}">
      <time class="list__date" datetime="${post.iso}">${date.local}</time>
      <h2 class="list__title">${post.title}</h2>
      <p class="list__read-time">
          ${readTime}
      </p>
  </a>`;
  };

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchResult.innerHTML = '';
  });
}
