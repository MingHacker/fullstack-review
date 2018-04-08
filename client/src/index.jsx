import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRepos: [],
      callCount: 0
    }
    this.renderRepos = this.renderRepos.bind(this);
  }

  // Render everything from DB 
  componentDidMount() {
    this.renderRepos();
  }

  // POST reqest to the server 
  search(term) {
    console.log(`${term} was searched`);

    //var clientUrl = 'http://127.0.0.1:1128/repos';

    var userData = { term };
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
        this.setState({callCount: 0});
        this.renderRepos();

      },
      error: (error) => {
        console.log('POST: Data was not sent', error);
      }
    })

    //this.renderRepos();
  }

  // fetch all user repos from DB 
  renderRepos() {

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

        let repos = data;
        // if totalRepos is greater than 25, remove the difference from the last user's repos
        let totalRepos = 0;
        repos.forEach(user => {
          totalRepos += user.repos.length;
          if(totalRepos > 25){
            let removeCount = totalRepos - 25;
            for(var i = 0; i < removeCount; i++){
              user.repos.pop();
            }
            if(user.repos.length === 0){
              let userIndex = repos.indexOf(user);
              repos.splice(userIndex, 1);
            }
          }
        });

        // call the GET request until it updates the data -> Mongo DB sucks....
        if (JSON.stringify(data) === JSON.stringify(this.state.userRepos)) {
          if(this.state.callCount === 5){return;}
          console.log('Data is the same. Calling again');
          setTimeout(() => { this.renderRepos() }, 500);
          let count = this.state.callCount;
          count++;
          this.setState({callCount: count});
          return;
        }
        this.setState({ userRepos: data });
        console.log(this.state.userRepos);

      },
      error: (error) => {
        console.log('GET: Data was not sent', error);
      }
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Mo's Github Fetcher</h1><img src="../pusheen1.png" />
        </div>
        <RepoList userRepos={this.state.userRepos} />
        <Search onSearch={this.search.bind(this)} />
      </div>
    )
  };
}

ReactDOM.render(<App />, document.getElementById('app'));