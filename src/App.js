import React, { Component } from 'react';
import "./style/styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <div class="main-container">
          <h3 class="app-header">FYP<span>help.</span></h3>
          <div class="search-engine">
            <div class="search-icon"></div>
            <input type="text" placeholder="Search disease" class="input-field" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
