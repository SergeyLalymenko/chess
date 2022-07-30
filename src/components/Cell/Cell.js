import './Cell.scss';

const Cell = ({ x, y, color, figure, selectedCell, submittedCell, selected, submitted, boardLength}) => {
    function isSelected() {
        if(selectedCell.x === x && selectedCell.y === y) {
            return 'selected';
        };

        return '';
    }

    function isSubmitted() {
        if(submittedCell && submittedCell.x === x && submittedCell.y === y) {
            return 'submitted';
        };

        return '';
    }

    return (
        <div className={`cell ${color} ${isSelected()} ${isSubmitted()}`} style={{width: `${100 / boardLength}%`, padding: `${50 / boardLength}% 0`}}>
            {
                figure && (
                    <img src={figure.icon} alt="figure" />
                )
            }
        </div>
    );
};

export default Cell;
