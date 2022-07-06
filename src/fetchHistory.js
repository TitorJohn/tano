const axios = require("axios")
const writeFile = require("fs/promises");

// TODO: fetch or calculate available dates instead of this
const index = {
    "2022": "2022-01-04",
    "2021": "2021-01-05",
}

const getNDaysDifference = (date, n) => {
    const res = date;
    res.setDate(date.getDate() + n);
    return res;
};

const toDate = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
};

const getAllDates = (firstDate) => {
    const today = new Date(Date.now())
    const thisYear = today.getFullYear()
    const dates = []
    let current = new Date(toDate(firstDate))

    if (current.getFullYear() === thisYear) {
        while (current <= today) {
            dates.push(current)
            current = getNDaysDifference(current, 7)
        }
        return dates
    }

    while (current.getFullYear() <= firstDate.getFullYear()) {
        dates.push(current)
        current = getNDaysDifference(current, 7)
    }
    return dates
}

const getReportDate = (date) => {
    const stringDate = toDate(date)
    const [year, month, day] = stringDate.split("-")
    return `${day}${month}${year.slice(2,4)}`
}

const fetchDateFile = async (date) => {
    const year = date.getFullYear()
    const reportDate = getReportDate(date)
    return axios(`https://www.cftc.gov/sites/default/files/files/dea/cotarchives/${year}/futures/financial_lf${reportDate}.htm`).catch((e) => {
        console.error(reportDate, e.message)
    }).then((res) => {
        return res.data
    })
}

const getFiles = async (year) => {
    const firstDate = new Date(index[year]);
    let dates = getAllDates(firstDate)
    dates = dates.unshift()
    for await (const date of dates) {
        const htm = await fetchDateFile(date)
        console.log()
        await writeFile("test.txt")
    }
    
    return dates
}
//https://www.cftc.gov/sites/default/files/files/dea/cotarchives/2022/futures/financial_lf010422.htm

module.exports = {
    getFiles
};