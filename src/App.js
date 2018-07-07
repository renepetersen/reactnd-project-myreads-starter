import React from 'react'
import './App.css'
import * as BooksAPI from './utils/BooksAPI'
import SearchBooks from './SearchBooks'
import DashboardBooks from './DashboardBooks'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class BooksApp extends React.Component {
	constructor(props) { 
		super(props);

		this.state = {
			books: []
		};

		this.getAllBooks();
	}

	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState(() => ({
				books
			}))
		})
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Route exact path='/' render={() => (
						<DashboardBooks
							books={ this.state.books}
							getAllBooks={this.getAllBooks}
						/>
					)} />
					<Route path='/search' render={() => ( 
						<SearchBooks 
							books={ this.state.books}
							getAllBooks={this.getAllBooks}
						/>
					)} />
				</div>
			</Router>
		)
	}
}

export default BooksApp
