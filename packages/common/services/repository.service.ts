import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ReflectProperty } from '../types/dynamodb.repository.type';
import { getEntity } from '../decorators/entity.decorator';
import { RepositoryCreateOptions } from '../interfaces/repository.service.interface';
import { CreateTableCommand, CreateTableCommandInput, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Helper } from './helper.service';
import { getColumns } from '../decorators/columns.decorator';
import { AttributeDefinition, ColumnOptions, ColumnProperty } from '../interfaces/columns.decorator.interface';
import { getSecondaryIndex } from '../decorators/secondary-index.decorator';
import { SecondaryIndexOptions } from '../interfaces/secondary-index.decorator.interface';

export class Repository<T> {
  private readonly tableName: string | undefined = 'undefined';
  private readonly docClient: DynamoDBDocumentClient;
  private readonly columns: ColumnProperty[];
  private readonly secondaryIndexes: SecondaryIndexOptions[];

  constructor(Entity: new () => T) {
    this.tableName = getEntity(Entity);
    this.columns = getColumns(new Entity());
    this.secondaryIndexes = getSecondaryIndex(Entity);
    const client = new DynamoDBClient({
      endpoint: 'http://localhost:4566'
    });

    this.docClient = DynamoDBDocumentClient.from(client);
  }

  //constructor(
  // EntityClass: new () => T,
  // @inject(LoggerService.name)
  // public readonly loggerService: ILoggerService
  //) {
  // const entity = new EntityClass();
  // this.tableName = getTableName(EntityClass);
  // this.primaryKeys = getColumns(entity)
  //   .filter((column) => column?.primaryKey)
  //   .map(({ propertyKey }) => propertyKey);

  // this.dynamoDB = new AWS.DynamoDB.DocumentClient();
  //}

  /**
   * @param entity
   * @description Create a table in DynamoDB.
   */
  async createTable() {
    try {
      const input: CreateTableCommandInput = {
        // CreateTableInput
        AttributeDefinitions: Helper.getAttributeDefinitionInput(this.columns),
        TableName: this.tableName,
        KeySchema: Helper.getKeySchemaInput(this.columns),
        LocalSecondaryIndexes: [
          // LocalSecondaryIndexList
          {
            // LocalSecondaryIndex
            IndexName: 'STRING_VALUE', // required
            KeySchema: [
              // required
              {
                AttributeName: 'STRING_VALUE', // required
                KeyType: 'HASH' || 'RANGE' // required
              }
            ],
            Projection: {
              // Projection
              ProjectionType: 'ALL' || 'KEYS_ONLY' || 'INCLUDE',
              NonKeyAttributes: [
                // NonKeyAttributeNameList
                'STRING_VALUE'
              ]
            }
          }
        ],
        GlobalSecondaryIndexes: [
          // GlobalSecondaryIndexList
          {
            // GlobalSecondaryIndex
            IndexName: 'STRING_VALUE', // required
            KeySchema: [
              // required
              {
                AttributeName: 'STRING_VALUE', // required
                KeyType: 'HASH' || 'RANGE' // required
              }
            ],
            Projection: {
              ProjectionType: 'ALL' || 'KEYS_ONLY' || 'INCLUDE',
              NonKeyAttributes: ['STRING_VALUE']
            },
            ProvisionedThroughput: {
              // ProvisionedThroughput
              ReadCapacityUnits: Number('long'), // required
              WriteCapacityUnits: Number('long') // required
            }
          }
        ],
        BillingMode: 'PROVISIONED' || 'PAY_PER_REQUEST',
        ProvisionedThroughput: {
          ReadCapacityUnits: Number('long'), // required
          WriteCapacityUnits: Number('long') // required
        },
        StreamSpecification: {
          // StreamSpecification
          StreamEnabled: true || false, // required
          StreamViewType: 'NEW_IMAGE' || 'OLD_IMAGE' || 'NEW_AND_OLD_IMAGES' || 'KEYS_ONLY'
        },
        SSESpecification: {
          // SSESpecification
          Enabled: true || false,
          SSEType: 'AES256' || 'KMS',
          KMSMasterKeyId: 'STRING_VALUE'
        },
        Tags: [
          // TagList
          {
            // Tag
            Key: 'STRING_VALUE', // required
            Value: 'STRING_VALUE' // required
          }
        ],
        TableClass: 'STANDARD' || 'STANDARD_INFREQUENT_ACCESS',
        DeletionProtectionEnabled: true || false
      };

      console.log('22222222', this.secondaryIndexes[0].Projection?.NonKeyAttributes);
      //const command = new CreateTableCommand(input);
      return {} as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param entity
   * @description Create a record in DynamoDB.
   */
  async create(properties: ReflectProperty<T>, options?: RepositoryCreateOptions): Promise<T> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: properties
    });

    Helper.thowLogging(command, options);

    try {
      await this.docClient.send(command);

      return properties as T;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param where
   * @param select
   * @description Returning scan params
   * @returns
   */
  //   makeDynamoDBScanParams(
  //     where: IQueryParams<T>['where'],
  //     select: IQueryParams<T>['select'],
  //   ): AWS.DynamoDB.DocumentClient.ScanInput | undefined {
  //     const expressionAttributeNames: Record<string, string> = {};
  //     const expressionAttributeValues: Record<string, any> = {};
  //     const projectionExpression: string = Object.keys({ ...select })
  //       .map((key) => `#${key}`)
  //       .join(', ');

  //     const value = where as any;

  //     const filterExpression = Object.keys(where)
  //       .map((key) => {
  //         expressionAttributeValues[`:${key}`] = value[key];

  //         return `#${key} = :${key}`;
  //       })
  //       .join(' AND ');

  //     Object.keys({ ...where, ...select }).forEach((key) => {
  //       expressionAttributeNames[`#${key}`] = key;
  //     });

  //     const params: AWS.DynamoDB.DocumentClient.ScanInput = {
  //       TableName: this.tableName,
  //       ...(Object.keys(where).length && {
  //         FilterExpression: filterExpression,
  //       }),
  //       ExpressionAttributeNames: expressionAttributeNames,
  //       ...(Object.keys(expressionAttributeValues).length && {
  //         ExpressionAttributeValues: expressionAttributeValues,
  //       }),
  //       ...(Object.keys({ ...select }).length && {
  //         ProjectionExpression: projectionExpression,
  //       }),
  //     };

  //     return params;
  //   }

  /**
   * @param where
   * @param globalSecondaryIndex
   * @description return query params
   * @returns
   */
  //   makeDynamoDBQueryParams(
  //     where: IQueryParams<T>['where'],
  //     globalSecondaryIndex: IQueryParams<T>['globalSecondaryIndex'],
  //   ): AWS.DynamoDB.DocumentClient.QueryInput | undefined {
  //     const expressionAttributeNames: Record<string, string> = {};
  //     const expressionAttributeValues: Record<string, any> = {};
  //     const value = where as any;

  //     if (where) {
  //       const filterExpression = Object.keys(where)
  //         .map(key => {
  //           expressionAttributeNames[`#${key}`] = key;

  //           expressionAttributeValues[`:${key}`] = value[key];
  //           return `#${key} = :${key}`;
  //         })
  //         .join(' AND ');

  //       const params: AWS.DynamoDB.DocumentClient.QueryInput = {
  //         TableName: this.tableName,
  //         ...(globalSecondaryIndex && {
  //           IndexName: globalSecondaryIndex,
  //         }),
  //         ExpressionAttributeNames: expressionAttributeNames,
  //         ExpressionAttributeValues: expressionAttributeValues,
  //         KeyConditionExpression: filterExpression,
  //       };

  //       return params;
  //     }

  //     return undefined;
  //   }

  /**
   * @param params
   * @param objectFilter
   * @description execute query
   * @returns
   */
  //   async executeQuery(
  //     params: AWS.DynamoDB.DocumentClient.QueryInput | undefined,
  //     objectFilter: TWhereEntityParams<T>,
  //   ): Promise<
  //     | PromiseResult<AWS.DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>
  //     | undefined
  //   > {
  //     try {
  //       if (params) {
  //         const result = await this.dynamoDB.query(params).promise();

  //         if (result?.Items?.length) {
  //           result.Items = result.Items.filter(item => {
  //             return Object.keys(objectFilter).every(key => {
  //               return key in item && item[key] === objectFilter[key as never];
  //             });
  //           });

  //           return result;
  //         }
  //       }
  //     } catch (error) {
  //       this.loggerService.error('Error querying items from DynamoDB:', error);

  //       throw error;
  //     }

  //     return undefined;
  //   }

  /**
   * @param params
   * @description execute scan
   * @returns
   */
  //   async executeScan(
  //     params: AWS.DynamoDB.DocumentClient.QueryInput | undefined,
  //   ): Promise<
  //     | PromiseResult<AWS.DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>
  //     | undefined
  //   > {
  //     try {
  //       if (params) {
  //         const result = await this.dynamoDB.scan(params).promise();

  //         if (result?.Items?.length) {
  //           return result;
  //         }
  //       }
  //     } catch (error) {
  //       this.loggerService.error('Error scaning items from DynamoDB:', error);

  //       throw error;
  //     }

  //     return undefined;
  //   }

  /**
   * @param queryParams
   * @description filter records by query
   * @returns
   */
  //   async query(queryParams: IQueryParams<T>) {
  //     const { where, globalSecondaryIndex, select } = queryParams;
  //     let results: PromiseResult<
  //       AWS.DynamoDB.DocumentClient.QueryOutput,
  //       AWS.AWSError
  //     >['Items'] = [];

  //     try {
  //       if (where && !Array.isArray(where)) {
  //         const objectFilter: TWhereEntityParams<T> = {};

  //         Object.keys(where).forEach((key: string) => {
  //           if (!this.primaryKeys.includes(key as never)) {
  //             objectFilter[key as never] = where[key as never];
  //             delete where[key as never];
  //           }
  //         });

  //         const params = this.makeDynamoDBQueryParams(
  //           where,
  //           globalSecondaryIndex,
  //         );

  //         if (params) {
  //           const result = await this.executeQuery(params, objectFilter);

  //           if (result?.Items) {
  //             results = [...results, ...result.Items];
  //           }
  //         }
  //       } else if (where) {
  //         for await (const filter of where) {
  //           const objectFilter: TWhereEntityParams<T> = {};

  //           Object.keys(filter).forEach((key: string) => {
  //             if (!this.primaryKeys.includes(key)) {
  //               objectFilter[key as never] = filter[key as never];
  //               delete filter[key as never];
  //             }
  //           });

  //           const params = this.makeDynamoDBQueryParams(
  //             filter,
  //             globalSecondaryIndex,
  //           );

  //           if (params) {
  //             const result = await this.executeQuery(params, objectFilter);

  //             if (result?.Items) {
  //               results = [...results, ...result.Items];
  //             }
  //           }
  //         }

  //         const resultString = results.map(result => JSON.stringify(result));

  //         results = [...new Set(resultString)].map(arr => JSON.parse(arr));
  //       }

  //       if (select) {
  //         if (Object.keys(select).length) {
  //           results = results.map(result => {
  //             // Creates a new object containing only the keys specified in "select"
  //             const obj: any = {};

  //             Object.keys(result).forEach(field => {
  //               if (Object.keys(select).indexOf(field) !== -1) {
  //                 obj[field] = result[field];
  //               }
  //             });

  //             return obj;
  //           });
  //         }
  //       }

  //       return results as T[];
  //     } catch (error) {
  //       this.loggerService.error('Error querying items from DynamoDB:', error);
  //       throw error;
  //     }
  //   }

  /**
   * @param queryParams
   * @description query handler
   */
  //   find(queryParams: IQueryParams<T>) {
  //     const response = {
  //       getOne: async () => {
  //         const result = await this.query(queryParams);

  //         return result[0];
  //       },
  //       getAll: async () => {
  //         const result = await this.query(queryParams);

  //         return result;
  //       },
  //     };

  //     return response;
  //   }

  /**
   * @param queryParams
   * @description Scan handler
   * @returns
   */
  //   findByScan(queryParams: IQueryScanParams<T>) {
  //     const response = {
  //       getOne: async () => {
  //         const result = await this.scan(queryParams);

  //         return result[0];
  //       },
  //       getAll: async () => {
  //         const result = await this.scan(queryParams);

  //         return result;
  //       },
  //     };

  //     return response;
  //   }

  /**
   * @param filterParams
   * @description Searches a record in DynamoDB with filters that are properties of the entity. This method uses scan.
   * @returns
   */
  //   async scan(queryParams: IQueryScanParams<T>) {
  //     const { where, select } = queryParams;
  //     let results: PromiseResult<
  //       AWS.DynamoDB.DocumentClient.QueryOutput,
  //       AWS.AWSError
  //     >['Items'] = [];

  //     try {
  //       if (where && !Array.isArray(where)) {
  //         const params = this.makeDynamoDBScanParams(where, select);

  //         if (params) {
  //           const result = await this.executeScan(params);

  //           if (result?.Items) {
  //             results = [...results, ...result.Items];
  //           }
  //         }
  //       } else if (where) {
  //         for await (const filter of where) {
  //           const params = this.makeDynamoDBScanParams(filter, select);

  //           if (params) {
  //             const result = await this.executeScan(params);

  //             if (result?.Items) {
  //               results = [...results, ...result.Items];
  //             }
  //           }
  //         }

  //         const resultString = results.map(result => JSON.stringify(result));

  //         results = [...new Set(resultString)].map(arr => JSON.parse(arr));
  //       } else {
  //         const params = this.makeDynamoDBScanParams({}, select);

  //         if (params) {
  //           const result = await this.executeScan(params);

  //           if (result?.Items) {
  //             results = [...results, ...result.Items];
  //           }
  //         }
  //       }

  //       return results as T[];
  //     } catch (error) {
  //       this.loggerService.error('Error querying items from DynamoDB:', error);
  //       throw error;
  //     }
  //   }

  /**
   * @returns
   * @description Searches all record in DynamoDB table. This method uses scan.
   */
  //   async findAll(): Promise<T[]> {
  //     const params: AWS.DynamoDB.DocumentClient.ScanInput = {
  //       TableName: this.tableName,
  //     };

  //     try {
  //       const result = await this.dynamoDB.scan(params).promise();
  //       return result.Items as T[];
  //     } catch (error) {
  //       this.loggerService.error('Error retrieving items from DynamoDB:', error);

  //       throw new InternalServerError(['Erro desconhecido']);
  //     }
  //   }

  /**
   * @param id
   * @param entity
   * @description Update a record in DynamoDB with the entity's properties.
   */
  //   async update(where: TEntityParams<T>, data: TEntityParams<T>): Promise<void> {
  //     const expressionAttributeNames: Record<string, string> = {};
  //     const expressionAttributeValues: Record<string, any> = {};
  //     const obj = data as PutItemInputAttributeMap;

  //     const updateExpression = Object.keys(data)
  //       .filter(key => !this.primaryKeys.includes(key))
  //       .map(key => `#${key} = :${key}`)
  //       .join(', ');

  //     Object.keys(data).forEach(key => {
  //       // does not allow updating primary key
  //       if (!this.primaryKeys.includes(key)) {
  //         expressionAttributeNames[`#${key}`] = key;
  //         expressionAttributeValues[`:${key}`] = obj[key];
  //       }
  //     });

  //     const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
  //       TableName: this.tableName, // table name
  //       Key: where, // filters
  //       // Define the updates you want to make
  //       UpdateExpression: `SET ${updateExpression}`,
  //       // Maps the attribute name in your table to an expression attribute name
  //       ExpressionAttributeNames: expressionAttributeNames,
  //       // Sets the new value for the attribute
  //       ExpressionAttributeValues: expressionAttributeValues,
  //     };

  //     try {
  //       await this.dynamoDB.update(params).promise();
  //     } catch (error) {
  //       this.loggerService.error('Error querying items from DynamoDB:', error);
  //       throw error;
  //     }
  //   }
}
