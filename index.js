const getCurrencies = require("./src/currencies");

const main = async () => {
    return getCurrencies("2022-05-17")
};

main().then((data) => console.log(JSON.stringify(data, null, 2)));
