import React from "react";
import Presenter from "microcosm/addons/presenter";
import Button from "./Button";
import getTimeline, {getRedoRange} from "../get-timeline";

export default class PlanetsPresenter extends Presenter {
    state = {
        revision: 0,
    };

    getModel(props, state) {
        return {
            planets: data => data.planets,
            breadcrumbs: () => getTimeline(this.repo.history)
        };
    }

    undo = (clump) => {
        this.repo.history.toggle(clump.actions);

        // Force the model to recalculate
        this.setState({revision: this.state.revision + 1});
    };
    redo = (clump) => {
        this.repo.history.toggle(clump.actions);

        // Force the model to recalculate
        this.setState({revision: this.state.revision + 1});
    };

    render() {
        const { planets, breadcrumbs } = this.model;
        const [undo, redo] = getRedoRange(breadcrumbs);
        const onUndo = () => this.undo(undo);
        const onRedo = () => this.redo(redo);
        window.repo = this.repo;

        return (
            <div>
                <p>Revision number: {this.state.revision}</p>
                <PlanetInput />
                <p>{planets.join(", ")}</p>
                <button disabled={!undo} onClick={onUndo}>
                    Undo
                </button>
                <button disabled={!redo} onClick={onRedo}>
                    Redo
                </button>
            </div>
        );
    }
}

class PlanetInput extends React.Component {
    state = {
        planet: "0",
        nextPlanet: 1
    };

    reset = () => {
        this.setState({ planet: this.state.nextPlanet.toString(), nextPlanet: this.state.nextPlanet+1 });
    };
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Enter a planet"
                    onChange={e => {
                        this.setState({ planet: e.target.value });
                    }}
                    value={this.state.planet}
                />
                <Button planet={this.state.planet} reset={this.reset} />
            </div>
        );
    }
}
