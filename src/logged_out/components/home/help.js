import React from 'react';

class Help extends React.Component {
  componentDidMount(){
     console.log("help");
     window.location.href = "https://www.nrdc.org/stories/how-you-can-stop-global-warming";
  }

  render() {
    return (
      <div>
       <h2>Contact</h2>
      </div>
    )
  }
}

export default Help;