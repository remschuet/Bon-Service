import { UnitMeasure } from "@prisma/client";
import { RecipeComponent } from "@/lib/composite/class/recipe";

export abstract class Component {
  private _parent!: Component | null;
  private _isComposite!: boolean;

  constructor(isComposite: boolean = false) {
    this._parent = null;
    this._isComposite = isComposite;
  }

  public set parent(parent: Component | null) {
    this._parent = parent;
  }

  public get parent(): Component | null {
    return this._parent;
  }

  public get composite(): boolean {
    return this._isComposite;
  }

  public abstract add(component: Component | RecipeComponent): void;

  public abstract remove(component: Component | RecipeComponent): void;

  public abstract suggestSalePrice(): number;

  public abstract calculateCost(quantity?: number, unit?: UnitMeasure): number;
}
