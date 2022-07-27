import { Component } from 'react';
import blackIcon from '../../assets/img/black-king.png';
import whiteIcon from '../../assets/img/white-king.png';

export default class King extends Component {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
    }
};
