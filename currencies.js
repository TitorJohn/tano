const fs = require("fs");

const getCurrencies = (date) => {
    const data = fs.readFileSync(`./files/${date}.txt`, "utf8");
    const rows = data.split("\n");
    rows.pop()
    const currecies = []
    for (const row of rows) {
        const c = parseCurrency(row)
        currecies.push(c)
    }
    return currecies
}

const parseCurrency = (row) => {
    const currency = {
        name: "CAD USD",
        openInterest: 0,
        totalChange: 0,
        totalTraders: 0,
        contracts: "",
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
            },
            {
                name: "Asset Manager/Institutional",
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
            },
            {
                name: "Leveraged Funds",
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
            },
        ]
    
    };

    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const header = ['name', 'numberDate', 'date', 'CFTCCode', 'noClue1', 'noClue2', 'noClue3', 'openInterest'];
    currency.name = columns[0].trim();
    currency.metrics[0].long.positions = Number.parseFloat(columns[8].trim());
    currency.metrics[0].short.positions = Number.parseFloat(columns[9].trim());
    currency.metrics[0].spreading.positions = Number.parseFloat(columns[10].trim());
    currency.metrics[1].long.positions = Number.parseFloat(columns[11].trim());
    currency.metrics[1].short.positions = Number.parseFloat(columns[12].trim());
    currency.metrics[1].spreading.positions = Number.parseFloat(columns[13].trim());
    currency.metrics[2].long.positions = Number.parseFloat(columns[14].trim());
    currency.metrics[2].short.positions = Number.parseFloat(columns[15].trim());
    currency.metrics[2].spreading.positions = Number.parseFloat(columns[16].trim());
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
    currency.totalChange = Number.parseFloat(columns[24].trim());
    currency.metrics[0].long.changes = Number.parseFloat(columns[25].trim());
    currency.metrics[0].short.changes = Number.parseFloat(columns[26].trim());
    currency.metrics[0].spreading.changes = Number.parseFloat(columns[27].trim());
    currency.metrics[1].long.changes = Number.parseFloat(columns[28].trim());
    currency.metrics[1].short.changes = Number.parseFloat(columns[29].trim());
    currency.metrics[1].spreading.changes = Number.parseFloat(columns[30].trim());
    currency.metrics[2].long.changes = Number.parseFloat(columns[31].trim());
    currency.metrics[2].short.changes = Number.parseFloat(columns[32].trim());
    currency.metrics[2].spreading.changes = Number.parseFloat(columns[33].trim());
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
    currency.metrics[0].long.openInt = Number.parseFloat(columns[42].trim());
    currency.metrics[0].short.openInt = Number.parseFloat(columns[43].trim());
    currency.metrics[0].spreading.openInt = Number.parseFloat(columns[44].trim());
    currency.metrics[1].long.openInt = Number.parseFloat(columns[45].trim());
    currency.metrics[1].short.openInt = Number.parseFloat(columns[46].trim());
    currency.metrics[1].spreading.openInt = Number.parseFloat(columns[47].trim());
    currency.metrics[2].long.openInt = Number.parseFloat(columns[48].trim());
    currency.metrics[2].short.openInt = Number.parseFloat(columns[49].trim());
    currency.metrics[2].spreading.openInt = Number.parseFloat(columns[50].trim());
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
    currency.totalTraders = Number.parseFloat(columns[58].trim());
    currency.metrics[0].long.traders = Number.parseFloat(columns[59].trim());
    currency.metrics[0].short.traders = Number.parseFloat(columns[60].trim());
    currency.metrics[0].spreading.traders = Number.parseFloat(columns[61].trim());
    currency.metrics[1].long.traders = Number.parseFloat(columns[62].trim());
    currency.metrics[1].short.traders = Number.parseFloat(columns[63].trim());
    currency.metrics[1].spreading.traders = Number.parseFloat(columns[64].trim());
    currency.metrics[2].long.traders = Number.parseFloat(columns[65].trim());
    currency.metrics[2].short.traders = Number.parseFloat(columns[66].trim());
    currency.metrics[2].spreading.traders = Number.parseFloat(columns[67].trim());
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
}

module.exports = getCurrencies