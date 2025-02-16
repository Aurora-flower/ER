/**
 * @file Navigator - Web API 相关
 * @description Navigator 接口代表了用户代理的状态和身份，它允许脚本对其进行查询并注册自身以便执行某些活动。
 *
 * 注意📢:
 * window 下的属性都是可以省略缩写的，如 window.navigator 可以简写为 navigator
 */

import { debugLog } from '@/common/helper/log';

/**
 * 获取平台信息
 * @description
 * 通过 web api - navigator.userAgent 获取平台信息。
 *
 * 注意📢:
 * navigator.platform 已经被废弃，随着隐私保护政策的增强，浏览器已经不再推荐使用它，因为它可能泄露过多的用户信息。
 */
export function getOS() {
  let os = '';
  if (window.navigator.userAgent.indexOf('Windows NT') > -1) {
    os = 'Windows';
  } else if (
    window.navigator.userAgent.indexOf('Mac OS X') > -1
  ) {
    os = 'MacOS';
  } else if (
    window.navigator.userAgent.indexOf('Android') > -1
  ) {
    os = 'Android';
  } else if (
    window.navigator.userAgent.indexOf('iPhone') > -1 ||
    window.navigator.userAgent.indexOf('iPad') > -1
  ) {
    os = 'iOS';
  } else {
    os = 'Other';
  }

  return os;
}

/**
 * 获取浏览器信息
 * @description
 * 通过 web api - navigator.userAgent 获取浏览器信息。
 */
export function getBrowser() {
  let browser = '';
  if (window.navigator.userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (
    window.navigator.userAgent.indexOf('Firefox') > -1
  ) {
    browser = 'Firefox';
  } else if (window.navigator.userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  }
  return browser;
}

/**
 * 获取剪贴板内容
 * @description
 * 通过 web api - navigator.clipboard.readText() 访问系统剪贴板，以便读取剪贴板中的文本内容。
 * 如果剪贴板为空或不包含文本，readText() 会返回空字符串。
 *
 * @remarks
 * 当未聚焦时，会报错 Uncaught (in promise) NotAllowedError: Failed to execute 'readText' on 'Clipboard': Document is not focused.
 */
export function getClipboardText() {
  try {
    return window.navigator.clipboard.readText();
  } catch (error: any) {
    debugLog(
      module.id,
      'GetClipboardText',
      true,
      error?.message
    );
  }
}

/**
 * 获取网络连接信息
 * @description
 * 通过 web api - navigator.connection 获取网络连接信息。
 *
 * @remarks
 * navigator.connection.downlink - 下载速度（单位：Mbps）
 * navigator.connection.rtt - 往返时间（单位：ms）
 * navigator.connection.effectiveType - 网络连接类型（e.g., '4g', '3g', '2g', 'slow-2g'）
 * navigator.connection.saveData - 是否启用了数据保存模式（true/false）
 */
export function getConnectivity() {
  return window.navigator.connection;
}
