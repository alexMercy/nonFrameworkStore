export type Elements = {
  [category: string]: {
    [item: string]: HTMLElement;
  };
};

export enum ELEMENT_KEYS {
  button = 'button',
  layout = 'layout',
  select = 'select',
  lang = 'lang',
  component = 'component',
  element = 'element',
}

export const getElements = (root: HTMLElement, key: string) => {
  const obj: { [l: string]: HTMLElement } = {};
  [...root.querySelectorAll(`[data-${key}]`)].forEach(element => {
    // @ts-ignore
    obj[element.dataset[key]] = element;
  });
  return obj;
};
