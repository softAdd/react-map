import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const { ymaps } = window;

class App extends Component {
  constructor(props) {
    super(props);
    this.myPlacemark = React.createRef();
  }
  componentDidMount() {
    console.log(ymaps)
  }
  handleClick = () => {
    console.log(ymaps)
  }
  handleChange = () => {
    console.log(this)
  }
  render() {
    return (
      <YMaps>
        <button onClick={this.handleClick}>Click to log</button>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 11 }} style={{ height: '300px', width: '300px' }}>
          <Placemark geometry={[55.75, 37.57]} options={{ draggable: true }} onGeometryChange={() => { console.log(this.myPlacemark.current.geometry._coordinates) }} instanceRef={this.myPlacemark} />
        </Map>
      </YMaps>
    );
  }
}

export default App;