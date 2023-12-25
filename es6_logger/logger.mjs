// 'log'로서 함수를 익스포트
export function log(message) {
    console.log(message)
}

// 'DEFAULT_LEVEL' 로서 상수를 익스포트
export const DEFAULT_LEVEL = 'info'

// 'LEVELS'로서 객체를 익스포트
export const LEVELS = {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5
}

// 'Logger'로서 클래스 익스포트
export class Logger {
    constructor(name) {
        this.name = name
    }

    log(message) {
        console.log(`[${this.name}] ${message}`)
    }
}