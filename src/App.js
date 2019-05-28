import React from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Main/Home';
import About from './components/Main/About';
import Compare from './components/Main/Compare';

const HeaderComponent = withRouter(props => <Header {...props} />);

function App() {
	return (
		<div className="App">
			<Router>
				<HeaderComponent />
				<Route exact path="/" component={Home} />
				<Route path="/about" component={About} />
				<Route path="/compare" component={Compare} />
			</Router>
		</div>
	);
}

export default App;
