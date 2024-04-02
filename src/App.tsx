import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  showGraph: boolean, //added new state to control ghraph visibility
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      showGraph: false, // show graph set to false
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    //condition to prevent the graph render until the user clicks the button 'start streaming'
    if (this.state.showGraph) {
    return (<Graph data={this.state.data}/>)
  }
  }

  /**
   * Get new data from server and update the state with the new data
   */
   getDataFromServer() {
    let intervalsCounter = 0; // Initialize intervals counter
    
    // Update showGraph state to true to render the graph
    this.setState({ showGraph: true });
  
    // Use setInterval to repeatedly call the getData method every 100ms
    // Set the interval ID to stop the interval later
    const intervalId = setInterval(() => {
      // Increment intervals counter
      intervalsCounter++;
      
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({ data: [...this.state.data, ...serverResponds] });
      });
      
      // Clear the interval after 1000 intervals
      if (intervalsCounter === 1000) {
        clearInterval(intervalId);
      }
    }, 100);
  }
  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
