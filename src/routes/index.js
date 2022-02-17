import express from 'express';
import NodeCache from 'node-cache';
import PokeService from '../services/index.js';

const indexRouter = express.Router();
const cache = new NodeCache();
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
 * /:name: 
 *   get: 
 *     description: Get information about a pokemon
 *     url parameters: 
 *       - name: PokemonName 
 *     responses:  
 *       200: 
 *         description: Success
 *       500:
 *         description: Server Error
 */
indexRouter.get('/:name', (req, res) => {
  const { name } = req.params;

  if(cache.has(name)) {
    const pokemon = cache.get(name);

    return res.status(200).json(pokemon);
  }

  pokeService.getPokemonInformationByName(name).then((result) => {
    cache.set(name, result);

    return res.status(200).json(result)
  }).catch(err => {
    res.status(500).json({ error: err })
  });
})

export default indexRouter;
