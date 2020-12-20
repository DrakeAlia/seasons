import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner.js';

// Class based component
class App extends React.Component {
	state = { lat: null, errorMessage: '' };

	componentDidMount() {
		window.navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({ lat: position.coords.latitude });
			},
			(err) => {
				this.setState({ errorMessage: err.message });
			}
		);
	}

	renderContent() {
		if (this.state.errorMessage && !this.state.lat) {
			return <div>Error: {this.state.errorMessage}</div>;
		}

		if (!this.state.errorMessage && this.state.lat) {
			return <SeasonDisplay lat={this.state.lat} />;
		}

		return <Spinner message="Please accept location request" />;
	}

	// React says we have to define render!!!
	render() {
		return <div className="border red">{this.renderContent()}</div>;
	}
}

ReactDOM.render(<App />, document.querySelector('#root'));

// Rules of State:
// Only usable with class components
// You will confuse props with state :(
// 'State' is a JS object that contains data relevant to a component
// Updating 'state' on a component causes the component to (almost) instantly rerender
// State must be initialized when a compoenent is created

// Component Lifecycle:
// constructor <-- Good place to do-time setup
// render <-- Avoid doing anything besides returning JSX
// - Content visible on screen -
// componentDidNotMount <-- Good place to do data-loading!
// - Sit and wait for updates...
// componentDidUpdate <-- Good place to do more data-loading when state/props change
// - Sit and wait until this component is no longer shown
// componentWillUnmount <-- Good place to do cleanup (especially for non-React stuff)

// Exercise #4: Refactor the UserForm to be a class-based component
// const UserForm = () => {
//     return (
//         <form>
//             <label>Enter a username:</label>
//             <input />
//         </form>
//     );
// }

// // Renders the App component into a div with id 'root'
// ReactDOM.render(<UserForm />, document.querySelector('#root'));

// Solution:
// class UserForm extends React.Component  {
//     render() {
//        return (
//         <form>
//             <label>Enter a username:</label>
//             <input />
//         </form>
//      );
//    }
// }

// ReactDOM.render(<UserForm />, document.querySelector('#root'));

// Exercise #5: Update the clock class so that it properly updates once per second
// class Clock extends React.Component {
//     componentDidMount() {
//         setInterval(() => {
//             this.time = new Date().toLocaleTimeString()    
//         }, 1000)
//     }
    
//     render() {
//         return (
//             <div className="time">
//                 The time is: {this.time}
//             </div>
//         );
//     }
// }

// ReactDOM.render(<Clock />, document.querySelector('#root'));

// Solution:
// class Clock extends React.Component {
//    state = { time: new Date().toLocaleTimeString() };

//     componentDidMount() {
//         setInterval(() => {
//             this.setState({ time: new Date().toLocaleTimeString() })    
//         }, 1000)
//     }
    
//     render() {
//         return (
//             <div className="time">
//                 The time is: {this.state.time}
//             </div>
//         );
//     }
// }

// // Renders the App component into a div with id 'root'
// ReactDOM.render(<Clock />, document.querySelector('#root'));