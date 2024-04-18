import { Unit } from "@prisma/client";
import { RecipeComponent } from "@/lib/composite/recipe";

export abstract class Component {
  private _id: string;
  private _parent!: Component | null;
  private _isComposite!: boolean;

  constructor({
    id = "",
    isComposite = false,
  }: {
    id?: string;
    isComposite?: boolean;
  }) {
    this._id = id;
    this._parent = null;
    this._isComposite = isComposite;
  }

  public get id(): string {
    return this._id;
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

  public abstract calculateCost(quantity?: number, unit?: Unit): number;
}
