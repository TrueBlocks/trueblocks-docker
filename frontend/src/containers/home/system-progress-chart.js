import React from 'react'

const SystemProgressChart = (props) => {

    // const ripe = props.chainStatus.ripe;
    const unripe = props.chainStatus.unripe;
    const finalized = props.chainStatus.finalized;
    const clientHead = (props.chainStatus.client == "n/a" ? unripe : props.chainStatus.client);

    const rows = Math.ceil(clientHead / 1e6)
    const cols = 10

    const chart = (
        <div className='chart-container'>
            <div className='y-axis grid'></div>
            {[...Array(cols).keys()].map((col, colI) => {
                return <div className='y-axis grid' key={`x${col}`}>{col * 1e5}</div>
            })}
            {[...Array(rows).keys()].map((row, rowI) => {
                return (
                    <React.Fragment key={`x${row}`}>
                        <div className='x-axis grid'>{row * 1e6}</div>
                        {[...Array(cols).keys()].map((col, colI) => {
                            let indexClass
                            if (finalized >= row * 1e6 + (col + 1) * 1e5) {
                                indexClass = 'finalized'
                            } else if (finalized >= row * 1e6 + col * 1e5) {
                                indexClass = 'in-progress'
                            } else {
                                indexClass = 'inactive'
                            }
                            return (
                                <div className='grid' key={`x${row}x${col}`}>
                                    <div className={`filling ${indexClass}`}>
                                        {indexClass === 'finalized' && '✔'}
                                    </div>
                                </div>
                            )
                        })}
                    </React.Fragment>
                )
            })
            }
        </div>
    )

    return (
        <div>
            {/* <ZoomOnIndex {...props} start={26e5} n={1e5}/> */}
            {chart}
        </div>
    )
}

export default SystemProgressChart
