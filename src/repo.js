import Microcosm from "microcosm";
import Planets from "./domains/Planets";
import Undo from "./effects/undo";

class Repo extends Microcosm {
    setup(options) {
        this.addDomain("planets", Planets);
        this.addEffect(Undo);
    }
}

export default Repo;
