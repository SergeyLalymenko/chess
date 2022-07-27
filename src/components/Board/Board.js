import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setBoardData } from '../../store/boardSlice';
import Cell from '../Cell/Cell';
import King from '../Figures/King';
import Queen from '../Figures/Queen';
import Bishop from '../Figures/Bishop';
import Rook from '../Figures/Rook';
import './Board.scss';

const Board = () => {
    const dispatch = useDispatch();
    const { length: boardLength, data: boardData } = useSelector((state) => state.board);

    useEffect(initializeBoard, []);

    function initializeBoard () {
        const boardData = [];

        for(let i = 0; i < boardLength; i++) {
            const rowData = [];

            for(let j = 0; j < boardLength; j++) {
                const color = (i + j) % 2 ? 'white' : 'black';

                rowData.push({
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
        boardData[0][2].figure = new King('black');
        boardData[0][3].figure = new Queen('black');
        boardData[boardLength - 1][0].figure = new Rook('white');
        boardData[boardLength - 1][1].figure = new Bishop('white');
        boardData[boardLength - 1][2].figure = new King('white');
        boardData[boardLength - 1][3].figure = new Queen('white');

        dispatch(setBoardData(boardData));
    }

    function renderBoard() {
        return (
            boardData.map((item) => {
                return item.map((item) => <Cell key={item.id} color={item.color} figure={item.figure} boardLength={boardLength} />);
            })
        );
    }

    return (
        <div className="board">
            {boardData && renderBoard()}
        </div>
    );
};

export default Board;
