export function addPlanet(planet) {
    return planet;
}

export function getRedoRange(breadcrumbs) {
    let undo = null;
    let redo = null;
    const size = breadcrumbs.length;
    let i = size;
    let crumb;

    while (--i >= 0) {
        crumb = breadcrumbs[i];
        if (!crumb.disabled) {
            undo = crumb;
            break;
        }
    }

    while (++i < size) {
        crumb = breadcrumbs[i];
        if (crumb.disabled) {
            redo = crumb;
            break;
        }
    }

    return [undo, redo];
}

function isSameOperation(a, b) {
    const sameCommand = a.command === b.command;
    const sameTimeFrame = b.timestamp - a.timestamp < 600;
    const sameDisabled = a.disabled === b.disabled;

    return sameCommand && sameTimeFrame && sameDisabled;
}

class Breadcrumb {
    constructor(actions) {
        this.actions = actions;
    }

    get disabled() {
        return this.actions.every(action => action.disabled);
    }
}
function clump(list, fn) {
    if (list.length <= 0) {
        return [];
    }
    let cur = [list[0]];
    const clumps = [cur];
    for (let i = 0; i < list.length - 1; i++) {
        const last = list[i];
        const next = list[i + 1];

        if (fn(last, next)) {
            cur.push(next);
        } else {
            cur = [next];
            clumps.push(cur);
        }
    }
    return clumps;
}

export function getTimeline(history) {
    const actions = history.toArray();

    const valid = actions.filter(function(action) {
        return action.complete;
    });

    const clumps = clump(valid, isSameOperation);

    return clumps.map(c => new Breadcrumb(c));
}
