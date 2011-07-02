var bookScroll;

function bookCreate() {
  
  if (typeof bookScroll === 'object') bookScroll.destroy();
  if (typeof store.get(bookSlug + '-style') !== 'undefined') setStyle(store.get(bookSlug + '-style'));
  
  /*Set genaral variables*/
  var doc = document,
      isAndroid = (/android/gi).test(navigator.appVersion),
      isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
      isIPad = (/ipad/gi).test(navigator.appVersion),
      density = window.devicePixelRatio;
  
  /*Set genaral elements*/
  var pagenumber = doc.getElementById('page'),
      bookMain = doc.getElementById('book0'),
      bookFooter = doc.getElementById('bookfooter'),
      totPages = doc.getElementById('totpages'),
      scroller = doc.getElementById('scroller'),
      bookmark = doc.getElementById('bookmark'),
      wrapper = doc.getElementById('wrapper'),
      indicator = doc.getElementById('indicator'),
      indicatorimg = doc.getElementById('indicatorimg');
  
  /*Set genaral elements*/
  var sH = (isIDevice) ? screen.height : 510,
      sW = wrapper.offsetWidth,
      barsHeight = (isIDevice) ? (( ("standalone" in window.navigator) && window.navigator.standalone ) ? 0 : 50) : 0
      barsHeight += (isIPad) ? 20 : 0,
      hH = doc.getElementById('header').offsetHeight,
      fH = doc.getElementById('footer').offsetHeight,

      lineHeight = doc.defaultView.getComputedStyle(bookMain,null).getPropertyValue('line-height').replace(/px$/, '') | 0,
      bookHeight = bookMain.scrollHeight, // offsetHeight
      spaceHeight = Math.floor( (sH - hH - fH - barsHeight) / lineHeight ) * lineHeight,
      numPages = Math.ceil( bookHeight / spaceHeight ),
      bookFooterHeight = spaceHeight * numPages - bookHeight + lineHeight,
      debug = false;

  // wrapper.style.width = sW + "px";
  bookMain.style.width = sW + "px";
  bookMain.style.height = spaceHeight + "px";
  bookFooter.style.height = bookFooterHeight + "px";
  totPages.innerHTML = numPages;
  scroller.style.height = spaceHeight + "px";
  scroller.style.width = sW * numPages + "px";
  
  var iW = doc.defaultView.getComputedStyle(indicator,null).getPropertyValue('width').replace(/px$/, '') | 0,
      indicatorstep = iW / numPages;
  
  var bookScroll = new iScroll('wrapper', {
    snap: true,
    momentum: false,
    hScrollbar: false,
    vScrollbar: false,
    onScrollStart: function () {
      //pagenumber.innerHTML = this.dirX;
    },
    onBeforeScrollMove: function() {
      //totPages.innerHTML = this.dirX;
    },
    onScrollEnd: function () {
      pagenumber.innerHTML = this.currPageX + 1;
      store.set(bookSlug + '-page', this.currPageX);
      indicatorimg.style.left = Math.floor(indicatorstep * this.currPageX) + "px";
      window.currPage = this.currPageX;
      
      if (store.get(bookSlug + '-bookmark') === this.currPageX) {
        bookmark.setAttribute("class", "active");
      }
      else {
        bookmark.setAttribute("class", "");
      }
    }
  });
  
  [].slice.apply(document.querySelectorAll('.pages.added')).forEach(function(element){
    element.parentNode.removeChild(element)
  });
  
  for (i = 1; i < numPages; i++) {
    var clone = bookMain.cloneNode(true);
    var page = bookMain.parentNode.appendChild(clone);
    page.id = "book"+i;
    page.className = "pages added";
    page.style.height = spaceHeight + "px";
    page.style.width = sW + "px";
    page.scrollTop = i*spaceHeight;
  }
  
  if (store.get(bookSlug + '-page')) {
    bookScroll.scrollToPage( store.get(bookSlug + '-page') , 0, 1);
  }
  else {
    bookScroll.scrollToPage(0, 0, 1);
  }
  
  setTimeout( function() { window.scrollTo(0,1); }, 200 );
  
  if (debug) {
    var errorOutput = document.createElement('div');
    errorOutput.id = "errorOutput";
    errorOutput.style.display = "block";
    document.getElementById('book').appendChild(errorOutput);
    
    log.error('lineHeight: ' + lineHeight);

    log.error('screen.height: ' + screen.height);
    log.error('screen.width: ' + screen.width);
    
    log.error('window.outerHeight: ' + window.outerHeight);
    log.error('window.innerHeight: ' + window.innerHeight);

    log.error('document.height: ' + document.height);
    log.error('document.width: ' + document.width);

    log.error('window.height: ' + window.height);
    log.error('window.width: ' + window.width);

    log.error('header offsetHeight: '+ document.getElementById('header').offsetHeight);
    log.error('footer offsetHeight: '+ document.getElementById('footer').offsetHeight);
    log.error('numPages: ' + numPages);
    log.error('spaceHeight: ' + spaceHeight);
    log.error('bookHeight: ' + bookHeight);
    log.error('bookHeight2: ' + book.offsetHeight);
    log.error('spaceHeight: ' + spaceHeight);
    log.error('scroller width: ' + document.getElementById('scroller').style.width);
    log.error('scroller height: ' + document.getElementById('scroller').style.height);
  }

};

window.onload = function() {
  bookSlug = slugify( document.getElementById('title').innerHTML );
  
  var bookmark = document.getElementById('bookmark'),
      style = document.getElementById('style'),
      styles = document.getElementById('styles');
  
  setFooter();
  
  bookmark.addEventListener('touchstart', function (e){
    e.preventDefault();
    var bookmarkclass = bookmark.getAttribute("class");
    if (bookmarkclass === 'active') {
      store.set(bookSlug + '-bookmark', '');
      bookmark.setAttribute("class", "");
    }
    else {
      store.set(bookSlug+'-bookmark', window.currPage);
      bookmark.setAttribute("class", "active");
    }
    return false;
  }, false);
  
  style.addEventListener('touchstart', function (e){
    e.preventDefault();
    var styleclass = document.defaultView.getComputedStyle(styles, null).getPropertyValue('display');
    if (styleclass === 'block') {
      styles.style.display = "none";
    }
    else {
      styles.style.display = "block";
    }
    return false;
  }, false);
  
  document.getElementById('aa').addEventListener('touchstart', function (e){
    e.preventDefault();
    setsize();
    bookCreate();
  }, false);
  
  document.getElementById('stylesDefault').addEventListener('touchstart', function (e){
    e.preventDefault();
    setStyle('default');
    bookCreate();
    styles.style.display = "none";
  }, false);
  
  document.getElementById('stylesOld').addEventListener('touchstart', function (e){
    e.preventDefault();
    setStyle('old');
    bookCreate();
    styles.style.display = "none";
  }, false);
  
  document.getElementById('stylesFashion').addEventListener('touchstart', function (e){
    e.preventDefault();
    setStyle('fashion');
    bookCreate();
    styles.style.display = "none";
  }, false);
  
  document.getElementById('stylesAntiqua').addEventListener('touchstart', function (e){
    e.preventDefault();
    setStyle('antiqua');
    bookCreate();
    styles.style.display = "none";
  }, false);

};

//document.getElementsByTagName("link")[1].disabled = false;

/*
var i, a;
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
  if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) {
    a.getAttribute("title");
  }
}

var title = 'ipad';
for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
  if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
    a.disabled = true;
    if (a.getAttribute("title") == title) a.disabled = false;
  }
}
*/




//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

//document.addEventListener('DOMContentLoaded', book, false);

//document.getElementById('prev').addEventListener('touchstart', function(){bookScroll.scrollToPage('prev', 0);return false;}, false);
//document.getElementById('next').addEventListener('touchstart', function(){bookScroll.scrollToPage('next', 0);return false;}, false);

//var cl = document.body.className;
//cl = cl.replace(/portrait|landscape/, orient);
//document.body.className = cl;
//alert(orient);