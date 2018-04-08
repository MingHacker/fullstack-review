import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userRepos: []
    }

  }

  // Render everything from DB 
  componentDidMount(){
    this.renderRepos();
  }

  // POST reqest to the server 
  search (term) {
    console.log(`${term} was searched`);

    //var clientUrl = 'http://127.0.0.1:1128/repos';

    var userData = {term};
    // send the github handle to the server 
    $.ajax({
      method: 'POST',
      // if url is not exactly same as '127.0.0.1' -> it will show cross-origin-allow error
      url: '/repos',
      data: JSON.stringify(userData),
      headers: {
        'content-type': 'application/json'
      },
      success: (data
      ) => {
        console.log('Data sent. Respond from POST: ', data);
        this.renderRepos(data);
      },
      error: (error) => {
        console.log('POST: Data was not sent', error);
      }
    })

    //this.renderRepos(data);
  }

  // fetch all user repos from DB 
  renderRepos(data){

    //var clientUrl = 'http://127.0.0.1:1128/repos';

    $.ajax({
      method: 'GET',
      // if url is not exactly same as '127.0.0.1' -> it will show cross-origin-allow error
      url: '/repos',
      headers: {
        'content-type': 'application/json'
      },
      success: (data) => {
        console.log('Data sent. Respond from GET: ', data);
        this.setState({userRepos: data});
      },
      error: (error) => {
        console.log('GET: Data was not sent', error);
      }
    })
  }

  render () {
    return (
      <div>
        <div>
          <h1>Mo's Github Fetcher</h1><img src="../pusheen1.png"/>
        </div>
        <RepoList userRepos={this.state.userRepos}/>
        <Search onSearch={this.search.bind(this)}/>
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('app'));