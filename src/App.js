import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import BookShelf from './BookShelf'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    alreadyRead: [],
    searchedBooks: []
  }

  updateReadingList(books) {
    var currentlyReading = []
    var wantToRead = []
    var alreadyRead = []

    books.forEach(book => {
      if (book.shelf === "currentlyReading") {
        currentlyReading.push(book)
      } else if (book.shelf === "wantToRead") {
        wantToRead.push(book)
      } else if (book.shelf === "read") { //if(book.shelf === "read")
        alreadyRead.push(book)
      }
    })

    this.setState({
      currentlyReading: currentlyReading,
      wantToRead: wantToRead,
      alreadyRead: alreadyRead
    })
  }

  getAllBooks() {
    return BooksAPI.getAll().then(books => {
      this.updateReadingList(books)
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  searchBook = (query) => {

    if (!query) {
      this.setState({
        searchedBooks: []
      })
    } else {
      BooksAPI.search(query).then(books => {
        if (Array.isArray(books)) {
          this.setState({
            searchedBooks: books.filter(b => b.authors !== undefined)
          })
        } else {
          this.setState({
            searchedBooks: []
          })
        }
      })
    }
  }

  changeShelf = (book, newShelf) => {
    if (book.shelf !== newShelf) {

      BooksAPI.update(book, newShelf).then(r => {
        this.getAllBooks()
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            alreadyRead={this.state.alreadyRead}
            onChangeSelf={this.changeShelf}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks
            searchedBooks={this.state.searchedBooks}
            searchBook={this.searchBook}
            onChangeSelf={this.changeShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
