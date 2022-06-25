const { getFiles } = require("./fetchHistory");

const cli = async () => {
    const year = process.argv[2];

    if (year >= 2021) {
        return getFiles(year);
    }

    return "I don't have that, ask for a year";
}

cli().then(console.log).catch(console.error)
