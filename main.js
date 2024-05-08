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



  // chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse) {
  //   if (request.methodName == 'acorda') {
  //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //       chrome.tabs.sendMessage(tabs[0].id, { methodName: 'teste' }, function (response) {
  //         sendResponse(response);
  //       });
  //     });
  //   }
  // });

  // faça uma interação na tela
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { resposta: 'minhaResposta', maisDados: 'outrosDados' }, function (response) {
      console.log(response)
    });
  });

  navigator.serviceWorker.addEventListener('message', event => {
    // Manipular a mensagem recebida
    event.source.postMessage({ resposta: 'minhaResposta', maisDados: 'outrosDados' });
  });


  // navigator.serviceWorker.postMessage({
  //   msg: "fetch"
  // })

  // navigator.serviceWorker.addEventListener("message", (event) => {
  //   // Handle the message from the service worker.
  //   // send back
  //   event.ports[0].postMessage({
  //     msg: "ola",
  //     url: `event.request.url`,
  //   });
  // });

  // send message to content script
}