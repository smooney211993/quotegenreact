import React , {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [quoteData, setQuoteData] = useState({
    quote: '',
    author: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const getQuote = async () =>{
    const proxy = "https://quoteserver1.herokuapp.com/";
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
      try{
        setIsLoading(true);
        const response = await fetch(proxy+apiUrl);
        if(response.ok){
        const {quoteText, quoteAuthor} = await response.json();
        setQuoteData({
          quote: quoteText,
          author: quoteAuthor,
        })
        setIsLoading(false);
      }
        


      }catch(error){
        getQuote()
        console.log(error)

      }
  }
  useEffect(()=>{
  

    getQuote()

  },[])

  const tweetQuote = () => {
    const {quote, author} = quoteData;
    const twitterUrl = `https://twitter.com/intent/tweet?$text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank' ) ;
}

  const renderQuote = ()=> {
    if(quoteData.quote.length > 50){
      return <span id="quote" className="long-quote" >{quoteData.quote}</span>
   } 
      return <span id="quote" >{quoteData.quote}</span>
   }

   const renderLoading = ()=>{
    if(isLoading){
      return <div className="loader" id="loader"></div>
     } 

   }
  
  return (
    isLoading ? renderLoading() :
   <div className="quote-container" id="quote-container">
      <div className="quote-text">
        <i className="fas fa-quote-left">
        </i>
        {renderQuote()}
        <i className="fas fa-quote-right"></i>
        <div className="quote-author">
            <span id="author">
                {quoteData.author}
            </span>
        </div>
        <div className="button-container">
            <button className="twitter-button" id="twitter" title="Tweet this badboy!" onClick={tweetQuote}>
                  <i className="fab fa-twitter">
                  </i>
            </button>
            <button id="new-quote" onClick={getQuote}> New Quote</button>
        </div>
      </div>
  </div> 
  )
}

export default App;
