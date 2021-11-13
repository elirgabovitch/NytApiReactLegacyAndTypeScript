import React from 'react'
import DisplayArticles from './DisplayArticles'

type Articles = {
    result: any //use any when you don't know what type of object comes back
    searchItem: string
    startDate:  string 
    endDate: number | string
    pageNumber: number
}

class NYT extends React.Component<{}, Articles> {
    constructor(props:any){
        super(props)
        this.state = {
            result: [],
            searchItem: '',
            startDate: '',
            endDate: '',
            pageNumber: 0
        }
        this.fetchArticles = this.fetchArticles.bind(this) //example bind
    }

     fetchArticles = () => {
        let baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
        let apiKey = `kbMbh9fAVcoR631mAbMvPZMJKnAkGlK6`
        let URL = `${baseUrl}?api-key=${apiKey}&page=${this.state.pageNumber}&q=${this.state.searchItem}`

        if(this.state.startDate !== '') {
            // console.log(this.state.startDate)
            URL += '&begin_date=' + this.state.startDate
        };

        if(this.state.endDate !== '') {
            URL += '&end_date=' + this.state.endDate
        }

        console.log(URL)
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    result: data.response.docs
                });
            })
        
    }

    

    handleSubmit(e: any) {
        e.preventDefault()
        this.fetchArticles()
    }

    nextPage = (e: any) => {
        e.preventDefault()
        this.setState({
            pageNumber: this.state.pageNumber + 1
        }, () => {this.fetchArticles()})
        console.log('ran #1')
        console.log(this.state.pageNumber)
        
    }

    previousPage = (e: any) => {
        e.preventDefault()
        if(this.state.pageNumber > 0) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            }, () => {this.fetchArticles()})
        } else {
            return
        }
        console.log('ran #1')
    }

    render() {
        return(
            <div>
                <div className="inputs">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <p>
                            <label >Enter a SINGLE search term (required): </label>
                            <input type="text" id="search"  required onChange={(e) => this.setState({searchItem: e.target.value})}/>
                        </p>
                        <p>
                            <label>Enter a start date (format YYYYMMDD): </label>
                            <input type="date" id="start-date" pattern="[0-9]{8}" onChange={(e) => this.setState({startDate: e.target.value})} />
                        </p>
                        <p>
                            <label >Enter an end date (format YYYYMMDD) :</label>
                            <input type="date" id="end-date" pattern="[0-9]{8}" onChange={(e) => this.setState({endDate: e.target.value})}/>
                        </p>
                        <p>
                            <button>Sumbit search</button>
                        </p>
                    </form>
                </div>
                <div className="results">
                    <button onClick={(e) => this.previousPage(e)}>Previous</button>
                    <button onClick={(e) => this.nextPage(e)}>Next</button>
                    <DisplayArticles result={this.state.result}/>
                </div>
            </div>
        )
    }
}

export default NYT