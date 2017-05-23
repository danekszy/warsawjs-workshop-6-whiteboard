import React from 'react';

export default class ListObjects extends React.Component {
  render () {
    const json = JSON.stringify(this.props, 2);
    return <div>{json}</div>
  }
}
// ListObjects.propTypes = {
//   list: React.PropTypes.object,
//   todos: React.PropTypes.array,
//   loading: React.PropTypes.bool,
//   listExists: React.PropTypes.bool,
// };
