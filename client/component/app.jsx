import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        {this.props.childeren}
      </div>
    );
  }
}

App.PropTypes = {
  childeren: PropTypes.object.isRequired,
};
export default App;
