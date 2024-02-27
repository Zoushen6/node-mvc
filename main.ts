import 'reflect-metadata'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'
import { User } from './src/user/controller'
import { UserService } from './src/user/services'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { PrismaDB } from './src/db'
import { JWT } from './src/jwt'
//引入类型声明
import type global from './src/index'

const container = new Container()

/**
 * user 模块
 */
container.bind(User).to(User)
container.bind(UserService).to(UserService)

/**
 * 封装PrismaClient
 */
container.bind('PrismaClient').toFactory(() => {
    return () => {
        return new PrismaClient()
    }
})
container.bind(PrismaDB).to(PrismaDB)

/**
 * jwt 模块
 */
container.bind(JWT).to(JWT)
 
const server = new InversifyExpressServer(container)
server.setConfig((app) => {
    app.use(express.json())
    app.use(container.get(JWT).init())
})

const app = server.build()

app.listen(3000,() => {
    console.log('listening on port 3000');
})

