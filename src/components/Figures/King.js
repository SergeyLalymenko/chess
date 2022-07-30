import blackIcon from '../../assets/img/black-king.png';
import whiteIcon from '../../assets/img/white-king.png';
import Figure from './Figure';

export default class King extends Figure {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'king';
        this.color = color;
    };

    canMove(currentCell, targetCell) {
        const shiftX = Math.abs(currentCell.x - targetCell.x);
        const shiftY = Math.abs(currentCell.y - targetCell.y);

        if(shiftX > 1 || shiftY > 1) {
            return false;
        };

        return true;
    };
};
