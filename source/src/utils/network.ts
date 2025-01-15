/**
 *
 * @returns {boolean} 检测网络是否在线
 *
 * @remarks
 * 在渲染进程中，在线/离线事件 的探测，是通过标准 HTML5 API 中 `navigator.onLine` 属性来实现的。
 * navigator.onLine 属性返回值：
 * - false：如果所有网络请求都失败(例如，断开网络)。
 * - true: 在其他情况下都返回 true
 *
 * 注意📢：由于许多情况都会返回 true，应该小心对待误报的情况
 */
export function isOnline(): boolean {
  return navigator.onLine;
}
