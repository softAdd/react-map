import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const { ymaps } = window;

class App extends Component {
  componentDidMount() {
    console.log(ymaps)
  }
  render() {
    return (
      <YMaps>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 11 }} style={{ height: '300px', width: '300px' }}>
          <Placemark geometry={[55.75, 37.57]} options={{ draggable: true }} />
        </Map>
      </YMaps>
    );
  }
}

export default App;