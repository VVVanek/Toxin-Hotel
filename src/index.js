const cache = {};

function importAll(r) {
   r.keys().forEach((key) => (cache[key] = r(key)));
}

importAll(require.context('/src/', true, /\.scss$/));
importAll(require.context('/src/', true, /\.js$/));