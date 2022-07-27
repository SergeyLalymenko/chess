import { Component } from 'react';
import blackIcon from '../../assets/img/black-queen.png';
import whiteIcon from '../../assets/img/white-queen.png';

export default class Queen extends Component {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
    }
};
