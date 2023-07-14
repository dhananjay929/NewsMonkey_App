import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 15;
  render(){
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes><Route exact path="/" element={<News key=" general" pageSize={this.pageSize} country='in' category='general'/>}></Route></Routes>
        <Routes><Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country='in' category='general'/>}></Route></Routes>
        <Routes><Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country='in' category='sports'/>}></Route></Routes>
        <Routes><Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country='in' category='business'/>}></Route></Routes>
        <Routes><Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country='in' category='entertainment'/>}></Route></Routes>
        <Routes><Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country='in' category='science'/>}></Route></Routes>
        <Routes><Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country='in' category='technology'/>}></Route></Routes>
        <Routes><Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country='in' category='health'/>}></Route></Routes>
        </Router>
      </div>
    )
  }
};
