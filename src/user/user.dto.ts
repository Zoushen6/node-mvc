import { Transform } from "class-transformer"
import { IsNotEmpty,IsEmail } from "class-validator"

//验证
export class UserDto {
    @IsNotEmpty({message: '名字必填'})
    @Transform((user) => user.value.trim())
    name: string

    @IsNotEmpty({message: '邮箱必填'})
    @IsEmail({},{message: '邮箱格式不正确'})
    email: string
}