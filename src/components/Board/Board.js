import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setBoardCoordinates } from '../../store/boardSlice';
import Cell from '../Cell/Cell';
import './Board.scss';

const Board = () => {
    const dispatch = useDispatch();
    const { length: boardLength, coordinates: boardCoordinates } = useSelector((state) => state.board);
    const [boardWidth, setBoardWidth] = useState(null);
    const boardRef = React.createRef();

    useEffect(() => {
        initializeBoard();
        setBoardWidth(boardRef.current.clientWidth);
    }, []);

    function initializeBoard () {
        const boardCoordinates = [];

        for(let i = 0; i < boardLength; i++) {
            const rowCoordinates = [];

            for(let j = 0; j < boardLength; j++) {
                const color = (i + j) % 2 ? 'white' : 'black';

                rowCoordinates.push({
                    x: i,
                    y: j,
                    color: color,
                    id: Math.random(),
                });
            };

            boardCoordinates.push(rowCoordinates);
        };

        dispatch(setBoardCoordinates(boardCoordinates));
    }

    function renderBoard() {
        return (
            boardCoordinates.map((item) => {
                return item.map((item) => <Cell key={item.id} x={item.x} y={item.y} color={item.color} boardLength={boardLength} boardWidth={boardWidth} />);
            })
        );
    }

    return (
        <div className="board" ref={boardRef}>
            {boardCoordinates && boardWidth && renderBoard()}
        </div>
    );
};

export default Board;
