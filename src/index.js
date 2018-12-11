import "./style/application.css";
import React from "react";
import DOM from "react-dom";
import Repo from "./repo";
import Application from "./presenters/application";
import Presenter from "microcosm/addons/presenter";

// Do anything on startup here
const repo = new Repo({ maxHistory: Infinity });

// Then mount the application
DOM.render(
    <Presenter repo={repo}>
        <Application />
    </Presenter>,
    document.getElementById("root")
);
