import React, { Component, useState } from "react";
import "../styles/App.css";

class App extends Component {
  state = {
    data: {
      name1: "",
      name2: "",
      answer: "",
    },
  };

  handleChange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  match = (s1, s2) => {
    let count = 0;
    let dict = {};
    for (let i = 0; i < s1.length; i++) {
      if (s1[i] in dict) {
        dict[s1[i]] += 1;
      } else {
        dict[s1[i]] = 1;
      }
    }
    for (let j = 0; j < s2.length; j++) {
      if (s2[j] in dict) {
        dict[s2[j]] -= 1;
        count += 1;
      }
      if (dict[s2[j]] == 0) {
        delete dict[s2[j]];
      }
    }
    return count;
  };

  handleClick = (e) => {
    if (e.currentTarget.name == "clear") {
      const data = {
        name1: "",
        name2: "",
        answer: "",
      };
      this.setState({ data });
      return;
    } else if (this.state.data.name1.length && this.state.data.name2.length) {
      let count =
        this.state.data.name1.length +
        this.state.data.name2.length -
        this.match(this.state.data.name1, this.state.data.name2) * 2;
      let answer;
      if (count % 6 == 1) {
        answer = "Friends";
      } else if (count % 6 == 2) {
        answer = "Love";
      } else if (count % 6 == 3) {
        answer = "Affection";
      } else if (count % 6 == 4) {
        answer = "Marriage";
      } else if (count % 6 == 5) {
        answer = "Enemy";
      } else {
        answer = "Siblings";
      }
      const data = { ...this.state.data };
      data.answer = answer;
      this.setState({ data });
    } else {
      const data = { ...this.state.data };
      data.answer = "Please Enter valid input'";
      this.setState({ data });
    }
  };

  render() {
    return (
      <div id="main">
        {/* Do not remove the main div */}
        <input
          type={"text"}
          data-testid="input1"
          placeholder="Enter first name"
          name="name1"
          value={this.state.data.name1}
          onChange={this.handleChange}
        />
        <input
          type={"text"}
          data-testid="input2"
          placeholder="Enter second name"
          name="name2"
          value={this.state.data.name2}
          onChange={this.handleChange}
        />
        <button data-testid="calculate_relationship" onClick={this.handleClick}>
          Calculate Relationship
        </button>
        <button data-testid="clear" name="clear" onClick={this.handleClick}>
          Clear
        </button>
        <h3 data-testid="answer">{this.state.data.answer}</h3>
      </div>
    );
  }
}

export default App;
