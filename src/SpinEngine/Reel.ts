import { BaseSymbol } from "./BaseSymbol";
import { SymbolsPool } from "./SymbolsPool";

export class Reel {
  private readonly symbolsPool: SymbolsPool;
  private symbols: BaseSymbol[];
  private id: number;

  private state: "idle" | "start" | "stop" | "spin" = "idle";

  public constructor(id: number, symbolPool: SymbolsPool) {
    this.symbolsPool = symbolPool;
    this.id = id;

    this.symbols = new Array(4).fill(0).map((_, i) => {
      const symbol = this.symbolsPool.getSymbol("T1");
      symbol.position.y = i;
      symbol.position.x = id;
      symbol.synchronize();
      return symbol;
    });
  }

  public startSpin(): void {
    this.state = "spin";
  }

  public timestep(dt: number): void {
    if (this.state === "spin") {
      this.symbols.forEach((symbol, i) => {
        symbol.position.y += dt * 0.001 * i;
        symbol.synchronize();
      });
    }
  }
}
