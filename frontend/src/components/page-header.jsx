import React from 'react';
import './page-header.css';

//---------------------------------------------------------------------
class PageHeader extends React.Component {
  render = () => {
    return (
      <h1>
        {this.props.title}
        <PageNotes text={this.props.notes} />
      </h1>
    );
  };
}

//---------------------------------------------------------------------
class PageNotes extends React.Component {
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

export default PageHeader;
