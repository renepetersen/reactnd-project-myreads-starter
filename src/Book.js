import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		getAllBooks: PropTypes.func
	}

	render() {
		const {
			book,
			getAllBooks
		} = this.props
		
		if(!book.hasOwnProperty('imageLinks')) {
			//console.log(`this is a problematic json object: ${book.id} - ${book.title}`);
			return null;
		};

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" 
						style={{ 
							width: 128,
							height: 193,
							backgroundImage: `url(${book.imageLinks.thumbnail})`
					}}></div>
		
					<BookShelfChanger 
						book={book} 
						getAllBooks={getAllBooks}
					/>

				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		)
	}
}

export default Book