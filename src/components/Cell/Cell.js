import './Cell.scss';

const Cell = ({ color, figure, boardLength}) => {
    return (
        <div className={`cell ${color}`} style={{width: `${100 / boardLength}%`, padding: `${100 / boardLength / 2}% 0`}}>
            {
                figure && (
                    <img src={figure.icon} alt="figure" />
                )
            }
        </div>
    );
};

export default Cell;
