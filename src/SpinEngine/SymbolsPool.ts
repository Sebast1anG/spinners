import { BaseSymbol } from "./BaseSymbol";

export class SymbolsPool {
  private creators: Record<string, (id: string) => BaseSymbol>;
  private defaultCreator: (id: string) => BaseSymbol;

  public constructor() {
    this.defaultCreator = (id) => new BaseSymbol(id);
    this.creators = {};
  }

  public setDefaultCreator(creator: (id: string) => BaseSymbol): void {
    this.defaultCreator = creator;
  }

  public addCreator(id: string, creator: (id: string) => BaseSymbol): void {
    this.creators[id] = creator;
  }

  public getSymbol(id: string): BaseSymbol {
    return this.creators[id]?.(id) || this.defaultCreator(id);
  }
}
