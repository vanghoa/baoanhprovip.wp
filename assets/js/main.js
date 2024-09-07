const body = document.body;
const html = document.documentElement;
const main = $("main");
const mainbody = $(".mainbody");
const copy = $("#copy");
const imgcanvas = $("#preview");
const rx = 2;
const ry = 1;
const ctx = imgcanvas.getContext("2d", { willReadFrequently: true });
ctx.fillStyle = "#e3e3ca";
const isDeveloper = isPage("page-developer");
const isDesigner = isPage("page-designer");
const isHome = isPage("home") || isPage("archive") || isDeveloper || isDesigner;
const isWork = isPage("single-work");
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
const hratio = 2.1;
const scaleX = 7.4;
const scaleY = scaleX * hratio;
const widthLimit = scaleX * 35;
let lazyList = {};
const char = {
  bg: "`",
  bg2: "_",
  trans: null,
  // prettier-ignore
  lbtn: nullifySpace([
    ` █ `,
    `█◄█`,
    ` █ `
  ]),
  // prettier-ignore
  rbtn: nullifySpace([
    ` █ `,
    `█►█`,
    ` █ `
  ]),
  idc: "●",
  mouse: "█",
  divider: "|"
};
const cacheKey = {
  imgH: { name: "imgHolder", allkeys: [] },
  storyS: { name: "storySection" }
};
let grayRamp = "█▒░@%*=--..__";
const grayRampObj = {
  ...grayRamp.split("").reduce((p, c, i) => {
    return {
      ...p,
      [c]: i
    };
  }, {}),
  [char.bg2]: grayRamp.length - 1,
  [char.bg]: grayRamp.length - 3
};
const rampLength = grayRamp.length;
function nullifySpace(arr) {
  for (const i in arr) {
    arr[i] = arr[i].split("");
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
const mainmainbody = $("#main .mainbody");
const mainnav = $("#main nav");
{
  const fragcopy = $createFrag();
  for (const childElement of main.children) {
    fragcopy.appendChild(childElement.cloneNode(true));
  }
  copy.appendChild(fragcopy);
  reSetup();
  if (window.location.hash == "#everything") {
    const el = $("#main .everything");
    if (el) {
      mainmainbody.scrollTo({
        top: el.offsetTop - mainnav.clientHeight,
        left: 0,
        behavior: "smooth"
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
    cmts = Array.from({ length: screenlength }, () => {
      const cmt = $createcomment("");
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
    behavior: "smooth"
  });
}
const realh = $("#copy .realheight");
const realhmain = $("main .realheight");
const nav = $("#copy nav .bg-layer");
const navTxt = [...$$("#copy nav .txt-layer")];
const allBg2 = [
  ...$$("#copy .mainbody .bg-layer"),
  ...$$("#copy .mainbody .cp-layer > *"),
  ...$$("#copy .odd-layer > :nth-child(even)")
];
const imgHolder = $("#copy .imgholder");
const imgHolderMain = $("#main .imgholder");
const allImgHomeMain = $$("#main .imgwrapper");
const allImgWrapper = [...$$("#copy .imgwrapper")];
const allImgHome = Array.from(allImgWrapper, (el, k) => {
  const idc = el.nextElementSibling.querySelector(`.indicator`);
  return {
    el,
    group: [...el.querySelectorAll("img")],
    lbtn: el.nextElementSibling.querySelector(".lbtn svg"),
    rbtn: el.nextElementSibling.querySelector(".rbtn svg"),
    idc,
    hoverlayer: allImgHomeMain[k].nextElementSibling.querySelector(".hover-layer"),
    hoverchild: el.nextElementSibling.querySelector(".hover-child"),
    idcascii: idc && [
      Array(idc.childElementCount).fill([char.idc, char.trans]).flat()
    ]
  };
});
const allImg = [...$$("#copy *:not(.imgwrapper-fixed) > img")];
const allImgMain = [...$$("#main *:not(.imgwrapper-fixed) > img")];
const allTxt = [
  ...$$("#copy .mainbody .txt-layer"),
  ...$$("#copy .mainbody .txtp-layer > *:not(figure)")
];
const allDivider = [...$$("#copy .divider")];
const storySection = {
  img: [...$$("#copy .storysection .imgwrapper-fixed img")],
  bg: $("#copy .storysection .bg-layer-fixed"),
  txt: [...$$("#copy .storysection .txt-layer-fixed")]
};
const homelist = [...$$(".homegrid + .homelist")];
const homegrid = homelist.map((el) => el.previousElementSibling);
const viewmode = {
  gallery: $("#main .viewmode .galleryview"),
  list: $("#main .viewmode .listview")
};
sessionStorage.getItem("viewmode") == "list" ? toggleViewmode() : toggleViewmode(true);
function toggleViewmode(isGallery) {
  viewmode.gallery.classList.toggle("underline", isGallery);
  viewmode.list.classList.toggle("underline", !isGallery);
  homegrid.forEach((a) => a.classList.toggle("hidden", !isGallery));
  homelist.forEach((a) => a.classList.toggle("hidden", isGallery));
  sessionStorage.setItem("viewmode", isGallery ? "gallery" : "list");
  duoResponsive();
}
getScrollbarWidth();
window.onload = duoResponsive;
onresize = throttle_debounce(
  function(isFinal) {
    isFinal && getScrollbarWidth();
    duoResponsive(isFinal);
  },
  100,
  400
);
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
  if (!mouseChange || window.scrollTop == void 0) {
    return;
  }
  const { mouseY: ogY, mouseX: ogX } = mouseChange;
  if (ogY != void 0) {
    const char2 = (() => {
      var _a, _b, _c;
      let intensity = 0;
      const fixedArr = (_a = window.fixedLayer) == null ? void 0 : _a[ogY];
      if (fixedArr == null ? void 0 : fixedArr[ogX]) {
        if (fixedArr[ogX].intensity) {
          intensity = fixedArr[ogX].intensity;
        } else {
          return fixedArr == null ? void 0 : fixedArr[ogX];
        }
      }
      const absArr = (_b = window.absoluteLayer) == null ? void 0 : _b[ogY + scrollTop];
      if (absArr == null ? void 0 : absArr[ogX]) {
        return filterGrayRamp(absArr[ogX], intensity);
      }
      const staticArr = (_c = canvasData[ogY + scrollTop]) == null ? void 0 : _c[ogX];
      return staticArr ? filterGrayRamp(staticArr, intensity) : "";
    })();
    replaceChar(char2, ogX, ogY);
  }
  replaceChar(char.mouse, window.mouseX, window.mouseY);
  function replaceChar(char2, x, y) {
    var _a;
    const content = (_a = cmts[y]) == null ? void 0 : _a.nodeValue;
    content && x < content.length && (cmts[y].nodeValue = `${content.slice(0, x)}${char2}${content.slice(
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
  var _a;
  if (!((_a = window.imgsecs) == null ? void 0 : _a[i]) || stopEvething) {
    return;
  }
  const { hoverchild, hoverrect } = window.imgsecs[i];
  window.imgsecs[i].isHover = true;
  drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect]);
  drawTxt(window.absoluteLayer, [hoverchild]);
  cmtRenderScreen();
}
function mouseLeave(i) {
  var _a;
  if (!((_a = window.imgsecs) == null ? void 0 : _a[i])) {
    return;
  }
  const { hoverchild, hoverrect } = window.imgsecs[i];
  window.imgsecs[i].isHover = false;
  drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect], null);
  cmtRenderScreen();
}
if (isHome) {
  let slide = function(i, cur, curnow, length) {
    if (cur.value !== curnow) {
      imgsecs[i].setAttribute("isfirst", curnow == 1);
      imgsecs[i].setAttribute("islast", curnow == length);
      indicators[i][cur.value - 1].classList.add("opacity-50");
      indicators[i][curnow - 1].classList.remove("opacity-50");
      imgwrappers[i].style.transform = `translateX(-${(curnow - 1) * 100}%)`;
      cur.value = curnow;
    }
  };
  console.log("home page");
  const imgwrappers = $$("main .homegrid .imgwrapper");
  window.imgsecs = $$("main .homegrid .imgsec");
  const projects = $$("main .homegrid .project");
  const indicators = [];
  window.curs = [];
  let iscroll = 0;
  let isPause = false;
  imgsecs.forEach((el, i) => {
    const imgwrapper = imgwrappers[i];
    const length = imgwrapper.childElementCount;
    indicators.push(imgsecs[i].querySelectorAll(".indicator li"));
    curs.push({ value: 1 });
    let cur = curs[i];
    el.addEventListener("click", function({ target }) {
      isPause = true;
      let curnow = cur.value;
      if (target.closest(".lbtn")) {
        curnow = curnow <= 1 ? 1 : curnow - 1;
      } else if (target.closest(".rbtn")) {
        curnow = curnow >= length ? length : curnow + 1;
      }
      window.stopPrev = slideAscii(i, curnow - 1, cur.value - 1, 500);
      slide(i, cur, curnow, length);
    });
  });
} else if (isWork) {
  console.log("single-work page");
  const imgcopyarr = [];
  {
    const frag = $createFrag();
    for (const img of allImg) {
      const div = $create("div");
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
      const div = $create("div");
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
    async function toggle(curImgHolder, curImgHolderChild, key) {
      curImgHolderChild && (curchild = curImgHolderChild);
      imgHolderMain.classList[curImgHolder ? "add" : "remove"]("open");
      curchild.style.visibility = curImgHolder ? "visible" : "hidden";
      window.curImgHolder = curImgHolder;
      if (!stopEvething) {
        await drawAbsoluteLayer(curImgHolder ? 3 : null, key);
        cmtRenderScreen();
      }
    }
  }
}
async function drawAbsoluteLayer(intensity = 3, key, isFinal = true) {
  const vl = intensity ? {
    intensity: 3
  } : null;
  window.fixedLayer = Array.from(
    { length: screenlength },
    () => Array.from({ length: window.fixedLayer[0].length }, () => vl)
  );
  await drawNav(intensity, isFinal);
  intensity && (window.imgHolder = await drawImg(
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
  if (!imgsecs[i].ascii || stop || curnow == curprev || !imgsecs[i].ascii.arr) {
    return;
  }
  const delay_ = 100;
  let { top, topbot, left, leftright, arr: ascii, baseW } = imgsecs[i].ascii;
  const lim = time / delay_;
  let count = 1;
  let myrequest = requestAnimationFrame(animation);
  async function animation(now) {
    var _a, _b;
    const percentage = Math.round(
      mapRange(count, 0, lim, curprev, curnow, easeInOut) * baseW
    );
    for (let y = top; y <= topbot; y++) {
      for (let x = left; x <= leftright; x++) {
        let newchar = (_a = canvasData[y]) == null ? void 0 : _a[x];
        newchar !== char.bg && newchar && (newchar = ((_b = ascii[y - top]) == null ? void 0 : _b[x - left + percentage]) || newchar);
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
function mapRange(value, inMin, inMax, outMin, outMax, easingFunction = (v) => v) {
  let normalizedValue = (value - inMin) / (inMax - inMin);
  let easedValue = easingFunction(normalizedValue);
  return easedValue * (outMax - outMin) + outMin;
}
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : -1 + (4 - 2 * t) * t;
}
function manualResponsive(el) {
  const { clientWidth: w } = el;
  el.className = `${w > 1536 ? "xxl" : ""} ${w > 1280 ? "xl" : ""} ${w > 1024 ? "lg" : ""} ${w > 768 ? "md" : ""} ${w > 640 ? "sm" : ""}`;
}
async function duoResponsivehtml2canvas() {
  const originalDrawImage = ctx.drawImage;
  ctx.drawImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (image instanceof HTMLImageElement) {
      if (sw / dw < sh / dh) {
        const _dh = dh;
        dh = sh * (dw / sw);
        dy = dy + (_dh - dh) / 2;
      } else {
        const _dw = dw;
        dw = sw * (dh / sh);
        dx = dx + (_dw - dw) / 2;
      }
    }
    return originalDrawImage.call(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh);
  };
  grayRamp = "█▒░@%*=--..__`";
  const width = Math.max(outerWidth - innerWidth - 100, 0);
  manualResponsive(main);
  copy.style.width = `${width}px`;
  manualResponsive(copy);
  const canvas = {
    w: reMsrX(width),
    h: reMsrY(realh.clientHeight)
  };
  canvas.data = Array.from(
    { length: canvas.h },
    () => Array.from({ length: canvas.w }, () => char.bg)
  );
  imgcanvas.width = canvas.w;
  imgcanvas.height = canvas.h;
  ctx.fillStyle = "#f5f5e6";
  ctx.fillRect(0, 0, canvas.w, canvas.h);
  console.log(canvas.w, canvas.h);
  await html2canvas(realh, {
    canvas: imgcanvas,
    scale: 1 / 7.3,
    backgroundColor: null,
    width: canvas.w,
    height: canvas.h,
    windowHeight: innerHeight / hratio
  });
  const grayScales = convertToGrayScales(
    ctx,
    imgcanvas.width,
    imgcanvas.height
  );
  const ascii = drawAscii(grayScales, imgcanvas.width);
  console.log(ascii);
  cmtRender(ascii);
}
async function duoResponsive(isFinal = true) {
  lazyList = {};
  stopSlideAscii();
  const width = Math.max(outerWidth - innerWidth - 100, 0);
  if (width < widthLimit) {
    window.canvasData = Array.from(
      { length: screenlength },
      () => "This-is-too-small".split("")
    );
    window.fixedLayer = Array.from(
      { length: screenlength },
      () => Array.from({ length: "This-is-too-small".length }, () => null)
    );
    cmtRenderScreen();
    stopEvething = true;
    setEvent(mainbody, "onscroll", null);
    setEvent(document, "onmousemove", null);
    allImgHome.forEach(({ hoverlayer }) => {
      if (!hoverlayer) {
        return;
      }
      setEvent(hoverlayer, "onmouseenter", null);
      setEvent(hoverlayer, "onmouseleave", null);
    });
    return;
  }
  reSetup();
  stopEvething = false;
  isFinal && console.log("responsive rerender");
  copy.style.width = `${width}px`;
  manualResponsive(copy);
  const canvas = {
    w: reMsrX(width),
    h: reMsrY(realh.clientHeight)
  };
  window.canvasData = Array.from(
    { length: canvas.h },
    () => Array.from({ length: canvas.w }, () => char.bg)
  );
  window.absoluteLayer = Array.from(
    { length: canvas.h },
    () => Array.from({ length: canvas.w }, () => char.trans)
  );
  window.fixedLayer = Array.from(
    { length: screenlength },
    () => Array.from({ length: canvas.w }, () => char.trans)
  );
  window.hoverLayer = Array.from(
    { length: canvas.h },
    () => Array.from({ length: canvas.w }, () => char.trans)
  );
  calcScrollTop();
  drawFewRect(window.canvasData, allBg2, null, char.bg2, isFinal);
  drawFewRect(window.canvasData, allDivider, null, char.divider, isFinal, {
    rx_: 0,
    ry_: 0
  });
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
  drawTxt(window.canvasData, allTxt, isFinal);
  isFinal && cacheKey.imgH.allkeys.forEach((key) => {
    deleteCache(key);
  });
  isFinal && deleteCache(cacheKey.storyS.name);
  await (window.curImgHolder ? drawAbsoluteLayer(3, null, isFinal) : drawNav(null, isFinal));
  cmtRenderScreen();
  isFinal && setEvent(mainbody, "onscroll", scrollResponsive);
  isFinal && setEvent(document, "onmousemove", mouseMove);
  isFinal && allImgHome.forEach(({ hoverlayer }, i) => {
    if (!hoverlayer) {
      return;
    }
    setEvent(hoverlayer, "onmouseenter", () => mouseEnter(i));
    setEvent(hoverlayer, "onmouseleave", () => mouseLeave(i));
  });
}
async function drawNav(intensity = null, isFinal = true) {
  drawFewRect(window.fixedLayer, [nav]);
  drawTxt(window.fixedLayer, navTxt);
  if (storySection.bg) {
    const charbg = filterGrayRamp(char.bg2, intensity);
    drawFewRect(window.fixedLayer, [storySection.bg], null, charbg, isFinal);
    drawTxt(window.fixedLayer, storySection.txt);
    const { display } = getComputedStyle(storySection.img[0].parentElement);
    if (display != "none") {
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
    ogwidth: reMsrX(obj.width)
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
  const length = cmts.length > cmtContents.length ? cmts.length : cmtContents.length;
  for (let i = 0; i < length; i++) {
    const cmtContent = cmtContents[i];
    const isWithinScroll = i > scrollTop;
    if (cmts[i] && cmtContent) {
      cmts[i].nodeValue = cmtContent.join("");
      cmtsNew.push(cmts[i]);
      isWithinScroll || cmts[i].remove();
    } else if (cmtContent) {
      const cmtNew = $createcomment(cmtContent.join(""));
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
  var _a, _b, _c;
  if (window.scrollTop == void 0) {
    return;
  }
  for (let y = 0; y < screenlength; y++) {
    const fixedArr = (_a = window.fixedLayer) == null ? void 0 : _a[y];
    const absArr = (_b = window.absoluteLayer) == null ? void 0 : _b[y + scrollTop];
    const canvasArr = ((_c = canvasData[y + scrollTop]) == null ? void 0 : _c.map((v, x) => {
      let intensity = 0;
      if (fixedArr == null ? void 0 : fixedArr[x]) {
        if (fixedArr[x].intensity) {
          intensity = fixedArr[x].intensity;
        } else {
          return fixedArr == null ? void 0 : fixedArr[x];
        }
      }
      if (absArr == null ? void 0 : absArr[x]) {
        return filterGrayRamp(absArr[x], intensity);
      }
      return filterGrayRamp(v, intensity);
    }).join("")) || "";
    cmts[y].nodeValue = canvasArr;
  }
}
function filterGrayRamp(char2, intensity) {
  if (grayRampObj[char2] == void 0 || !intensity) {
    return char2;
  }
  let index = grayRampObj[char2] - intensity;
  return grayRamp[index] || grayRamp[0];
}
function drawFewRect(data, allRect, rectArr, rectchar = char.bg2, isFinal = true, { rx_, ry_ } = { rx_: rx, ry_: ry }) {
  !rectArr && (rectArr = allRect.map((el) => getRect(el)));
  for (let i = 0; i < rectArr.length; i++) {
    const { leftright, topbot, left, top } = rectArr[i];
    if (isLazy(!isFinal, top, topbot) || top == 0 && topbot == 0) {
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
function drawRect(data, allRect, char_ = char.bg2) {
  const rectArr = allRect.map((el) => getRect(el));
  let rectCount = 0;
  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      if (rectCount < rectArr.length) {
        for (const rect of rectArr) {
          if (rect.done) {
            continue;
          }
          const { leftright, topbot, left, top } = rect;
          if (checkRoundedRect(x, y, top, topbot, left, leftright, rx, ry)) {
            line && (line[x] = char_);
            if (y == topbot && x == leftright - rx) {
              rect.done = true;
              rectCount++;
            }
          }
        }
      }
    }
  }
}
function checkRoundedRect(x, y, top, topbot, left, leftright, rx2, ry2) {
  if (y >= top && y <= topbot && x >= left + rx2 && x <= leftright - rx2 || y >= top + ry2 && y <= topbot - ry2 && x >= left && x <= leftright) {
    return true;
  }
  return false;
}
function reMsrX(num) {
  return Math.floor(num / scaleX);
}
function reMsrY(num) {
  return Math.floor(num / scaleY);
}
async function drawImg(data, allImg2, canvas2CanvasFunc = canvas2CanvasArr, lazyLoad = false, cacheKey2 = null, isFinal = true) {
  let returnobj;
  if (!isFinal) {
    drawFewRect(data, allImg2, null, char.mouse);
    return;
  }
  for (let i = 0; i < allImg2.length; i++) {
    const img = allImg2[i];
    const { leftright, topbot, left, top, width, height } = getRect(img);
    const lazyKey = `${i}${leftright + topbot + left + top}${Math.random().toString(16).slice(2)}`;
    lazyList[lazyKey] = lazyDrawImg;
    await lazyDrawImg();
    async function lazyDrawImg() {
      if (isLazy(lazyLoad, top, topbot)) {
        return;
      }
      delete lazyList[lazyKey];
      let objectFit, isCover, containObj, ascii;
      if (hasCache(cacheKey2)) {
        ({ objectFit, isCover, containObj, ascii } = getCache(cacheKey2));
      } else {
        ({ objectFit } = getComputedStyle(img));
        isCover = objectFit == "cover";
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
        setCache(cacheKey2, {
          objectFit,
          isCover,
          containObj,
          ascii
        });
      }
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
        maskLeft: isCover ? 0 : containObj.left
      };
      lazyLoad && console.log(`lazyload image successful`);
    }
  }
  return returnobj;
}
async function drawImgHome(data, allImg2) {
  const { top, left, topbot, leftright, width, height } = getRect(allImg2[0].el);
  if (width < 4 || height < 4) {
    return;
  }
  const base = {
    h: height,
    w: width
  };
  for (let igroup = 0; igroup < allImg2.length; igroup++) {
    imgsecs[igroup].ascii = {};
    ctx.clearRect(0, 0, imgcanvas.width, imgcanvas.height);
    const { group, el, lbtn, rbtn, idcascii, idc, hoverlayer, hoverchild } = allImg2[igroup];
    imgcanvas.width = base.w * group.length;
    imgcanvas.height = base.h;
    const { top: top2, left: left2, topbot: topbot2, leftright: leftright2, width: width2, height: height2 } = getRect(el);
    const lazyKey = `${igroup}${leftright2 + topbot2 + left2 + top2}${Math.random().toString(16).slice(2)}`;
    lazyList[lazyKey] = lazyDrawImg;
    await lazyDrawImg();
    async function lazyDrawImg() {
      if (top2 >= scrollTop + screenlength || topbot2 <= scrollTop) {
        return;
      }
      delete lazyList[lazyKey];
      for (let iimg = 0; iimg < group.length; iimg++) {
        const img = group[iimg];
        const { objectFit } = getComputedStyle(img);
        await image2Canvas(
          img,
          base.w,
          base.h,
          base.w * iimg,
          objectFit == "cover"
        );
      }
      const grayScales = convertToGrayScales(
        ctx,
        imgcanvas.width,
        imgcanvas.height
      );
      const ascii = drawAscii(grayScales, imgcanvas.width);
      canvas2CanvasArr(
        top2,
        topbot2,
        left2,
        leftright2,
        data,
        ascii,
        (curs[igroup].value - 1) * base.w
      );
      imgsecs[igroup].ascii.arr = ascii;
      console.log("lazyload image successful");
    }
    drawAbs(lbtn, char.lbtn);
    drawAbs(rbtn, char.rbtn);
    drawAbs(idc, idcascii);
    const hoverrect = getRect(hoverchild);
    imgsecs[igroup].isHover && drawFewRect(window.absoluteLayer, [hoverchild], [hoverrect]);
    imgsecs[igroup].isHover && drawTxt(window.absoluteLayer, [hoverchild]);
    imgsecs[igroup].hoverrect = hoverrect;
    imgsecs[igroup].hoverchild = hoverchild;
    imgsecs[igroup].ascii = {
      top: top2,
      topbot: topbot2,
      left: left2,
      leftright: leftright2,
      baseW: base.w,
      ...imgsecs[igroup].ascii
    };
  }
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
  const contrast = 1.2;
  const intercept = 128 * (1 - contrast);
  const grayScales = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i] * contrast + intercept;
    const g = imageData.data[i + 1] * contrast + intercept;
    const b = imageData.data[i + 2] * contrast + intercept;
    const grayScale = toGrayScale(r, g, b);
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;
    grayScales.push(grayScale);
  }
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
  return grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];
}
function drawTxt(data, allTxt2, isFinal = true) {
  var _a;
  for (let i = 0; i < allTxt2.length; i++) {
    const txt = allTxt2[i];
    let { top, left, ogwidth, topbot } = getRect(txt);
    if (isLazy(!isFinal, top, topbot)) {
      continue;
    }
    let {
      display,
      textAlign,
      paddingLeft: pl,
      paddingRight: pr,
      paddingTop: pt,
      paddingBottom: pb
    } = getComputedStyle(txt);
    const content = txt.innerText.trim();
    if (display == "none" || content == "") {
      continue;
    }
    let arrcontent = content.split("\n");
    pl = reMsrX(+pl.slice(0, -2));
    pr = reMsrX(+pr.slice(0, -2));
    pt = reMsrY(+pt.slice(0, -2));
    pb = reMsrY(+pb.slice(0, -2));
    const output = [];
    top += pt + 1;
    left += pl;
    ogwidth -= pl + pr;
    if (ogwidth < 1) {
      continue;
    }
    for (let k = 0; k < arrcontent.length; k++) {
      let content2 = arrcontent[k];
      while (content2.length > 0) {
        let extracted = content2.slice(0, ogwidth);
        content2 = content2.slice(ogwidth);
        if (content2.length > 0 && content2[0] != ` `) {
          for (let i2 = extracted.length - 1; i2 >= 0; i2--) {
            if (extracted[i2] == ` `) {
              content2 = extracted.slice(i2) + content2;
              extracted = extracted.slice(0, i2);
              break;
            }
          }
        }
        extracted = extracted.trim();
        content2 = content2.trim();
        if (textAlign == "center") {
          extracted = `${extracted}${output.length == topbot - top && content2.length > 0 ? "…" : ""}`;
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
    for (let y = top; y < top + output.length; y++) {
      const yo = y - top;
      const line = output[yo];
      for (let x = left; x < left + line.length; x++) {
        if (data[y]) {
          let char2 = ((_a = output[yo]) == null ? void 0 : _a[x - left]) || data[y][x];
          char2 = char2 == ` ` ? data[y][x] : char2;
          data[y][x] = char2;
        } else {
          console.log(y, x);
        }
      }
    }
  }
}
function image2Canvas(img, cW, cH, posX = 0, isCover = true) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const scaleFactor = Math[isCover ? "max" : "min"](
        cW / image.width,
        cH / (image.height / hratio)
      );
      const dWidth = image.width * scaleFactor;
      const dHeight = image.height / hratio * scaleFactor;
      const x = cW / 2 - dWidth / 2;
      const y = cH / 2 - dHeight / 2;
      const sx = Math.abs(x / scaleFactor);
      const sy = Math.abs(y / scaleFactor) * hratio;
      const sWidth = image.width;
      const sHeight = image.height;
      ctx.fillStyle = "#e3e3ca";
      ctx.fillRect(posX + 0, 0, cW, cH);
      isCover ? ctx.drawImage(
        image,
        sx,
        sy,
        sWidth,
        sHeight,
        posX + 0,
        0,
        dWidth,
        dHeight
      ) : ctx.drawImage(image, posX + x, y, dWidth, dHeight);
      resolve({
        top: Math.round(y),
        left: Math.round(posX + x)
      });
    };
    image.crossOrigin = "";
    image.src = img.src;
  });
}
function canvas2CanvasArr(top, topbot, left, leftright, data, ascii, offsetX = 0, offsetY = 0) {
  var _a, _b;
  const intensityF = this.intensityF;
  const charbg = this.charbg ?? char.bg2;
  for (let y = top; y <= topbot; y++) {
    for (let x = left; x <= leftright; x++) {
      const newchar = (_a = ascii[y - top + offsetY]) == null ? void 0 : _a[x - left + offsetX];
      if (((_b = data[y]) == null ? void 0 : _b[x]) && data[y][x] == charbg && newchar) {
        data[y][x] = intensityF ? filterGrayRamp(newchar, intensityF) : newchar;
      } else {
      }
    }
  }
  addOL(this.isOL, data, top, left, topbot, leftright);
}
function canvas2CanvasArrNoMask(top, topbot, left, leftright, data, ascii, offsetX = 0, offsetY = 0, maskTop = 0, maskLeft = 0) {
  var _a, _b;
  topbot -= maskTop;
  leftright -= maskLeft;
  const compTop = top + maskTop;
  const compLeft = left + maskLeft;
  for (let y = compTop; y <= topbot; y++) {
    for (let x = compLeft; x <= leftright; x++) {
      const newchar = (_a = ascii[y - top]) == null ? void 0 : _a[x - left];
      if (((_b = data[y]) == null ? void 0 : _b[x]) !== void 0 && newchar) {
        data[y][x] = newchar;
      } else {
      }
    }
  }
  addOL(this.isOL, data, compTop, compLeft, topbot, leftright);
}
function addOL(isOL, data, top, left, topbot, leftright) {
  var _a, _b, _c, _d, _e, _f;
  if (isOL) {
    for (let y = top + 1; y <= topbot - 1; y++) {
      ((_a = data[y]) == null ? void 0 : _a[left]) != char.bg && (data[y][left] = data[y][leftright] = "║");
    }
    for (let x = left + 1; x <= leftright - 1; x++) {
      ((_b = data[top]) == null ? void 0 : _b[x]) != char.bg && (data[top][x] = data[topbot][x] = "═");
    }
    ((_c = data[top]) == null ? void 0 : _c[left]) != char.bg && (data[top][left] = "╔");
    ((_d = data[top]) == null ? void 0 : _d[leftright]) != char.bg && (data[top][leftright] = "╗");
    ((_e = data[topbot]) == null ? void 0 : _e[left]) != char.bg && (data[topbot][left] = "╚");
    ((_f = data[topbot]) == null ? void 0 : _f[leftright]) != char.bg && (data[topbot][leftright] = "╝");
  }
}
function clearRect(top, topbot, left, leftright, data, char2) {
  var _a;
  for (let y = top; y <= topbot; y++) {
    for (let x = left; x <= leftright; x++) {
      if (((_a = data[y]) == null ? void 0 : _a[x]) !== void 0) {
        data[y][x] = char2;
      } else {
      }
    }
  }
}
function calcMousePos(e) {
  const mouseX = Math.floor(
    e.clientX * copy.clientWidth / main.clientWidth / scaleX
  );
  const mouseY = Math.floor(
    e.clientY * copy.clientHeight / main.clientHeight / scaleY
  );
  if (window.mouseX == mouseX && window.mouseY == mouseY) {
    return false;
  }
  const obj = {
    mouseX: window.mouseX,
    mouseY: window.mouseY
  };
  window.mouseX = mouseX;
  window.mouseY = mouseY;
  return obj;
}
function calcScrollTop() {
  const actualScroll = Math.floor(
    mainbody.scrollTop * (realh.clientHeight - innerHeight) / (realhmain.clientHeight - innerHeight) / scaleY
  ) || 0;
  const scrollTop2 = screenlength > canvasData.length - actualScroll ? canvasData.length - screenlength : actualScroll;
  window.scrollTop = scrollTop2 <= 0 ? 0 : scrollTop2;
}
function isLazy(lazyLoad, top, topbot) {
  return lazyLoad && (top >= window.scrollTop + screenlength || topbot <= window.scrollTop);
}
//# sourceMappingURL=main.js.map
