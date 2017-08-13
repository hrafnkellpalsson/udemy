import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      )
    })
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

// Anything returned from this function will show up as props on the BookList container.
function mapStateToProps(state) {
  return {
    books: state.books
  };
}

// Anything returned from this function (in effect the first argument to bindActionCreators, so here selectBook)
// will show up as props on the BookList container.
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called the result should be passed to all reducers.
  // dispatch is a function that funnels actions to all reducers.
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
