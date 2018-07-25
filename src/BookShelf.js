import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		getAllBooks: PropTypes.func
	}

	render() {
		const {
			shelf,
			bookshelfTitle,
			books,
			getAllBooks
		} = this.props

		const booksShelfSelection = books.filter(book => book.shelf === shelf)
		
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{bookshelfTitle} ({booksShelfSelection.length})</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{booksShelfSelection.map((book) => (
							<li key={book.id}>
								<Book 
									book={book}
									getAllBooks={getAllBooks}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}
}

export default BookShelf