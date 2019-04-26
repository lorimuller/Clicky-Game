import React, { Component } from 'react';
import Navbar from './Navbar';
import Container from './Container';
import Footer from './Footer';
import Banner from './Header';
import images from '../images';

class ClickyGame extends Component {
  state = {
    score: 0,
    highScore: 0,

    navMsgColor: '',
    navMessage: 'Click an image to begin!',
    allBeatles: this.shuffleArray(),
    wasClicked: [],
    shake: false
  };

  clickEvent = this.checkClicked.bind(this);

  // used to shuffle the array of images when the DOM loads, and when an image is clicked
  shuffleArray() {
    // creates a copy of the current characters array to modify it by value, and not by reference
    const newArr = images.slice();

    // will store the shuffled array
    const shuffleArr = [];

    while (newArr.length > 0) {
      shuffleArr.push(newArr.splice(Math.floor(Math.random() * newArr.length), 1)[0]);
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
   
    const prevState = this.state.wasClicked.slice();

    // shuffles the images
    const shuffled = this.shuffleArray();

    // tracks score
    let score = this.state.score;
    let highScore = this.state.highScore;

    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are the same, then there is a new highScore value
      if (score === highScore) {
        score++;
        highScore++;

        // if they are not equal, then only increase the score value
      } else {
        score++;
      }

      // adds the clicked item to wasClicked to track that it has been clicked
      prevState.push(clickedElem);
    }

    // resets the current score if the same element was clicked twice
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: 'incorrect',
        navMessage: 'Incorrect guess!',
        allBeatles: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: 'correct',
      navMessage: 'You Guessed Correctly!',
      allBeatles: shuffled,
      wasClicked: prevState,
      shake: false
    });

    return setTimeout(() => this.setState({ navMsgColor: '' }), 500);
  }

  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          beatles={state.allBeatles}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default ClickyGame;