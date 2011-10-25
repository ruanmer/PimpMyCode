var thunderReady = function(callback) {
  var callbackId = Math.floor(Math.random() * 100000);
  var loadedCallbacks = [];

   function callbackOnce() {
    if (loadedCallbacks.indexOf(callbackId) >= 0) {
      return;
    }
    loadedCallbacks.push(callbackId);
    callback();
  }

  if (document.readyState === "complete") {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    return setTimeout(callbackOnce, 1);
  }

  // Mozilla, Opera and webkit nightlies currently support this event
  if (document.addEventListener) {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", callbackOnce, false);

    // A fallback to window.onload, that will always work
    window.addEventListener("load", callbackOnce, false);

    // If IE event model is used
  } else if (document.attachEvent) {
    // ensure firing before onload,
    // maybe late but safe also for iframes
    document.attachEvent("onreadystatechange", callbackOnce);

    window.attachEvent("onload", callbackOnce);
  }

};

thunderReady(function() {
  var cm_editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    theme: 'night'
  });

  var pimpForm = document.getElementById('pimpForm');
  var pimped = document.getElementById('pimped');
  var pimpedClose = pimped.getElementsByClassName('close')[0];

  pimpForm.onsubmit = function() {
    pimped.style.display = 'block';
  };

  var closePimped = function(ev) {
    pimped.style.display = 'none';
    ev.preventDefault && ev.preventDefault();
    return false;
  };

  if (pimpedClose.addEventListener) {
    pimpedClose.addEventListener('click',closePimped);
  } else if (pimpedClose.attachEvent) {
    pimpedClose.attachEvent('click',closePimped);
  }

});


// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-26406401-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
