import { Repository } from '@dynaorm/common';
import { IUserService } from './interfaces/user.service.interface';
import { UserEntity } from './entities/user.entity';

export class UserService implements IUserService {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  async createTable(): Promise<UserEntity> {
    const userTable = await this.userRepository.createTable();

    console.log(userTable);
    return new UserEntity();
  }

  async create(createUserDto: UserEntity): Promise<UserEntity> {
    const user = await this.userRepository.create(createUserDto);

    console.log(user);
    return user;
  }

  async findAll(): Promise<any> {
    // let partners = await this.partnerRepository.findAll();
    // partners = partners.filter((partner: IPartnerEntity) => partner.isActive);
    // return partners;
  }

  async findOne(id: string): Promise<any> {
    // const user = await this.partnerRepository
    //   .find({
    //     where: {
    //       id,
    //       isActive: true,
    //     },
    //   })
    //   .getOne();
    // if (!user) {
    //   throw new NotFoundError(['Parceiro não encontrado']);
    // }
    // return user;
  }

  async update(id: string, updateUserrDto: any): Promise<any> {
    // const partner = await this.findOne(id);
    // const now = new Date().toLocaleString();
    // await this.partnerRepository.update(
    //   {
    //     id,
    //     clientSecret: partner.clientSecret,
    //   },
    //   {
    //     ...updatePartnerDto,
    //     updatedAt: now,
    //   },
    // );
  }

  async remove(id: string): Promise<any> {
    // const partner = await this.findOne(id);
    // await this.partnerRepository.update(
    //   {
    //     id,
    //     clientSecret: partner.clientSecret,
    //   },
    //   {
    //     isActive: false,
    //   },
    // );
  }
}
