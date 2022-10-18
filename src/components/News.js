// This is the file when there is infinite scrolling of news items
// https://www.npmjs.com/package/react-infinite-scroll-component -> site for react-infinite-scroll-component!

import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

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


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
        document.title = `NewsMonkey | ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
        console.log(this.props.apiKey);
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this is used to set loading true until the data is fetched , once data fetched by we await and then we again set loading: false
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false,
        })
        console.log(this.state.totalResults);
    };

    render() {
        return (
            <>
                <h2>NewsMonkey - Top {this.props.category} Headlines</h2>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className='row'>
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} src={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>    
        )
    }
}

export default News