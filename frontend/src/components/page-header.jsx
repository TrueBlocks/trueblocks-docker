import React from 'react';
import './page-header.css';

//---------------------------------------------------------------------
export class InnerPageHeader extends React.Component {
  render = () => {
    return (
      <h1>
        {this.props.title}
        <InnerPageNotes text={this.props.notes} />
      </h1>
    );
  };
}

//---------------------------------------------------------------------
class InnerPageNotes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    };
  }

  render(props) {
    return <div className="page-notes">{this.state.text}</div>;
  }
}
