import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'font-awesome/css/font-awesome.min.css';



class Generator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: ''
    }
  }
  componentDidMount() {
    this.newQuote();
  }
  newQuote = () => {
    this.setState({quote: ''});
    fetch('https://api.quotable.io/random').then(result => result.json())
      .then(quote => {
        this.setState({ quote });
      })
  }
  render() {
    return (
     <div id="quote-box" >
        <Quote quote={this.state.quote}/>
        <Buttons quote={this.state.quote} newQuote={this.newQuote} />
     </div>
    );
  }
}

class Quote extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div id="text">
          <i className="fa fa-quote-left quotemark"></i> {this.props.quote.content}
        </div>
        <div id="author" className="text-end">
          -{this.props.quote.author}
        </div>
      </div>
    </div>
    );
  }
};

const Buttons = ({newQuote, quote}) => (
  <div className='row buttons'>
    <div className='col-md-4 offset-md-2'>
      <a id="tweet-quote" className='btn btn-info'
        href={'https://twitter.com/intent/tweet?text=' + quote.content + ' - ' + quote.author}
        target='_blank'>
        <i className="fa fa-twitter"></i>
      </a>
    </div>
    <div className="col-md-4">
      <button id="new-quote" className='btn btn-secondary' onClick={newQuote}>
        Generate Quote
      </button>
    </div>
  </div>
)


// ========================================

ReactDOM.render(
  <Generator />,
  document.getElementById('root')
);
