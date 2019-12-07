import React from 'react';

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

export default PageNotes;