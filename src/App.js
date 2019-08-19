import React, { Component } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

let myPlacemark = {
  geometry: [55.75, 37.57],
  options: {
    draggable: true,
  }
}

let green = { color: 'green' }

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <YMaps>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 11 }} style={{ height: '100vh'}}>
            <Placemark {...myPlacemark} />
          </Map>
        </div>
      </YMaps>
    );
  }
}

export default App;
