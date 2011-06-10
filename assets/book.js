window.onload = function(){
  var lineheight = document.defaultView.getComputedStyle(document.getElementById('book0'),null).getPropertyValue('line-height');
  lineheight = Number(lineheight.replace(/px$/, ''));
  
  setTimeout(scrollTo, 0, 0, 1);
  
  var page = 0;
  var move = 0;
  var bar=0;

  if ( ("standalone" in window.navigator) && window.navigator.standalone ) bar=0;
  else bar=40;
  
  // alert(document.getElementById('header').offsetHeight)
  // alert(document.getElementById('nav').offsetHeight)
  var space = screen.height - document.getElementById('header').offsetHeight - document.getElementById('nav').offsetHeight - bar;
  space = Math.floor(space / lineheight) * lineheight;
  
  var book = document.getElementById('book0');
  var book_height = book.scrollHeight;
  //alert(book_height);
  //alert(space);
  
  var num_pages = Math.ceil( book_height / ( space + lineheight ) );
  
  //alert(num_pages);
  
  document.getElementById('totpages').innerHTML = num_pages;
  document.getElementById('scroller').style.width = space + space * num_pages + "px";
  document.getElementById('scroller').style.height = space + "px";
  
  for (i=1; i<num_pages; i++) {
    var clone = book.cloneNode(true);
    var page = book.parentNode.appendChild(clone);
    page.id = "book"+i;
    page.style.height = space + "px";
    page.scrollTop = i*space;
  }
  
  bookScroll = new iScroll('wrapper', {
    snap: true,
    momentum: false,
    hScrollbar: false,
    vScrollbar: false,
    onScrollEnd: function () {
      document.querySelector('#indicator > li.active').className = '';
      document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
      document.getElementById('page').innerHTML = this.currPageX;
    }
  });

  bookScroll.scrollToPage(5, 0, 500);

};