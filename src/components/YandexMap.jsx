import React, { Component, Fragment } from 'react';

import MarkListContainer from './yandex_map/MarkListContainer';
import YMap from './yandex_map/YMap';

class YandexMap extends Component {
	state = {
			marks: [],
	}

	// ACTIONS
	addMark = title => {
			const arrMarks = this.getMarks();
			const index = this.state.marks.length;
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

	moveMark = (dragIndex, hoverIndex) => {
		let marksArray = this.getMarks();
		const mark = marksArray[dragIndex];
		marksArray.splice(dragIndex, 1);
		marksArray.splice(hoverIndex, 0, mark);
		this.setState({
			marks: marksArray,
		});
	}

	// GETTERS
	getMarks = () => {
			const arrMarks = this.state.marks.slice();
			return arrMarks;
	}

	render() {
		return (
				<Fragment>
						<MarkListContainer
								addMark={this.addMark}
								removeMark={this.removeMark}
								moveMark={this.moveMark}
								marks={this.getMarks()}
						/>
						<YMap
								marks={this.getMarks()}
								mapDefaultState={{ center: [55.75, 37.57], zoom: 11 }}
								mapWidth={'400px'}
								mapHeight={'400px'}
						/>
				</Fragment>
		)
	}
}

export default YandexMap;