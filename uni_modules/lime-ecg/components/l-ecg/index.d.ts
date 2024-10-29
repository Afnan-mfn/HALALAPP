import { Canvas, EcgOptions, WaveOptions } from './type';
export declare class Wave {
    canvas: any;
    options: WaveOptions;
    queue: number[];
    lastX: number;
    lastY: number;
    padding: number[];
    currentY: number;
    currentX: number;
    timeId: any;
    pointsLast: {
        x: number;
        y: number;
    }[];
    drawInterval: number;
    width: number;
    height: number;
    constructor(canvas: Canvas, options: WaveOptions);
    draw(): void;
    addData(data: number[]): void;
}
export declare class Ecg {
    canvas: any;
    options: EcgOptions;
    wave: Wave;
    timeId: any;
    isPlay: boolean;
    waveOptions: WaveOptions;
    constructor(canvas: Canvas, options?: EcgOptions);
    init(): void;
    _draw(): void;
    drawBG(): void;
    drawBackground(): void;
    drawMd(): void;
    drawLg(): void;
    drawTxt(): void;
    update(data: number[]): void;
    pause(): void;
    step(): void;
    resume(): void;
    setWave(): void;
}
