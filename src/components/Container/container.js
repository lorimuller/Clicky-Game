import React from 'react';
import './container.css';
import Beatles from '../Beatles';

const Container = props => (
  // loops through
  <div
    className={
      props.shake
        ? 'container d-flex flex-wrap justify-content-center shake'
        : 'container d-flex flex-wrap justify-content-center'
    }
  >
    {props.beatles.map((a, i) => <Beatles name={a} key={i} clickEvent={props.clickEvent} />)}
  </div>
);

export default Container;