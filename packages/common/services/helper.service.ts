import { SecondaryIndexType } from '../enums';
import { AttributeDefinitionInput, ColumnProperty } from '../interfaces/columns.decorator.interface';
import { KeySchemaInput, RepositoryCreateOptions } from '../interfaces/repository.service.interface';
import { SecondaryIndexOptions } from '../interfaces/secondary-index.decorator.interface';

export class Helper {
  static thowLogging(command: any, options: RepositoryCreateOptions | undefined) {
    if (options?.logging) {
      console.log('command', command);
    }
  }

  static getAttributeDefinitionInput(columns: ColumnProperty[]): AttributeDefinitionInput[] {
    const input = columns
      .filter((column) => column?.attributeDefinition)
      .map((column) => ({
        AttributeName: column.propertyKey,
        AttributeType: column?.attributeDefinition?.type
      }));

    return input;
  }

  static getKeySchemaInput(columns: ColumnProperty[]): KeySchemaInput[] {
    const input = columns
      .filter((column) => column?.keySchema)
      .map((column) => ({
        AttributeName: column.propertyKey,
        KeyType: column?.keySchema?.type
      }));

    return input;
  }

  static getLocalSecondaryIndexInput(columns: SecondaryIndexOptions[]) {
    const input = columns
      .filter((column) => column?.type === SecondaryIndexType.LOCAL)
      .map((column) => ({
        IndexName: column.name,
        KeySchema: [
          // required
          {
            AttributeName: 'STRING_VALUE', // required
            KeyType: 'HASH' || 'RANGE' // required
          }
        ],
        Projection: column.Projection,
        ProvisionedThroughput: {
          // ProvisionedThroughput
          ReadCapacityUnits: Number('long'), // required
          WriteCapacityUnits: Number('long') // required
        }
      }));

    // {
    //   // GlobalSecondaryIndex
    //   IndexName: 'STRING_VALUE', // required
    //   KeySchema: [
    //     // required
    //     {
    //       AttributeName: 'STRING_VALUE', // required
    //       KeyType: 'HASH' || 'RANGE' // required
    //     }
    //   ],
    //   Projection: {
    //     ProjectionType: 'ALL' || 'KEYS_ONLY' || 'INCLUDE',
    //     NonKeyAttributes: ['STRING_VALUE']
    //   },
    //   ProvisionedThroughput: {
    //     // ProvisionedThroughput
    //     ReadCapacityUnits: Number('long'), // required
    //     WriteCapacityUnits: Number('long') // required

    return input;
  }

  // static getKeySchemaInput(secondaryIndexOptions: SecondaryIndexOptions[]): KeySchemaInput[] {
  //   const input = secondaryIndexOptions.map((indexOption) => ({
  //     IndexName: indexOption.name,
  //     AttributeName: column.propertyKey,
  //     KeyType: column?.keySchema?.type
  //   }));

  //   return input;
  // }

  //{
  //   // LocalSecondaryIndex
  //   IndexName: 'STRING_VALUE', // required
  //   KeySchema: [
  //     // required
  //     {
  //       AttributeName: 'STRING_VALUE', // required
  //       KeyType: 'HASH' || 'RANGE' // required
  //     }
  //   ],
  //   Projection: {
  //     // Projection
  //     ProjectionType: 'ALL' || 'KEYS_ONLY' || 'INCLUDE',
  //     NonKeyAttributes: [
  //       // NonKeyAttributeNameList
  //       'STRING_VALUE'
  //     ]
  //   }
  // }
}
