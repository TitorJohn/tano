const getCurrencies = require("./currencies");

const main = async () => {
    return getCurrencies("2022-05-10")
};

main().then((data) => console.log(JSON.stringify(data, null, 2)));
