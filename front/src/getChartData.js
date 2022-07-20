import currencies from '../../files/2022-05-10.json'

export function getChartData() {
	let colors = ['rgba(53, 162, 235, 0.5)', 'rgba(53, 162, 235, 0.5)', 'rgba(53, 162, 235, 0.5)'];
	const labels = ["long", "short"]

	const assetManager = currencies[0].metrics[0]
	const leveragedFunds = currencies[0].metrics[1]

	const assetManagerData = [assetManager.long.positions, assetManager.short.positions]
	const leveragedFundsData = [leveragedFunds.long.positions, leveragedFunds.short.positions]
	const nonComercialData = [
		assetManager.long.positions + leveragedFunds.long.positions,
		assetManager.short.positions + leveragedFunds.short.positions
	]

	const colorsLocalStorage = localStorage.getItem('colors');
	if (colorsLocalStorage) colors = JSON.parse(colorsLocalStorage);

	/*
	if(localStorage.getItem('colors') !== null){
			colors = JSON.parse(localStorage.getItem('colors'));
	}
	*/

	return {
		labels,
		datasets: [
			{
				label: 'Asset Manager',
				data: assetManagerData,
				backgroundColor: colors[0],
			},
			{
				label: 'Leveraged Funds',
				data: leveragedFundsData,
				backgroundColor: colors[1],
			},
			{
				label: 'Non-ComerciaL',
				data: nonComercialData,
				backgroundColor: colors[2],
			}
		],
	}
}
