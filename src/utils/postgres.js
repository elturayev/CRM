import pg from 'pg'

const pool = new pg.Pool({
  connectionString : 'postgres://zcexpelu:GdBcDsPQmQcdS5q8OtT3KNpCyvhXRHHP@john.db.elephantsql.com/zcexpelu'
})

async function fetch(query,...params){
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, (params.length > 0 ? params : null))
        return rows
    } catch(error) {
      console.log(error)
    } finally {
        client.release()
    }
}

export default fetch;