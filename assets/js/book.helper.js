function fonts() {
  var div = document.createElement('div'),
      close,
      link = options.touchIcon ? document.querySelectorAll('head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]') : [],
      sizes, touchIcon = '';

  div.id = 'styles';
  div.style.cssText += 'position:absolute;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);';
  div.style.left = '-9999px';
}

function setbook () {
  if ((/iphone|ipad|android/gi).test(navigator.appVersion)) {
    setTimeout(book, 10);
  }
  else {
    document.getElementById('footer').style.display = "none";
  }
}

function setsize(){
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      if (!a.disabled) var title = a.getAttribute("title");
    }
  }
  
  if (title.indexOf("big") === 0) {
    setstyle(title.substring(3));
  }
  else {
    setstyle("big"+title);
  }
return;
}

function setstyle(style){
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if (a.getAttribute("title") == style) a.disabled = false;
    }
  }
  store.set(bookslug+'-style', style);
}

// window.addEventListener('load', load, false);
window.addEventListener('orientationchange', setOrientation, false);

function setOrientation() {
 var orient = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
}

function slugify(text) {
  text = text.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
  text = text.replace(/-/gi, "_");
  text = text.replace(/\s/gi, "-");
  return text;
}

var log = (function() {
  return {  error : function(msg) { document.getElementById('errorOutput').appendChild(document.createElement('div')).innerHTML = msg } }
})();