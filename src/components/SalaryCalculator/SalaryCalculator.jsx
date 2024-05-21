import Kedvezmenyek from "./components/Kedvezmenyek.jsx";
import NevInput from "./components/NevInput.jsx";
import BerInput from "./components/BerInput.jsx";
import useStore from "../../store/familyStore.js";
import PropTypes from "prop-types";

const SalaryCalculator = ({ splitNumber }) => {
    const { selected, familyMembers, setSelected, deleteMember } = useStore(state => state);

    const name = familyMembers[selected].name;

    const handleDelete = () => {
        deleteMember();
        setSelected(familyMembers.length - 2);
    };

    return <>
        <div className="form-control gap-y-2">
            <div className="flex flex-row gap-x-10 justify-between items-center">
                <h1 className="small-caps font-bold text-5xl">
                    {name.length !== 0 ? name : "Új családtag"} bérének kiszámítása
                </h1>
                <button onClick={handleDelete} className="btn btn-square bg-neutral-100 text-2xl">🗑️</button>
            </div>

            <NevInput/>
            <BerInput max={1000000}/>

            <div className="divider divider-accent mb-0"></div>

            <Kedvezmenyek />

            <div className="divider divider-accent mb-0"></div>

            <div className="flex flex-col gap-y-4 justify-center items-center">
                <span className="text-3xl font-semibold">Számított nettó bér:</span>
                <span className="text-2xl py-4 px-8 bg-neutral rounded-xl">{splitNumber(familyMembers[selected].computedSalary)} Ft</span>
            </div>
        </div>
    </>;
};

export default SalaryCalculator;

SalaryCalculator.propTypes = {
    splitNumber: PropTypes.func.isRequired,
};