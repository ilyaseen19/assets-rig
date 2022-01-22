const icon = "./logo1.png";
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

const assetTypeStore = require("./db/stores/assetStore");
const departmentStore = require("./db/stores/departmentStore");
const keyStore = require("./db/stores/keyStore");
const initStore = require("./db/stores/initStore");

global.assetTypeStore = assetTypeStore;
global.departmentStore = departmentStore;
global.keyStore = keyStore;
global.initStore = initStore;

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    icon: __dirname + { icon },
  });

  win.maximize();
  win.show();
  // win.removeMenu();

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if (isDev) {
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
    });
  } catch (_) {}
}
