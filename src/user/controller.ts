import { inject } from "inversify";
import { controller,httpGet as GetMapping,httpPost as PostMapping,httpDelete as DeleteMapping } from "inversify-express-utils"; 
import { UserService } from "./services";
import type { Request,Response } from "express";
import { JWT } from "../jwt";
const { middleware } = new JWT()
@controller('/user')
export class User {

    constructor(@inject(UserService) private readonly UserService: UserService) {

    }

    @GetMapping('/index',middleware())
    public async getIndex(req: Request,res: Response) {
        console.log(req.user); //添加jwt验证后 req会携带user
        let result = await this.UserService.getList()
        res.send(result)
    }

    @PostMapping('/create')
    public async createUser(req: Request,res: Response) {
        let result = await this.UserService.createUser(req.body)
        res.send(result)
    }

    @DeleteMapping('/deleteAll')
    public async deleteAllUser(req: Request,res: Response) {
        let result = await this.UserService.deleteAllUser()
        res.send(result)
    }
}