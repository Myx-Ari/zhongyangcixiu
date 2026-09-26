const { app, BrowserWindow, Menu, session, dialog } = require('electron');
const path = require('node:path');

const smokeTest = process.argv.includes('--smoke-test');
let window;

if (!smokeTest && !app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!window) return;
    if (window.isMinimized()) window.restore();
    window.show();
    window.focus();
  });

  app.whenReady().then(async () => {
    Menu.setApplicationMenu(null);
    // This edition only reads bundled files; it never needs a web server.
    session.defaultSession.webRequest.onBeforeRequest(
      { urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] },
      (_details, callback) => callback({ cancel: true })
    );
    session.defaultSession.setPermissionRequestHandler((_contents, _permission, callback) => callback(false));
    session.defaultSession.setPermissionCheckHandler(() => false);
    if (smokeTest) session.defaultSession.enableNetworkEmulation({ offline: true });

    window = new BrowserWindow({
      title: '家园 · 中阳刺绣数字长卷',
      width: 1440,
      height: 900,
      minWidth: 800,
      minHeight: 600,
      show: false,
      backgroundColor: '#d5c39e',
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true,
        webSecurity: true,
        backgroundThrottling: !smokeTest
      }
    });
    if (smokeTest) window.webContents.setAudioMuted(true);
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    window.webContents.on('will-navigate', event => event.preventDefault());
    window.webContents.on('will-attach-webview', event => event.preventDefault());
    window.webContents.on('before-input-event', (event, input) => {
      if (input.type !== 'keyDown') return;
      if (input.key === 'F11') {
        event.preventDefault();
        window.setFullScreen(!window.isFullScreen());
      } else if (input.key === 'Escape' && window.isFullScreen()) {
        event.preventDefault();
        window.setFullScreen(false);
      }
    });
    if (!smokeTest) {
      window.once('ready-to-show', () => {
        window.maximize();
        window.show();
      });
    }

    const errors = [];
    window.webContents.on('console-message', details => {
      if (/Uncaught|Not allowed to load local resource/.test(details.message || '')) errors.push(details.message);
    });
    await window.loadFile(path.join(app.getAppPath(), 'index.html'));
    if (smokeTest) {
      await require('./smoke.cjs').run(window, errors);
      app.exit(0);
    }
  }).catch(error => {
    console.error(error);
    if (!smokeTest) dialog.showErrorBox('无法打开中阳刺绣', '应用资源加载失败，请重新下载完整的离线版。\n' + error.message);
    app.exit(1);
  });

  app.on('window-all-closed', () => app.quit());
}
