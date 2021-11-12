import React from 'react'

const DisplayArticles = (props: any) => {
    return(
        <div>
            {props.result.length > 0 && props.result.map((article: any, index: number) => {
                let image

                {if(article.multimedia.length > 0){
                    image=`http://www.nytimes.com/${article.multimedia[0].url}`
                }}
                // console.log(article)
                return(
                    <div style={{border: '2px solid black', padding:'50px'}} key={index}>
                        <img src={image} style={{width: '200px', height: '200px'}} alt={article.headline.main} />
                        <h2><a href={article.web_url}>{article.headline.main}</a></h2>
                        
                            {article.keywords.length > 0 && article.keywords.map((keyword: any, index: number) => {
                                return(
                                    <div key={index}>
                                        <p style={{border: '2px solid gray', width: '100px'}}>{keyword.value}</p> 
                                    </div>
                                )
                            })}
                        
                    </div>
                )
            })}
        </div>
    )
}

export default DisplayArticles