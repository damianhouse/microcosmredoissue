import React from "react";
import { addPlanet } from "../actions/Planets";
import withSend from "microcosm/addons/with-send";

export default withSend(function Button({ send, planet, reset }) {
    const _actionSend = string => {
        if (string) {
            send(addPlanet, planet);
            reset();
        }
    };
    return <button onClick={() => _actionSend(planet)}>Add Planet</button>;
});
