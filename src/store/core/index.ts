// export type State = any;
//
// export type Action = {
//   id: string;
//   callback: (...args: any) => any;
// };
//
// export type Reducer = {
//   id: string;
//   callback: (...args: any) => any;
// };
//
// type CreateStoreType = {
//   state: State;
//   reducers: Reducer[];
//   actions: Action[];
// };
//
// export const createStore = ({ state, reducers, actions }: CreateStoreType) => {
//   return { state, reducers, actions };
// };

export const createEntity = (entity: any) => ({
  ids: entity.map((item: any) => item.id),
  entity: Object.fromEntries(entity.map((item: any) => [item.id, item])),
});

export const store: { [k: string]: any } = {
  pizza: createEntity([
    {
      id: '1',
      name: 'alex',
    },
  ]),
};
