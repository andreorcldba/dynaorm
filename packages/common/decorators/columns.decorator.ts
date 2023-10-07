import { COLUMN_ATTRIBUTE_DEFINITION_METADATA } from '../constants';
import { ColumnOptions, ColumnProperty } from '../interfaces/columns.decorator.interface';

export const Column = (options: ColumnOptions) => {
  return (target: any, propertyKey: string) => {
    // get or create column array for instance class
    let columns = Reflect.getMetadata(COLUMN_ATTRIBUTE_DEFINITION_METADATA, target);

    if (!columns) {
      columns = [];
      Reflect.defineMetadata(COLUMN_ATTRIBUTE_DEFINITION_METADATA, columns, target);
    }

    // add column info in array
    columns.push({ propertyKey, ...options });
  };
};

export function getColumns(target: any): ColumnProperty[] {
  return Reflect.getMetadata(COLUMN_ATTRIBUTE_DEFINITION_METADATA, target) || [];
}
