import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setBoardData } from '../../store/boardSlice';
import Cell from '../Cell/Cell';
import King from '../../models/Figures/King';
import Queen from '../../models/Figures/Queen';
import Bishop from '../../models/Figures/Bishop';
import Rook from '../../models/Figures/Rook';
import './Board.scss';

const Board = () => {
    const dispatch = useDispatch();
    const { length: boardLength, data: boardData } = useSelector((state) => state.board);
    const [selectedCell, setSelectedCell] = useState({x: 0, y: boardLength - 1});
    const [submittedCell, setSubmittedCell] = useState(null);
    const [stepColor, setStepColor] = useState('white');
    const [stepsList, setStepsList] = useState([]);

    useEffect(initializeBoard, []);

    function initializeBoard () {
        const boardData = [];

        for(let i = 0; i < boardLength; i++) {
            const rowData = [];

            for(let j = 0; j < boardLength; j++) {
                const color = (i + j) % 2 ? 'white' : 'black';

                rowData.push({
                    x: j,
                    y: i,
                    color: color,
                    figure: null,
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
        boardData[0][2].figure = new Queen('black');
        boardData[0][3].figure = new King('black');
        boardData[boardLength - 1][0].figure = new Rook('white');
        boardData[boardLength - 1][1].figure = new Bishop('white');
        boardData[boardLength - 1][2].figure = new Queen('white');
        boardData[boardLength - 1][3].figure = new King('white');
        boardData[selectedCell.x][selectedCell.y].selected = true;

        dispatch(setBoardData(boardData));
    }

    function onKeyDown(e) {
        switch(e.key) {
            case 'Enter': onEnterDown(); break;
            case 'ArrowUp': onArrowMove(selectedCell.x, selectedCell.y - 1); break;
            case 'ArrowDown': onArrowMove(selectedCell.x, selectedCell.y + 1); break;
            case 'ArrowLeft': onArrowMove(selectedCell.x - 1, selectedCell.y); break;
            case 'ArrowRight': onArrowMove(selectedCell.x + 1, selectedCell.y); break;
            default: return false;
        };
    }

    function onEnterDown() {
        const selectedCellData = getCell(selectedCell.x, selectedCell.y);
        const submittedCellData = submittedCell ? getCell(submittedCell.x, submittedCell.y) : null;
        const isTargetAlly = selectedCellData.figure?.color === stepColor;

        if(isTargetAlly) {
            setSubmittedCell(selectedCell);
        } else if(submittedCell && submittedCellData.figure.name === 'king' && submittedCellData.figure.isCastling(submittedCell, selectedCell, getCell)) {
            castling(submittedCell, selectedCell, submittedCellData.figure);
        } else if(submittedCell && submittedCellData.figure.canMove(submittedCell, selectedCell, getCell)) {
            updateStepsList(selectedCell, submittedCell);
            moveFigure(selectedCell, submittedCellData.figure);
        }
    }

    function getCell(x, y) {
        return boardData[y][x];
    }

    function moveFigure({x, y}, figure) {
        const newBoardData = boardData.map((row) => {
            return row.map((cell) => {
                if(cell.x === x && cell.y === y) {
                    return {
                        ...cell,
                        figure,
                    };
                };

                if (cell.x === submittedCell.x && cell.y === submittedCell.y) {
                    return {
                        ...cell,
                        figure: null,
                    };
                };

                return cell;
            });
        });

        toggleStep();
        setSubmittedCell(null);
        dispatch(setBoardData(newBoardData));
    }

    function castling(currentCell, targetCell, figure) {
        const dicrection = currentCell.x < targetCell.x ? 1 : -1;
        const nextCellFigure = getCell(targetCell.x + dicrection, currentCell.y).figure;

        const newBoardData = boardData.map((row) => {
            return row.map((cell) => {
                if(cell.x === targetCell.x && cell.y === targetCell.y) {
                    return {
                        ...cell,
                        figure,
                    };
                };

                if ((cell.x === currentCell.x && cell.y === currentCell.y) || (cell.x === targetCell.x + dicrection && cell.y === targetCell.y)) {
                    return {
                        ...cell,
                        figure: null,
                    };
                };

                if(cell.x === targetCell.x - dicrection && cell.y === targetCell.y) {
                    return {
                        ...cell,
                        figure: nextCellFigure,
                    };
                }

                return cell;
            });
        });

        toggleStep();
        setSubmittedCell(null);
        dispatch(setBoardData(newBoardData));
    }

    function updateStepsList(selectedCell, submittedCell) {
        const notationX = {
            0: 'A',
            1: 'B',
            2: 'C',
            3: 'D',
            4: 'E',
            5: 'F',
            6: 'G',
            7: 'H',
        };
        const notationY = {
            0: boardLength,
            1: boardLength - 1,
            2: boardLength - 2,
            3: boardLength - 3,
            4: boardLength - 4,
            5: boardLength - 5,
            6: boardLength - 6,
            7: boardLength - 7,
        };

        const stepsItem = {
            text: `${notationX[submittedCell.x]}${notationY[submittedCell.y]} - ${notationX[selectedCell.x]}${notationY[selectedCell.y]}`,
            color: stepColor,
            id: Math.random(),
        };

        setStepsList([...stepsList, stepsItem]);
    }

    function toggleStep() {
        const nextStep = stepColor === 'white' ? 'black' : 'white';

        setStepColor(nextStep);
    }

    function onArrowMove(x, y) {
        setSelectedCell(getNewSelectedCellPosition(x, y));
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

    function renderStepsList() {
        return (
            stepsList.map((step) => {
            return (
                <li className={step.color} key={step.id}>
                    {step.text}
                </li>
                );
            })
        );
    }

    function renderBoard() {
        return (
            boardData.map((item) => {
                return item.map((item) => <Cell key={item.id} x={item.x} y={item.y} color={item.color} figure={item.figure} selectedCell={selectedCell} submittedCell={submittedCell} selected={item.selected} submitted={item.submitted} boardLength={boardLength} />);
            })
        );
    }

    return (
        <>
            <div className="board" onKeyDown={onKeyDown} tabIndex="0">
                {boardData && renderBoard()}
            </div>

            <ul className='steps-list'>
                {stepsList && renderStepsList()}
            </ul>
        </>
    );
};

export default Board;
