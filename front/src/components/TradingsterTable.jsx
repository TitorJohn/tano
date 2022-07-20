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
            data.nonComercial.long.push(long.toFixed(2))
            const short = data.leveragedFunds.short[i] + data.assetManager.short[i]
            data.nonComercial.short.push(short.toFixed(2))
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
                    <th className="tableDivision"></th>
                    <th>Positions</th>
                    <th>Open Int</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Asset Manager/<br/>Institutional</strong></td>
                    <td>{data.assetManager.long[0]}
                    <br></br>
                    <span>{data.assetManager.long[2]}</span>
                    </td>
                    <td>{data.assetManager.long[1]}</td>
                    <td className="tableDivision"></td>
                    <td>{data.assetManager.short[0]}
                    <br></br>
                    <span>{data.assetManager.short[2]}</span>
                    </td>
                    <td>{data.assetManager.short[1]}</td>
                </tr>
                <tr>
                    <td><strong>Leveraged<br/>Funds</strong></td>
                    <td>{data.leveragedFunds.long[0]}
                    <br></br>
                    <span>{data.leveragedFunds.long[2]}</span>
                    </td>
                    <td>{data.leveragedFunds.long[1]}</td>
                    <td className="tableDivision"></td>
                    <td>{data.leveragedFunds.short[0]}
                    <br></br>
                    <span>{data.leveragedFunds.short[2]}</span>
                    </td>
                    <td>{data.leveragedFunds.short[1]}</td>
                </tr>
                <tr>
                    <td><strong>Non<br/>Comercial</strong></td>
                    <td>{data.nonComercial.long[0]}
                    <br></br>
                    <span>{data.nonComercial.long[2]}</span>
                    </td>
                    <td>{data.nonComercial.long[1]}</td>
                    <td className="tableDivision"></td>
                    <td>{data.nonComercial.short[0]}
                    <br></br>
                    <span>{data.nonComercial.short[2]}</span>
                    </td>
                    <td>{data.nonComercial.short[1]}</td>
                </tr>
            </tbody>
        </table>
    )
}