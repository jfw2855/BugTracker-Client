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
              'rgba(238, 238, 166, 0.7)',
              'rgba(238, 192, 42, 0.7)',
              'rgba(238, 83, 32, 0.7)',
              'rgba(239, 38, 51, 0.7)'
            ],
            line: {
                color: [
                  'rgba(238, 238, 166, 1)',
                  'rgba(238, 192, 42, 1)',
                  'rgba(238, 83, 32, 1)',
                  'rgba(239, 38, 51, 1)'
                ],
                width: 2
              }
            },
          type: 'bar',
          width: [0.5,0.5,0.5,0.5]
        }
      ]

    let layout = {
        title: {
          text:'Current Open Issues',
          y: 0.95,
          font: {
            family:'Arial, sans-serif',
            weight: 'bold',
            size: 24
          },
        },
        autosize: true,
        yaxis: {
          color:'black',
          autotick:false,
          tick0:0,
          dtick:1,
          autorange: true,
          tickfont: {
            size: 16,
            family: 'Arial, sans-serif',
          }
        },
        xaxis: {
          tickfont: {
            size: 16,
            family: 'Arial, sans-serif',
            autorange: true,
          },
        },
        margin: {
          l: 50,
          r: 50,
          b: 60,
          t: 50,
          pad: 7
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

