import { Request, Response } from 'express'

import connection from '../database/connection'
import jwtmodule from '../modules/jwt'

type responseType = {
    success: any,
    data: any,
    error: any
}

const reponseModel = {
    success: false,
    data: [],
    error: []
}

class UserController {

    public async create(req: Request, res: Response): Promise<Response> {
        const response: responseType = {...reponseModel}

        const { username, email, password } = req.body;

        if(username && email && password) {
            try {
                const [id, affectedRows]: any = await connection.query(`
                    INSERT INTO users VALUES (
                        DEFAULT,
                        '${username}',
                        '${email}',
                        '${password}',
                        1,
                        NOW(),
                        NOW()
                    );
                `);

                if(affectedRows > 0) {
                    response.success = true
                    response.data = [{ token: await jwtmodule.createToken(id), access_level: 1 }]
                }
            } catch(e) {
                console.log(e)
                response.error = ['Error']
            }
        }

        return res.json(response)
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const response: responseType = {
            success: false,
            data: [],
            error: []
        }

        const { usernameOrEmail, password } = req.body;

        try {
            const [, data]: any = await connection.query(`
                SELECT id, access_level FROM users WHERE
                    (username='${usernameOrEmail}' OR email='${usernameOrEmail}') AND password='${password}'
                ORDER BY id DESC LIMIT 1
            `);

            if(data.length > 0) {
                response.success = true
                response.data = [{ token: await jwtmodule.createToken(data[0].id), access_level: data[0].access_level }]
            }
        } catch(e) {
            console.log(e)
            response.error = ['Error']
        }

        return res.json(response)
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const response: responseType = {
            success: false,
            data: [],
            error: []
        }

        try {
            const [, data]: any = await connection.query(`
                SELECT * FROM users
                ORDER BY id DESC
            `);

            if(data.length > 0) {
                response.success = true
                response.data = data
            }
        } catch(e) {
            console.log(e)
            response.error = ['Error']
        }

        return res.json(response)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const response: responseType = {
            success: false,
            data: [],
            error: []
        }

        const dataReq: any = req;
        const id = dataReq.id;

        const { username, email, password, access_level } = req.body;

        try {
            const [data,]: any = await connection.query(`
                UPDATE users SET
                    ${username && `username='${username}'`} ${username && (email || password || access_level) && ','}
                    ${email && `email='${email}'`} ${(username || email) && (password || access_level) && ','}
                    ${password && `password='${password}'`} ${(username || email || password) && access_level && ','}
                    ${access_level && `access_level='${access_level}'`}
                WHERE id=${id}
            `);

            response.success = data.affectedRows > 0
        } catch(e) {
            console.log(e)
            response.error = ['Error']
        }

        return res.json(response)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const response: responseType = {
            success: false,
            data: [],
            error: []
        }

        const dataReq: any = req;
        const id = dataReq.id;

        try {
            const [, affectedRows]: any = await connection.query(`
                DELETE FROM users WHERE id=${id}
            `);
            
            response.success = affectedRows > 0
        } catch(e) {
            console.log(e)
            response.error = ['Error']
        }

        return res.json(response)
    }

}

export default new UserController()
