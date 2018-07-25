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
				if(query === this.state.query) {
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
				}
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

		const shelves = {
			currentlyReading: ['Currently Reading', 'currentlyReading'],
			wantToRead: ['Want to Read', 'wantToRead'],
			read: ['Read', 'read'],
			none: ['None', 'none']
		}

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
							{ Object.keys(shelves).map((shelf) =>
								<BookShelf key={shelf}
									shelf={shelves[shelf][1]}
									bookshelfTitle={shelves[shelf][0]}
									books={bookSearchResults}
									getAllBooks={getAllBooks}
								/>
							)}
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