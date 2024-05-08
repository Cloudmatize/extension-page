window.onresize = doLayout;
var isLoading = false;

onload = function () {
  doLayout();

  let input = document.querySelector('#console');
  let output = document.querySelector('#console-output');
  let consolelog = document.querySelector('#console-log');
  let clear = document.querySelector('#clear');

  // send chrome message pwa
  // window.postMessage({ action: 'minhaAcao', dados: 'meusDados' });

  // Enviar mensagem para o service worker
  window.postMessage({ action: 'minhaAcao', dados: 'meusDados' });

  // window.addEventListener(
  //   "message",
  //   (event) => {
  //     let element = document.createElement('div');
  //     element.textContent = JSON.stringify(event.data);
  //     document.body.appendChild(element);
  //   },
  //   false,
  // );

  navigator.serviceWorker.addEventListener('message', event => {
    // Manipular a mensagem recebida
    let element = document.createElement('div');
    element.textContent = JSON.stringify(event.data);
    document.body.appendChild(element);
  });

  clear.onclick = function () {
    consolelog.value = '';
    input.value = '';
    output.value = '';
  }

  // put devtools response in web
  var old = console.log;
  console.log = function (message) {
    consolelog.innerHTML = '';
    old.apply(console, arguments);
    if (typeof message == 'object') {
      consolelog.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message);
    } else {
      consolelog.innerHTML += message;
    }
  }

  // execute users code
  document.querySelector('#execute').onclick = function () {
    try {
      const
        code = new Function(input.value)
      var returnValue = code();
      // get console.log output and place in web
      output.value = returnValue;
    }
    catch (error) {
      output.value = error;
    }
  };

  // start user camera
  // create a camera element
  // let camera = document.createElement('video');
  // camera.setAttribute('autoplay', '');
  // camera.setAttribute('muted', '');
  // camera.setAttribute('playsinline', '');
  // camera.setAttribute('controls', '');
  // camera.setAttribute('width', '300');
  // camera.setAttribute('height', '300');
  // camera.classList.add('camera');
  // document.body.appendChild(camera);
  // navigator.mediaDevices.getUserMedia({
  //   video: true
  // }).then(function (stream) {
  //   document.querySelector('video').srcObject = stream;
  // }).catch(function (error) {
  //   console.log(error);
  // });

  const STATIC_EXTENSION_ID = 'cjcgkaeffjeoljmjanapkpmdpbdceffm';
  addEventListener("fetch", (event) => {
    event.waitUntil(
      (async () => {
        // Exit early if we don't have access to the client.
        // Eg, if it's cross-origin.
        if (!event.clientId) return;

        // Get the client.
        const client = await self.clients.get(event.clientId);
        // Exit early if we don't get the client.
        // Eg, if it closed.
        if (!client) return;

        // Send a message to the client.
        client.postMessage({
          msg: "Hey I just got a fetch from you!",
          url: "event.request.url",
        });
      })(),
    );
  });
  // const callExtensionAPI = function (method) {
  //   window?.chrome?.runtime?.sendMessage(STATIC_EXTENSION_ID, {
  //     methodName: method,
  //   });
  // };

  //   async function getAuth() {
  //       await window?.chrome?.runtime?.sendMessage(message)
  //   }
  //   getAuth()

  //   window?.chrome?.runtime?.onMessage?.addListener(async (message, sender, sendResponse) => {
  //     if(message.origin === 'authFront'){
  //       setLoading(false)
  //       mainStore.loadingButton = false
  //       setStatusProfile(message.auth)
  //     }
  //   })
  // callExtensionAPI('acorda');

  // receive message from extension
  window?.chrome?.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
    // draw message to screen document
    const messageElement = document.createElement('div');
    messageElement.textContent = 'TESTE MESSAGE FROM EXTENSION';
    messageElement.style.color = 'red';
    messageElement.style.fontSize = '20px';
    document.body.appendChild(messageElement);
  });

  document.querySelector('#back').onclick = function () {
    history.back();
  };

  document.querySelector('#forward').onclick = function () {
    history.forward();
  };

  document.querySelector('#reset').onclick = function () {
    window.close();
  };

  document.querySelector('#home').onclick = function () {
    // navigate to google
    window.location.href = 'https://www.google.com';
  };

  document.querySelector('#reload').onclick = function () {
    // reload window
    window.location.reload();
  };
  document.querySelector('#reload').addEventListener(
    'webkitAnimationIteration',
    function () {
      if (!isLoading) {
        document.body.classList.remove('loading');
      }
    });

  // document.querySelector('#terminate').onclick = function () {
  //   webview.terminate();
  // };

  // document.querySelector('#location-form').onsubmit = function (e) {
  //   e.preventDefault();
  //   navigateTo(document.querySelector('#location').value);
  // };

  // webview.addEventListener('exit', handleExit);
  // webview.addEventListener('loadstart', handleLoadStart);
  // webview.addEventListener('loadstop', handleLoadStop);
  // webview.addEventListener('loadabort', handleLoadAbort);
  // webview.addEventListener('loadredirect', handleLoadRedirect);
  // webview.addEventListener('loadcommit', handleLoadCommit);
};

// function navigateTo(url) {
//   resetExitedState();
//   document.querySelector('webview').src = url;
// }

function doLayout() {
  // var webview = document.querySelector('webview');
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  // webview.style.width = webviewWidth + 'px';
  // webview.style.height = webviewHeight + 'px';

  // var sadWebview = document.querySelector('#sad-webview');
  // sadWebview.style.width = webviewWidth + 'px';
  // sadWebview.style.height = webviewHeight * 2 / 3 + 'px';
  // sadWebview.style.paddingTop = webviewHeight / 3 + 'px';
}

function handleExit(event) {
  console.log(event.type);
  document.body.classList.add('exited');
  if (event.type == 'abnormal') {
    document.body.classList.add('crashed');
  } else if (event.type == 'killed') {
    document.body.classList.add('killed');
  }
}

function resetExitedState() {
  document.body.classList.remove('exited');
  document.body.classList.remove('crashed');
  document.body.classList.remove('killed');
}

function handleLoadCommit(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  document.querySelector('#location').value = event.url;

  // var webview = document.querySelector('webview');
  // document.querySelector('#back').disabled = !webview.canGoBack();
  // document.querySelector('#forward').disabled = !webview.canGoForward();
}

function handleLoadStart(event) {
  document.body.classList.add('loading');
  isLoading = true;

  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  document.querySelector('#location').value = event.url;
}

function handleLoadStop(event) {
  // We don't remove the loading class immediately, instead we let the animation
  // finish, so that the spinner doesn't jerkily reset back to the 0 position.
  isLoading = false;
}

function handleLoadAbort(event) {
  console.log('oadAbort');
  console.log('  url: ' + event.url);
  console.log('  isTopLevel: ' + event.isTopLevel);
  console.log('  type: ' + event.type);
}

function handleLoadRedirect(event) {
  resetExitedState();
  if (!event.isTopLevel) {
    return;
  }

  document.querySelector('#location').value = event.newUrl;
}