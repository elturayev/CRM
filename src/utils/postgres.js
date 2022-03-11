import pg from 'pg'

const pool = new pg.Pool({
  connectionString : 'postgres://tbruzflo:S1yGe9FfE_Dr2loSenOML9eKnYlrxG99@john.db.elephantsql.com/tbruzflo'
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