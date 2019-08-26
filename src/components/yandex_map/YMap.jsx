import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import axios from 'axios';
import { apikey } from '../../apikey';

class YMap extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.placemarks = [];
  }

  getAllCoordinates = () => {
    const { marks } = this.props;
    const coordinates = marks.map(mark => mark.geometry);
    return coordinates;
  }

  getCenterGeometry = () => {
    return this.map.current.getCenter();
  }

  getDefaultGeometry = mark => {
    if (mark.geometry.length !== 0) {
      return mark.geometry;
    }
    mark.geometry = this.getCenterGeometry();
    return this.getCenterGeometry();
  }

  setGeometry = (mark, index) => {
    mark.geometry = this.placemarks[index].geometry.getCoordinates();
    this.props.setMarkGeometry(mark);
  }

  // getCenterGeometry = () => {
  //   return this.map.current.getCenter();
  // }

  // setAddress = mark => {
  //   const geometry = this.placemarks[mark.id].geometry.getCoordinates();
  //   axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${apikey}&geocode=${geometry[1]},${geometry[0]}&results=1&format=json`)
  //   .then(res => {
  //     const address = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
  //     if (address) {
  //       mark.address = address;
  //       this.props.setMarkAddress(mark)
  //     }
  //   })
  // }

  setRef = (node, index) => {
    this.placemarks[index] = node;
  }

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
      <div className="yandex-map-container">
        <YMaps>
          <Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
            {marks.map((mark, index) => (
              <Placemark 
                geometry={this.getDefaultGeometry(mark)} 
                options={{ draggable: true }} 
                key={`${mark.title}-${mark.id}`} 
                onDragEnd={() => { this.setGeometry(mark, index) }}
                instanceRef={node => { this.setRef(node, index) }}
              />
            ))}
            <Polyline
              geometry={{
                type: 'LineString',
                coordinates: this.getAllCoordinates(),
              }}
              options={{
                strokeWidth: 4,
                strokeColor: '000000',
                draggable: false,
                strokeOpacity: 0.5,
              }}
            />
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
  setMarkGeometry: PropTypes.func.isRequired,
  setMarkAddress: PropTypes.func.isRequired,
}

export default YMap;