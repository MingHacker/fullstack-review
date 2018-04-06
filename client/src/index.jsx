import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);

    var userData = {term};
    // send the github handle to the server 
    $.ajax({
      method: 'POST',
      // if url is not exactly same as '127.0.0.1' -> it will show cross-origin-allow error
      url: 'http://127.0.0.1:1128/repos',
      data: JSON.stringify(userData),
      headers: {
        'content-type': 'application/json'
      },
      success: (data) => {
        console.log('Data sent. Respond from POST: ', data);
      },
      error: (error) => {
        console.log('POST: Data was not sent', error);
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));