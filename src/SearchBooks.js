import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class SearchBooks extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			bookSearchResults:[]
		}
		
		this.handleChange = this.handleChange.bind(this);
	}

	static propTypes = {
		books: PropTypes.array
	}

	handleChange = (e) => {
		this.updateQuery(e.target.value)
	}

	updateQuery = (query) => {
		this.setState({ 
			query: query
		}, () => {
			this.searchBook(query)
		})
	}

	searchBook = (query) => {
		if(query) {
			BooksAPI.search(query).then((result) => {
				(typeof result.length === 'number' && result.length !== 0) 
				? (
					this.setState({
						bookSearchResults: result
					})
				) : (
					this.setState({
						bookSearchResults:[]
					})
				)
			})
		} else {
			this.setState({ bookSearchResults:[] });
		}
	}

	render() {
		const {
			books,
			getAllBooks
		} = this.props

		const { bookSearchResults } = this.state
		

		// adding shelf info to searchresults
		bookSearchResults.forEach(bookItem => {
			const matchedBooks = books.filter(book => book.id === bookItem.id)

			bookItem.shelf = matchedBooks.length > 0 ? matchedBooks[0].shelf :'none'
		});


		const booksReading = bookSearchResults.filter(book => book.shelf === 'currentlyReading')
		const booksWantToRead = bookSearchResults.filter(book => book.shelf === 'wantToRead')
		const booksRead = bookSearchResults.filter(book => book.shelf === 'read')
		const booksNone = bookSearchResults.filter(book => book.shelf === 'none')

		return (
			<div className="search-books">

				<div className="search-books-bar">
					<Link 
						to="/" 
						className="close-search">
						Close
					</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author"
							autoFocus
							value={this.state.query}
							onChange={this.handleChange.bind(this)}
						/>
					</div>
				</div>

				<div className="search-books-results">
					{bookSearchResults.length !== 0 ? (
						<div>
							{booksReading.length !== 0 && (
								<BookShelf 
									bookshelfTitle="Currently Reading"
									book={booksReading}
									getAllBooks={getAllBooks}
								/>
							)}
							{booksWantToRead.length !== 0 && (
								<BookShelf 
									bookshelfTitle="Want to Read"
									book={booksWantToRead}
									getAllBooks={getAllBooks}
								/>
							)}
							{booksRead.length !== 0 && (
								<BookShelf 
									bookshelfTitle="Read"
									book={booksRead}
									getAllBooks={getAllBooks}
								/>
							)}
							<BookShelf 
								bookshelfTitle="Other search results"
								book={booksNone}
								getAllBooks={getAllBooks}
							/>
						</div>
					) : (
						<p>No results</p>
					)}
					
				</div>
			</div>
		)
	}
}

export default SearchBooks;