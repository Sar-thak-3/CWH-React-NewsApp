// This is the file when previous next buttons are present! 

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log("Hello Im a constructor");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `NewsMonkey | ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b43d8ad773834747be912330a644a8fc&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalArticles: parseData.totalResults, loading: false });
    }

    async updateNews(pageNo) {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b43d8ad773834747be912330a644a8fc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this is used to set loading true until the data is fetched , once data fetched by we await and then we again set loading: false
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            loading: false,
        })
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews(this.state.page);
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews(this.state.page);
    }

    render() {
        return (
            <div className='container my-3'>
                <h2>NewsMonkey - Top {this.props.category} Headlines</h2>
                {this.state.loading && <Spinner />}

                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} src={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between'>
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    {/* Checking if next page have any content or not */}
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News