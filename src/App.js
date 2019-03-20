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

    console.log(value);

    if(value === "")
      return;
    //fetch data with user query input
    fetch(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${value}&df=primary_name,info_link_data`, {
      method: "GET",
    })
    .then(response => {
      if(response.status === 200 || response.status === 201) {
        response.json()
        .then(res => {
          console.log(res);
        });
      }
    })
  }
  
  render() {
    return (
      <div>
        <div class="main-container">
          <h3 class="app-header">FYP<span>help.</span></h3>
          <div class="search-engine active">
            <div class="search-icon"></div>
            <input onInput={this.handleQueryInput.bind(this)} type="text" placeholder="Search disease" class="input-field" />
            <ul class="search-results">
              <SearchResult text="Gastroesophageal reflux disease" link="#" />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

class SearchResult extends Component {
  render() {
    return(
      <li class="result"><a href={this.props.link}>{this.props.text}</a></li>
    )
  }
}

export default App;
