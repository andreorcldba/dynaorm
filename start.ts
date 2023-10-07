import { Repository } from '@dynaorm/common';
import { UserEntity } from 'user/entities/user.entity';
import { UserService } from 'user/user.service';

const dynamoRepository = new Repository(UserEntity);
const userService = new UserService(dynamoRepository);

//criar uma tabela
userService.createTable();
// userService.create({
//   id: '1',
//   nome: 'teste',
//   telefone: '51993941175'
// });
