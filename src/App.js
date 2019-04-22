import React, { Component } from "react";
import data from "./data.js";
import "./App.css";

class App extends Component {
  state = {
    tabIndex: 0,
    imgIndex: 0,
    scrollValue: 0,
    scroll: true,
    dragged: true,
    initPosY: 0,
    endPosY: 0,
    initPosX: 0,
    endPosX: 0,
    currenTab: "hollywood",
    tabs: ["hollywood", "bollywood", "tollywood"],
    images: ["0.jpg", "1.jpg", "2.jpg", "3.jpg"]
  };

  //tried using scroll but failed

  handleTouchStart = e => {
    this.setState({
      dragged: true
    });
    this.setState({
      initPosY: e.targetTouches[0].clientY,
      initPosX: e.targetTouches[0].clientX
    });
  };
  handleTouchMove = e => {
    this.setState({
      endPosY: e.targetTouches[0].clientY,
      endPosX: e.targetTouches[0].clientX
    });
  };
  handleTouchEnd = e => {
    let diffY = this.state.initPosY - this.state.endPosY;
    let diffX = this.state.initPosX - this.state.endPosX;

    //horizontal swipe
    if (diffX > 50) {
      if (
        this.state.tabIndex >= 0 &&
        this.state.tabIndex < this.state.tabs.length - 1
      ) {
        this.setState({
          tabIndex: this.state.tabIndex + 1,
          currenTab: this.state.tabs[this.state.tabIndex + 1]
        });
      }
    }

    if (diffX < -50) {
      if (this.state.tabIndex > 0) {
        this.setState({
          tabIndex: this.state.tabIndex - 1,
          currenTab: this.state.tabs[this.state.tabIndex - 1]
        });
      }
    }

    //vertical swipe
    if (diffY > 50 && this.state.endPosY !== 0) {
      if (this.state.imgIndex < this.state.images.length - 1) {
        this.setState({
          endPosY: 0,
          initPosY: 0,
          imgIndex: this.state.imgIndex + 1,
          imageToSee: this.state.images[this.state.imgIndex + 1]
        });
      }
    }
    if (diffY < -50 && this.state.endPosY !== 0) {
      if (
        this.state.imgIndex < this.state.images.length &&
        this.state.imgIndex > 0
      ) {
        this.setState({
          endPosY: 0,
          initPosY: 0,
          imgIndex: this.state.imgIndex - 1,
          imageToSee: this.state.images[this.state.imgIndex - 1]
        });
      }
    }
  };

  render() {
    // console.log("data", this.state.currenTab);
    return (
      <div className="appContainer">
        highway version 0.1(only for touch devices)
        <div className="tabContainer">
          {this.state.tabs.map((eachTab, i) => {
            return (
              <div
                className="tabs"
                style={
                  this.state.tabIndex === i
                    ? { fontWeight: 1000, fontSize: 20 }
                    : { fontWeight: 20 }
                }
              >
                {eachTab}
              </div>
            );
          })}
        </div>
        <div
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          className="focusedContent"
        >
          <img
            src={`/img/${this.state.imageToSee}`}
            alt="Mountain massif, sunbathed, partly covered in show."
          />
        </div>
      </div>
    );
  }
  componentDidUpdate() {
    // ReactDOM.findDOMNode(this.refs[`${this.state.imgIndex}`]).scrollIntoView({
    //   behavior: "smooth"
    // });
  }
  componentWillMount() {
    this.setState({
      imageToSee: this.state.images[0]
    });
  }
}

export default App;
