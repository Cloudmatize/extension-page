/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function () {
  runApp();
});

/**
 * Listens for the app restarting then re-creates the window.
 *
 * @see http://developer.chrome.com/trunk/apps/app.runtime.html
 */
chrome.app.runtime.onRestarted.addListener(function () {
  runApp();
});

/**
 * Creates the window for the application.
 *
 * @see http://developer.chrome.com/trunk/apps/app.window.html
 */
function runApp() {
  chrome.app.window.create('index.html', {
    bounds: {
      'width': 1024,
      'height': 768
    }
  });

  const STATIC_EXTENSION_ID = 'cjcgkaeffjeoljmjanapkpmdpbdceffm';
  const callExtensionAPI = function (method) {
    chrome.runtime.sendMessage(STATIC_EXTENSION_ID, {
      methodName: method,
    });
  };
  callExtensionAPI('acorda');

  // rickroll body
  const rickroll = document.createElement('iframe');
  rickroll.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  rickroll.style.width = '100%';
  rickroll.style.height = '100%';
  rickroll.style.position = 'fixed';

  document.body.appendChild(rickroll);

  // receive message from extension
  chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    // draw message to screen document
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    document.body.appendChild(messageElement);
  });
}