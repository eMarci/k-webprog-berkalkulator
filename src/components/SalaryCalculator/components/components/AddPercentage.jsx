import PropTypes from "prop-types";
import useStore from "../../../../store/familyStore.js";

const AddPercentage = ({ offset }) => {
    const { selected, familyMembers, setSalary, updateComputedSalary } = useStore(state => state);

    const salary = familyMembers[selected].salary;

    const handleClick = () => {
        const newVal = Math.round(salary*(100+offset)/100);
        setSalary(newVal);
        updateComputedSalary();
    };

    return <>
        <button onClick={handleClick} className="btn btn-accent">{offset > 0 ? "+" : ""}{offset}%</button>
    </>;
};

export default AddPercentage;

AddPercentage.propTypes = {
    offset: PropTypes.number.isRequired,
};