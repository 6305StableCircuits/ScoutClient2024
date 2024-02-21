interface Hooks {
    onStart?: () => void;
    onEnd?: () => void;
}

export class Timer {
    private name: string;
    private readonly hooks: Hooks;
    private _time: number;
    private timer: any;
    private timerLength: number;
    constructor(name: string, timerLength: number, hooks: Hooks = {}) {
        this.name = name;
        this.timerLength = timerLength;
        this.hooks = hooks;
        this._time = 0;
    }

    public start() {
        if ('onStart' in this.hooks && this.hooks.onStart != undefined) {
            this.hooks.onStart();
            this.timer = setInterval(() => {this._time++; if(this._time == this.timerLength){this.timer.clear()}}, 1000);
        }
    }

    public stop() {
        if ('onEnd' in this.hooks && this.hooks.onEnd != undefined) {
            this.hooks.onEnd();
            this.timer.clear();
        }
    }

    public reset() {
        this._time = 0;
    }

    public get time() {
        return this._time;
    }
}