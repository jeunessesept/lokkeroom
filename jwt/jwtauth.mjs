import JWT from "jsonwebtoken";

import { promisify } from "util";

promisify(JWT.verify);

// middleware pour l'authentification du token
export const jwtAuthentification = async (req, res, next) => {
    // prendre le token dans le request headers
    const token = req.headers['authorization'];
    //si pas de token  sortir ce message d'errur
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized first' });
    }
    // vérifier le token en utilisant la clé secrète 
    JWT.verify(token.split(' ')[1], process.env.SECRET_JWT, (err, decoded) => {
        //si le token n'est pas bon, message d'erreur
      if (err) {
        return res.status(401).send({ error: 'Unauthorized' });
      }
      //si le token est bon (valide) stocker le token décodé dans le request header
      req.decoded = decoded;
      next();
    });
  }



  // export const jwtAuthentification = async (req, res, next) => {
//   if (!req.headers.authorization) return res.status(401).send("unauthorized");

//   try {
//     const decoded = await verify(
//       req.headers.authorization.split(" ")[1],
//       process.env.SECRET_JWT
//     );

//     if (decoded !== undefined) {
//       req.user = decoded;
//       return next();
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   return res.status(403).send('invalid token')
// };

// export const jwtAuthentification = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader.split(" ")[1];
  

//   if (token == null) return res.sendStatus(401);

//   JWT.verify(token,process.env.SECRET_JWT, (err, user) => {
//     console.log(err);

//     if (err) return res.sendStatus(403);

//     req.user = user;

//     next();
//   });
// };

