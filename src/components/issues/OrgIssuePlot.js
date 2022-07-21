import Plot from 'react-plotly.js'

const OrgIssuePlot = (props) => {
    
    const {data} = props
    let [low,medium,high,critical,open] = Array(5).fill(0)

    //loops through to create current open issue chart
    for (let i in data) {
        if (data[i].status === "closed") continue
        data[i].priority === "low"?low+=1:
        data[i].priority === "medium"?medium+=1:
        data[i].priority === "high"?high+=1:critical+=1

        open+=1
    }

    //plots bar chart of priority issue data
    let plotData = [
        {
          x: ['Low', 'Medium', 'High','Critical'],
          y: [`${low}`,`${medium}`, `${high}`, `${critical}`],
          marker: {
              color: [
              'rgba(238, 238, 166, 0.809)',
              'rgba(238, 192, 42, 0.828)',
              'rgba(238, 83, 32, 0.828)',
              'rgba(239, 38, 51, 0.891)'
            ]
            },
          type: 'bar',
        }
      ]

    let layout = {
        title: 'Current Open Issues',
        autosize: true,
        titlefont: {
          size: 25
        },
        yaxis: {
          color:'black',
          autotick:false,
          tick0:0,
          dtick:1,
          autorange: true,
          tickfont: {
            size: 18,
            family: 'Arial, sans-serif',
          }
        },
        xaxis: {
          tickfont: {
            size: 18,
            family: 'Arial, sans-serif',
            autorange: true
          }
        }
    }

    let config = {
      displayModeBar: false,
      staticPlot: true
    }


	return (
      <>
        {
          open > 0?
          <div className='plotdata-container'>
            <Plot
              data={plotData}
              layout={layout}
              config={config}
              style={{width:"100%",height:"100%"}}
              useResizeHandler={true}/>
          </div>
          :
          <div className='plotdata-container blurr'>
            <span className='no-issue-msg noselect'>
              No Open Issues
            </span>

          </div>
          

        }
      </>
	)
}

export default OrgIssuePlot

