import React, { Component, Fragment } from 'react';

import PointList from './yandex_map/PointList';
import YMap from './yandex_map/YMap';

class YandexMap extends Component {
	state = {
			marks: [],
	}

	// ACTIONS
	addMark = title => {
			const arrMarks = this.getMarks();
			const index = this.getMarkNumber();
			const mark = {
					title: title,
					id: index,
					geometry: [],
			}
			this.setState({
					marks: [...arrMarks, mark],
			})
	}

	removeMark = mark => {
		let arrMarks = this.getMarks();
		let index = 0;
		arrMarks.find((val, num) => {
			if (val.id === mark.id) {
				index = num;
			}
			return val.id === mark.id
		});
		arrMarks.splice(index, 1);
		this.setState({
				marks: arrMarks,
		})
	}

	// GETTERS
	getMarkNumber = () => {
			const markCount = this.state.marks.length;
			return markCount;
	}

	getMarks = () => {
			const arrMarks = this.state.marks.slice();
			return arrMarks;
	}

	// SETTERS
	setMarkGeometry = mark => {
		let arrMarks = this.getMarks();
		let index = 0;
		arrMarks.some((value, number) => {
				if (value.id === mark.id) {
						index = number;
				}
				return value.id === mark.id;
		});
		arrMarks[index].geometry = mark.geometry;
		this.setState({
				marks: arrMarks,
		});
	}

	render() {
		return (
				<Fragment>
						<PointList
								addMark={this.addMark}
								removeMark={this.removeMark}
								marks={this.getMarks()}
						/>
						<YMap
								marks={this.getMarks()}
								mapDefaultState={{ center: [55.75, 37.57], zoom: 11 }}
								mapWidth={'400px'}
								mapHeight={'400px'}
								setMarkGeometry={this.setMarkGeometry}
						/>
				</Fragment>
		)
	}
}

export default YandexMap;