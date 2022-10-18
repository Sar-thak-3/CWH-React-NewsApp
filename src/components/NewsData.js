// This is the file when there is infinite scrolling of news items
// https://www.npmjs.com/package/react-infinite-scroll-component -> site for react-infinite-scroll-component!

// https://newsdata.io/api/1/news?apikey=pub_12401e0d115acff06c577988eb6b06e9218fa => can also be used for news api!

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

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0,
    //     }
    //     document.title = `NewsMonkey | ${this.capitalizeFirstLetter(this.props.category)}`;
    // }
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

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b43d8ad773834747be912330a644a8fc&page=1&pageSize=${this.props.pageSize}`;
        let url = `https://newsdata.io/api/1/news?apikey=pub_12401e0d115acff06c577988eb6b06e9218fa&page=1`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false });
        this.setState({ articles: parseData.results, totalResults: parseData.totalResults, loading: false });
        console.log(this.state.articles);
        // this.setState({ articles: parseData.results, totalResults: parseData.totalResults, loading: false });
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page+1});
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b43d8ad773834747be912330a644a8fc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let url = `https://newsdata.io/api/1/news?apikey=pub_12401e0d115acff06c577988eb6b06e9218fa&page=${this.state.page}`;
        // this is used to set loading true until the data is fetched , once data fetched by we await and then we again set loading: false
        let data = await fetch(url);
        let parseData = await data.json();
        // this.setState({
        //     articles: this.state.articles.concat(parseData.articles),
        //     totalResults: parseData.totalResults,
        //     loading: false,
        // })
        this.setState({
            articles: this.state.articles.concat(parseData.results),
            totalResults: parseData.totalResults,
            loading: false,
        })
        console.log(this.state.totalResults);
    };

    render() {
        return (
            <>
                <h2>NewsMonkey - Top {this.props.category} Headlines</h2>
                {this.state.loading? <Spinner />:""}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className='row'>
                            {/* {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} src={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} /> */}
                                    {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} src={element.image_url} newsUrl={element.link} author={element.creator} date={element.pubDate} source={element.source_id} />
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