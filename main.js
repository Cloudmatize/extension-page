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



  chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
    if (request.methodName == 'acorda') {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { methodName: 'acorda' }, function (response) {
          sendResponse(response);
        });
      });
    }
  });
}