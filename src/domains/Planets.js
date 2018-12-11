import { addPlanet } from "../actions/Planets";
const Planets = {
    getInitialState() {
        return ["Earth"];
    },
    register() {
        return {
            [addPlanet]: [this.append]
        };
    },
    append(planets, params) {
        return planets.concat(params);
    }
};

export default Planets;
