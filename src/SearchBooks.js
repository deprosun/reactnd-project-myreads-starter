import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {

  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    searchBook: PropTypes.func.isRequired,
    onChangeSelf: PropTypes.func.isRequired
  }

  handleSearch(e) {
    var value = e.target.value
    this.props.searchBook(value)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => this.handleSearch(e)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.props.searchedBooks.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onChangeSelf={this.props.onChangeSelf}
                  />
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks