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

		const shelves = {
			currentlyReading: ['Currently Reading', 'currentlyReading'],
			wantToRead: ['Want to Read', 'wantToRead'],
			read: ['Read', 'read']
		}

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>

				<div className="list-books-content">
					{ Object.keys(shelves).map((shelf) =>
						<BookShelf key={shelf}
							shelf={shelves[shelf][1]}
							bookshelfTitle={shelves[shelf][0]}
							books={books}
							getAllBooks={getAllBooks}
						/>
					)}
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