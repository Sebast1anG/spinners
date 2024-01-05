import { Text } from "pixi.js";
import { BaseSymbol } from "./SpinEngine/BaseSymbol";

export class DefaultSymbol extends BaseSymbol {
  public visual: Text;

  public constructor(id: string) {
    super(id);
    this.visual = new Text(id, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: "white",
    });
  }

  public synchronize(): void {
    this.visual.y = this.position.y * 100;
    this.visual.x = this.position.x * 100;
  }
}
