import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import axios from 'axios';

const apikey = '';

class YMap extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentDidUpdate() {
    this.props.marks.forEach(mark => {
      if (!mark.geometry || mark.geometry.length === 0) {
        mark.geometry = this.map.current.getCenter();
        this.setAddress(mark);
      }
    });
  }

  setAddress = mark => {
    axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${mark.geometry[1]},${mark.geometry[0]}&results=1&format=json`)
		.then(res => {
      console.log('getting from API')
		  const address = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
		  if (address) {
        mark.address = address;
        this.forceUpdate();
			}
		});
  }

  onDragEnd = (event, mark) => {
    mark.geometry = event.get('target').geometry.getCoordinates();
    this.setAddress(mark);
  }

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
      <div className="yandex-map-container">
        <YMaps>
          <Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
            {marks.map((mark, index) => (
              <Placemark 
                geometry={mark.geometry}
                options={{ draggable: true }} 
                key={`${mark.title}-${mark.id}`} 
                onDragEnd={event => { this.onDragEnd(event, mark) }}
              />
            ))}
            <Polyline
              geometry={{
                type: 'LineString',
              }}
              options={{
                strokeWidth: 4,
                strokeColor: '000000',
                draggable: false,
                strokeOpacity: 0.5,
              }}
            />
            {marks.map(mark => (
              <div key={mark.id}>{mark.address}</div>
            ))}
          </Map>
        </YMaps>
      </div>
    );
  }
}

YMap.propTypes = {
  marks: PropTypes.array.isRequired,
  mapDefaultState: PropTypes.object.isRequired,
  mapWidth: PropTypes.string.isRequired,
  mapHeight: PropTypes.string.isRequired,
}

export default YMap;