import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setBoardData, setSelectedCell } from '../../store/boardSlice';
import Cell from '../Cell/Cell';
import King from '../Figures/King';
import Queen from '../Figures/Queen';
import Bishop from '../Figures/Bishop';
import Rook from '../Figures/Rook';
import './Board.scss';

const Board = () => {
    const dispatch = useDispatch();
    const { length: boardLength, data: boardData, selectedCell } = useSelector((state) => state.board);

    useEffect(() => {
        initializeBoard();
    }, []);

    useEffect(updateSelectedCell, [selectedCell]);

    function initializeBoard () {
        const boardData = [];

        for(let i = 0; i < boardLength; i++) {
            const rowData = [];

            for(let j = 0; j < boardLength; j++) {
                const color = (i + j) % 2 ? 'white' : 'black';

                rowData.push({
                    color: color,
                    figure: null,
                    selected: false,
                    id: Math.random(),
                });
            };

            boardData.push(rowData);
        };

        addFigures(boardData);
    }

    function addFigures(boardData) {
        boardData[0][0].figure = new Rook('black');
        boardData[0][1].figure = new Bishop('black');
        boardData[0][2].figure = new King('black');
        boardData[0][3].figure = new Queen('black');
        boardData[boardLength - 1][0].figure = new Rook('white');
        boardData[boardLength - 1][1].figure = new Bishop('white');
        boardData[boardLength - 1][2].figure = new King('white');
        boardData[boardLength - 1][3].figure = new Queen('white');
        boardData[selectedCell.x][selectedCell.y].selected = true;

        dispatch(setBoardData(boardData));
    }

    function updateSelectedCell() {
        if(boardData) {
            const newBoardData = boardData.map((row) => {
                return row.map((item) => ({
                    ...item,
                    selected: false,
                }));
            });

            newBoardData[selectedCell.y][selectedCell.x].selected = true;
            console.log(boardData);
            dispatch(setBoardData(newBoardData));
        }
    }

    function onKeypress(e) {
        switch(e.key) {
            case 'ArrowUp': onArrowMove(selectedCell.x, selectedCell.y - 1); break;
            case 'ArrowDown': onArrowMove(selectedCell.x, selectedCell.y + 1); break;
            case 'ArrowLeft': onArrowMove(selectedCell.x - 1, selectedCell.y); break;
            case 'ArrowRight': onArrowMove(selectedCell.x + 1, selectedCell.y); break;
            default: return false;
        }
    }

    function onArrowMove(x, y) {
        dispatch(setSelectedCell(getNewSelectedCellPosition(x, y)));
    }

    function getNewSelectedCellPosition(x, y) {
        const newPositions = {
            x: x,
            y: y,
        };

        if(x < 0) {
            newPositions.x = boardLength - 1;
        }

        if(x >= boardLength) {
            newPositions.x = 0;
        }

        if(y < 0) {
            newPositions.y = boardLength - 1;
        }

        if(y >= boardLength) {
            newPositions.y = 0;
        }

        return newPositions;
    }

    function renderBoard() {
        return (
            boardData.map((item) => {
                return item.map((item) => <Cell key={item.id} color={item.color} figure={item.figure} selected={item.selected} boardLength={boardLength} />);
            })
        );
    }

    return (
        <div className="board" onKeyDown={onKeypress} tabIndex="0">
            {boardData && renderBoard()}
        </div>
    );
};

export default Board;
