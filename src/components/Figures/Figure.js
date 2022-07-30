import { Component } from 'react';

export default class Figure extends Component {
    isEmptyDiagonal(currentCell, targetCell, getCell) {
        const absX = Math.abs(targetCell.x - currentCell.x);
        const absY = Math.abs(targetCell.y - currentCell.y);

        if(absY !== absX) {
            return false;
        }
    
        const xDicrection = currentCell.x < targetCell.x ? 1 : -1;
        const yDirection = currentCell.y < targetCell.y ? 1 : -1;
    
        for(let i = 1; i < absX; i++) {
            if(getCell(currentCell.x + xDicrection * i, currentCell.y + yDirection * i).figure) {
                return false;
            };
        };

        return true;
    };

    isEmptyHorizontal(currentCell, targetCell, getCell) {
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

        return true;
    };

    isEmptyVertical(currentCell, targetCell, getCell) {
        if(currentCell.x !== targetCell.x) {
            return false;
        };
    
        const startY = Math.min(currentCell.y, targetCell.y);
        const endY = Math.max(currentCell.y, targetCell.y);

        for(let y = startY + 1; y < endY; y++) {
            if(getCell(currentCell.x, y).figure) {
                return false
            };
        };

        return true;
    };
}
