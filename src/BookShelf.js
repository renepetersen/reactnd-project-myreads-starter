import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
	static propTypes = {
		book: PropTypes.array.isRequired,
		getAllBooks: PropTypes.func
	}

	render() {
		const {
			bookshelfTitle,
			book,
			getAllBooks
		} = this.props

		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{bookshelfTitle} ({book.length})</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{book.map((book) => (
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