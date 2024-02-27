import { Request } from 'express'

//Requset 类型扩充
declare global {
    namespace Express {
        interface Request {
            user?: User | undefined
        }
        interface User {
            id: number,
            name: string,
            email: string
        }
    }
}