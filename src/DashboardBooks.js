import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class DashboardBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		getAllBooks: PropTypes.func
	}

	render() {
		const {
			books,
			getAllBooks
		} = this.props

		const booksReading = books.filter(book => book.shelf === 'currentlyReading')
		const booksWantToRead = books.filter(book => book.shelf === 'wantToRead')
		const booksRead = books.filter(book => book.shelf === 'read')

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>

				<div className="list-books-content">
					<div>
						<BookShelf 
							bookshelfTitle="Currently Reading"
							book={booksReading}
							getAllBooks={getAllBooks}
						/>
						<BookShelf 
							bookshelfTitle="Want to Read"
							book={booksWantToRead}
							getAllBooks={getAllBooks}
						/>
						<BookShelf 
							bookshelfTitle="Read"
							book={booksRead}
							getAllBooks={getAllBooks}
						/>
					</div>
				</div>
				<div className="open-search">
					<Link 
						to="/search">
						Add a book
					</Link>
				</div>
			</div>
		)
	}
}

export default DashboardBooks