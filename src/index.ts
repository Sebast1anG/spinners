import * as PIXI from 'pixi.js';

interface Reel {
  container: PIXI.Container;
  symbols: PIXI.Text[];
  position: number;
  previousPosition: number;
}

interface Tween {
  object: any;
  property: any;
  propertyBeginValue: any;
  target: any;
  easing: any;
  time: any;
  change: any;
  complete: any;
  start: number;
}

class SlotMachine {
  private readonly app: PIXI.Application;
  private readonly reels: Reel[] = [];
  private readonly SYMBOL_SIZE = 150;
  private readonly REEL_WIDTH = 160;
  private readonly tweening: Tween[] = [];
  private running = false;

  constructor() {
    this.app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
    document.body.appendChild(this.app.view as HTMLCanvasElement);
    this.createReels();
  }

  private createReels() {
    const reelContainer = new PIXI.Container();
    this.app.stage.addChild(reelContainer);

    const symbols = ['T1', 'T2', 'T3', 'T4'];

    for (let i = 0; i < 5; i++) {
      const rc = new PIXI.Container();
      rc.x = i * this.REEL_WIDTH;
      reelContainer.addChild(rc);

      const reel: Reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
      };

      for (let j = 0; j < 4; j++) {
        const symbol = new PIXI.Text(symbols[Math.floor(Math.random() * symbols.length)], {
          fontFamily: 'Arial',
          fontSize: 24,
          fill: 'white',
        });
        symbol.y = j * this.SYMBOL_SIZE;
        symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      this.reels.push(reel);
    }

    document.body.addEventListener('click', () => {
      this.startPlay();
    });
  }

  private startPlay() {
    if (this.running) return;
    this.running = true;

    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      const extra = Math.floor(Math.random() * 3);
      const target = r.position + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 600;

      this.tweenTo(r, 'position', target, time, this.backout(0.5), null, i === this.reels.length - 1 ? this.reelsComplete : null);
    }
  }

  private reelsComplete() {
    this.running = false;
  }

  private backout(amount: number) {
    return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
  }

  private tweenTo(object: Reel, property: string, target: number, time: number, easing: (t: any) => number, onchange: null, oncomplete: (() => void) | null) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    };

    this.tweening.push(tween);

    return tween;
  }
}

new SlotMachine();
