import { Component } from 'react';
import blackIcon from '../../assets/img/black-bishop.png';
import whiteIcon from '../../assets/img/white-bishop.png';

export default class Bishop extends Component {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
    }
};
