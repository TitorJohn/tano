import { useEffect, useState } from "react"

export const TradingsterTable = ({currency}) => {
    const [data, setData ] = useState()

    useEffect(() => {
        const data = {
            assetManager: {},
            leveragedFunds: {},
            nonComercial: {
                long: [],
                short: [],
            },
        }
        data.assetManager.long = Object.values(currency.metrics[0].long)
        data.assetManager.short = Object.values(currency.metrics[0].short)
        data.leveragedFunds.long = Object.values(currency.metrics[1].long)
        data.leveragedFunds.short = Object.values(currency.metrics[1].short)

        for (const [i, v] of data.assetManager.long.entries()) {
            const long = data.leveragedFunds.long[i] + v
            data.nonComercial.long.push(long)
            const short = data.leveragedFunds.short[i] + data.assetManager.short[i]
            data.nonComercial.short.push(short)
        }

        setData(data)
    }, [currency.name])

    return data && (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th colSpan="3" >Long</th>
                    <th colSpan="3" >Short</th>
                </tr>
                <tr>
                    <th></th>
                    <th>Positions</th>
                    <th>Open Int</th>
                    <th>Traders</th>
                    <th className="tableDivision">Change</th>
                    <th>Positions</th>
                    <th>Open Int</th>
                    <th>Traders</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Asset Manager/<br/>Institutional</strong></td>
                    {data.assetManager.long.map((value,index) => {
                        if(index === data.assetManager.long.length - 1){
                            return <td key={index} className="tableDivision">{value}</td>
                        }
                        return <td key={index}>{value}</td>
                    })}
                    {data.assetManager.short.map((value,index) => {
                        return <td key={index}>{value}</td> 
                    })}
                </tr>
                <tr>
                    <td><strong>Leveraged<br/>Funds</strong></td>
                    {data.leveragedFunds.long.map((value,index) => {
                        if(index === data.leveragedFunds.long.length - 1){
                            return <td key={index} className="tableDivision">{value}</td>
                        }
                        return <td key={index}>{value}</td>
                    })}
                    {data.leveragedFunds.short.map((value,index) => {
                        return <td key={index}>{value}</td> 
                    })}
                </tr>
                <tr>
                    <td><strong>Non<br/>Comercial</strong></td>
                    {data.nonComercial.long.map((value,index) => {
                        if(index === data.nonComercial.long.length - 1){
                            return <td key={index} className="tableDivision">{value}</td>
                        }
                        return <td key={index}>{value}</td>
                    })}
                    {data.nonComercial.short.map((value,index) => {
                        return <td key={index}>{value}</td> 
                    })}
                </tr>
            </tbody>
        </table>
    )
}