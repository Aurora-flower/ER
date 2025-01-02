import { BrowserWindow } from 'electron';

export function createWindow(
  url: string,
  options: Electron.BrowserWindowConstructorOptions = {
    // TODO: 最小宽、高

    webPreferences: {
      nodeIntegration: true
    }
  },
  params: {
    isDev?: boolean;
    isRemote?: boolean;
  } = {}
): Electron.BrowserWindow | null {
  try {
    const win = new BrowserWindow(options);

    params?.isRemote ? win.loadURL(url) : win.loadFile(url);

    if (params?.isDev) {
      win.webContents.openDevTools();
    }

    win.setMinimumSize(765, 600); // 设置最小尺寸

    return win;
  } catch (error: unknown) {
    const msg =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred!';
    // AppMessageDistributor.showErrorBox(
    //   'Failed to create main window',
    //   msg
    // );
    console.error(msg + '1');
    return null;
  }
}
