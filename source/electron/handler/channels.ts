/**
 * @file IPC 通讯管理 - 事件处理与分发
 * @description
 * 在 Electron 中，IPC 用于主进程（Main Process）与渲染进程（Renderer Process）之间的通信。
 * 由于主进程和渲染进程是两个不同的进程，彼此之间不能直接共享数据，因此需要使用 IPC 来交换信息。
 *
 * @remarks
 * - Electron 提供了 `ipcMain` 和 `ipcRenderer` 两个模块来处理 IPC 通信:
 *    - `ipcMain`：用于在主进程中监听和响应来自渲染进程的消息。
 *    - `ipcRenderer`：用于在渲染进程中发送消息到主进程，并接收主进程的响应。
 *
 * - `**对象序列化(结构化克隆序列化)**`:
 *    Electron 的 IPC 实现使用 HTML 标准的 `结构化克隆算法` 来序列化进程之间传递的对象，
 *    这意味着只有某些类型的对象可以通过 IPC 通道传递。
 */

import debugLog from '@/electron/tools/log';

// TODO: 定义好事件的传参与处理逻辑 - 事件分发

const Panel = {};

/**
 * @summary  启用 IPC 消息渠道 (APP_PIPE_ACTIONS)
 * @remarks
 * 1. **渲染進程 -> 主進程**
 * - 单向：
 *    - 发送消息：`ipcRenderer.send`
 *    - 接收消息：`ipcMain.on`
 *
 * - 双向：
 *    - 发送消息：`ipcRenderer.invoke` -- 发送请求并等待响应 -- Promise 返回值
 *    - 接收消息：`ipcMain.handle`
 *
 * - 旧版本异步双向通信的推荐方式：
 *    - 发送消息: `ipcRenderer.send`（渲染进程发送至主进程） + `ipcRenderer.on`（接收主进程的回复）
 *    - 接收消息: `ipcMain.on`（接收渲染进程发送的信号） +  `event.reply`（回应渲染进程的信号）
 *
 * 2. **主进程 -> 渲染进程**:
 *    - 发送消息: `Window.webContents.send`
 *    - 接收消息: `ipcRenderer.on`
 *
 * 注意📢：
 *  - `event.reply` 是 `ipcMain` 模块中的一个方法，用于从主进程 _**渲染进程**_ 向 _**渲染进程**_ 发送响应消息。
 *  当主进程监听到某个事件后，可以通过 `event.reply`方法来发送数据回给渲染进程。
 *  - **安全措施**:  _默认验证 所有 IPC 消息 senders_
 *  - IPC 消息命名规范: IPC 的消息名就是一个字符串，对于消息的发送者，可以自由的进行消息的命名。
 *  但是希望在定制消息时遵守一定的规范，防止混乱。命名规范为 `module-name:action-name` 或 `package-name:action-name`。
 */
export function channelEventDispatch(
  channel: string,
  ...args: unknown[]
) {
  debugLog(
    {
      id: module.id,
      sign: 'ChannelEventDispatch'
    },
    channel,
    ...args,
    Panel
  );
}
