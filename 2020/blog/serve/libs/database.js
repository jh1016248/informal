const mysql = require('mysql')
let pools = {}
let query = (sql, host = 'localhost') => {
    pools[host] = mysql.createPool({
        host: host,
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'tiehu',
    })
    return new Promise((resolve, reject) => {
        pools[host].getConnection((err, connection) => {
            if(err) {
                reject(err)
            }

            connection.query(sql, (err, results) => {
                if(err) {
                    reject(err)
                }
                else {
                    resolve(results)
                }
                connection.release()
            })
        })
    })
}

module.exports = query