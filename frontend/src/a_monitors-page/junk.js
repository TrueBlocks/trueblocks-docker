//---------------------------------------------------------------------
class MonitorRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wasDelleted: false,
      isExpanded: false
    };
  }

  handleOldDel = (el) => {
    if (!this.state.wasDelleted) {
      this.setState({ wasDelleted: true, isExpanded: true });
      this.props.rm Monitor(this.props.address);
    }
  };

  handleToggle = () => {
    if (!this.state.wasDelleted) {
      this.setState({ isExpanded: !this.state.isExpanded });
    }
  };

  render = () => {
    const dxisplayName =
      (this.props.group ? this.props.group + ': ' : '') + (this.props.name ? this.props.name : this.props.address);
    const exthBal = fmtDouble(this.props.curEther, 18);
    const f = fmtInteger(this.props.firstAppearance);
    const l = fmtInteger(this.props.latestAppearance);
    const d = fmtInteger(this.props.latestAppearance - this.props.firstAppearance);
    const n = fmtInteger(this.props.nRecords);
    const b = fmtInteger(
      (Math.floor((this.props.latestAppearance - this.props.firstAppearance) / this.props.nRecords) * 100) / 100
    );
    const m = fmtInteger(this.props.sizeInBytes);

    var expanded;
    if (this.state.isExpanded) {
      expanded = (
        <div>
          <div>
            {this.props.name ? <li>{this.props.name}</li> : null}
            {this.props.group ? (
              <li>{this.props.subgroup ? this.props.group + '/' + this.props.subgroup : this.props.group}</li>
            ) : null}
            <li>{this.props.address}</li>
            {this.props.curEther !== 'n/a' ? <li>Ether balance = {this.props.curEther}</li> : null}
            <li>firstAppearance = {f}</li>
            <li>latestAppearance = {l}</li>
            <li>diff = {d}</li>
            <li>interval = {b}</li>
            <li>nRecords = {n}</li>
            <li>fileSize = {m} bytes</li>
          </div>
          <div>This is where I want the charts</div>
        </div>
      );
    }

    return (
      <div>
        <div onClick={this.handleToggle}>
          <div>{this.props.index}</div>
          <div>{dxisplayName}</div>
          <div>
            {f} / {l} / {d} / {n} / {b} / {m}
          </div>
          <div>{exthBal} eth </div>
          <div onClick={this.handleOldDel}>
            <img alt={trash} src={trash} width="10px" />
          </div>
        </div>
        {expanded}
      </div>
    );
  };
}
