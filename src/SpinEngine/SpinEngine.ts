import { Reel } from "./Reel";
import { SymbolsPool } from "./SymbolsPool";

const config = {
  numberOfReels: 5,
};

export class SpinEngine {
  public reels: Reel[];
  public readonly symbolsPool: SymbolsPool;

  public constructor() {
    this.symbolsPool = new SymbolsPool();
    this.reels = [];
  }

  public init(): void {
    this.reels = new Array(config.numberOfReels)
      .fill(0)
      .map((_, i) => new Reel(i, this.symbolsPool));
  }

  public timestep(dt: number): void {
    this.reels.forEach((reel) => reel.timestep(dt));
  }

  public startSpin(): void {
    this.reels.forEach((reel) => reel.startSpin());
  }
}
