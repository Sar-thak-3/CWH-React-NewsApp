import './App.css';
import NavBar  from './components/NavBar';
// import NewsData from './components/NewsData';
import LoadingBar from "react-top-loading-bar";

import React, { Component } from 'react'
import News from './components/News';

import {BrowserRouter as Router, Switch , Route  } from "react-router-dom";

export default class App extends Component {
  // Classes requires render to rend the site/webpage while in function based react we can directly rend anything!
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0,
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <LoadingBar color='#f11946' progress={this.state.progress}/>
          <Switch>
              {/* It is not remounting the components as some components are laready there so it do not take load of remounting again */}
              {/* Now as unique key is provided to each route hence it wil remount and does not consider all route as same */}
              <Route exact path='/'><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="in" category="general"/></Route>
              <Route exact path='/general'><News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={6} country="in" category="general"/></Route>
              <Route exact path='/business'><News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={6} country="in" category="business"/></Route>
              <Route exact path='/entertainment'><News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={6} country="in" category="entertainment"/></Route>
              <Route exact path='/health'><News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize={6} country="in" category="health"/></Route>
              <Route exact path='/science'><News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={6} country="in" category="science"/></Route>
              <Route exact path='/technology'><News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={6} country="in" category="technology"/></Route>
              <Route exact path='/sports'><News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize={6} country="in" category="sports"/></Route>
            </Switch>
        </Router>
      </div>
    )
  }
}