export class BaseSymbol {
  public readonly id: string;
  public readonly position: { x: number; y: number };

  public constructor(id: string) {
    this.id = id;
    this.position = { x: 0, y: 0 };
  }

  public synchronize(): void {}
}
