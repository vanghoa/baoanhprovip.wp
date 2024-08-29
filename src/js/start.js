'use strict';

const root = document.querySelector(':root');
const rootstyle = root.style;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
const setprop = rootstyle.setProperty.bind(rootstyle);

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

function throttle_debounce(fn, delay) {
  // Capture the current time
  let time = Date.now();
  let timeoutId;

  // Here's our logic
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(), delay);
    if (time + delay - Date.now() <= 0) {
      // Run the function we've passed to our throttler,
      // and reset the `time` variable (so we can check again).
      fn();
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
