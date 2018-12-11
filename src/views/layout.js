import React from "react";
import PlanetsPresenter from "../presenters/Planets";

export default function Layout({ children }) {
    return (
        <div>
            <PlanetsPresenter />
        </div>
    );
}
