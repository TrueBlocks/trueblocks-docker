import React from 'react';

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value
    };
  }
  onFocus = () => {
    console.log('focus');
  };

  onBlur = () => {
    console.log('blur');
  };

  onChange = (event) => {
    this.setState({ val: event.target.value });
  };

  render = () => {
    return (
      <input
        style={{ height: '1.7em' }}
        type={'text'}
        onChange={this.onChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={this.state.val}
      />
    );
  };
}

export default EditableCell;
