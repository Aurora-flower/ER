/**
 * @file 用于生成类名
 */
import { debugLog } from '@/common/helper/log';
import { DataTypeMode } from '@/common/constant';
import { CommonUtility } from '@/common/utils/common';
const { getDataType } = CommonUtility;

/**
 * Hook - 处理类名的生成 - 类名生成器
 * @param classNames 类名列表
 * @returns {string} classNameList String
 * ToDo: 扩展 - 使得其实现类似 classnames 库的功能
 *
 * 思路灵感：
 * {@link https://www.npmjs.com/package/classnames npm classnames}
 * {@link https://github.com/JedWatson/classnames github classnames}
 */
function useClassNames(classNames: Array<unknown>): string {
  try {
    const classnames = classNames.filter(Boolean);

    const processedClassNames = classnames.reduce(
      (pre: string[], current) => {
        const dataType = getDataType(current);
        if (dataType == DataTypeMode.STRING) {
          pre.push(current as string);
        } else if (dataType == DataTypeMode.OBJECT) {
          const val = current as Record<string, boolean>;
          Object.keys(val).forEach((item: string) => {
            if (val[item]) {
              pre.push(item);
            }
          });
        } else if (dataType == DataTypeMode.ARRAY) {
          pre.push(...(current as any).filter(Boolean));
        }
        return pre;
      },
      []
    );

    return processedClassNames.join(' ');
  } catch (error: unknown) {
    debugLog(
      module.id,
      'useClassNames error',
      false,
      (error as Error)?.message
    );
    return '';
  }
}

export default useClassNames;
