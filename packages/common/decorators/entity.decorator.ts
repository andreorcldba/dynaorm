import 'reflect-metadata';
import { TABLE_NAME_METADATA } from '../constants';

export const Entity = (tableName: string) => {
  return (target: Function) => {
    Reflect.defineMetadata(TABLE_NAME_METADATA, tableName, target);
  };
};

export const getEntity = (target: any): string => {
  return Reflect.getMetadata(TABLE_NAME_METADATA, target);
};
