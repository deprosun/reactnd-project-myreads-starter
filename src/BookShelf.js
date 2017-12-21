import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

class BookShelf extends React.Component {

  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    alreadyRead: PropTypes.array.isRequired,
    onChangeSelf: PropTypes.func.isRequired
  }

  // selection(book) {
  //   return (
  //     <div className="book-shelf-changer">
  //       <select value={book.shelf} onChange={(e) => { this.props.onChangeSelf(book, e.target.value) }}>
  //         <option value="none" disabled>Move to...</option>
  //         <option value="currentlyReading">Currently Reading</option>
  //         <option value="wantToRead">Want to Read</option>
  //         <option value="read">Read</option>
  //         <option value="none">None</option>
  //       </select>
  //     </div>
  //   )
  // }

  bookShelf(books, shelf) {
    if (books.length > 0) {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelf}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                books.map(book => (
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

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.bookShelf(this.props.currentlyReading, "Currently Reading")}
            {this.bookShelf(this.props.wantToRead, "Want to Read")}
            {this.bookShelf(this.props.alreadyRead, "Read")}
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Close</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf