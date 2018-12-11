import React from "react";
import Presenter from "microcosm/addons/presenter";
import Button from "./Button";
import { getRedoRange, getTimeline } from "../actions/Planets";

export default class PlanetsPresenter extends Presenter {
    state = {
        revision: 0
    };

    getModel(props, state) {
        return {
            planets: data => data.planets,
            breadcrumbs: () => getTimeline(this.repo.history)
        };
    }

    undo = clump => {
        this.repo.history.toggle(clump.actions);

        this.setState({ revision: this.state.revision + 1 });
    };

    redo = clump => {
        this.repo.history.toggle(clump.actions);

        this.setState({ revision: this.state.revision + 1 });
    };

    render() {
        const { planets, breadcrumbs } = this.model;
        const [undo, redo] = getRedoRange(breadcrumbs);
        const onUndo = () => this.undo(undo);
        const onRedo = () => this.redo(redo);
        console.log(undo, redo, planets);
        // console.log(JSON.stringify(breadcrumbs, null, 4));

        return (
            <div>
                <p>State: {this.state.revision}</p>
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
    state = { planet: "" };

    reset = () => {
        this.setState({ planet: "" });
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
