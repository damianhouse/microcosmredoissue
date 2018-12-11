import Microcosm from "microcosm";
import Planets from "./domains/Planets";

class Repo extends Microcosm {
    setup(options) {
        this.addDomain("planets", Planets);
    }
}

export default Repo;
