import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import DashboardBooks from './DashboardBooks'
import {
  BrowserRouter as Router,
  Link,
  Route
} from 'react-router-dom';

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				console.log(books)
				this.setState(() => ({
					books
				}))
			})
	}

	render() {
		return (
			<Router>
				<div className="app">
					<Route exact path='/' component={DashboardBooks} />
					<Route path='/search' component={SearchBooks} />
				</div>
			</Router>	
		)
	}
}

export default BooksApp
