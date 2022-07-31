import blackIcon from '../../assets/img/black-queen.png';
import whiteIcon from '../../assets/img/white-queen.png';
import Figure from './Figure';

export default class Queen extends Figure {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'queen';
        this.color = color;
    };

    canMove(currentCell, targetCell, getCell) {
        return (this.isEmptyHorizontal(currentCell, targetCell, getCell) || this.isEmptyVertical(currentCell, targetCell, getCell) || this.isEmptyDiagonal(currentCell, targetCell, getCell));
    };
};
