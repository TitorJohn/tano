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
        data.assetManager.long = Object.values(currency.metrics[1].long)
        data.assetManager.short = Object.values(currency.metrics[1].short)
        data.leveragedFunds.long = Object.values(currency.metrics[2].long)
        data.leveragedFunds.short = Object.values(currency.metrics[2].short)

        for (const [i, v] of data.assetManager.long.entries()) {
            const long = data.leveragedFunds.long[i] + v
            data.nonComercial.long.push(long)
            const short = data.leveragedFunds.short[i] + data.assetManager.short[i]
            data.nonComercial.short.push(short)
        }

        setData(data)
    }, [data])

    return data && (
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th colspan="3" >Long</th>
                    <th colspan="3" >Short</th>
                </tr>
                <tr>
                    <th></th>
                    <th>Positions</th>
                    <th>Open Int</th>
                    <th>Traders</th>
                    <th>Change</th>
                    <th>Positions</th>
                    <th>Open Int</th>
                    <th>Traders</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Asset Manager/<br/>Institutional</strong></td>
                    {data.assetManager.long.map((value) => {
                        return <td>{value}</td>
                    })}
                    {data.assetManager.short.map((value) => {
                        return <td>{value}</td> 
                    })}
                </tr>
                <tr>
                    <td><strong>Leveraged<br/>Funds</strong></td>
                    {data.leveragedFunds.long.map((value) => {
                        return <td>{value}</td>
                    })}
                    {data.leveragedFunds.short.map((value) => {
                        return <td>{value}</td> 
                    })}
                </tr>
                <tr>
                    <td><strong>Non<br/>Comercial</strong></td>
                    {data.nonComercial.long.map((value) => {
                        return <td>{value}</td>
                    })}
                    {data.nonComercial.short.map((value) => {
                        return <td>{value}</td> 
                    })}
                </tr>
            </tbody>
        </table>
    )
}