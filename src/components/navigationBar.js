import React, { Component } from "react";

class NavBar extends Component {
  
  setNavExpanded = (expanded) => {
    this.setState({ navExpanded: expanded });
  };

  closeNav = () => {
    this.setState({ navExpanded: false });
  };

  render() {
    return (
      <div>
        <h1>Virus Geeks</h1>
      </div>

    );
  }
}

export default NavBar;
