const fs = require("fs");
const axios = require('axios');
const unzipper = require("unzipper");
const parseCurrency = require("./parse");
const { writeFile, unlink } = require("fs/promises");

const fetchZip = async (reportYear) => {
    return await axios({
        method: 'get',
        //url: "https://www.cftc.gov/files/dea/history/com_fin_txt_"+reportYear+".zip",
        url: "https://www.cftc.gov/files/dea/history/fut_fin_txt_"+reportYear+".zip",
        responseType: 'stream'
        })
    .then(res => {
        return new Promise((resolve,reject) =>{
            res.data.pipe(unzipper.Parse())
            .on("entry", (entry) => {
                entry.pipe(
                    fs.createWriteStream(__dirname + "/../files/"+reportYear+".txt")
                ).on("error", reject);
            })
            .on("error", reject)
            .on("finish", resolve);
            
        })
    })
    .catch(console.error)
}

const parseDateFile = (date) => {
    const data = fs.readFileSync(__dirname + `/../files/${date}.txt`, "utf8");
    const rows = data.split("\n");
    rows.pop();
    const currecies = [];
    for (const row of rows) {
        const c = parseCurrency(row);
        currecies.push(c);
    }
    return currecies
}

const parseYearFile = (year) => {
    const data = fs.readFileSync(__dirname + `/../files/${year}.txt`, "utf8");
    const rows = data.split("\n");
    rows.pop();
    rows.shift();
    const currecies = [];
    for (const row of rows) {
        const c = parseCurrency(row);
        currecies.push(c);
    }
    return currecies
}

const createFiles = async (yearJson) => {
    // sort / filter by date
    // forEach date write array

    const files = {}
    // for, push into date array, at the end write file with array
    for (const row of yearJson) {
        if (!files[row.date]) {
            files[row.date] = []
        }
        files[row.date].push(row)
    }

    for await (const file of Object.keys(files)) {
        await writeFile(__dirname + `/../files/${file}.json`, JSON.stringify(files[file], null, 2))
    }
    const filename = (new Date(yearJson[0].date)).getFullYear()
    await unlink(__dirname + `/../files/${filename}.txt`);
    
}

const getCurrencies = async (date) => {
    try {
        return parseDateFile(date)
    } catch (e) {
        const reportYear = (new Date(date)).getFullYear()
        await fetchZip(reportYear)
        const yearJson = parseYearFile(reportYear)
        return await createFiles(yearJson)
    }
};

module.exports = getCurrencies;
