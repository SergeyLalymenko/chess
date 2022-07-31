import blackIcon from '../../assets/img/black-bishop.png';
import whiteIcon from '../../assets/img/white-bishop.png';
import Figure from './Figure';

export default class Bishop extends Figure {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'bishop';
        this.color = color;
    };

    canMove(currentCell, targetCell, getCell) {
        return this.isEmptyDiagonal(currentCell, targetCell, getCell);
    };
};
