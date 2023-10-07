// Utilizado para refletir as propriedades da classe genérica
export type ReflectProperty<T> = Partial<{
  [key in keyof T]: T[key];
}>;

// export type TBaseWhereEntityParams<T> = Partial<{
//   [key in keyof T]: T[key];
// }>;


// export type TSelectEntityParams<T> = Partial<{
//   [key in keyof T]: boolean;
// }>;

// export type TWhereEntityParams<T> = Partial<{
//   [key in keyof T]: T[key];
// }>;
