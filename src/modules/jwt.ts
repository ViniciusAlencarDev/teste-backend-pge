import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || 'Teste@123'

class JsonWebToken {

    public async createToken(id: any): Promise<any> {
        return await jwt.sign({ id }, secret)    
    }

    public async verifyToken(req: any, res: any, next: any): Promise<any> {
        const token = req.headers['x-access']
        if(!token) {
            return res.json({
                success: false,
                data: [],
                erro: ['No token']
            })
        }

        await jwt.verify(token, secret, function(err: any, data: any) {
            if(err) {
                return res.json({
                    success: false,
                    data: [],
                    erro: ['No token valid']
                })
            }

            req.id = data.id

            next()
        })
    }

}

export default new JsonWebToken()
