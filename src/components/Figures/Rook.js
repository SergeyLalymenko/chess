import { Component } from 'react';
import blackIcon from '../../assets/img/black-rook.png';
import whiteIcon from '../../assets/img/white-rook.png';

export default class Rook extends Component {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'rook';
    }
};
