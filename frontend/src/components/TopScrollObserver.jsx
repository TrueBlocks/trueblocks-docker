import React from 'react';

export class TopScrollObserver extends React.Component {
  constructor(props) {
    super(props);

    this.targetRef = React.createRef();
    this.observer = new IntersectionObserver((entries) => {
      const [firstEntry] = entries;

      props.onTopScroll(firstEntry.intersectionRatio < 1);
    });
  }

  render() {
    return <div ref={this.targetRef}></div>;
  }

  componentDidMount() {
    this.observer.observe(this.targetRef.current);
  }
}
