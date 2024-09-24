async function fetchNoteBook() {
  const cachedData = sessionStorage.getItem("jsonData");
  if (cachedData) {
    return JSON.parse(cachedData);
  }
  try {
    const response = await fetch("/wp-content/uploads/notebookdata.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    sessionStorage.setItem("jsonData", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}
const root = document.querySelector(":root");
const rootstyle = root.style;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const $create = document.createElement.bind(document);
const $createcomment = document.createComment.bind(document);
const setprop = rootstyle.setProperty.bind(rootstyle);
root.classList.add(
  getRandItem(Array.from({ length: 2 }, (v, i) => `color_${i + 1}`))
);
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
  let time = Date.now();
  let timeoutId;
  delay2 = delay1 < delay2 ? delay2 : delay1;
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
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  setprop("--scrlbrwd", `${scrollbarWidth}px`);
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
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll(
    "#main .mainbody :is(img[data-src],iframe[data-src])"
  );
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.srcset = img.getAttribute("data-srcset");
        observer.unobserve(img);
      }
    });
  });
  lazyImages.forEach((image) => {
    imageObserver.observe(image);
  });
});
sessionStorage.getItem("view") === "l" ? toggleViewmode(true, true) : toggleViewmode(false, true);
function toggleViewmode(isList, init = false) {
  document.documentElement.classList.toggle("isList", isList);
  sessionStorage.setItem("view", isList ? "l" : "g");
  init || duoResponsive();
}
//# sourceMappingURL=start.js.map
