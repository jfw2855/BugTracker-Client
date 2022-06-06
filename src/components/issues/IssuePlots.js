import Plot from 'react-plotly.js'



const IssuePlots = (props) => {

        const {statusValues,statusLabels,priorityLabels,priorityValues} = props

        let layout = {
                height: 350,
                width: 320,
                showlegend: true,
                paper_bgcolor:'transparent',
                }
        
        
        let statusChartData = [{
                values: statusValues,
                labels: statusLabels,
                name: 'Status Overview of Issues',
                hoverinfo: 'label+value',
                hole: 0.8,
                type: 'pie'
                }]
        let priorityChartData = [{
                values: priorityValues,
                labels: priorityLabels,
                name: 'Priority Overview of Issues',
                hoverinfo: 'label+value',
                hole: 0.8,
                type: 'pie'
                }]


	return (
        <>
        <Plot data={statusChartData} layout={layout} />
        <Plot data={priorityChartData} layout={layout}/>
        </>
	)
}

export default IssuePlots
