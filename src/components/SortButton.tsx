type ButtonProps = {
    day: string | number,
    handleClick: Function,
}

const SortButton = ( {day, handleClick}: ButtonProps ) => {
    return (
        <>
        <button value={day} type='button' name='days' onClick={() => handleClick(day)}>
            {day} days
        </button>
        </>
    )
}
export default SortButton;