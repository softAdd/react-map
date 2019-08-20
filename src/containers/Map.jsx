import React, { Component } from "react";

export const { ymaps } = window;

class Map extends Component {
  componentDidMount() {
    ymaps.ready(() => {
      new ymaps.Map("yandex-map", {
        center: [55.76, 37.64],
        zoom: 7
      });
    })
  }
  render() {
    return (
      <div id="yandex-map" style={{ width: '400px', height: '400px' }}></div>
    )
  }
}

export default Map;