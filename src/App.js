import React, { Component } from 'react';
import "./style/styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: []
    }
  }

  handleQueryInput(e) {
    e.persist();
    let value = e.target.value;

    if(value === "")
      return this.setState({ results: [] });
    //fetch data with user query input
    fetch(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${value}&df=primary_name,info_link_data&maxList=20`, {
      method: "GET",
    })
    .then(response => {
      if(response.status === 200 || response.status === 201) {
        response.json()
        .then(res => {
          this.setState({ results: res[3] })
        });
      }
    })
  }
  
  render() {
    let results = this.state.results.map(result => {
      return <SearchResult text={result[0]} link={result[1].substring(0, result[1].indexOf(","))} />
    })

    return (
      <div>
        <div class="main-container">
          <h3 class="app-header">FYP<span>help.</span></h3>
          <div class={this.state.results.length === 0 ? "search-engine" : "search-engine active"}>
            <div class="search-icon"></div>
            <input onInput={this.handleQueryInput.bind(this)} type="text" placeholder="Search disease" class="input-field" />
            <ul class="search-results">
              {results}
            </ul>
          </div>
          <p class="copyright">copyright 2019 | all rights reserved | FYPhelp.</p>
        </div>
      </div>
    );
  }
}

class SearchResult extends Component {
  render() {
    return(
      <a href={this.props.link} rel="noopener noreferrer" target="_blank"><li class="result">{this.props.text}</li></a>
    )
  }
}

export default App;
