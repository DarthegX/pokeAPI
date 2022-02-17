import axios from 'axios';

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';

class PokeService {
    moves = [];

    constructor() { }

    getPokemonInformationByName(name) {
        const url = pokemonUrl + name;

        return axios.get(url, {}, {}).then(async (response) => {
            const movesResult = await this.getAllPokemonMoves(response.data.moves);
            const moves = movesResult.flat();

            const pokemon = {
                id: response.data.id,
                name: response.data.name,
                moves
            }

            return pokemon;
        })
    }


    async getAllPokemonMoves(moves) {
        let page = 0;
        let movesPage = moves.slice(page, page + 10);
        let movesResult = await this.get10PokemonMovesById(movesPage);
        let pokemonMoves = movesResult;

        while(page < moves.length) {
            page += 10;

            movesPage = moves.slice(page, page + 10);
            movesResult = await this.get10PokemonMovesById(movesPage);

            pokemonMoves.push(movesResult)
        }

        return pokemonMoves;
    }


    get10PokemonMovesById(movesPage) {
        const requests = movesPage.map(m => this.getPokemonMoveById(m.move.url));

        return Promise.all(requests).then((result) => {
            return result;
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

                resolve(move);
            }).catch((err) => {
                console.log('ERORR GETTING MOVE: ', err);

                reject(null);
            })
        });

}


export default PokeService;