const getCurrencies = require("./src/currencies");

const main = async () => {
    return getCurrencies("2021")
};

main().then((data) => console.log(JSON.stringify(data, null, 2)));
