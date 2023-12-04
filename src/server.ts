import express from 'express'
import bodyParser from 'body-parser'
import { Request, Response, NextFunction } from 'express'
import { registerUserController } from './controllers/register-user-controller'
import registerBikeController from './controllers/register-bike-controller'

const cors = (req: Request, res: Response, next: NextFunction): void => {
    res.set('access-control-allow-origin', '*')
    res.set('access-control-allow-headers', '*')
    res.set('access-control-allow-methods', '*')
    next()
}

const contentType = (req: Request, res: Response, next: NextFunction): void => {
    res.type('json')
    next()
}

const server = express()
server.use(bodyParser.json())
server.use(cors)
server.use(contentType)

// routes:
server.post('/api/users', registerUserController)
server.post('/api/bikes', registerBikeController)

const port = 3000
const serverApp = server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

export default serverApp
