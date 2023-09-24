import { Elements } from '../../utils/getElements.ts';

export abstract class Component {
  protected abstract readonly root: HTMLElement;
  protected abstract elements: Elements;
  protected constructor() {}

  abstract render(): void;
}
