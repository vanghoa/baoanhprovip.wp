const isWork=isPage("single-work");{let tagname="bigtag",flowname="bigtag_flow";isDesQ?(tagname="designertag",flowname="designer_flow"):isDevQ&&(tagname="developertag",flowname="developer_flow"),isWork&&$$(".big-tags").forEach((el=>{el.classList.contains(tagname)||el.remove()})),isWork&&(isDesQ||isDevQ)&&$$(".storysection").forEach((el=>{el.classList.contains(flowname)||el.remove()})),isWork&&$$(".storysection").length>1&&$$(".storysection")[0].remove()}const body=document.body,html=document.documentElement,main=$("main"),mainbody=$(".mainbody"),copy=$("#copy"),imgcanvas="OffscreenCanvas"in window?new OffscreenCanvas(100,100):$create("canvas"),rx=2,ry=1,ctx=imgcanvas.getContext("2d",{willReadFrequently:!0});ctx.imageSmoothingEnabled=!1,ctx.fillStyle="#e3e3ca";const rem=parseFloat(getComputedStyle(html).fontSize),hratio=2.1,scaleX=7.4,scaleY=scaleX*hratio,widthLimit=35*scaleX;let lazyList={},lazyQ=[],lazyQCur=-1,lazyQBlock=!1;const char={note:'"',bg:"`",bg2:"_",trans:null,lbtn:stringifyASCII([" █ ","█◄█"," █ "]),rbtn:stringifyASCII([" █ ","█►█"," █ "]),idc:"●",mouse:"█",divider:"|",hL:"-"},cacheKey={imgH:{name:"imgHolder",allkeys:[]},storyS:{name:"storySection"}};let grayRamp="█▒░@%*=--..__";const grayRampObj={...grayRamp.split("").reduce(((p,c,i)=>({...p,[c]:i})),{}),[char.bg2]:grayRamp.length-1,[char.bg]:grayRamp.length-3},rampLength=grayRamp.length;function stringifyASCII(arr){const str=arr.join("");return{w:arr[0].length,h:arr.length,str:str}}let screenlength=0,cmts=[];const cmtsScreen=[];let stopEvething=!0;const mainmainbody=$("#main .mainbody"),mainnav=$("#main nav");{const fragcopy=$createFrag();for(const childElement of main.children)fragcopy.appendChild(childElement.cloneNode(!0));if(copy.appendChild(fragcopy),"#everything"==window.location.hash){const el=$("#main .everything");el&&mainmainbody.scrollTo({top:el.offsetTop-mainnav.clientHeight,left:0,behavior:"smooth"})}}function reSetup(){const newscreenlength=reMsrY(innerHeight);if(newscreenlength!==screenlength){screenlength=newscreenlength;const fragcmt=$createFrag();cmts.forEach((cmt=>{cmt.remove()})),cmts=Array.from({length:screenlength},((v,k)=>{const cmt=$createcomment(window.canvasData[k]?window.canvasData[k].join(""):"");return fragcmt.append(cmt),cmt})),html.before(fragcmt)}}function scrollToTop(){mainmainbody.scrollTo({top:0,left:0,behavior:"smooth"})}const realh=$("#copy .realheight"),realhmain=$("main .realheight"),nav=$("#copy nav .bg-layer"),navTxt=[...$$("#copy nav .txt-layer")],allBg2=[...$$("#copy .mainbody .bg-layer"),...$$("#copy .mainbody .cp-layer > *:not(figure)"),...$$("#copy .mainbody .cp-layer img"),...$$("#copy .odd-layer > :nth-child(even)")],imgHolder=$("#copy .imgholder"),imgHolderMain=$("#main .imgholder"),allImgHomeMain=$$("#main .mainbody .imgwrapper"),allImgWrapper=[...$$("#copy .mainbody .imgwrapper")],allImgHome=Array.from(allImgWrapper,((el,k)=>{const idc=el.nextElementSibling.querySelector(".indicator");return{el:el,group:[...el.querySelectorAll("img")],lbtn:el.nextElementSibling.querySelector(".lbtn svg"),rbtn:el.nextElementSibling.querySelector(".rbtn svg"),idc:idc,hoverlayer:allImgHomeMain[k].nextElementSibling.querySelector(".hover-layer"),hoverchild:el.nextElementSibling.querySelector(".hover-child"),idcascii:idc&&Array(idc.childElementCount).fill([char.idc," "]).flat().join("")}})),allImg=[...$$("#copy .mainbody img")],allImgMain=[...$$("#main .mainbody img")],allTxt=[...$$("#copy .mainbody .txt-layer"),...$$("#copy .mainbody .txtp-layer > *:not(figure)")],allDivider=[...$$("#copy .divider")],storySection={img:[...$$("#copy .storysection .imgwrapper img")],bg:$("#copy .storysection .bg-layer"),txt:[...$$("#copy .storysection .txt-layer")]},inputNoteMain=$("#main #input_note"),inputNote=$("#copy #input_note"),notebookHolder=$("#copy .notebookholder"),inputResponsive=$("#main #input_responsive"),allHorizontalLine=[...$$("#copy .mainbody .horizontal-line")],isDeveloper=isPage("page-developer"),isDesigner=isPage("page-designer"),isHome=!inputNote&&(isPage("home")||isPage("archive")||isDeveloper||isDesigner);let notebookData=null;if((isDesQ||isDevQ||isDeveloper||isDesigner||isPage("page-story"))&&($$("#main a.homelink").forEach((el=>{el.href=el.href+"story"})),$$("#main a").forEach((el=>{const url=new URL(el.href);url.searchParams.has("story")||(isDesigner?url.searchParams.append("story","designer"):isDeveloper?url.searchParams.append("story","developer"):isDesQ?url.searchParams.append("story","designer"):isDevQ&&url.searchParams.append("story","developer"),el.href=url.toString())})),isPage("page-story")||isPage("page-info")||html.classList.add(isDesigner?"color1":isDeveloper?"color2":isDesQ?"color1":isDevQ?"color2":"")),isHome){let slide=function(i,cur,curnow,length){cur.value!==curnow&&(imgsecs[i].setAttribute("isfirst",1==curnow),imgsecs[i].setAttribute("islast",curnow==length),indicators[i][cur.value-1].classList.add("opacity-50"),indicators[i][curnow-1].classList.remove("opacity-50"),imgwrappers[i].style.transform=`translateX(-${100*(curnow-1)}%)`,cur.value=curnow)};console.log("home page");const imgwrappers=$$("main .homegrid .imgwrapper");window.imgsecs=$$("main .homegrid .imgsec");const indicators=[];window.curs=[];let currentSlideEls=[];const slideObserver=new IntersectionObserver(((entries,observer)=>{entries.forEach((entry=>{const el=entry.target;entry.isIntersecting?currentSlideEls.includes(el)||(currentSlideEls.push(el),el.isObserved=!0):el.isObserved&&(currentSlideEls=currentSlideEls.filter((slide2=>slide2!==el)),observer.unobserve(el))}))}),{threshold:.3}),intervalId=!window.matchMedia("only screen and (max-width: 768px) and (pointer: coarse)").matches&&setInterval((()=>{if(0==currentSlideEls.length)return;const el=getRandItem(currentSlideEls),length=imgwrappers[el.i].childElementCount;let cur=window.curs[el.i],curnow=cur.value;curnow=curnow>=length?1:curnow+1,window.stopPrev=slideAscii(el.i,curnow-1,cur.value-1,500),slide(el.i,cur,curnow,length)}),3e3);imgsecs.forEach(((el,i)=>{const imgwrapper=undefined,length=imgwrappers[i].childElementCount;indicators.push(imgsecs[i].querySelectorAll(".indicator li")),curs.push({value:1});let cur=curs[i];el.i=i,length>1&&slideObserver.observe(imgsecs[i]),el.addEventListener("click",(function({target:target}){let curnow=cur.value;target.closest(".lbtn")?curnow=curnow<=1?1:curnow-1:target.closest(".rbtn")&&(curnow=curnow>=length?length:curnow+1),window.stopPrev=slideAscii(i,curnow-1,cur.value-1,500),slide(i,cur,curnow,length),currentSlideEls=currentSlideEls.filter((slide2=>slide2!==el))}))}))}else if(isWork){console.log("single-work page");const imgcopyarr=[];{const frag=$createFrag();for(const img of allImg){const div=$create("div"),imgcopy=img.cloneNode(!0);imgcopyarr.push(imgcopy),div.appendChild(imgcopy),frag.appendChild(div)}imgHolder.appendChild(frag)}{let toggle=function(curImgHolder,curImgHolderChild,key){curImgHolderChild&&(curchild=curImgHolderChild),imgHolderMain.classList[curImgHolder?"add":"remove"]("open"),curchild.style.visibility=curImgHolder?"visible":"hidden",curchild.originsrc??(curImgHolder&&(curchild.originsrc=curchild.src=curchild.getAttribute("data-src")||curchild.src)),window.curImgHolder=curImgHolder,stopEvething||(drawImgHolderFixed(curImgHolder?3:null,key),cmtRenderScreen())};const frag=$createFrag();let curchild=null;imgHolderMain.onclick=()=>{toggle(null,null)};for(const i in allImgMain){const img=allImgMain[i],div=$create("div"),imgcopy=img.cloneNode(!0);img.copy=imgcopyarr[i];const formattedKey=`${cacheKey.imgH.name}-${i}`;cacheKey.imgH.allkeys.push(formattedKey),img.onclick=()=>{toggle(img.copy,imgcopy,formattedKey)},div.appendChild(imgcopy),frag.appendChild(div)}imgHolderMain.appendChild(frag)}}else if(inputNote){notebookData=fetchNoteBook(),window.history.replaceState&&window.history.replaceState(null,null,window.location.href);const btn=$('#main [type="submit"]'),btncopy=$('#copy [type="submit"]'),form=[...$$("form")];sessionStorage.getItem("submit")?(form.forEach((el=>el.classList.add("disabled"))),btn.disabled||(btn.value=btncopy.value="you already sent!\nthanks a lot!\n\n(you can find the message inside devtool with the respective screensize at the time it is sent!)"),btn.disabled=inputNoteMain.disabled=!0):(inputNoteMain.parentElement.onsubmit=()=>{form.forEach((el=>el.classList.add("disabled"))),btn.value=btncopy.value="sending...",sessionStorage.setItem("submit","true"),sessionStorage.removeItem("jsonData"),cmtRenderScreen()},inputNoteMain.oninput=()=>{inputNote.value=inputNoteMain.value,stopEvething||(drawFewRect(window.canvasData,[inputNote],inputNote.rectData&&[inputNote.rectData],void 0,void 0,{fxl:-1}),drawTxt(window.canvasData,[inputNote],!0,!0),cmtRenderScreen())})}let allNotes=[];function drawNotes(){drawFewRect(window.fixedLayer,allNotes,void 0,char.note,void 0,{rx_:1}),drawTxt(window.fixedLayer,allNotes)}function setEvent(el,on,fn){fn?!el[on]&&(el[on]=fn):el[on]&&(el[on]=null)}function mouseMove(e){if(stopEvething)return;const mouseChange=calcMousePos(e);if(!mouseChange||null==window.scrollTop)return;const{mouseY:ogY,mouseX:ogX}=mouseChange;if(null!=ogY){const char2=undefined;replaceChar((()=>{var _a,_b,_c;let intensity=0;const fixedArr=null==(_a=window.fixedLayer)?void 0:_a[ogY];if(null==fixedArr?void 0:fixedArr[ogX]){if(!fixedArr[ogX].intensity)return null==fixedArr?void 0:fixedArr[ogX];intensity=fixedArr[ogX].intensity}const absArr=null==(_b=window.absoluteLayer)?void 0:_b[ogY+scrollTop];if(null==absArr?void 0:absArr[ogX])return filterGrayRamp(absArr[ogX],intensity);const staticArr=null==(_c=canvasData[ogY+scrollTop])?void 0:_c[ogX];return staticArr?filterGrayRamp(staticArr,intensity):""})(),ogX,ogY)}function replaceChar(char2,x,y){var _a;const content=null==(_a=cmts[y])?void 0:_a.nodeValue;content&&x<content.length&&(cmts[y].nodeValue=`${content.slice(0,x)}${char2}${content.slice(x+1)}`)}replaceChar(char.mouse,window.mouseX,window.mouseY)}function scrollResponsive(){if(!stopEvething){calcScrollTop();for(const i in lazyList)lazyList[i]();cmtRenderScreen()}}function mouseEnter(i){var _a;if(!(null==(_a=window.imgsecs)?void 0:_a[i])||stopEvething)return;const{hoverchild:hoverchild,hoverrect:hoverrect}=window.imgsecs[i];window.imgsecs[i].isHover=!0,drawFewRect(window.absoluteLayer,[hoverchild],[hoverrect]),drawTxt(window.absoluteLayer,[hoverchild]),cmtRenderScreen()}function mouseLeave(i){var _a;if(!(null==(_a=window.imgsecs)?void 0:_a[i]))return;const{hoverchild:hoverchild,hoverrect:hoverrect}=window.imgsecs[i];window.imgsecs[i].isHover=!1,drawFewRect(window.absoluteLayer,[hoverchild],[hoverrect],null),cmtRenderScreen()}function drawImgHolderFixed(intensity=3,key,isFinal=!0){const vl=intensity?{intensity:3}:null;window.fixedLayer=Array.from({length:screenlength},(()=>Array.from({length:window.fixedLayer[0].length},(()=>vl)))),drawNav(intensity,isFinal),intensity&&(window.imgHolder=drawImg(window.fixedLayer,[window.curImgHolder],str2CanvasArrNoMask.bind({isOL:!0}),!1,key,isFinal))}function stopSlideAscii(){window.stopPrev&&window.stopPrev()}function slideAscii(i,curnow,curprev,time){stopSlideAscii();let stop=!1;if(!imgsecs[i].ascii||stop||curnow==curprev||!imgsecs[i].ascii.arr||stopEvething)return;const delay_=100;let{top:top,topbot:topbot,left:left,leftright:leftright,arr:arr,baseW:baseW}=imgsecs[i].ascii;const lim=time/100;let count=1;async function animation(now){var _a;const percentage=Math.round(mapRange(count,0,lim,curprev,curnow,easeInOut)*baseW);for(let y=top;y<=topbot;y++)for(let x=left;x<=leftright;x++){let newchar=null==(_a=canvasData[y])?void 0:_a[x];const str=arr.ascii[x-left+percentage+(y-top)*arr.w];newchar!==char.bg&&newchar&&" "!==str&&(newchar=str),canvasData[y][x]=newchar}cmtRenderScreen(),count++,await wait(100),!stop&&imgsecs[i].ascii&&count<=lim&&(myrequest=requestAnimationFrame(animation))}return requestAnimationFrame(animation),()=>{stop=!0}}function mapRange(value,inMin,inMax,outMin,outMax,easingFunction=(v=>v)){let normalizedValue,easedValue;return easingFunction((value-inMin)/(inMax-inMin))*(outMax-outMin)+outMin}function easeInOut(t){return t<.5?4*t*t*t:(4-2*t)*t-1}function manualResponsive(el){const{clientWidth:w}=el;el.className=`${w>1536?"xxl":""} ${w>1280?"xl":""} ${w>1024?"lg":""} ${w>768?"md":""} ${w>640?"sm":""}`}function getNoteResponsiveClass(w){return w>1280?"xl":w>1024?"lg":w>768?"md":w>640?"sm":"ssm"}function duoResponsive(isFinal=!0){stopEvething=!0,lazyList={},lazyQ=[],lazyQCur=-1,lazyQBlock=!1,stopSlideAscii(),inputResponsive&&(inputResponsive.value=innerWidth);const width=Math.max(outerWidth-innerWidth-100,0);if(width<widthLimit)return window.canvasData=Array.from({length:screenlength},(()=>"This-is-too-small".split(""))),window.fixedLayer=Array.from({length:screenlength},(()=>Array.from({length:17},(()=>null)))),cmtRenderScreen(),setEvent(mainbody,"onscroll",null),setEvent(document,"onmousemove",null),void allImgHome.forEach((({hoverlayer:hoverlayer})=>{hoverlayer&&(setEvent(hoverlayer,"onmouseenter",null),setEvent(hoverlayer,"onmouseleave",null))}));isFinal&&console.log("responsive rerender"),copy.style.width=`${width}px`,manualResponsive(copy);const canvas={w:reMsrX(width),h:reMsrY(realh.clientHeight)};window.canvasData=Array.from({length:canvas.h},(()=>Array.from({length:canvas.w},(()=>char.bg)))),reSetup(),window.absoluteLayer=Array.from({length:canvas.h},(()=>Array.from({length:canvas.w},(()=>char.trans)))),window.fixedLayer=Array.from({length:screenlength},(()=>Array.from({length:canvas.w},(()=>char.trans)))),window.hoverLayer=Array.from({length:canvas.h},(()=>Array.from({length:canvas.w},(()=>char.trans)))),calcScrollTop(),drawFewRect(window.canvasData,allBg2,null,char.bg2,isFinal),drawFewRect(window.canvasData,allDivider,null,char.divider,isFinal,{rx_:0,ry_:0}),inputNote&&drawFewRect(window.canvasData,allHorizontalLine,null,char.hL,isFinal,{rx_:0,ry_:0,fy:1}),isFinal?isHome?drawImgHome(window.canvasData,allImgHome):drawImg(window.canvasData,allImg,str2CanvasArr.bind({isOL:!0}),!0):drawFewRect(window.canvasData,isHome?allImgWrapper:allImg,null,char.mouse,isFinal),drawTxt(window.canvasData,allTxt,isFinal),inputNote&&(inputNote.openData=void 0,inputNote.rectData=void 0),inputNote&&drawTxt(window.canvasData,[inputNote],!0,!0),isFinal&&cacheKey.imgH.allkeys.forEach((key=>{deleteCache(key)})),isFinal&&deleteCache(cacheKey.storyS.name),window.curImgHolder?drawImgHolderFixed(3,null,isFinal):drawNav(null,isFinal),inputNote&&drawNotes(),cmtRenderScreen(),isFinal&&setEvent(mainbody,"onscroll",scrollResponsive),isFinal&&setEvent(document,"onmousemove",mouseMove),isFinal&&allImgHome.forEach((({hoverlayer:hoverlayer},i)=>{hoverlayer&&(setEvent(hoverlayer,"onmouseenter",(()=>mouseEnter(i))),setEvent(hoverlayer,"onmouseleave",(()=>mouseLeave(i))))})),isFinal&&(stopEvething=!1)}function drawNav(intensity=null,isFinal=!0){if(drawFewRect(window.fixedLayer,[nav]),drawTxt(window.fixedLayer,navTxt),storySection.bg){const charbg=filterGrayRamp(char.bg2,intensity);drawFewRect(window.fixedLayer,[storySection.bg],null,charbg,isFinal),drawTxt(window.fixedLayer,storySection.txt);const{display:display}=getComputedStyle(storySection.img[0].parentElement);"none"!=display&&drawImg(window.fixedLayer,storySection.img,str2CanvasArr.bind({isOL:!1,intensityF:intensity,charbg:charbg}),!1,cacheKey.storyS.name,isFinal)}}function getRect(el){const obj=el.getBoundingClientRect(),output={top:reMsrY(obj.top),left:reMsrX(obj.left),ogheight:reMsrY(obj.height),ogwidth:reMsrX(obj.width)};return output.topbot=output.top+output.ogheight,output.leftright=output.left+output.ogwidth,output.width=output.ogwidth+1,output.height=output.ogheight+1,output}function cmtRender(cmtContents){const cmtsNew=[],frag=$createFrag(),length=cmts.length>cmtContents.length?cmts.length:cmtContents.length;for(let i=0;i<length;i++){const cmtContent=cmtContents[i],isWithinScroll=i>scrollTop;if(cmts[i]&&cmtContent)cmts[i].nodeValue=cmtContent.join(""),cmtsNew.push(cmts[i]),isWithinScroll||cmts[i].remove();else if(cmtContent){const cmtNew=$createcomment(cmtContent.join(""));isWithinScroll&&frag.append(cmtNew),cmtsNew.push(cmtNew)}else cmts[i]&&cmts[i].remove()}html.before(frag),cmts=cmtsNew}function cmtRenderScreen(){var _a,_b,_c;if(null!=window.scrollTop)for(let y=0;y<screenlength;y++){const fixedArr=null==(_a=window.fixedLayer)?void 0:_a[y],absArr=null==(_b=window.absoluteLayer)?void 0:_b[y+scrollTop],canvasArr=(null==(_c=canvasData[y+scrollTop])?void 0:_c.map(((v,x)=>{let intensity=0;if(null==fixedArr?void 0:fixedArr[x]){if(!fixedArr[x].intensity)return null==fixedArr?void 0:fixedArr[x];intensity=fixedArr[x].intensity}return(null==absArr?void 0:absArr[x])?filterGrayRamp(absArr[x],intensity):filterGrayRamp(v,intensity)})).join(""))||"";cmts[y].nodeValue=canvasArr}}function filterGrayRamp(char2,intensity){if(null==grayRampObj[char2]||!intensity)return char2;let index=grayRampObj[char2]-intensity;return grayRamp[index]||grayRamp[0]}function drawFewRect(data,allRect,rectArr,rectchar=char.bg2,isFinal=!0,{rx_:rx_=rx,ry_:ry_=ry,fy:fy=0,fxl:fxl=0,fxr:fxr=0}={}){rectArr||(rectArr=allRect.map((el=>(el.rectData=getRect(el),el.rectData))));for(let i=0;i<rectArr.length;i++){let{leftright:leftright,topbot:topbot,left:left,top:top}=rectArr[i];if(topbot+=fy,top+=fy,left+=fxl,leftright+=fxr,!(isLazy(!isFinal,top,topbot)||0==top&&0==topbot))for(let y=top;y<=topbot;y++){const line=data[y];for(let x=left;x<=leftright;x++)checkRoundedRect(x,y,top,topbot,left,leftright,rx_,ry_)&&line&&(line[x]=rectchar)}}}function checkRoundedRect(x,y,top,topbot,left,leftright,rx2,ry2){return y>=top&&y<=topbot&&x>=left+rx2&&x<=leftright-rx2||y>=top+ry2&&y<=topbot-ry2&&x>=left&&x<=leftright}function reMsrX(num){return Math.floor(num/scaleX)}function reMsrY(num){return Math.floor(num/scaleY)}function drawImg(data,allImg2,canvas2CanvasFunc=str2CanvasArr,lazyLoad=!1,cacheKey2=null,isFinal=!0){let returnobj;if(isFinal){for(let i=0;i<allImg2.length;i++){const img=allImg2[i],{leftright:leftright,topbot:topbot,left:left,top:top,width:width,height:height}=getRect(img),lazyKey=`${i}${leftright+topbot+left+top}${Math.random().toString(16).slice(2)}`;lazyList[lazyKey]=async(byPassCond=!1)=>{if(LazyDrawImgOpen(byPassCond,lazyLoad,top,topbot,lazyKey))return;let objectFit,isCover,containObj,ascii,cwidth;if(hasCache(cacheKey2))({objectFit:objectFit,isCover:isCover,containObj:containObj,ascii:ascii,cwidth:cwidth}=getCache(cacheKey2));else{({objectFit:objectFit}=getComputedStyle(img)),isCover="cover"==objectFit,ctx.clearRect(0,0,imgcanvas.width,imgcanvas.height),imgcanvas.width=cwidth=width,imgcanvas.height=height,ctx.imageSmoothingEnabled=!1,containObj=await image2Canvas(img,width,height,0,isCover);const grayScales=undefined;ascii=drawAscii(convertToGrayScales(ctx,imgcanvas.width,imgcanvas.height),imgcanvas.width),setCache(cacheKey2,{objectFit:objectFit,isCover:isCover,containObj:containObj,ascii:ascii,cwidth:cwidth})}canvas2CanvasFunc(cwidth,top,topbot,left,leftright,data,ascii,0,0,isCover?0:containObj.top,isCover?0:containObj.left),returnobj={top:top,topbot:topbot,left:left,leftright:leftright,maskTop:isCover?0:containObj.top,maskLeft:isCover?0:containObj.left},lazyLoad&&console.log("lazyload image successful"),LazyDrawImgClose()},lazyList[lazyKey]()}return returnobj}drawFewRect(data,allImg2,null,char.mouse)}function drawImgHome(data,allImg2){if(0==allImg2.length)return;const{top:top,left:left,topbot:topbot,leftright:leftright,width:width,height:height}=getRect(allImg2[0].el);if(width<4||height<4)return;const base={h:height,w:width};for(let igroup=0;igroup<allImg2.length;igroup++){imgsecs[igroup].ascii={};const{group:group,el:el,lbtn:lbtn,rbtn:rbtn,idcascii:idcascii,idc:idc,hoverlayer:hoverlayer,hoverchild:hoverchild}=allImg2[igroup],{top:top2,left:left2,topbot:topbot2,leftright:leftright2,width:width2,height:height2}=getRect(el),lazyKey=`${igroup}${leftright2+topbot2+left2+top2}${Math.random().toString(16).slice(2)}`;lazyList[lazyKey]=async(byPassCond=!1)=>{if(LazyDrawImgOpen(byPassCond,!0,top2,topbot2,lazyKey))return;ctx.clearRect(0,0,imgcanvas.width,imgcanvas.height),imgcanvas.width=base.w*group.length,imgcanvas.height=base.h,ctx.imageSmoothingEnabled=!1;for(let iimg=0;iimg<group.length;iimg++){const img=group[iimg],{objectFit:objectFit}=getComputedStyle(img);await image2Canvas(img,base.w,base.h,base.w*iimg,"cover"==objectFit)}const grayScales=undefined,ascii=drawAscii(convertToGrayScales(ctx,imgcanvas.width,imgcanvas.height),imgcanvas.width);str2CanvasArr(imgcanvas.width,top2,topbot2,left2,leftright2,data,ascii,(curs[igroup].value-1)*base.w),imgsecs[igroup].ascii.arr={ascii:ascii,w:imgcanvas.width},console.log("lazyload image successful"),LazyDrawImgClose()},lazyList[lazyKey](),drawAbs(lbtn,char.lbtn.str,char.lbtn.w,char.lbtn.h),drawAbs(rbtn,char.rbtn.str,char.rbtn.w,char.rbtn.h),drawAbs(idc,idcascii,idcascii.length,1);const hoverrect=getRect(hoverchild);imgsecs[igroup].isHover&&drawFewRect(window.absoluteLayer,[hoverchild],[hoverrect]),imgsecs[igroup].isHover&&drawTxt(window.absoluteLayer,[hoverchild]),imgsecs[igroup].hoverrect=hoverrect,imgsecs[igroup].hoverchild=hoverchild,imgsecs[igroup].ascii={top:top2,topbot:topbot2,left:left2,leftright:leftright2,baseW:base.w,...imgsecs[igroup].ascii}}}function drawAbs(btn,ascii,w,h){const{top:top,left:left}=getRect(btn);str2CanvasArrNoMask(w,top,top+h-1,left,left+w-1,window.absoluteLayer,ascii)}function convertToGrayScales(context,width,height){const imageData=context.getImageData(0,0,width,height),contrast=1.2,intercept=128*(1-1.2),grayScales=[];for(let i=0;i<imageData.data.length;i+=4){const r=undefined,g=undefined,b=undefined,grayScale=toGrayScale(1.2*imageData.data[i]+intercept,1.2*imageData.data[i+1]+intercept,1.2*imageData.data[i+2]+intercept);imageData.data[i]=imageData.data[i+1]=imageData.data[i+2]=grayScale,grayScales.push(grayScale)}return grayScales}function toGrayScale(r,g,b){const v=.21*r+.72*g+.07*b;return v<0?0:v>255?255:v}function drawAscii(grayScales,width){let str="";for(let i=0;i<grayScales.length;i++)str+=getCharacterForGrayScale(grayScales[i]);return str}function getCharacterForGrayScale(grayScale){return grayRamp[Math.ceil((rampLength-1)*grayScale/255)]}function drawTxtOpen(txt,isFinal,isInput){if(isInput&&txt.openData)return txt.openData.arrcontent=[`${txt.value}`],!1;let{top:top,left:left,ogwidth:ogwidth,topbot:topbot}=getRect(txt);if(isLazy(!isFinal,top,topbot))return!0;let{display:display,textAlign:textAlign,paddingLeft:pl,paddingRight:pr,paddingTop:pt,paddingBottom:pb}=getComputedStyle(txt);const content=txt.innerText.trim()||txt.value;if("none"==display||!content)return!0;let arrcontent=content.split("\n");if(pl=reMsrX(+pl.slice(0,-2)),pr=reMsrX(+pr.slice(0,-2)),pt=reMsrY(+pt.slice(0,-2)),pb=reMsrY(+pb.slice(0,-2)),top+=pt+1,left+=pl,ogwidth-=pl+pr,ogwidth<1)return!0;txt.openData={top:top,left:left,ogwidth:ogwidth,topbot:topbot,arrcontent:arrcontent,textAlign:textAlign}}function drawTxt(data,allTxt2,isFinal=!0,isInput=!1){var _a;for(let i=0;i<allTxt2.length;i++){const txt=allTxt2[i];if(drawTxtOpen(txt,isFinal,isInput))continue;const{top:top,left:left,ogwidth:ogwidth,topbot:topbot,arrcontent:arrcontent,textAlign:textAlign}=txt.openData;let output=[];if(isInput)output=[arrcontent[0].slice(-ogwidth)];else for(let k=0;k<arrcontent.length;k++){let content=arrcontent[k];for(0==content.length&&output.push("");content.length>0;){let extracted=content.slice(0,ogwidth);if(content=content.slice(ogwidth),content.length>0&&" "!=content[0])for(let i2=extracted.length-1;i2>=0;i2--)if(" "==extracted[i2]){content=extracted.slice(i2)+content,extracted=extracted.slice(0,i2);break}if(extracted=extracted.trim(),content=content.trim(),"center"==textAlign){extracted=`${extracted}${output.length==topbot-top&&content.length>0?"…":""}`;let rest=(ogwidth-extracted.length)/2;rest=rest>0?rest:0,extracted=`${" ".repeat(Math.ceil(rest))}${extracted}${" ".repeat(Math.floor(rest))}`}if(output.push(extracted),output.length>topbot-top)break}}for(let y=top;y<top+output.length;y++){const yo=y-top,line=output[yo];for(let x=left;x<left+line.length;x++)if(data[y]){let char2=(null==(_a=output[yo])?void 0:_a[x-left])||data[y][x];char2=" "==char2?data[y][x]:char2,data[y][x]=char2}}}}function image2Canvas(img,cW,cH,posX=0,isCover=!0){return new Promise((resolve=>{if(img.i2C)resolve(i2Conload(img.i2C,cW,cH,posX,isCover));else{const image=img.i2C=new Image;image.onload=()=>{image.onload=null,resolve(i2Conload(image,cW,cH,posX,isCover))},image.crossOrigin="",image.src=img.getAttribute("data-src")||img.src}}))}function i2Conload(image,cW,cH,posX,isCover){const scaleFactor=Math[isCover?"max":"min"](cW/image.width,cH/(image.height/hratio)),dWidth=image.width*scaleFactor,dHeight=image.height/hratio*scaleFactor,x=cW/2-dWidth/2,y=cH/2-dHeight/2,sx=Math.abs(x/scaleFactor),sy=Math.abs(y/scaleFactor)*hratio,sWidth=image.width,sHeight=image.height;return ctx.fillStyle="#e3e3ca",ctx.fillRect(posX+0,0,cW,cH),isCover?ctx.drawImage(image,sx,sy,sWidth,sHeight,posX+0,0,dWidth,dHeight):ctx.drawImage(image,posX+x,y,dWidth,dHeight),{top:Math.round(y),left:Math.round(posX+x)}}function str2CanvasArr(width,top,topbot,left,leftright,data,str,offsetX=0,offsetY=0){var _a;const intensityF=this.intensityF,charbg=this.charbg??char.bg2;for(let y=top;y<=topbot;y++)for(let x=left;x<=leftright;x++){const newchar=str[x-left+offsetX+(y-top+offsetY)*width];(null==(_a=data[y])?void 0:_a[x])&&data[y][x]==charbg&&" "!==newchar&&(data[y][x]=intensityF?filterGrayRamp(newchar,intensityF):newchar)}addOL(this.isOL,data,top,left,topbot,leftright)}function str2CanvasArrNoMask(width,top,topbot,left,leftright,data,str,offsetX=0,offsetY=0,maskTop=0,maskLeft=0){var _a;topbot-=maskTop,leftright-=maskLeft;const compTop=top+maskTop,compLeft=left+maskLeft;for(let y=compTop;y<=topbot;y++)for(let x=compLeft;x<=leftright;x++){const newchar=str[x-left+(y-top)*width];void 0!==(null==(_a=data[y])?void 0:_a[x])&&" "!==newchar&&(data[y][x]=newchar)}addOL(this.isOL,data,compTop,compLeft,topbot,leftright)}function canvas2CanvasArr(top,topbot,left,leftright,data,ascii,offsetX=0,offsetY=0){var _a,_b;const intensityF=this.intensityF,charbg=this.charbg??char.bg2;for(let y=top;y<=topbot;y++)for(let x=left;x<=leftright;x++){const newchar=null==(_a=ascii[y-top+offsetY])?void 0:_a[x-left+offsetX];(null==(_b=data[y])?void 0:_b[x])&&data[y][x]==charbg&&newchar&&(data[y][x]=intensityF?filterGrayRamp(newchar,intensityF):newchar)}addOL(this.isOL,data,top,left,topbot,leftright)}function canvas2CanvasArrNoMask(top,topbot,left,leftright,data,ascii,offsetX=0,offsetY=0,maskTop=0,maskLeft=0){var _a,_b;topbot-=maskTop,leftright-=maskLeft;const compTop=top+maskTop,compLeft=left+maskLeft;for(let y=compTop;y<=topbot;y++)for(let x=compLeft;x<=leftright;x++){const newchar=null==(_a=ascii[y-top])?void 0:_a[x-left];void 0!==(null==(_b=data[y])?void 0:_b[x])&&newchar&&(data[y][x]=newchar)}addOL(this.isOL,data,compTop,compLeft,topbot,leftright)}function addOL(isOL,data,top,left,topbot,leftright){var _a;if(isOL){for(let y=top+1;y<=topbot-1;y++)void 0!==data[y]&&(null==(_a=data[y])?void 0:_a[left])!=char.bg&&(data[y][left]=data[y][leftright]="║");if(void 0!==data[top]){for(let x=left+1;x<=leftright-1;x++)data[top][x]!=char.bg&&(data[top][x]=data[topbot][x]="═");data[top][left]!=char.bg&&(data[top][left]="╔"),data[top][leftright]!=char.bg&&(data[top][leftright]="╗")}void 0!==data[topbot]&&(data[topbot][left]!=char.bg&&(data[topbot][left]="╚"),data[topbot][leftright]!=char.bg&&(data[topbot][leftright]="╝"))}}function clearRect(top,topbot,left,leftright,data,char2){var _a;for(let y=top;y<=topbot;y++)for(let x=left;x<=leftright;x++)void 0!==(null==(_a=data[y])?void 0:_a[x])&&(data[y][x]=char2)}function calcMousePos(e){const mouseX=Math.floor(e.clientX*copy.clientWidth/main.clientWidth/scaleX),mouseY=Math.floor(e.clientY*copy.clientHeight/main.clientHeight/scaleY);if(window.mouseX==mouseX&&window.mouseY==mouseY)return!1;const obj={mouseX:window.mouseX,mouseY:window.mouseY};return window.mouseX=mouseX,window.mouseY=mouseY,obj}function calcScrollTop(){const actualScroll=Math.floor(mainbody.scrollTop*(realh.clientHeight-innerHeight)/(realhmain.clientHeight-innerHeight)/scaleY)||0,scrollTop2=screenlength>canvasData.length-actualScroll?canvasData.length-screenlength:actualScroll;window.scrollTop=scrollTop2<=0?0:scrollTop2}function isLazy(lazyLoad,top,topbot){return lazyLoad&&(top>=window.scrollTop+screenlength||topbot<=window.scrollTop)}function LazyDrawImgClose(){lazyQBlock=!1,lazyQ[lazyQCur+1]?lazyQ[++lazyQCur](!0):cmtRenderScreen()}function LazyDrawImgOpen(byPassCond,lazyLoad,top,topbot,lazyKey){return!(byPassCond||!isLazy(lazyLoad,top,topbot))||(lazyQBlock?(lazyQ.push(lazyList[lazyKey]),delete lazyList[lazyKey],!0):(lazyQBlock=!0,delete lazyList[lazyKey],!1))}getScrollbarWidth(),window.onload=async()=>{if(duoResponsive(),!inputNote)return;const data=await notebookData,frag=$createFrag();data&&(allNotes=data.map((({value:value,responsive:responsive})=>{const p=$create("p");return p.innerHTML=value,p.className=`${getNoteResponsiveClass(+responsive)} p-3 text-center`,p.style.setProperty("--X",Math.floor(81*Math.random())+"%"),p.style.setProperty("--Y",Math.floor(81*Math.random())+"%"),frag.append(p),p}))),notebookHolder.append(frag),drawNotes(),cmtRenderScreen()},onresize=throttle_debounce((function(isFinal){isFinal&&getScrollbarWidth(),duoResponsive(isFinal)}),100,400);
