const sessionStorageTransfer = (event) => {
  let $event = event;
  if (!$event) {
    $event = window.event;
  } // ie suq
  if (!$event.newValue) return; // do nothing if no value to work with
  if ($event.key === 'getSessionStorage') {
    // another tab asked for the sessionStorage -> send it
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    // the other tab should now have it, so we're done with it.
    localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
  } else if ($event.key === 'sessionStorage' && !sessionStorage.length) {
    // another tab sent data <- get it
    const data = JSON.parse($event.newValue);
    Object.keys(data).forEach((key) => {
      sessionStorage.setItem(key, data[key]);
    });
  } else if ($event.key === 'logout') {
    sessionStorage.clear();
  }
};

// listen for changes to localStorage
if (window.addEventListener) {
  window.addEventListener('storage', sessionStorageTransfer, false);
} else {
  window.addEventListener('onstorage', sessionStorageTransfer);
}

// Ask other tabs for session storage (this is ONLY to trigger 'storage' event)
if (!sessionStorage.length) {
  localStorage.setItem('getSessionStorage', 'true');
  localStorage.removeItem('getSessionStorage');
}
