class Undo {

    setup(repo) {
        this.repo = repo;
        repo.history.on('append', this.clean, this);
    }

    teardown(repo) {
        repo.history.off('append', this.clean, this);
    }

    clean(action) {
        // Get all undoable actions
        const actions = this.repo.history.toArray();

        // Remove the first, we always want to keep it
        actions.pop();

        // For each action, if it is disabled, remove it from the tree
        for (let i = actions.length - 1; i >= 0; i--) {
            const next = actions[i];

            if (next.disabled) {
                this.repo.history.remove(next);
            } else {
                break;
            }
        }

    }

}

export default Undo;
