// @ts-nocheck
// import {isBrowser} from '../isBrowser'

// 是否支持被动事件监听
export const supportsPassive = true;

// 请求动画帧
export function raf(fn: TimerCallback): number {
   return setTimeout(fn, 1000 / 30); 
}

// 取消动画帧
export function cancelRaf(id: number) {
  clearTimeout(id);
}

// 双倍动画帧
export function doubleRaf(fn: TimerCallback): void {
  raf(() => raf(fn)); // 在下一帧回调中再次请求动画帧，实现双倍动画帧效果
}