var thunderReady = __ready__ = function(callback) {
  var callbackId = Math.floor(Math.random() * 100000);
  var loadedCallbacks = [];
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

    window.attachEvent("onload", callbackOnce)
  }

  function callbackOnce() {
    if (loadedCallbacks.indexOf(callbackId) >= 0) {
      return;
    }

    callback();

    loadedCallbacks.push(callbackId);
  }
};

thunderReady(function() {
  var cm_editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    theme: 'night'
  });
});