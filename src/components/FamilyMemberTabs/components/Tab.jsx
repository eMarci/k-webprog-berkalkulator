import PropTypes from "prop-types";
import useStore from "../../../store/familyStore.js";

const Tab = ({ id, name }) => {
    const setSelected = useStore(state => state.setSelected);
    const selected = useStore(state => state.selected);

    const cls = "btn btn-square w-min px-3 bg-neutral shadow-none";

    const handleClick = () => {
        setSelected(id);
    };

    return <>
        <button onClick={handleClick} className={cls + (selected === id ? " bg-neutral-100" : "")}>
            {name}
        </button>
    </>;
};

export default Tab;

Tab.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};