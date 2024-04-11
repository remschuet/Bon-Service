import { Component } from "@/lib/composite/class/component";

export class RecipeBook extends Component {
  protected recipes: Component[] = [];
  protected costs: number[] = [];

  constructor() {
    // A recipe book is always a composite so we pass true to the super class
    super(true);
  }

  public addComponent(component: Component): void {
    this.recipes.push(component);
    component.parent = this;
  }

  public removeComponent(component: Component): void {
    //Find the index of the component in the recipes array, remove it from the array
    const componentIndex = this.recipes.indexOf(component);
    this.recipes.splice(componentIndex, 1);

    //Removes the parent reference for garbage collection
    component.parent = null;
  }

  public suggestSalePrice(): number {
    // TODO: Implement the suggestSalePrice method
    return 0;
  }

  public calculateCost(): void {
    this.recipes.forEach((recipe) => {
      this.costs.push(recipe.calculateCost() as number);
    });
  }
}
