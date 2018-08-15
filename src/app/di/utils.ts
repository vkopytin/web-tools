function kvp(obj) {
    const res: Array<{key, value}> = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res.push({
                key: key,
                value: obj[key]
            });
        }
    }
    return res;
}

const inject = (modelInfo: { [key: string]: Constructor }) => {
    const [{ key, value }] = kvp(modelInfo),
        inst = new value();
    return (target, propName: string) => {
        target[propName] = inst;
    }
};

export {
    kvp,
    inject
};
