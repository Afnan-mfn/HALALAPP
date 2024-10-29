export interface Canvas {
    width?: number;
    height?: number;
    left?: number;
    right?: number;
    bottom?: number;
    context?: any;
    offscreen?: any;
}
export interface EcgOptions {
    bgColor?: string;
    textColor?: string;
    gridLength?: number[];
    gridSize?: number;
    ampTime?: string;
    lineColor?: string[];
    wave?: WaveOptions;
}
export interface WaveOptions {
    lineColor?: string;
    /** 每秒多少个点 一个小格放10个点（数据）*/
    frameSize?: number;
    /** 扫纸速度，默认 25mm/s (1秒25个小格子 每个小格子0.04s)。 0.5表示扫纸速度为 12.5mm/s。2表示扫纸速度为 50mm/s。*/
    speedRatio?: number;
    /** 橡皮檫宽度*/
    clearGap?: number;
    /** 每次画几个点*/
    step?: number;
    /** Y值最大值*/
    yMax?: number;
    /** y偏移*/
    yOffset?: number;
    /** 格子大小*/
    gridSize?: number;
    /** 每个波形的高度*/
    waveHeight?: number;
}
