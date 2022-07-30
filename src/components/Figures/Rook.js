import blackIcon from '../../assets/img/black-rook.png';
import whiteIcon from '../../assets/img/white-rook.png';
import Figure from './Figure';

export default class Rook extends Figure {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'rook';
        this.color = color;
    };

    canMove(currentCell, targetCell, getCell) {
        return (this.isEmptyHorizontal(currentCell, targetCell, getCell) || this.isEmptyVertical(currentCell, targetCell, getCell));
    };
};
