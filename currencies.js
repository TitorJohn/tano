const fs = require("fs");

const getCurrencies = (date) => {
    const data = fs.readFileSync(`./files/${date}.txt`, "utf8");
    const rows = data.split("\n");
    rows.pop();
    const currecies = [];
    for (const row of rows) {
        const c = parseCurrency(row);
        currecies.push(c);
    }
    return currecies;
};

const parseCurrency = (row) => {
    const currency = {
        name: "CAD USD",
        openInterest: NaN,
        totalChange: NaN,
        contracts: "",
        metrics: [
            {
                name: "Asset Manager/Institutional",
                long: {
                    positions: NaN,
                    openInt: NaN,
                    changes: NaN,
                },
                short: {
                    positions: NaN,
                    openInt: NaN,
                    changes: NaN,
                },
            },
            {
                name: "Leveraged Funds",
                long: {
                    positions: NaN,
                    openInt: NaN,
                    changes: NaN,
                },
                short: {
                    positions: NaN,
                    openInt: NaN,
                    changes: NaN,
                },
            },
        ]

    };

    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const header = ['name', 'numberDate', 'date', 'CFTCCode', 'noClue1', 'noClue2', 'noClue3', 'openInterest'];
    currency.name = columns[0].trim();
    currency.openInterest = cleanNumber(columns[7]);
    currency.metrics[0].long.positions = cleanNumber(columns[8]);
    currency.metrics[0].short.positions = cleanNumber(columns[9]);
    // currency.metrics[0].spreading.positions = cleanNumber(columns[10]);
    currency.metrics[1].long.positions = cleanNumber(columns[11]);
    currency.metrics[1].short.positions = cleanNumber(columns[12]);
    // currency.metrics[1].spreading.positions = cleanNumber(columns[13]);
    currency.metrics[2].long.positions = cleanNumber(columns[14]);
    currency.metrics[2].short.positions = cleanNumber(columns[15]);
    // currency.metrics[2].spreading.positions = cleanNumber(columns[16]);
    /* Other reportables
    currency.metrics[3].short.changes = Number.parseFloat(columns[17].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[18].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[19].trim());
    */
    /* No clue 
    currency.something = Number.parseFloat(columns[20].trim());
    currency.something = Number.parseFloat(columns[21].trim());
    */
    /* Non reportables
     currency.metrics[3].short.changes = Number.parseFloat(columns[22].trim());
     currency.metrics[3].short.changes = Number.parseFloat(columns[23].trim());
     */
    currency.totalChange = cleanNumber(columns[24]);
    currency.metrics[0].long.changes = cleanNumber(columns[25]);
    currency.metrics[0].short.changes = cleanNumber(columns[26]);
    // currency.metrics[0].spreading.changes = cleanNumber(columns[27]);
    currency.metrics[1].long.changes = cleanNumber(columns[28]);
    currency.metrics[1].short.changes = cleanNumber(columns[29]);
    // currency.metrics[1].spreading.changes = cleanNumber(columns[30]);
    currency.metrics[2].long.changes = cleanNumber(columns[31]);
    currency.metrics[2].short.changes = cleanNumber(columns[32]);
    // currency.metrics[2].spreading.changes = cleanNumber(columns[33]);

    /* Other reportables
    currency.metrics[3].short.changes = Number.parseFloat(columns[34].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[35].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[36].trim());
    */
    /* No clue 
     currency.something = Number.parseFloat(columns[37].trim());
     currency.something = Number.parseFloat(columns[38].trim());
     */
    /* Non reportables
     currency.metrics[3].short.changes = Number.parseFloat(columns[39].trim());
     currency.metrics[3].short.changes = Number.parseFloat(columns[40].trim());
     */
    /* No clue 
     currency.something = Number.parseFloat(columns[41].trim());
     */
    currency.metrics[0].long.openInt = cleanNumber(columns[42]);
    currency.metrics[0].short.openInt = cleanNumber(columns[43]);
    // currency.metrics[0].spreading.openInt = cleanNumber(columns[44]);
    currency.metrics[1].long.openInt = cleanNumber(columns[45]);
    currency.metrics[1].short.openInt = cleanNumber(columns[46]);
    // currency.metrics[1].spreading.openInt = cleanNumber(columns[47]);
    currency.metrics[2].long.openInt = cleanNumber(columns[48]);
    currency.metrics[2].short.openInt = cleanNumber(columns[49]);
    // currency.metrics[2].spreading.openInt = cleanNumber(columns[50]);

    /* Other reportables
    currency.metrics[3].short.changes = Number.parseFloat(columns[51].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[52].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[53].trim());
    */
    /* No clue 
      currency.something = Number.parseFloat(columns[54].trim());
      currency.something = Number.parseFloat(columns[55].trim());
      */
    /* Non reportables
     currency.metrics[3].short.changes = Number.parseFloat(columns[56].trim());
     currency.metrics[3].short.changes = Number.parseFloat(columns[57].trim());
     */
    /* Other reportables
    currency.metrics[3].short.changes = Number.parseFloat(columns[68].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[69].trim());
    currency.metrics[3].short.changes = Number.parseFloat(columns[70].trim());
    */
    /* No clue 
       currency.something = Number.parseFloat(columns[71].trim());
       currency.something = Number.parseFloat(columns[72].trim());
       currency.something = Number.parseFloat(columns[73].trim());
       currency.something = Number.parseFloat(columns[74].trim());
       currency.something = Number.parseFloat(columns[75].trim());
       currency.something = Number.parseFloat(columns[76].trim());
       currency.something = Number.parseFloat(columns[77].trim());
       currency.something = Number.parseFloat(columns[78].trim());
       currency.something = Number.parseFloat(columns[79].trim());
       currency.something = Number.parseFloat(columns[80].trim());
       */
    currency.contracts = columns[81].trim();
    /* No clue 
     currency.something = Number.parseFloat(columns[82].trim());
     currency.something = Number.parseFloat(columns[83].trim());
     currency.something = Number.parseFloat(columns[84].trim());
     currency.something = Number.parseFloat(columns[85].trim());
     currency.something = Number.parseFloat(columns[86].trim());
     */

    return currency;
};

const cleanNumber = (string) => {
    const value = string.trim();
    return value === "." ? "." : Number.parseFloat(value);
};

module.exports = getCurrencies;
