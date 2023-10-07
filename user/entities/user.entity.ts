import { Entity } from '@dynaorm/common';
import { IUserEntity } from '../interfaces/user.entity.interface';
import { Column } from '@dynaorm/common/decorators/columns.decorator';
import { SecondaryIndex } from '@dynaorm/common/decorators/secondary-index.decorator';
import { SecondaryIndexType } from '@dynaorm/common/enums/index.enum';

@Entity('users')
@SecondaryIndex([
  {
    name: 'index A',
    type: SecondaryIndexType.LOCAL,
    fields: ['campo3', 'campo4'],
    Projection: {
      ProjectionType: 'ALL',
      NonKeyAttributes: ['campo3', 'campo4']
    }
  },
  {
    name: 'index B',
    type: SecondaryIndexType.GLOBAL,
    fields: ['campo5', 'campo6'],
    Projection: {
      ProjectionType: 'ALL',
      NonKeyAttributes: ['campo5', 'campo6']
    }
  }
])
export class UserEntity implements IUserEntity {
  public id: string;

  @Column({
    attributeDefinition: {
      type: 'S'
    },
    keySchema: {
      type: 'HASH'
    }
  })
  public campo1: string;

  @Column({
    keySchema: {
      type: 'HASH'
    }
  })
  public campo2: string;

  public campo3: string;

  @Column({
    keySchema: {
      type: 'HASH'
    }
  })
  public campo4: string;

  public campo5: string;
  public campo6: string;
}
