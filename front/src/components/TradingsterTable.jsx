import { Table, Typography } from "antd"
import {
	ArrowDownOutlined,
	ArrowUpOutlined,
} from '@ant-design/icons';


const { Text } = Typography;

export const TradingsterTable = ({ currency }) => {
	const getNonComercialData = (assetManager, leveragedFunds) => {
		return {
			name: "Non-comercial",
			long: {
				positions: (assetManager.long.positions + leveragedFunds.long.positions).toFixed(2),
				openInt: (assetManager.long.openInt + leveragedFunds.long.openInt).toFixed(2),
			},
			short: {
				positions: (assetManager.short.positions + leveragedFunds.short.positions).toFixed(2),
				openInt: (assetManager.short.openInt + leveragedFunds.short.openInt).toFixed(2),
			}
		}

	}
	const getDataSource = (currency) => {
		const metrics = [...currency.metrics, (getNonComercialData(currency.metrics[0], currency.metrics[1]))];
		return metrics.map(metric => {
			return {
				name: metric.name,
				...getDataPerType(metric.long, 'long'),
				...getDataPerType(metric.short, 'short'),
			}
		})
	}

	const getDataPerType = (data, type) => {
		const obj = {}
		Object.entries(data).forEach(([key, value]) => obj[`${type}-${key}`] = value)
		return obj;
	}

	const columns = [
		{
			title: 'Metric',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			fixed: 'left',
		},
		{
			title: 'Long',
			dataIndex: 'long',
			key: 'long',
			children: [
				{
					title: 'Positions',
					dataIndex: 'long-positions',
					key: 'long-positions',
					width: 150,
					render: (text, record) => {
						const changes = record['long-changes'];
						return (
							<>
								{text} {' '}
								{changes &&
									<>
										<Text type={changes > 0 ? 'success' : 'danger'}>{changes > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {changes}</Text>
									</>
								}
							</>
						)
					}
				},
				{
					title: 'Open Int',
					dataIndex: 'long-openInt',
					key: 'long-openInt',
					width: 150,
				},
			],
		},
		{
			title: 'Short',
			dataIndex: 'short',
			key: 'short',
			children: [
				{
					title: 'Positions',
					dataIndex: 'short-positions',
					key: 'short-positions',
					width: 150,
					render: (text, record) => {
						const changes = record['short-changes'];
						return (
							<>
								{text} {' '}
								{changes &&
									<>
										<Text type={changes > 0 ? 'success' : 'danger'}>{changes > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {changes}</Text>
									</>
								}
							</>
						)
					}
				},
				{
					title: 'Open Int',
					dataIndex: 'short-openInt',
					key: 'short-openInt',
					width: 150,
				},
			],
		},
	];

	return (
		<Table dataSource={getDataSource(currency)} pagination={false} columns={columns} />
	)
}
