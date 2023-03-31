type TValue = string | number;
type handleClick = Function;

const SortButton = (value: TValue, handleClick: handleClick) => {
    return (
        <>
        <button value={value} type='button' name='days' onClick={() => handleClick(value)}>
            {value} days
        </button>
        </>
    )
}
export default SortButton;