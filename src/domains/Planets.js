import { addPlanet } from "../actions/Planets";
class Planets {

    getInitialState() {
        return [];
    }

    append(planets, params) {
        return planets.concat(params);
    }

    replace(blocks, {oldBlock, newBlock}) {
        console.log('replace');
    }

    register() {
        return {
            [addPlanet]: this.append
        };
    }


}

export default Planets;
