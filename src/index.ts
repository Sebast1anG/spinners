import * as PIXI from "pixi.js";
import { SpinEngine } from "./SpinEngine/SpinEngine";
import { DefaultSymbol } from "./DefaultSymbol";

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
    this.app = new PIXI.Application({
      background: "#1099bb",
      resizeTo: window,
    });
    document.body.appendChild(this.app.view as HTMLCanvasElement);

    const spinEngine = new SpinEngine();

    const reelContainer = new PIXI.Container();
    this.app.stage.addChild(reelContainer);

    spinEngine.symbolsPool.setDefaultCreator((id: string) => {
      const symbol = new DefaultSymbol(id);
      reelContainer.addChild(symbol.visual);

      return symbol;
    });

    spinEngine.init();

    this.app.ticker.add(() => {
      spinEngine.timestep(this.app.ticker.deltaMS);
    });

    document.addEventListener("click", () => {
      spinEngine.startSpin();
    });
  }
}

new SlotMachine();
