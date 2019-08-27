import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps';
import axios from 'axios';

class YMap extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      apikey: '',
    }
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
    axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${this.state.apikey}&geocode=${mark.geometry[1]},${mark.geometry[0]}&results=1&format=json`)
		.then(res => {
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

  getAllCoordinates = () => {
    return this.props.marks.map(mark => {
      if (mark.geometry && mark.geometry.length !== 0) {
        return mark.geometry;
      }
      return this.map.current.getCenter();
    });
	}
	
	changeApiKey = event => {
    this.setState({
      apikey: event.target.value
    });
  };

  render() {
    const { marks, mapDefaultState, mapWidth, mapHeight } = this.props;
    return (
			<Fragment>
				<div className="yandex-map-container">
					<YMaps>
						<Map defaultState={mapDefaultState} style={{ height: mapHeight, width: mapWidth }} instanceRef={this.map}>
							{marks.map((mark, index) => (
								<Placemark 
									geometry={mark.geometry}
									options={{ draggable: true }} 
									key={`${mark.title}-${index}`} 
									onDragEnd={event => { this.onDragEnd(event, mark) }}
									modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
									properties={{
										hintContent: mark.address,
										balloonContent: `<p>${mark.title}</p><p>${mark.address}</p>`,
									}}
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
				<div className="api" style={{ display: 'flex', flexDirection: 'column' }}>
					<p>API_KEY:</p>
					<input onChange={event => { this.changeApiKey(event) }}/>
          <a target="_blank" rel="noopener noreferrer" href="https://yandex.ru/dev/locator/keys/get/"  style={{ textDecoration: 'none' }}>Get yandex api key</a>
        </div>
			</Fragment>

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