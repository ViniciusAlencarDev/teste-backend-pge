import connection from '../database/connection'

async function verifyAdministrator(req: any, res: any, next: any): Promise<any> {
    
    const [, data]:any  = await connection.query(`
        SELECT access_level FROM users
        WHERE id=${req.id}
    `)

    if(data.length > 0) {
        if(data[0].access_level == 2)
            next()
    }

}

export default verifyAdministrator
