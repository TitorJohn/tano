const fs = require("fs");

const currency = {
    name: "CAD USD",
    metrics: [
        {
            name: "Dealer Intermediary",
            long: {
                positions: 0,
                openInt: 0,
                traders: 0,
                changes: 0,
            },
            short: {
                positions: 0,
                openInt: 0,
                traders: 0,
                changes: 0,
            },
            spreading: {
                positions: 0,
                openInt: 0,
                traders: 0,
                changes: 0,
            }
        }
    ]

};

const main = async () => {
    const data = fs.readFileSync("./file.csv", "utf8");
    const rows = data.split("\r\n");

    const columns = rows[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    currency.name = columns[0];
    currency.metrics[0].long.positions = columns[8];
    currency.metrics[0].long.openInt = columns[9];
    currency.metrics[0].long.traders = columns[10];
    currency.metrics[0].long.changes = columns[11];
    currency.metrics[0].short.positions = columns[12];
    currency.metrics[0].short.openInt = columns[13];
    currency.metrics[0].short.traders = columns[14];
    currency.metrics[0].short.changes = columns[15];

    return currency;
};

main().then((data) => console.log(JSON.stringify(data, null, 2)));
