import mysql from 'mysql2/promise';
export default async function accQueryLib(query,values=[]) {
  const dbconnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:"Samsung197",
    database: 'library_db',
    
    // host:'db4free.net',
    // port:3306,
    // user:'rootlibrary',
    // database:'library_db_2',
    // password:'Samsung197',
    // connectionLimit:100
  });
      //console.log(query);
    try{
        const [results] = await dbconnection.execute(query,values);
        dbconnection.end();
        return(results[0]);
        // res.status(200).json({values : data});
        
    }catch(err){
        throw Error(err.message);
        return (err);
    }
  }