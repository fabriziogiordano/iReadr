var bookScroll;
//loadBook
window.onload = function (){
  var page = 0,
      lineheight,
      barheight = ( ("standalone" in window.navigator) && window.navigator.standalone ) ? 0 : 40;
      
  lineheight = document.defaultView.getComputedStyle(document.getElementById('book0'),null).getPropertyValue('line-height');
  lineheight = Number(lineheight.replace(/px$/, ''));
    
  var spaceHeight = screen.height - document.getElementById('header').offsetHeight - document.getElementById('footer').offsetHeight - barheight;
  var spaceHeightOriginal = spaceHeight;
  spaceHeight = Math.floor( spaceHeight / lineheight ) * lineheight;
  
  var book = document.getElementById('book0');
  //var bookHeight = book.scrollHeight;
  var bookHeight = book.offsetHeight;
  var num_pages = Math.ceil( bookHeight / spaceHeight );
  var bookFooterHeight = spaceHeight * num_pages - bookHeight + lineheight;
  
  book.style.width = screen.width + "px";
  
  document.getElementById('bookfooter').style.height = bookFooterHeight + "px";
  document.getElementById('book').style.height = screen.height + 50 + "px";
  
  document.getElementById('totpages').innerHTML = num_pages;
  document.getElementById('scroller').style.width = screen.width * num_pages + "px";
  document.getElementById('scroller').style.height = spaceHeight + "px";
  
  for (i=1; i<num_pages; i++) {
    var clone = book.cloneNode(true);
    var page = book.parentNode.appendChild(clone);
    page.id = "book"+i;
    page.style.height = spaceHeight + "px";
    page.style.width = screen.width + "px";
    //page.style.left = screen.width*i + "px";
    // page.style.top = -spaceHeight*i + "px";
    page.scrollTop = i*spaceHeight;
    //alert(i*spaceHeight);
  }
  
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
  
  log.error('lineheight: ' + lineheight);
  
  log.error('screen.height: ' + screen.height);
  log.error('screen.width: ' + screen.width);
  
  log.error('document.height: ' + document.height);
  log.error('document.width: ' + document.width);
  
  log.error('window.height: ' + window.height);
  log.error('window.width: ' + window.width);
  
  log.error('header offsetHeight: '+ document.getElementById('header').offsetHeight);
  log.error('footer offsetHeight: '+ document.getElementById('footer').offsetHeight);
  log.error('num_pages: ' + num_pages);
  log.error('spaceHeightOriginal: ' + spaceHeightOriginal);
  log.error('spaceHeight: ' + spaceHeight);
  log.error('bookHeight: ' + bookHeight);
  log.error('bookHeight2: ' + book.offsetHeight);
  log.error('spaceHeight: ' + spaceHeight);
  log.error('scroller width: ' + document.getElementById('scroller').style.width);
  log.error('scroller height: ' + document.getElementById('scroller').style.height);
  
  // bookScroll.scrollToPage(5, 0, 500);
  
  setTimeout(scrollTo, 0, 0, 1);
};


//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', book, false);