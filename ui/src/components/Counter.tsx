import * as React from 'react';

declare var counter;

class Counter extends React.Component<{},  {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>count:{counter.data.value}</div>
				<button onClick={() => counter.add(1)}>click!</button>
        <button onClick={() => counter.reset()}>clear!</button>
      </div>
    )
  }
}

export default Counter;