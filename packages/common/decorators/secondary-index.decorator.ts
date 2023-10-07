import 'reflect-metadata';
import { TABLE_SECONDARY_INDEX_METADATA } from '../constants';
import { SecondaryIndexOptions } from '../interfaces/secondary-index.decorator.interface';

export const SecondaryIndex = (secondaryIndexOptions: SecondaryIndexOptions[]) => {
  return (target: Function) => {
    Reflect.defineMetadata(TABLE_SECONDARY_INDEX_METADATA, secondaryIndexOptions, target);
  };
};

export const getSecondaryIndex = (target: any): SecondaryIndexOptions[] => {
  return Reflect.getMetadata(TABLE_SECONDARY_INDEX_METADATA, target);
};
