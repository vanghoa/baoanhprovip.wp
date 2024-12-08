'use strict';

const root = document.querySelector(':root');
const rootstyle = root.style;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
const setprop = rootstyle.setProperty.bind(rootstyle);
const isDevQ = isQueryParamPart('developer');
const isDesQ = isQueryParamPart('designer');

root.classList.add(
  getRandItem(Array.from({ length: 2 }, (v, i) => `color_${i + 1}`))
);

// function
function getRandItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isPage(check) {
  return document.body.classList.contains(check);
}

function $createFrag() {
  return new DocumentFragment();
}

function throttle_debounce(fn, delay1, delay2) {
  // Capture the current time
  let time = Date.now();
  let timeoutId;
  delay2 = delay1 < delay2 ? delay2 : delay1;

  // Here's our logic
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(true), delay2);
    if (time + delay1 - Date.now() <= 0) {
      fn(false);
      time = Date.now();
    }
  };
}

function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function getScrollbarWidth() {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.parentNode.removeChild(outer);
  setprop('--scrlbrwd', `${scrollbarWidth}px`);
  return scrollbarWidth;
}

window.renderCache = {};

function hasCache(key) {
  if (!key) {
    return false;
  }
  return key in window.renderCache;
}

function setCache(key, obj) {
  if (!key) {
    return false;
  }
  window.renderCache[key] = obj;
}

function getCache(key) {
  console.log(`get cache image #` + key + ` successful`);
  return window.renderCache[key];
}

function deleteCache(key) {
  delete window.renderCache[key];
}

document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll(
    '#main .mainbody :is(img[data-src],iframe[data-src])'
  );

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src'); // Load the actual image
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
});

sessionStorage.getItem('view') === 'l'
  ? toggleViewmode(true, true)
  : toggleViewmode(false, true);
function toggleViewmode(isList, init = false) {
  document.documentElement.classList.toggle('isList', isList);
  sessionStorage.setItem('view', isList ? 'l' : 'g');
  init || duoResponsive();
}

function isQueryParamPart(Q) {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('story');
  if (value) {
    return value.split('-')[0] == Q;
  }
}

function getQueryParamPart() {
  const urlParams = new URLSearchParams(window.location.search);
  const value = urlParams.get('story');
  if (value) {
    return value.split('-')[0];
  }
}

async function fetchAndUnzipJson() {
  const nameList = await fetchNameList();
  const name = nameList[Math.floor(Math.random() * nameList.length)];
  const storedData = sessionStorage.getItem(name);
  if (storedData) {
    return JSON.parse(storedData);
  }
  const response = await fetch(
    `/wp-content/themes/baoanhprovip.wp/assets/unprocessedjs/${name}.gz`
  );
  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const decompressed = pako.inflate(uint8Array, { to: 'string' });
  const jsonData = JSON.parse(decompressed);
  sessionStorage.setItem(name, JSON.stringify(jsonData));
  return jsonData;
}

async function fetchNoteBook() {
  const cachedData = sessionStorage.getItem('jsonData');

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch('/wp-content/uploads/notebookdata.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Save the data in sessionStorage
    sessionStorage.setItem('jsonData', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

async function fetchNameList() {
  const cachedData = sessionStorage.getItem('nameList');

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(
      '/wp-content/themes/baoanhprovip.wp/assets/unprocessedjs/nameList.json'
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // Save the data in sessionStorage
    sessionStorage.setItem('nameList', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

function inactivityTime(start, stop) {
  let time;
  let flag = true;
  resetTimer();
  document.body.onmousemove = resetTimer;
  mainbody.addEventListener('scroll', resetTimer);

  function logout() {
    start();
    flag = true;
  }

  function resetTimer() {
    if (flag) {
      stop();
      flag = false;
    }
    clearTimeout(time);
    time = setTimeout(logout, 25000);
  }
}

const defaultTheme = localStorage.getItem('theme');
let isDark = defaultTheme
  ? defaultTheme === 'dark'
  : window.matchMedia('(prefers-color-scheme: dark)').matches;
if (defaultTheme) {
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
}

function toggleTheme() {
  isDark = !isDark;
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference
  toggleThemeASCII();
  duoResponsive();
}