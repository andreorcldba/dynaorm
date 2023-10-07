/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface RepositoryCreateOptions {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  logging?: boolean;
}

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface KeySchema {
  type: 'HASH' | 'RANGE';
}

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface KeySchemaInput {
  AttributeName: string;
  KeyType: KeySchema['type'] | undefined;
}
