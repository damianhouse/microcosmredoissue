/**
 * We don't care about every single action, only things undoable in
 * the canvas.
 */

import {get} from 'microcosm';
import {clump} from './array';

export const TIMEFRAME = 1;

function isSameOperation(a, b) {
    // Clump together actions of the same type
    const sameCommand = a.command === b.command;
    // Clump together actions within a time period
    const sameTimeframe = (b.timestamp - a.timestamp) < TIMEFRAME;
    // Never clump together actions where one is disabled and the other is not
    const sameDisabled = a.disabled === b.disabled;

    return sameDisabled && sameCommand && sameTimeframe;
}


export function getDisplayName(action) {
    const displayName = get(action, 'command.getDisplayName', () => 'Change');

    return displayName(action.payload);
}

class Breadcrumb {
    constructor(actions) {
        this.actions = actions;
    }

    get disabled() {
        return this.actions.every(action => action.disabled);
    }

    toString() {
        return getDisplayName(this.actions[0]);
    }
}

export default function getTimeline(history) {
    const actions = history.toArray();

    // Reduce down history to only the types that we care about
    const valid = actions.filter(function(action) {
        return action.is('done');
    });

    // Then clump together those actions so they can be reversed in batches
    const clumps = clump(valid, isSameOperation);

    // Finally, build display friendly breadcrumb for every clump
    return clumps.map(c => new Breadcrumb(c));
}

export function getRedoRange(breadcrumbs) {
    let redo = null;
    let undo = null;
    const size = breadcrumbs.length;

    let i = size;
    let crumb;
    // Starting from the head, move backwards until we find
    // an action that is not disabled. This is the the undo point
    while (--i >= 0) {
        crumb = breadcrumbs[i];

        if (!crumb.disabled) {
            undo = crumb;
            break;
        }
    }

    // Now that we know when to undo, redo is the next
    // disabled action after undo
    while (++i < size) {
        crumb = breadcrumbs[i];

        if (crumb.disabled) {
            redo = crumb;
            break;
        }
    }

    return [undo, redo];
}
