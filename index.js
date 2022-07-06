const getCurrencies = require("./src/currencies");

const main = async () => {
    const date = process.argv[2];
    if (process.argv.length < 3 | date.length <= 4) {
        console.error("give me a date with month and day");
        process.exit(1)
    }

    return getCurrencies(date)
};

main().then((data) => console.log(JSON.stringify(data, null, 2)));
