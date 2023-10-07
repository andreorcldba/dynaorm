import { SecondaryIndexType } from '../enums/index.enum';

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface SecondaryIndexOptions {
  name: string;
  type: SecondaryIndexType;
  fields: string[];
  Projection?: {
    ProjectionType: 'ALL' | 'KEYS_ONLY' | 'INCLUDE';
    NonKeyAttributes?: string[];
  };
}
