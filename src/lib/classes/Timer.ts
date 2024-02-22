interface Hooks {
    onStart?: () => void;
    onUpdate?: () => void;
    onEnd?: () => void;
}

export class Timer {
    private name: string;
    private readonly hooks: Hooks;
    private _time: number;
    private timer: any;
    constructor(name: string, hooks: Hooks = {}) {
        this.name = name;
        this.hooks = hooks;
        this.timer;
        this._time = 0;
    }



    public start() {
        if ('onStart' in this.hooks && this.hooks.onStart != undefined) {
            this.hooks.onStart();
        }
        this.timer = setInterval((() => this.update()), 1000);
    }
    
    private update() {
        if ('onUpdate' in this.hooks && this.hooks.onUpdate != undefined) {
            this.hooks.onUpdate();
        }
        this._time++;
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

