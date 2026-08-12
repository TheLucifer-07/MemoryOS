let mapsPromise;

export function loadGoogleMaps(apiKey) {
  if (!apiKey) {
    return Promise.reject(new Error('Google Maps is not configured.'));
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const callbackName = `memoryosMapsReady_${Date.now()}`;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&callback=${callbackName}`;
    script.async = true;
    script.defer = true;

    window[callbackName] = () => {
      delete window[callbackName];
      resolve(window.google.maps);
    };

    script.onerror = () => {
      delete window[callbackName];
      mapsPromise = null;
      reject(new Error('Google Maps could not be loaded.'));
    };

    document.head.appendChild(script);
  });

  return mapsPromise;
}
