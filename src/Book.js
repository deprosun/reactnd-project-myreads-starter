import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {

    static propTypes = {
        book: PropTypes.object.isRequired,
        onChangeSelf: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.props.book.shelf} onChange={(e) => { this.props.onChangeSelf(this.props.book, e.target.value) }}>
                            <option value="Move to" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors[0]}</div>
            </div>
        )
    }
}

export default Book