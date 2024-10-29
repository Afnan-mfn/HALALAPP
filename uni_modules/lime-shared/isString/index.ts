// @ts-nocheck
/**
 * 检查一个值是否为字符串类型
 * @param str 要检查的值
 * @returns 如果值的类型是字符串类型，则返回 true；否则返回 false
 */
// #ifndef APP-IOS || APP-ANDROID
// export const isString = (str: unknown): str is string => typeof str === 'string';
export function isString (str: unknown): str is string {
	return typeof str == 'string'
}
// #endif


// #ifdef APP-IOS || APP-ANDROID
export function isString (str: any): boolean {
	return typeof str == 'string'
}
// #endif
