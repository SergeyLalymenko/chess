import './Cell.scss';

const Cell = ({ x, y, color, boardLength, boardWidth}) => {
    console.log(boardWidth);

    return (
        <div className={`cell ${color}`} style={{width: `${100 / boardLength}%`, height: `${boardWidth / boardLength}px`}}>
            
        </div>
    );
};

export default Cell;