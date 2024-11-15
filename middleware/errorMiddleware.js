const errorMiddleware = ( err, req, res, next ) => {
       console.log('here is an error middleware');
       console.log('NODE_ENV: ', process.env.NODE_ENV);

       const statusCode = res.statusCode ? res.statusCode : 500;
       res.status ( statusCode);
       res.json( {message: err.message,
              stack:  process.env.NODE_ENV == "development" ? err.stack : null }  );
       next();
}



module.exports =errorMiddleware ;