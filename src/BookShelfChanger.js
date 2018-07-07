import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		getAllBooks: PropTypes.func
	}

	changeBookShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then((result) => {
			this.props.getAllBooks();
		});
	}

	render() {
		const { book } = this.props;
		const bookshelf = book.shelf === undefined || book.shelf === '' ? 'none' : book.shelf; 

		return (
			<div className="book-shelf-changer">
				<select 
					defaultValue={bookshelf} 
					onChange={(event) => this.changeBookShelf(book, event.target.value)}
				>
					<option value="move" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		)
	}
}

export default BookShelfChanger