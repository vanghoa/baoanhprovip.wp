'use strict';

// binding method
const body = document.body;
const html = document.documentElement;
const main = $('main');
const mainbody = $('.mainbody');
const copy = $('#copy');
const imgcanvas = $('#preview');

//
const rx = 2;
const ry = 1;
const ctx = imgcanvas.getContext('2d', { willReadFrequently: true });
ctx.fillStyle = '#e3e3ca';
const isDeveloper = isPage('page-developer');
const isDesigner = isPage('page-designer');
const isHome = isPage('home') || isPage('archive') || isDeveloper || isDesigner;
const isWork = isPage('single-work');
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
const hratio = 2.1;
const scaleX = 7.4;
const scaleY = scaleX * hratio;
const widthLimit = scaleX * 35;
let lazyList = {};
let lazyQ = [];
let lazyQCur = -1;
let lazyQBlock = false;
const char = {
  note: '"',
  bg: '`',
  bg2: '_',
  trans: null,
  // prettier-ignore
  lbtn: nullifySpace([
    ` █ `,
    `█◄█`,
    ` █ `,
  ]),
  // prettier-ignore
  rbtn: nullifySpace([
    ` █ `,
    `█►█`,
    ` █ `
  ]),
  idc: '●',
  mouse: '█',
  divider: '|',
  hL: '-',
};
const cacheKey = {
  imgH: { name: 'imgHolder', allkeys: [] },
  storyS: { name: 'storySection' },
};
let grayRamp = '█▒░@%*=--..__';
const grayRampObj = {
  ...grayRamp.split('').reduce((p, c, i) => {
    return {
      ...p,
      [c]: i,
    };
  }, {}),
  [char.bg2]: grayRamp.length - 1,
  [char.bg]: grayRamp.length - 3,
};
const rampLength = grayRamp.length;

function nullifySpace(arr) {
  for (const i in arr) {
    arr[i] = arr[i].split('');
    for (const k in arr[i]) {
      arr[i][k] == ` ` && (arr[i][k] = null);
    }
  }
  return arr;
}

let screenlength = 0;
let cmts = [];
const cmtsScreen = [];
let stopEvething = true;

const mainmainbody = $('#main .mainbody');
const mainnav = $('#main nav');
{
  // setup
  const fragcopy = $createFrag();
  for (const childElement of main.children) {
    fragcopy.appendChild(childElement.cloneNode(true));
  }
  copy.appendChild(fragcopy);
  //
  if (window.location.hash == '#everything') {
    const el = $('#main .everything');
    if (el) {
      mainmainbody.scrollTo({
        top: el.offsetTop - mainnav.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}

function reSetup() {
  const newscreenlength = reMsrY(innerHeight);
  if (newscreenlength !== screenlength) {
    screenlength = newscreenlength;
    const fragcmt = $createFrag();
    cmts.forEach((cmt) => {
      cmt.remove();
    });
    cmts = Array.from({ length: screenlength }, (v, k) => {
      const cmt = $createcomment(
        window.canvasData[k] ? window.canvasData[k].join('') : ''
      );
      fragcmt.append(cmt);
      return cmt;
    });
    html.before(fragcmt);
  }
}

function scrollToTop() {
  mainmainbody.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
const realh = $('#copy .realheight');
const realhmain = $('main .realheight');
const nav = $('#copy nav .bg-layer');
const navTxt = [...$$('#copy nav .txt-layer')];
const allBg2 = [
  ...$$('#copy .mainbody .bg-layer'),
  ...$$('#copy .mainbody .cp-layer > *:not(figure)'),
  ...$$('#copy .mainbody .cp-layer img'),
  ...$$('#copy .odd-layer > :nth-child(even)'),
];
const imgHolder = $('#copy .imgholder');
const imgHolderMain = $('#main .imgholder');
const allImgHomeMain = $$('#main .mainbody .imgwrapper');
const allImgWrapper = [...$$('#copy .mainbody .imgwrapper')];
const allImgHome = Array.from(allImgWrapper, (el, k) => {
  const idc = el.nextElementSibling.querySelector(`.indicator`);
  return {
    el: el,
    group: [...el.querySelectorAll('img')],
    lbtn: el.nextElementSibling.querySelector('.lbtn svg'),
    rbtn: el.nextElementSibling.querySelector('.rbtn svg'),
    idc,
    hoverlayer:
      allImgHomeMain[k].nextElementSibling.querySelector('.hover-layer'),
    hoverchild: el.nextElementSibling.querySelector('.hover-child'),
    idcascii: idc && [
      Array(idc.childElementCount).fill([char.idc, char.trans]).flat(),
    ],
  };
});
const allImg = [...$$('#copy .mainbody img')];
const allImgMain = [...$$('#main .mainbody img')];
const allTxt = [
  ...$$('#copy .mainbody .txt-layer'),
  ...$$('#copy .mainbody .txtp-layer > *:not(figure)'),
];
const allDivider = [...$$('#copy .divider')];
const storySection = {
  img: [...$$('#copy .storysection .imgwrapper img')],
  bg: $('#copy .storysection .bg-layer'),
  txt: [...$$('#copy .storysection .txt-layer')],
};
const inputNoteMain = $('#main #input_note');
const inputNote = $('#copy #input_note');
const notebookHolder = $('#copy .notebookholder');
const inputResponsive = $('#main #input_responsive');
const allHorizontalLine = [...$$('#copy .mainbody .horizontal-line')];
let notebookData = null;

if (isHome) {
  console.log('home page');

  const imgwrappers = $$('main .homegrid .imgwrapper');
  window.imgsecs = $$('main .homegrid .imgsec');
  const indicators = [];
  window.curs = [];
  let currentSlideEls = [];

  const slideObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (!currentSlideEls.includes(el)) {
            currentSlideEls.push(el);
            el.isObserved = true;
          }
        } else if (el.isObserved) {
          currentSlideEls = currentSlideEls.filter((slide) => slide !== el);
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  const intervalId = setInterval(() => {
    if (currentSlideEls.length == 0) {
      return;
    }
    const el = getRandItem(currentSlideEls);
    const length = imgwrappers[el.i].childElementCount;
    let cur = window.curs[el.i];
    let curnow = cur.value;
    curnow = curnow >= length ? 1 : curnow + 1;
    window.stopPrev = slideAscii(el.i, curnow - 1, cur.value - 1, 500);
    slide(el.i, cur, curnow, length);
  }, 3000);

  imgsecs.forEach((el, i) => {
    const imgwrapper = imgwrappers[i];
    const length = imgwrapper.childElementCount;
    indicators.push(imgsecs[i].querySelectorAll('.indicator li'));
    curs.push({ value: 1 });
    let cur = curs[i];
    el.i = i;
    length > 1 && slideObserver.observe(imgsecs[i]);
    el.addEventListener('click', function ({ target }) {
      let curnow = cur.value;
      if (target.closest('.lbtn')) {
        curnow = curnow <= 1 ? 1 : curnow - 1;
      } else if (target.closest('.rbtn')) {
        curnow = curnow >= length ? length : curnow + 1;
      }
      window.stopPrev = slideAscii(i, curnow - 1, cur.value - 1, 500);
      slide(i, cur, curnow, length);
      currentSlideEls = currentSlideEls.filter((slide) => slide !== el);
    });
  });
  // eslint-disable-next-line no-inner-declarations
  function slide(i, cur, curnow, length) {
    if (cur.value !== curnow) {
      imgsecs[i].setAttribute('isfirst', curnow == 1);
      imgsecs[i].setAttribute('islast', curnow == length);
      indicators[i][cur.value - 1].classList.add('opacity-50');
      indicators[i][curnow - 1].classList.remove('opacity-50');
      imgwrappers[i].style.transform = `translateX(-${(curnow - 1) * 100}%)`;
      //
      cur.value = curnow;
    }
  }
} else if (isWork) {
  console.log('single-work page');
  const imgcopyarr = [];
  {
    const frag = $createFrag();
    for (const img of allImg) {
      const div = $create('div');
      const imgcopy = img.cloneNode(true);
      imgcopyarr.push(imgcopy);
      div.appendChild(imgcopy);
      frag.appendChild(div);
    }
    imgHolder.appendChild(frag);
  }
  {
    const frag = $createFrag();
    let curchild = null;

    imgHolderMain.onclick = () => {
      toggle(null, null);
    };
    for (const i in allImgMain) {
      const img = allImgMain[i];
      const div = $create('div');
      const imgcopy = img.cloneNode(true);
      img.copy = imgcopyarr[i];
      const formattedKey = `${cacheKey.imgH.name}-${i}`;
      cacheKey.imgH.allkeys.push(formattedKey);
      img.onclick = () => {
        toggle(img.copy, imgcopy, formattedKey);
      };
      div.appendChild(imgcopy);
      frag.appendChild(div);
    }
    imgHolderMain.appendChild(frag);
    // eslint-disable-next-line no-inner-declarations
    async function toggle(curImgHolder, curImgHolderChild, key) {
      curImgHolderChild && (curchild = curImgHolderChild);
      imgHolderMain.classList[curImgHolder ? 'add' : 'remove']('open');
      curchild.style.visibility = curImgHolder ? 'visible' : 'hidden';
      curchild.originsrc ??
        (curImgHolder && (curchild.src = getOriginSrc(curchild, 'src')));
      window.curImgHolder = curImgHolder;
      if (!stopEvething) {
        await drawImgHolderFixed(curImgHolder ? 3 : null, key);
        cmtRenderScreen();
      }
    }
  }
} else if (inputNote) {
  notebookData = fetchNoteBook();
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
  const btn = $('#main [type="submit"]');
  const btncopy = $('#copy [type="submit"]');
  const form = [...$$('form')];
  if (sessionStorage.getItem('submit')) {
    form.forEach((el) => el.classList.add('disabled'));
    btn.disabled ||
      (btn.value = btncopy.value =
        'you already sent!\nthanks a lot!\n\n(you can find the message inside devtool with the respective screensize at the time it is sent!)');
    btn.disabled = inputNoteMain.disabled = true;
  } else {
    inputNoteMain.parentElement.onsubmit = () => {
      form.forEach((el) => el.classList.add('disabled'));
      btn.value = btncopy.value = 'sending...';
      sessionStorage.setItem('submit', 'true');
      sessionStorage.removeItem('jsonData');
      cmtRenderScreen();
    };
    inputNoteMain.oninput = () => {
      inputNote.value = inputNoteMain.value;
      if (!stopEvething) {
        drawFewRect(
          window.canvasData,
          [inputNote],
          inputNote.rectData && [inputNote.rectData],
          undefined,
          undefined,
          { fxl: -1 }
        );
        drawTxt(window.canvasData, [inputNote], true, true);
        cmtRenderScreen();
      }
    };
  }
}

let allNotes = [];

getScrollbarWidth();
window.onload = async () => {
  await duoResponsive();
  if (!inputNote) {
    return;
  }
  const data = await notebookData;
  const frag = $createFrag();
  data &&
    (allNotes = data.map(({ value, responsive }) => {
      const p = $create('p');
      p.innerHTML = value;
      p.className = `${getNoteResponsiveClass(+responsive)} p-3 text-center`;
      p.style.setProperty('--X', Math.floor(Math.random() * 81) + '%');
      p.style.setProperty('--Y', Math.floor(Math.random() * 81) + '%');
      frag.append(p);
      return p;
    }));
  notebookHolder.append(frag);
  drawNotes();
  cmtRenderScreen();
};
onresize = throttle_debounce(
  function (isFinal) {
    isFinal && getScrollbarWidth();
    duoResponsive(isFinal);
  },
  100,
  400
);

function drawNotes() {
  drawFewRect(window.fixedLayer, allNotes, undefined, char.note, undefined, {
    rx_: 1,
  });
  drawTxt(window.fixedLayer, allNotes);
}

function setEvent(el, on, fn) {
  if (fn) {
    !el[on] && (el[on] = fn);
  } else {
    el[on] && (el[on] = null);
  }
}

function mouseMove(e) {
  if (stopEvething) {
    return;
  }
  const mouseChange = calcMousePos(e);
  if (!mouseChange || window.scrollTop == undefined) {
    return;
  }
  const { mouseY: ogY, mouseX: ogX } = mouseChange;
  if (ogY != undefined) {
    const char = (() => {
      let intensity = 0;
      const fixedArr = window.fixedLayer?.[ogY];
      if (fixedArr?.[ogX]) {
        if (fixedArr[ogX].intensity) {
          intensity = fixedArr[ogX].intensity;
        } else {
          return fixedArr?.[ogX];
        }
      }
      const absArr = window.absoluteLayer?.[ogY + scrollTop];
      if (absArr?.[ogX]) {
        return filterGrayRamp(absArr[ogX], intensity);
      }
      const staticArr = canvasData[ogY + scrollTop]?.[ogX];
      return staticArr ? filterGrayRamp(staticArr, intensity) : '';
    })();

    replaceChar(char, ogX, ogY);
  }
  //
  replaceChar(char.mouse, window.mouseX, window.mouseY);

  function replaceChar(char, x, y) {
    const content = cmts[y]?.nodeValue;
    content &&
      x < content.length &&
      (cmts[y].nodeValue = `${content.slice(0, x)}${char}${content.slice(
        x + 1
      )}`);
  }
}

async function scrollResponsive() {
  if (stopEvething) {
    return;
  }
  calcScrollTop();
  for (const i in lazyList) {
    await lazyList[i]();
  }
  cmtRenderScreen();
}

function mouseEnter(i) {
  if (!window.imgsecs?.[i] || stopEvething) {
    return;
  }
  const { hoverchild, hoverrect } = window.imgsecs[i];
  window.imgsecs[i].isHover = true;
  drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect]);
  drawTxt(window.absoluteLayer, [hoverchild]);
  cmtRenderScreen();
}

function mouseLeave(i) {
  if (!window.imgsecs?.[i]) {
    return;
  }
  const { hoverchild, hoverrect } = window.imgsecs[i];
  window.imgsecs[i].isHover = false;
  drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect], null);
  cmtRenderScreen();
}

async function drawImgHolderFixed(intensity = 3, key, isFinal = true) {
  const vl = intensity
    ? {
        intensity: 3,
      }
    : null;
  window.fixedLayer = Array.from({ length: screenlength }, () =>
    Array.from({ length: window.fixedLayer[0].length }, () => vl)
  );
  await drawNav(intensity, isFinal);
  intensity &&
    (window.imgHolder = await drawImg(
      window.fixedLayer,
      [window.curImgHolder],
      canvas2CanvasArrNoMask.bind({ isOL: true }),
      false,
      key,
      isFinal
    ));
}

function stopSlideAscii() {
  if (window.stopPrev) {
    window.stopPrev();
  }
}

function slideAscii(i, curnow, curprev, time) {
  stopSlideAscii();
  let stop = false;
  if (
    !imgsecs[i].ascii ||
    stop ||
    curnow == curprev ||
    !imgsecs[i].ascii.arr ||
    stopEvething
  ) {
    return;
  }
  const delay_ = 100;
  let { top, topbot, left, leftright, arr: ascii, baseW } = imgsecs[i].ascii;
  // top += 1;
  const lim = time / delay_;
  let count = 1;
  requestAnimationFrame(animation);
  async function animation(now) {
    const percentage = Math.round(
      mapRange(count, 0, lim, curprev, curnow, easeInOut) * baseW
    );
    for (let y = top; y <= topbot; y++) {
      for (let x = left; x <= leftright; x++) {
        let newchar = canvasData[y]?.[x];
        newchar !== char.bg &&
          newchar &&
          (newchar = ascii[y - top]?.[x - left + percentage] || newchar);
        canvasData[y][x] = newchar;
      }
    }
    cmtRenderScreen();
    count++;
    await wait(delay_);
    if (!stop && imgsecs[i].ascii && count <= lim) {
      myrequest = requestAnimationFrame(animation);
    }
  }
  return () => {
    stop = true;
  };
}

function mapRange(
  value,
  inMin,
  inMax,
  outMin,
  outMax,
  easingFunction = (v) => v
) {
  let normalizedValue = (value - inMin) / (inMax - inMin);
  let easedValue = easingFunction(normalizedValue);
  return easedValue * (outMax - outMin) + outMin;
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : -1 + (4 - 2 * t) * t;
}

function manualResponsive(el) {
  const { clientWidth: w } = el;
  el.className = `${w > 1536 ? 'xxl' : ''} ${w > 1280 ? 'xl' : ''} ${
    w > 1024 ? 'lg' : ''
  } ${w > 768 ? 'md' : ''} ${w > 640 ? 'sm' : ''}`;
}

function getNoteResponsiveClass(w) {
  if (w > 1280) {
    return 'xl';
  } else if (w > 1024) {
    return 'lg';
  } else if (w > 768) {
    return 'md';
  } else if (w > 640) {
    return 'sm';
  }
  return 'ssm';
}

async function duoResponsive(isFinal = true) {
  stopEvething = true;
  lazyList = {};
  lazyQ = [];
  lazyQCur = -1;
  lazyQBlock = false;
  stopSlideAscii();
  inputResponsive && (inputResponsive.value = innerWidth);
  const width = Math.max(outerWidth - innerWidth - 100, 0);

  if (width < widthLimit) {
    window.canvasData = Array.from({ length: screenlength }, () =>
      'This-is-too-small'.split('')
    );
    window.fixedLayer = Array.from({ length: screenlength }, () =>
      Array.from({ length: 'This-is-too-small'.length }, () => null)
    );
    cmtRenderScreen();
    setEvent(mainbody, 'onscroll', null);
    setEvent(document, 'onmousemove', null);
    allImgHome.forEach(({ hoverlayer }) => {
      if (!hoverlayer) {
        return;
      }
      setEvent(hoverlayer, 'onmouseenter', null);
      setEvent(hoverlayer, 'onmouseleave', null);
    });
    return;
  }
  isFinal && console.log('responsive rerender');
  copy.style.width = `${width}px`;
  manualResponsive(copy);
  // canvas
  const canvas = {
    w: reMsrX(width),
    h: reMsrY(realh.clientHeight),
  };
  window.canvasData = Array.from({ length: canvas.h }, () =>
    Array.from({ length: canvas.w }, () => char.bg)
  );
  reSetup();
  window.absoluteLayer = Array.from({ length: canvas.h }, () =>
    Array.from({ length: canvas.w }, () => char.trans)
  );
  window.fixedLayer = Array.from({ length: screenlength }, () =>
    Array.from({ length: canvas.w }, () => char.trans)
  );
  window.hoverLayer = Array.from({ length: canvas.h }, () =>
    Array.from({ length: canvas.w }, () => char.trans)
  );
  calcScrollTop();
  // draw rects
  // drawRect(window.canvasData, allBg2);
  drawFewRect(window.canvasData, allBg2, null, char.bg2, isFinal);
  // draw dividers
  drawFewRect(window.canvasData, allDivider, null, char.divider, isFinal, {
    rx_: 0,
    ry_: 0,
  });
  // draw horizontal line
  inputNote &&
    drawFewRect(window.canvasData, allHorizontalLine, null, char.hL, isFinal, {
      rx_: 0,
      ry_: 0,
      fy: 1,
    });
  // draw images
  if (isFinal) {
    if (isHome) {
      await drawImgHome(window.canvasData, allImgHome);
    } else {
      await drawImg(
        window.canvasData,
        allImg,
        canvas2CanvasArr.bind({ isOL: true }),
        true
      );
    }
  } else {
    if (isHome) {
      drawFewRect(window.canvasData, allImgWrapper, null, char.mouse, isFinal);
    } else {
      drawFewRect(window.canvasData, allImg, null, char.mouse, isFinal);
    }
  }
  // draw text
  drawTxt(window.canvasData, allTxt, isFinal);
  // draw input text
  inputNote &&
    ((inputNote.openData = undefined), (inputNote.rectData = undefined));
  inputNote && drawTxt(window.canvasData, [inputNote], true, true);
  // draw nav
  isFinal &&
    cacheKey.imgH.allkeys.forEach((key) => {
      deleteCache(key);
    });
  isFinal && deleteCache(cacheKey.storyS.name);
  await (window.curImgHolder
    ? drawImgHolderFixed(3, null, isFinal)
    : drawNav(null, isFinal));
  // final render
  inputNote && drawNotes();
  cmtRenderScreen();
  // set event
  isFinal && setEvent(mainbody, 'onscroll', scrollResponsive);
  isFinal && setEvent(document, 'onmousemove', mouseMove);
  isFinal &&
    allImgHome.forEach(({ hoverlayer }, i) => {
      if (!hoverlayer) {
        return;
      }
      setEvent(hoverlayer, 'onmouseenter', () => mouseEnter(i));
      setEvent(hoverlayer, 'onmouseleave', () => mouseLeave(i));
    });
  isFinal && (stopEvething = false);
}

async function drawNav(intensity = null, isFinal = true) {
  drawFewRect(window.fixedLayer, [nav]);
  drawTxt(window.fixedLayer, navTxt);
  if (storySection.bg) {
    const charbg = filterGrayRamp(char.bg2, intensity);
    drawFewRect(window.fixedLayer, [storySection.bg], null, charbg, isFinal);
    drawTxt(window.fixedLayer, storySection.txt);
    const { display } = getComputedStyle(storySection.img[0].parentElement);
    if (display != 'none') {
      await drawImg(
        window.fixedLayer,
        storySection.img,
        canvas2CanvasArr.bind({ isOL: false, intensityF: intensity, charbg }),
        false,
        cacheKey.storyS.name,
        isFinal
      );
    }
  }
}

function getRect(el) {
  const obj = el.getBoundingClientRect();
  const output = {
    top: reMsrY(obj.top),
    left: reMsrX(obj.left),
    ogheight: reMsrY(obj.height),
    ogwidth: reMsrX(obj.width),
  };
  output.topbot = output.top + output.ogheight;
  output.leftright = output.left + output.ogwidth;
  output.width = output.ogwidth + 1;
  output.height = output.ogheight + 1;
  return output;
}

function cmtRender(cmtContents) {
  const cmtsNew = [];
  const frag = $createFrag();
  const length =
    cmts.length > cmtContents.length ? cmts.length : cmtContents.length;
  for (let i = 0; i < length; i++) {
    const cmtContent = cmtContents[i];
    const isWithinScroll = i > scrollTop;
    if (cmts[i] && cmtContent) {
      cmts[i].nodeValue = cmtContent.join('');
      cmtsNew.push(cmts[i]);
      isWithinScroll || cmts[i].remove();
    } else if (cmtContent) {
      const cmtNew = $createcomment(cmtContent.join(''));
      isWithinScroll && frag.append(cmtNew);
      cmtsNew.push(cmtNew);
    } else if (cmts[i]) {
      cmts[i].remove();
    }
  }
  html.before(frag);
  cmts = cmtsNew;
}

function cmtRenderScreen() {
  if (window.scrollTop == undefined) {
    return;
  }
  for (let y = 0; y < screenlength; y++) {
    const fixedArr = window.fixedLayer?.[y];
    const absArr = window.absoluteLayer?.[y + scrollTop];
    const canvasArr =
      canvasData[y + scrollTop]
        ?.map((v, x) => {
          let intensity = 0;
          if (fixedArr?.[x]) {
            if (fixedArr[x].intensity) {
              intensity = fixedArr[x].intensity;
            } else {
              return fixedArr?.[x];
            }
          }
          if (absArr?.[x]) {
            return filterGrayRamp(absArr[x], intensity);
          }
          return filterGrayRamp(v, intensity);
        })
        .join('') || '';
    cmts[y].nodeValue = canvasArr;
  }
}

function filterGrayRamp(char, intensity) {
  if (grayRampObj[char] == undefined || !intensity) {
    return char;
  }
  let index = grayRampObj[char] - intensity;
  return grayRamp[index] || grayRamp[0];
}

function drawFewRect(
  data,
  allRect,
  rectArr,
  rectchar = char.bg2,
  isFinal = true,
  { rx_ = rx, ry_ = ry, fy = 0, fxl = 0, fxr = 0 } = {}
) {
  rectArr ||
    (rectArr = allRect.map((el) => {
      el.rectData = getRect(el);
      return el.rectData;
    }));
  for (let i = 0; i < rectArr.length; i++) {
    let { leftright, topbot, left, top } = rectArr[i];
    topbot += fy;
    top += fy;
    left += fxl;
    leftright += fxr;
    if (isLazy(!isFinal, top, topbot) || (top == 0 && topbot == 0)) {
      continue;
    }
    for (let y = top; y <= topbot; y++) {
      const line = data[y];
      for (let x = left; x <= leftright; x++) {
        if (checkRoundedRect(x, y, top, topbot, left, leftright, rx_, ry_)) {
          line && (line[x] = rectchar);
        }
      }
    }
  }
}

function checkRoundedRect(x, y, top, topbot, left, leftright, rx, ry) {
  if (
    (y >= top && y <= topbot && x >= left + rx && x <= leftright - rx) ||
    (y >= top + ry && y <= topbot - ry && x >= left && x <= leftright)
  ) {
    return true;
  }
  return false;
  /*
  if (isPointInOval(x, y, top + ry, left + rx)) {
    return true;
  } else if (isPointInOval(x, y, top + ry, leftright - rx)) {
    return true;
  } else if (isPointInOval(x, y, topbot - ry, left + rx)) {
    return true;
  } else if (isPointInOval(x, y, topbot - ry, leftright - rx)) {
    return true;
  }
  function isPointInOval(x, y, centerX, centerY) {
    // Calculate normalized distances
    const dx = x - centerX;
    const dy = y - centerY;

    // Use the ellipse equation to check if the point is inside
    return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
  }*/
}

function reMsrX(num) {
  return Math.floor(num / scaleX);
}

function reMsrY(num) {
  return Math.floor(num / scaleY);
}

async function drawImg(
  data,
  allImg,
  canvas2CanvasFunc = canvas2CanvasArr,
  lazyLoad = false,
  cacheKey = null,
  isFinal = true
) {
  let returnobj;

  if (!isFinal) {
    drawFewRect(data, allImg, null, char.mouse);
    return;
  }

  for (let i = 0; i < allImg.length; i++) {
    const img = allImg[i];
    const { leftright, topbot, left, top, width, height } = getRect(img);
    const lazyKey = `${i}${leftright + topbot + left + top}${Math.random()
      .toString(16)
      .slice(2)}`;
    lazyList[lazyKey] = async (byPassCond = false) => {
      if (LazyDrawImgOpen(byPassCond, lazyLoad, top, topbot, lazyKey)) {
        return;
      }
      //
      let objectFit, isCover, containObj, ascii;
      if (hasCache(cacheKey)) {
        ({ objectFit, isCover, containObj, ascii } = getCache(cacheKey));
      } else {
        ({ objectFit } = getComputedStyle(img));
        isCover = objectFit == 'cover';
        ctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
        imgcanvas.width = width;
        imgcanvas.height = height;
        containObj = await image2Canvas(img, width, height, 0, isCover);
        const grayScales = convertToGrayScales(
          ctx,
          imgcanvas.width,
          imgcanvas.height
        );
        ascii = drawAscii(grayScales, imgcanvas.width);
        setCache(cacheKey, {
          objectFit,
          isCover,
          containObj,
          ascii,
        });
      }
      //
      canvas2CanvasFunc(
        top,
        topbot,
        left,
        leftright,
        data,
        ascii,
        0,
        0,
        isCover ? 0 : containObj.top,
        isCover ? 0 : containObj.left
      );
      returnobj = {
        top,
        topbot,
        left,
        leftright,
        maskTop: isCover ? 0 : containObj.top,
        maskLeft: isCover ? 0 : containObj.left,
      };
      lazyLoad && console.log(`lazyload image successful`);
      LazyDrawImgClose();
    };
    lazyList[lazyKey]();
  }
  return returnobj;
}

async function drawImgHome(data, allImg) {
  const { top, left, topbot, leftright, width, height } = getRect(allImg[0].el);
  if (width < 4 || height < 4) {
    return;
  }
  const base = {
    h: height,
    w: width,
  };

  for (let igroup = 0; igroup < allImg.length; igroup++) {
    imgsecs[igroup].ascii = {};
    const { group, el, lbtn, rbtn, idcascii, idc, hoverlayer, hoverchild } =
      allImg[igroup];
    // draw image
    const { top, left, topbot, leftright, width, height } = getRect(el);
    const lazyKey = `${igroup}${leftright + topbot + left + top}${Math.random()
      .toString(16)
      .slice(2)}`;
    lazyList[lazyKey] = async (byPassCond = false) => {
      if (LazyDrawImgOpen(byPassCond, true, top, topbot, lazyKey)) {
        return;
      }
      ctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
      imgcanvas.width = base.w * group.length;
      imgcanvas.height = base.h;
      //
      for (let iimg = 0; iimg < group.length; iimg++) {
        const img = group[iimg];
        const { objectFit } = getComputedStyle(img);
        await image2Canvas(
          img,
          base.w,
          base.h,
          base.w * iimg,
          objectFit == 'cover'
        );
      }
      const grayScales = convertToGrayScales(
        ctx,
        imgcanvas.width,
        imgcanvas.height
      );
      const ascii = drawAscii(grayScales, imgcanvas.width);
      canvas2CanvasArr(
        top,
        topbot,
        left,
        leftright,
        data,
        ascii,
        (curs[igroup].value - 1) * base.w
      );
      imgsecs[igroup].ascii.arr = ascii;
      console.log('lazyload image successful');
      LazyDrawImgClose();
    };
    lazyList[lazyKey]();
    // lbtn
    drawAbs(lbtn, char.lbtn);
    // rbtn
    drawAbs(rbtn, char.rbtn);
    // idc
    drawAbs(idc, idcascii);
    // hover
    const hoverrect = getRect(hoverchild);
    imgsecs[igroup].isHover &&
      drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect]);
    imgsecs[igroup].isHover && drawTxt(window.absoluteLayer, [hoverchild]);
    imgsecs[igroup].hoverrect = hoverrect;
    imgsecs[igroup].hoverchild = hoverchild;
    // send to window
    imgsecs[igroup].ascii = {
      top,
      topbot,
      left,
      leftright,
      baseW: base.w,
      ...imgsecs[igroup].ascii,
    };
  }
  //
}

function drawAbs(btn, ascii) {
  const { top, left } = getRect(btn);
  canvas2CanvasArrNoMask(
    top,
    top + ascii.length - 1,
    left,
    left + ascii[0].length - 1,
    window.absoluteLayer,
    ascii
  );
}

function convertToGrayScales(context, width, height) {
  const imageData = context.getImageData(0, 0, width, height);
  const contrast = 1.2; //convert to decimal & shift range: [0..2]
  const intercept = 128 * (1 - contrast);
  const grayScales = [];

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i] * contrast + intercept;
    const g = imageData.data[i + 1] * contrast + intercept;
    const b = imageData.data[i + 2] * contrast + intercept;

    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] =
      imageData.data[i + 1] =
      imageData.data[i + 2] =
        grayScale;

    grayScales.push(grayScale);
  }

  // context.putImageData(imageData, 0, 0);

  return grayScales;
}

function toGrayScale(r, g, b) {
  const v = 0.21 * r + 0.72 * g + 0.07 * b;
  return v < 0 ? 0 : v > 255 ? 255 : v;
}

function drawAscii(grayScales, width) {
  const ascii = [[]];
  for (let i = 0; i < grayScales.length; i++) {
    const grayScale = grayScales[i];
    const nextChars = getCharacterForGrayScale(grayScale);
    ascii[ascii.length - 1].push(nextChars);
    if ((i + 1) % width === 0) {
      ascii.push([]);
    }
  }
  return ascii;
}

function getCharacterForGrayScale(grayScale) {
  return grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];
}

function drawTxtOpen(txt, isFinal, isInput) {
  if (isInput && txt.openData) {
    txt.openData.arrcontent = [`${txt.value}`];
    return false;
  }
  let { top, left, ogwidth, topbot } = getRect(txt);
  if (isLazy(!isFinal, top, topbot)) {
    return true;
  }
  let {
    display,
    textAlign,
    paddingLeft: pl,
    paddingRight: pr,
    paddingTop: pt,
    paddingBottom: pb,
  } = getComputedStyle(txt);
  const content = txt.innerText.trim() || txt.value;
  if (display == 'none' || !content) {
    return true;
  }
  let arrcontent = content.split('\n');
  pl = reMsrX(+pl.slice(0, -2));
  pr = reMsrX(+pr.slice(0, -2));
  pt = reMsrY(+pt.slice(0, -2));
  pb = reMsrY(+pb.slice(0, -2));
  top += pt + 1;
  left += pl;
  ogwidth -= pl + pr;
  if (ogwidth < 1) {
    return true;
  }
  txt.openData = {
    top,
    left,
    ogwidth,
    topbot,
    arrcontent,
    textAlign,
  };
}

function drawTxt(data, allTxt, isFinal = true, isInput = false) {
  for (let i = 0; i < allTxt.length; i++) {
    const txt = allTxt[i];
    if (drawTxtOpen(txt, isFinal, isInput)) {
      continue;
    }
    const { top, left, ogwidth, topbot, arrcontent, textAlign } = txt.openData;
    let output = [];
    if (isInput) {
      output = [arrcontent[0].slice(-ogwidth)];
    } else {
      for (let k = 0; k < arrcontent.length; k++) {
        let content = arrcontent[k];
        if (content.length == 0) {
          output.push('');
        }
        while (content.length > 0) {
          let extracted = content.slice(0, ogwidth);
          content = content.slice(ogwidth);
          if (content.length > 0 && content[0] != ` `) {
            for (let i = extracted.length - 1; i >= 0; i--) {
              if (extracted[i] == ` `) {
                content = extracted.slice(i) + content;
                extracted = extracted.slice(0, i);
                break;
              }
            }
          }
          extracted = extracted.trim();
          content = content.trim();
          if (textAlign == 'center') {
            extracted = `${extracted}${
              output.length == topbot - top && content.length > 0 ? '…' : ''
            }`;
            let rest = (ogwidth - extracted.length) / 2;
            rest = rest > 0 ? rest : 0;
            extracted = `${` `.repeat(Math.ceil(rest))}${extracted}${` `.repeat(
              Math.floor(rest)
            )}`;
          }
          output.push(extracted);
          if (output.length > topbot - top) {
            break;
          }
        }
      }
    }

    for (let y = top; y < top + output.length; y++) {
      const yo = y - top;
      const line = output[yo];
      for (let x = left; x < left + line.length; x++) {
        if (data[y]) {
          let char = output[yo]?.[x - left] || data[y][x];
          char = char == ` ` ? data[y][x] : char;
          data[y][x] = char;
        }
      }
    }

    // console.log(display, lineHeight, textAlign);
    // console.log(txt, rect.ogheight);
    // console.log(txt, style['display'], style['font-size'], style['text-align']);
  }
}

function image2Canvas(img, cW, cH, posX = 0, isCover = true) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const scaleFactor = Math[isCover ? 'max' : 'min'](
        cW / image.width,
        cH / (image.height / hratio)
      );
      const dWidth = image.width * scaleFactor;
      const dHeight = (image.height / hratio) * scaleFactor;
      const x = cW / 2 - dWidth / 2;
      const y = cH / 2 - dHeight / 2;

      const sx = Math.abs(x / scaleFactor);
      const sy = Math.abs(y / scaleFactor) * hratio;
      const sWidth = image.width;
      const sHeight = image.height;

      ctx.fillStyle = '#e3e3ca';
      ctx.fillRect(posX + 0, 0, cW, cH);

      isCover
        ? ctx.drawImage(
            image,
            sx,
            sy,
            sWidth,
            sHeight,
            posX + 0,
            0,
            dWidth,
            dHeight
          )
        : ctx.drawImage(image, posX + x, y, dWidth, dHeight);
      resolve({
        top: Math.round(y),
        left: Math.round(posX + x),
      });
    };
    image.crossOrigin = '';
    image.src = getOriginSrc(img);
  });
}

function getOriginSrc(img, key = 'src') {
  return (
    img[`origin${key}`] ??
    (img[`origin${key}`] = img.getAttribute(`data-${key}`) || img[key])
  );
}

function canvas2CanvasArr(
  top,
  topbot,
  left,
  leftright,
  data,
  ascii,
  offsetX = 0,
  offsetY = 0
) {
  const intensityF = this.intensityF;
  const charbg = this.charbg ?? char.bg2;
  for (let y = top; y <= topbot; y++) {
    for (let x = left; x <= leftright; x++) {
      const newchar = ascii[y - top + offsetY]?.[x - left + offsetX];
      if (data[y]?.[x] && data[y][x] == charbg && newchar) {
        data[y][x] = intensityF ? filterGrayRamp(newchar, intensityF) : newchar;
      } else {
        // console.log(y, x, newchar, data[y][x]);
      }
    }
  }
  addOL(this.isOL, data, top, left, topbot, leftright);
}

function canvas2CanvasArrNoMask(
  top,
  topbot,
  left,
  leftright,
  data,
  ascii,
  offsetX = 0,
  offsetY = 0,
  maskTop = 0,
  maskLeft = 0
) {
  topbot -= maskTop;
  leftright -= maskLeft;
  const compTop = top + maskTop;
  const compLeft = left + maskLeft;
  for (let y = compTop; y <= topbot; y++) {
    for (let x = compLeft; x <= leftright; x++) {
      const newchar = ascii[y - top]?.[x - left];
      if (data[y]?.[x] !== undefined && newchar) {
        data[y][x] = newchar;
      } else {
        // console.log(y, x, newchar, data[y][x]);
      }
    }
  }
  addOL(this.isOL, data, compTop, compLeft, topbot, leftright);
}

function addOL(isOL, data, top, left, topbot, leftright) {
  if (isOL) {
    for (let y = top + 1; y <= topbot - 1; y++) {
      data[y] !== undefined &&
        data[y]?.[left] != char.bg &&
        (data[y][left] = data[y][leftright] = '║');
    }
    if (data[top] !== undefined) {
      for (let x = left + 1; x <= leftright - 1; x++) {
        data[top][x] != char.bg && (data[top][x] = data[topbot][x] = '═');
      }
      data[top][left] != char.bg && (data[top][left] = '╔');
      data[top][leftright] != char.bg && (data[top][leftright] = '╗');
    }
    if (data[topbot] !== undefined) {
      data[topbot][left] != char.bg && (data[topbot][left] = '╚');
      data[topbot][leftright] != char.bg && (data[topbot][leftright] = '╝');
    }
  }
}

function clearRect(top, topbot, left, leftright, data, char) {
  for (let y = top; y <= topbot; y++) {
    for (let x = left; x <= leftright; x++) {
      if (data[y]?.[x] !== undefined) {
        data[y][x] = char;
      } else {
        // console.log(y, x, newchar, data[y][x]);
      }
    }
  }
}

function calcMousePos(e) {
  const mouseX = Math.floor(
    (e.clientX * copy.clientWidth) / main.clientWidth / scaleX
  );
  const mouseY = Math.floor(
    (e.clientY * copy.clientHeight) / main.clientHeight / scaleY
  );
  if (window.mouseX == mouseX && window.mouseY == mouseY) {
    return false;
  }
  const obj = {
    mouseX: window.mouseX,
    mouseY: window.mouseY,
  };
  window.mouseX = mouseX;
  window.mouseY = mouseY;
  return obj;
}

function calcScrollTop() {
  const actualScroll =
    Math.floor(
      (mainbody.scrollTop * (realh.clientHeight - innerHeight)) /
        (realhmain.clientHeight - innerHeight) /
        scaleY
    ) || 0;
  // console.log(mainbody.scrollTop, realhmain.clientHeight);
  const scrollTop =
    screenlength > canvasData.length - actualScroll
      ? canvasData.length - screenlength
      : actualScroll;
  window.scrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

function isLazy(lazyLoad, top, topbot) {
  return (
    lazyLoad &&
    (top >= window.scrollTop + screenlength || topbot <= window.scrollTop)
  );
}

function LazyDrawImgClose() {
  lazyQBlock = false;
  if (lazyQ[lazyQCur + 1]) {
    lazyQ[++lazyQCur](true);
  } else {
    cmtRenderScreen();
  }
}

function LazyDrawImgOpen(byPassCond, lazyLoad, top, topbot, lazyKey) {
  if (!byPassCond && isLazy(lazyLoad, top, topbot)) {
    return true;
  }
  if (lazyQBlock) {
    lazyQ.push(lazyList[lazyKey]);
    delete lazyList[lazyKey];
    return true;
  }
  lazyQBlock = true;
  delete lazyList[lazyKey];
  return false;
}
