import PropTypes from "prop-types";
import AddPercentage from "./components/AddPercentage.jsx";
import useStore from "../../../store/familyStore.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

const BerInput = ({ max }) => {
    const { register, setValue } = useForm();
    const { selected, familyMembers, setSalary, updateComputedSalary } = useStore(state => state);

    const handleInput = (e) => {
        setSalary(parseInt(e.target.value));
        updateComputedSalary();
    };

    const salary = familyMembers[selected].salary;
    const { ref: refBox } = register("box");
    const { ref: refSlider } = register("slider");

    useEffect(() => {
        setValue("box", salary);
        setValue("slider", salary);
    }, [setValue, salary]);

    return <>
        <div className="space-y-0">
            <div className="label">
                <label>Bruttó bér</label>
            </div>
            <input type="number" name="box" ref={refBox} onChange={handleInput} min="0" className="input input-bordered bg-white w-96" required/>
            <div className="label">
                <span className="label-text-alt text-neutral-500">Add meg a bruttó bért!</span>
            </div>

            <input type="range" name="slider" ref={refSlider} onInput={handleInput} min={0} max={max} className="range range-secondary"/>
            <div className="flex flex-row justify-center space-x-2.5">
                <AddPercentage offset={-1} />
                <AddPercentage offset={-5} />
                <AddPercentage offset={1} />
                <AddPercentage offset={5} />
            </div>
        </div>
    </>;
};

export default BerInput;

BerInput.propTypes = {
    max: PropTypes.number.isRequired,
};