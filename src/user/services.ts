import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { inject,injectable } from "inversify";
import { PrismaDB } from "../db";
import { UserDto } from "./user.dto";

@injectable()
export class UserService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {

    }
    
    public async getList() {
        return await this.PrismaDB.prisma.user.findMany()
    }

    public async createUser (user: UserDto) {
        let userDto = plainToClass(UserDto,user)
        const errors = await validate(userDto)
        console.log(userDto);
        if(errors.length) {
            return errors
        }else {
        }
        return await this.PrismaDB.prisma.user.create({
            data: {
                ...user,
                posts: {
                    create: [
                        {
                            title: '走神文章',
                            content: '走神文章内容'
                        },{
                            title: '走神文章222',
                            content: '走神文章内容222'
                        }
                    ]
                }
            }
        })
    }

    public async deleteAllUser() {
        return await this.PrismaDB.prisma.user.deleteMany().then(() => {
            return {
                message: '已全部删除'
            }
        })
    }
}