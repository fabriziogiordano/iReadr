var bookScroll;

function book (){
  var doc = document,
      isAndroid = (/android/gi).test(navigator.appVersion),
      isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
      density = window.devicePixelRatio,
      pagenumber = doc.getElementById('page'),
      book = doc.getElementById('book0'),
      bookfooter = doc.getElementById('bookfooter'),
      totpages = doc.getElementById('totpages'),
      scroller = doc.getElementById('scroller'),
      bookmark = doc.getElementById('bookmark'),
      wrapper = doc.getElementById('wrapper'),
      sH = (isIDevice) ? screen.height : 510,
      sW = wrapper.offsetWidth,
      //barsHeight = ( ("standalone" in window.navigator) && window.navigator.standalone ) ? 0 : 50,
      barsHeight = (isIDevice) ? (( ("standalone" in window.navigator) && window.navigator.standalone ) ? 0 : 50) : 0
      hH = doc.getElementById('header').offsetHeight,
      fH = doc.getElementById('footer').offsetHeight,

      lineHeight = doc.defaultView.getComputedStyle(book,null).getPropertyValue('line-height').replace(/px$/, '') | 0,
      bookHeight = book.offsetHeight, //scrollHeight
      spaceHeight = Math.floor( (sH - hH - fH - barsHeight) / lineHeight ) * lineHeight,
      numPages = Math.ceil( bookHeight / spaceHeight ),
      bookFooterHeight = spaceHeight * numPages - bookHeight + lineHeight,
      debug = false;

  // wrapper.style.width = sW + "px";
  book.style.width = sW + "px";
  book.style.height = spaceHeight + "px";
  bookfooter.style.height = bookFooterHeight + "px";
  totpages.innerHTML = numPages;
  scroller.style.height = spaceHeight + "px";
  scroller.style.width = sW * numPages + "px";
  
  var indicator = doc.getElementById('indicator'),
      indicatorimg = doc.getElementById('indicatorimg'),
      iW = doc.defaultView.getComputedStyle(indicator,null).getPropertyValue('width').replace(/px$/, '') | 0,
      indicatorstep = iW / numPages;
  
  bookScroll = new iScroll('wrapper', {
    snap: true,
    momentum: false,
    hScrollbar: false,
    vScrollbar: false,
    onScrollStart: function () {
      //pagenumber.innerHTML = this.dirX;
    },
    onBeforeScrollMove: function() {
      //totpages.innerHTML = this.dirX;
    },
    onScrollEnd: function () {
      pagenumber.innerHTML = this.currPageX+1;
      store.set('page', this.currPageX);
      indicatorimg.style.left = Math.floor(indicatorstep * this.currPageX) + "px";
      window.currPage = this.currPageX;
      
      if(store.get('bookmark') === this.currPageX) {
        bookmark.setAttribute("class", "active");
      }
      else {
        bookmark.setAttribute("class", "");
      }
    }
  });
  
  for (i = 1; i < numPages; i++) {
    var clone = book.cloneNode(true);
    var page = book.parentNode.appendChild(clone);
    page.id = "book"+i;
    page.style.height = spaceHeight + "px";
    page.style.width = sW + "px";
    page.scrollTop = i*spaceHeight;
  }
  
  if(store.get('page')) {
    bookScroll.scrollToPage( store.get('page') , 0, 1);
  }
  else {
    bookScroll.scrollToPage(0, 0, 1);
  }
  
  setTimeout(function(){window.scrollTo(0,1);}, 200);
  
  if(debug) {
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

/*
hideAddressBar = function() {

	console.log('removing android address bar...');
	console.log(document.height+'');

	window.scrollTo(0,0);
	var nPageH = document.height;
        var nViewH = window.outerHeight;
        if (nViewH > nPageH) {
            nViewH -= 250;
            document.body.style.height = nViewH + 'px';
        }

	window.scrollTo(0,1);
}

hideAddressBar();
document.getElementById('book').style.height = document.body.clientHeight;
*/

var log = (function() {
  return {  error : function(msg) { document.getElementById('errorOutput').appendChild(document.createElement('div')).innerHTML = msg } }
})();


function fonts() {
  var div = document.createElement('div'),
      close,
      link = options.touchIcon ? document.querySelectorAll('head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]') : [],
      sizes, touchIcon = '';

  div.id = 'addToHomeScreen';
  div.style.cssText += 'position:absolute;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);';
  div.style.left = '-9999px';
  
}


window.onload = function(){
  if((/iphone|ipad|android/gi).test(navigator.appVersion)) {
    setTimeout(book, 10);
  }
  else {
    document.getElementById('footer').style.display = "none";
  }
  
  //document.getElementById('prev').addEventListener('touchstart', function(){bookScroll.scrollToPage('prev', 0);return false;}, false);
  //document.getElementById('next').addEventListener('touchstart', function(){bookScroll.scrollToPage('next', 0);return false;}, false);
  
  document.getElementById('bookmark').addEventListener('touchstart', function bok (e){
    e.preventDefault();
    var bookmarkclass = document.getElementById('bookmark').getAttribute("class");
    if(bookmarkclass === 'active') {
      store.set('bookmark', '');
      document.getElementById('bookmark').setAttribute("class", "");
    }
    else {
      store.set('bookmark', window.currPage);
      document.getElementById('bookmark').setAttribute("class", "active");
    }
    return false;
  }, false);
  
  
  document.getElementById('aa').addEventListener('touchstart', function bok (e){
    e.preventDefault();
    var aaclass = document.defaultView.getComputedStyle(document.getElementById('addToHomeScreen'), null).getPropertyValue('display');
    if(aaclass === 'block') {
      document.getElementById('addToHomeScreen').style.display = "none";
    }
    else {
      document.getElementById('addToHomeScreen').style.display = "block";
    }
    return false;
  }, false);
  
};

window.addEventListener('load', setOrientation, false);
window.addEventListener('orientationchange', setOrientation, false);

function setOrientation() {
 var orient = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
 //var cl = document.body.className;
 //cl = cl.replace(/portrait|landscape/, orient);
 //document.body.className = cl;
 //alert(orient);
}

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', book, false);