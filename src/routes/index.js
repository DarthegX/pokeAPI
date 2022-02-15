import express from 'express';
import PokeService from '../services/index.js';

const indexRouter = express.Router();
const pokeService = new PokeService();

            
/** 
 * @swagger 
 * /: 
 *   get: 
 *     description: Get checking of Poke Server
 *     responses:  
 *       200: 
 *       description: Success  
 *   
 */ 
indexRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hi! Welcome at Poke Server. :)' })
})


/** 
 * @swagger 
 * /{name}: 
 *   get: 
 *     description: Get information about a pokemon
 *     url parameters: 
 *       - name: PokemonName 
 *     responses:  
 *       200: 
 *         description: Success
 */
indexRouter.get('/:name', (req, res) => {
  const { name } = req.params;
  pokeService.getPokemonInformationByName(name).then((result) => {
    return res.status(200).json({ result })
  }).catch(err => res.status(500).json({ error: err }));
})

export default indexRouter;
