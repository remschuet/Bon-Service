import { Component } from "@/lib/composite/class/component";

export class Menu extends Component {
  /**
   * The constructor of the Menu class.
   * @param {string} menuType - The type of the menu.
   * "A_LA_CARTE" or "SET_MENU"
   * @returns {Menu} - A new instance of the Menu class.
   */

  protected recipes: Component[] = [];
  protected costs: number[] = [];
  private menuType: string;

  constructor(menuType: string = "A_LA_CARTE") {
    // A menu is always a composite so we pass true to the super class
    super(true);
    this.menuType = menuType;
  }

  public addComponent(component: Component): void {
    this.recipes.push(component);
    component.parent = this;
  }

  public removeComponent(component: Component): void {
    // Find the index of the component in the recipes array, remove it from the array
    const componentIndex = this.recipes.indexOf(component);
    this.recipes.splice(componentIndex, 1);

    //Removes the parent reference for garbage collection
    component.parent = null;
  }

  public suggestSalePrice(): number {
    // TODO: Implement the suggestSalePrice method
    return 0;
  }

  public calculateCost(): number | void {
    this.recipes.forEach((recipe) => {
      this.costs.push(recipe.calculateCost() as number);
    });

    // check le type de menu.
    if (this.menuType === "SET_MENU") {
      this.costs.reduce((acc, curr) => acc + curr, 0);
    }
  }
}
