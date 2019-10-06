import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { humanFileSize } from '../../helpers/filesize'
import { getIndexData } from '../../modules/getIndexData'
import Loading from '../common/loading'
import * as d3 from 'd3'

const IndexProgress = React.memo((props) => {

    let status
    if (props.isLoading) {
        status = "loading"
    }
    if (props.error) {
        status = "error"
    } else if (props.systemData.caches === undefined && props.chainStatus.finalized === undefined) {
        status = "initializing"
    } else {
        status = "ready"
    }

    let container
    switch (status) {
        case "ready":
            const size = humanFileSize(props.systemData.caches[0].sizeInBytes)
            const nFiles = props.systemData.caches[0].nFiles
            container = (
                <div>
                    <SystemProgressChart {...props} />
                    <div className='fun-facts'>
                        <div>
                            Index Size: {size}
                        </div>
                        <div>
                            Number of index files: {nFiles}
                        </div>
                    </div>
                </div>
            )
            break;
        case "initializing":
            container = <Loading status={status} message="Initializing..." />
            break;
        case "error":
            container = <Loading status={status} message={props.error} />
            break;
        default:
            container = <Loading status={status} message="Loading..." />
    }
    return (
        <div className="system-progress">
            <h1>Index Progress</h1>
            <p>
                The index is a set of files that save appearances in the form blockNumber, transactionId, traceId, address.
                These files are roughly the same size.
                You can set some options about this in the Settings tab.
            </p>
            {container}
        </div>
    )
})

class SystemProgressChart extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            zoomStart: undefined
        }
    }

    // const ripe = props.chainStatus.ripe;
    unripe = this.props.chainStatus.unripe;
    finalized = this.props.chainStatus.finalized;
    clientHead = (this.props.chainStatus.client == "n/a" ? this.unripe : this.props.chainStatus.client);

    rows = Math.ceil(this.clientHead / 1e6)
    cols = 10

    zoom = (zoomStart) => {
        this.setState({ ...this.state, zoomStart })
    }

    chart = (
        <div className='chart-container'>
            <div className='y-axis grid'></div>
            {[...Array(this.cols).keys()].map((col, colI) => {
                return <div className='y-axis grid' key={`x${col}`}>{col * 1e5}</div>
            })}
            {[...Array(this.rows).keys()].map((row, rowI) => {
                return (
                    <React.Fragment key={`x${row}`}>
                        <div className='x-axis grid'>{row * 1e6}</div>
                        {[...Array(this.cols).keys()].map((col, colI) => {
                            let indexClass
                            if (this.finalized >= row * 1e6 + (col + 1) * 1e5) {
                                indexClass = 'finalized'
                            } else if (this.finalized >= row * 1e6 + col * 1e5) {
                                indexClass = 'in-progress'
                            } else {
                                indexClass = 'inactive'
                            }
                            return (
                                <div className='grid' key={`x${row}${col}`}>
                                    <div className={`filling ${indexClass}`} onClick={() => this.zoom(row * 1e6 + col * 1e5)}>
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
    render() {
        return (
            <div>
                <ZoomOnIndex {...this.props} start={this.state.zoomStart} n={1e5} />
                {this.chart}
            </div>
        )
    }
}

const ZoomOnIndex = (props) => {
    const hasData = props.indexData.items !== undefined
    let readyContainer
    switch (hasData) {
        case true:
            const data = props.indexData.items.filter(item =>
                item.path.startsWith('finalized') &
                item.firstAppearance >= props.start &
                item.firstAppearance < props.start + props.n
            )
            readyContainer = (
                <div>
                    <PartitionChart data={data} />
                </div>
            )
            break;
        default:
            if (!props.loadingIndex)
                props.getIndexData()
            readyContainer = <div></div>
    }

    return (
        <div>{readyContainer}</div>
    )
}

class PartitionChart extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            chart: {}
        }
        this.myRef = React.createRef();
    }

    chart = (el, data) => {
        console.log(data)
        let chart = {
            el,
            margin: { top: 20, right: 0, bottom: 30, left: 40 }
        }

        chart.height = 300
        chart.width = 500

        chart.x = d3.scaleBand()
            .domain(data.map(d => d.x))
            .range([chart.margin.left, chart.width - chart.margin.right])
            .padding(0.1)

        chart.y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)]).nice()
            .range([chart.height - chart.margin.bottom, chart.margin.top])

        chart.xAxis = g => g
            .attr("transform", `translate(0,${chart.height - chart.margin.bottom})`)
            .call(d3.axisBottom(chart.x).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())

        chart.yAxis = g => g
            .attr("transform", `translate(${chart.margin.left},0)`)
            .call(d3.axisLeft(chart.y))
            .call(g => g.select(".domain").remove())

        chart.svg = d3.select(el)
            .append("svg")
            .attr("viewBox", [0, 0, chart.width, chart.height]);

            chart.svg.append("g")
            .attr("class", "x axis")
            .call(chart.xAxis);

        chart.svg.append("g")
            .attr("class", "y axis")
            .call(chart.yAxis);

        this.setState({ chart })
    }

    update = (el, data, chart) => {
        console.log("update")

        chart.x = d3.scaleBand()
            .domain(data.map(d => d.x))
            .range([chart.margin.left, chart.width - chart.margin.right])
            .padding(0.1)

        chart.y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)]).nice()
            .range([chart.height - chart.margin.bottom, chart.margin.top])

        // chart.xAxis = g => g
        //     .attr("transform", `translate(0,${chart.height - chart.margin.bottom})`)
        //     .call(d3.axisBottom(chart.x).tickSizeOuter(0))
        //     .call(g => g.select(".domain").remove())

        // chart.yAxis = g => g
        //     .attr("transform", `translate(${chart.margin.left},0)`)
        //     .call(d3.axisLeft(chart.y))
        //     .call(g => g.select(".domain").remove())

        let bars = chart.svg.selectAll(".bar")
            .data(data)

        bars
        .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr("fill", "steelblue")
            .attr('width', chart.x.bandwidth())
            .attr('height', 0)
            .attr('x', d => chart.x(d.x))
            .attr('y', chart.height)
            .join(bars)
            .transition()
            .duration(750)
            .attr("height", d => chart.y(0) - chart.y(d.y))
            .attr("width", chart.x.bandwidth())
            .attr("x", d => chart.x(d.x))
            .attr("y", d => chart.y(d.y))

        bars.exit()
            .transition()
            .duration(750)
            .attr('height', 0)
            .attr('y', chart.height)
            .remove()

        // transition x axis
        chart.svg.selectAll(".x.axis")
            .transition()
            .duration(750)
            .call(d3.axisBottom(chart.x).ticks(3));

        // transition y axis
        chart.svg.selectAll(".y.axis")
            .transition()
            .duration(750)
            .call(d3.axisLeft(chart.y).ticks(3));

        this.setState({chart})

        // chart.svg.append("g")
        // .attr("fill", "steelblue")
        // .selectAll("rect")
        // .data(data)
        // .join("rect")
        // .attr("x", d => chart.x(d.x))
        // .attr("y", d => chart.y(d.y))
        // .attr("height", d => chart.y(0) - chart.y(d.y))
        // .attr("width", chart.x.bandwidth());

        // chart.svg.append("g")
        //     .call(chart.xAxis);

        // chart.svg.append("g")
        //     .call(chart.yAxis);
    }

    transform = (data) => data.map(item => {
        return { x: item.firstAppearance, y: item.nAddresses }
    }
    )

    componentDidMount = () => {
        let el = this.myRef.current
        this.props.data.length > 0 && this.chart(el, this.transform(this.props.data))
    }

    componentDidUpdate = (prevProps) => {
        let el = this.myRef.current
        this.state.chart.el !== undefined && this.update(el, this.transform(this.props.data), this.state.chart)
        // this.state.chart.el === undefined && this.props.data.length > 0 && this.chart(el, this.transform(this.props.data))
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return this.props.data[0].firstAppearance !== nextProps.data[0].firstAppearance
    }

    render() {
        return (
            <div ref={this.myRef}>
            </div>
        )
    }
}

const mapStateToProps = ({ systemStatus, getIndexData }) => (
    {
        systemData: systemStatus.systemData,
        chainStatus: systemStatus.chainStatus,
        isLoading: systemStatus.isLoading,
        error: systemStatus.error,
        indexData: getIndexData.indexData,
        loadingIndex: getIndexData.isLoading
    }
)

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            getIndexData
        },
        dispatch
    )

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(IndexProgress)
