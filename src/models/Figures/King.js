import blackIcon from '../../assets/img/black-king.png';
import whiteIcon from '../../assets/img/white-king.png';
import Figure from './Figure';

export default class King extends Figure {
    constructor(color) {
        super();
        this.icon = color === 'white' ? whiteIcon : blackIcon;
        this.name = 'king';
        this.color = color;
        this.firstStep = true;
    };

    isCastling(currentCell, targetCell, getCell) {
        if(currentCell.y !== targetCell.y) {
            return false;
        };
    
        const startX = Math.min(currentCell.x, targetCell.x);
        const endX = Math.max(currentCell.x, targetCell.x);

        for(let x = startX + 1; x < endX; x++) {
            if(getCell(x, currentCell.y).figure) {
                return false;
            };
        };

        const dicrection = currentCell.x < targetCell.x ? 1 : -1;
        const nextCellFigure = getCell(targetCell.x + dicrection, currentCell.y)?.figure;

        if(nextCellFigure?.color !== this.color || nextCellFigure?.name !== 'rook' || !nextCellFigure?.firstStep || !this.firstStep) {
            return false;
        }

        return true;
    };

    canMove(currentCell, targetCell) {
        const shiftX = Math.abs(currentCell.x - targetCell.x);
        const shiftY = Math.abs(currentCell.y - targetCell.y);

        if(shiftX > 1 || shiftY > 1) {
            return false;
        };

        this.firstStep = false;

        return true;
    };
};
