import React, { Component } from "react";
import NewsItem from "./NewsItem";
import  { Loader } from './Loader';
import PropTypes from 'prop-types';

export class News extends Component {
   static defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general'
    
  }
  static propTypes={
    country: PropTypes.string  ,
    pageSize: PropTypes.number , 
    category: PropTypes.string
   }
   capitaliseFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
   }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title=`${this.capitaliseFirstLetter(this.props.category)}-NewsMonkey`;
  }
  async componentDidMount() {
    let url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391fb664c2f44ed68f2dd3c8c7d7b97d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);

    let parsedData = await data.json();
    // console.log(parsedData.articles, "data");
    this.setState({ articles: parsedData.articles,
                totalResults:parsedData.totalResults,
              loading:false
              });
  }

  handleNextClick= async()=>{
    if(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)){

    }
    else{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391fb664c2f44ed68f2dd3c8c7d7b97d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    
    let parsedData = await data.json();
    console.log(parsedData.articles, "data");
    this.setState({
      page: this.state.page+1,
      articles: parsedData.articles,
      loading:false
    })
  }
}

handlePrevClick= async()=>{
  
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=391fb664c2f44ed68f2dd3c8c7d7b97d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  
    let parsedData = await data.json();
    // console.log(parsedData.articles, "data");
    this.setState({
      page: this.state.page-1,
      articles: parsedData.articles,
      loading : false
    })
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '35px 0px' }}>News-Monkey Top {this.capitaliseFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading&&<Loader/>}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0.45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-secondary" onClick={this.handlePrevClick}>← Previous</button>
       
        <button disabled={(this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-secondary" onClick={this.handleNextClick}>Next →</button>
        </div>
      </div>
    );
  }
}

export default News;
