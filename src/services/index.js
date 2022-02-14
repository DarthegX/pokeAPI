import axios from 'axios';

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

class PokeService {
    moves = [];

    constructor() { }

    getPokemonInformationByName(name) {
        const url = pokemonUrl + name;
        return axios.get(url, {}, {}).then((response) => {
            const requests = response.data.moves.map(m => this.getPokemonMoveById(m.move.url))
            return Promise.all(requests).then((result) => {
                const pokemon = {
                    id: response.data.id,
                    name: response.data.name,
                    moves: result
                }
    
                return pokemon;
            })
        })
    }

    getPokemonMoveById = (url) =>
        new Promise((resolve, reject) => {
            axios.get(url, {}, {}).then((response) => {
                const move = {
                    id: response.data.id,
                    name: response.data.name,
                    power: response.data.power
                }

                console.log(move)
                resolve(move);
            }).catch((err) => {
                console.log('ERORR GETTING MOVE: ', err);

                reject(null);
            })
        });

}


export default PokeService;