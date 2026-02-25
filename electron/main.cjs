const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged;
let mainWindow;
let tray;

// Window state management
const stateFile = path.join(app.getPath('userData'), 'window-state.json');
let windowState = { width: 1280, height: 800 };

try {
    if (fs.existsSync(stateFile)) {
        windowState = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    }
} catch (e) {
    console.error('Failed to load window state', e);
}

function saveState() {
    try {
        const bounds = mainWindow.getBounds();
        fs.writeFileSync(stateFile, JSON.stringify(bounds));
    } catch (e) {
        console.error('Failed to save window state', e);
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        show: false,
        title: "UNI AI",
        titleBarStyle: 'hidden',
        frame: false,
        icon: path.join(__dirname, '../public/logo.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
            backgroundThrottling: false,
        },
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:8080');
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('close', () => {
        saveState();
    });

    mainWindow.setMenuBarVisibility(false);
}

function createTray() {
    const iconPath = path.join(__dirname, '../public/logo.png');
    if (!fs.existsSync(iconPath)) return;

    tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow.show() },
        { label: 'Hide App', click: () => mainWindow.hide() },
        { type: 'separator' },
        {
            label: 'Quit', click: () => {
                app.isQuitting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('UNI AI');
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => mainWindow.show());
}

// IPC Handlers
ipcMain.on('window-min', () => mainWindow.minimize());
ipcMain.on('window-max', () => {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
});
ipcMain.on('window-close', () => mainWindow.close());

Menu.setApplicationMenu(null);

app.whenReady().then(() => {
    createWindow();
    createTray();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    console.log('UNI AI Desktop Process Started');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
