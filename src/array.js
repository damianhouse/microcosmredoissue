export function pairs(list) {
    const temp = list.slice();
    const arr = [];

    while (temp.length) {
        arr.push(temp.splice(0, 2));
    }

    return arr;
}

export function unique(list, fn) {
    const results = list.map(fn);

    return list.filter(function(item, i) {
        return results.indexOf(results[i]) === i;
    });
}

export function clump(list, fn) {
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

export function move(list, from, to) {
    const listCopy = list.slice(0);

    listCopy.splice(to, 0, listCopy.splice(from, 1)[0]);

    return listCopy;
}
