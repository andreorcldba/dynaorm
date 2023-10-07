import { KeySchema } from "./repository.service.interface";

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface AttributeDefinition {
  type: 'S' | 'N' | 'B';
}

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface AttributeDefinitionInput {
  AttributeName: string;
  AttributeType: AttributeDefinition['type'] | undefined;
}

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface ColumnOptions {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  attributeDefinition?: AttributeDefinition;
  keySchema: {
    type: 'HASH' | 'RANGE';
  };
}

/**
 * Interface defining the property object that describes the module.
 *
 * @publicApi
 */
export interface ColumnProperty {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  propertyKey: string;

  attributeDefinition?: AttributeDefinition;

  keySchema?: KeySchema;
}
