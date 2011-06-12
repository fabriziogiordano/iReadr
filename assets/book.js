var bookScroll;

function scr () {
  document.getElementById('book').style.height = screen.width + 100 + "px";
  window.scrollTo(0,1);
}

function book (){
  var page = 0,
      doc = document,
      sH = screen.height,
      sW = screen.width,
      barHeight = ( ("standalone" in window.navigator) && window.navigator.standalone ) ? 0 : 40,
      hH = doc.getElementById('header').offsetHeight,
      fH = doc.getElementById('footer').offsetHeight,
      book = doc.getElementById('book0'),
      bookfooter = doc.getElementById('bookfooter'),
      totpages = doc.getElementById('totpages'),
      scroller = doc.getElementById('scroller'),
      lineHeight = doc.defaultView.getComputedStyle(book,null).getPropertyValue('line-height').replace(/px$/, '') | 0,
      bookHeight = book.offsetHeight, //scrollHeight
      spaceHeight = Math.floor( (sH - hH - fH - barHeight) / lineHeight ) * lineHeight,
      numPages = Math.ceil( bookHeight / spaceHeight ),
      bookFooterHeight = spaceHeight * numPages - bookHeight + lineHeight,
      debug = false;
  
  book.style.width = sW + "px";
  book.style.height = spaceHeight + "px";
  bookfooter.style.height = bookFooterHeight + "px";
  totpages.innerHTML = numPages;
  scroller.style.height = spaceHeight + "px";
  scroller.style.width = sW * numPages + "px";
  
  for (i = 1; i < numPages; i++) {
    var clone = book.cloneNode(true);
    var page = book.parentNode.appendChild(clone);
    page.id = "book"+i;
    page.style.height = spaceHeight + "px";
    page.style.width = sW + "px";
    page.scrollTop = i*spaceHeight;
  }
  
  /*
  var clone = book.cloneNode(true),
      frag = document.createDocumentFragment(),
      el;

  for (i=1; i<numPages; i++) {
    page = clone;
    page.id = "book"+i;
    page.style.height = spaceHeight + "px";
    page.style.width = sW + "px";
    page.scrollTop = i*spaceHeight;
    frag.appendChild(page); // better!
  }

  book.parentNode.appendChild(frag);
  
  */
  
  bookScroll = new iScroll('wrapper', {
    snap: true,
    momentum: false,
    hScrollbar: false,
    vScrollbar: false,
    onScrollStart: function () {
      
    },
    onScrollEnd: function () {
      document.getElementById('page').innerHTML = this.currPageX+1;
    }
  });
  
  doc.getElementById('header').style.visibility = "visible";
  doc.getElementById('footer').style.visibility = "visible";
  
  
  if(debug) {
    log.error('lineHeight: ' + lineHeight);

    log.error('screen.height: ' + screen.height);
    log.error('screen.width: ' + screen.width);

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
  
  // bookScroll.scrollToPage(5, 0, 500);

};

window.onload = function(){
  setTimeout(scr, 100);
  setTimeout(book, 1000);
}; 

//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', book, false);