import useStore from "../../../../store/familyStore.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import CsaladiKedvezmenySetter from "./CsaladiKedvezmenySetter.jsx";

const CsaladiKedvezmeny = () => {
    const { register, setValue } = useForm();
    const { selected, familyMembers, setFamily, updateComputedSalary } = useStore(state => state);

    const handleToggle = (e) => {
        setFamily(e.target.checked);
        updateComputedSalary();
    };

    const isSelected = familyMembers[selected].reliefs.family.active;

    useEffect(() => {
        setValue("select", isSelected);
    }, [setValue, isSelected]);

    return <>
        <div className="flex flex-col gap-y-3">
            <div className="flex flex-row gap-x-2 items-center">
                <input type="checkbox" onClick={handleToggle} {...register("select")} className="toggle toggle-primary"/>
                <span className="label-text font-semibold">Családi kedvezmény</span>
            </div>
            { isSelected ? <CsaladiKedvezmenySetter/> : null }
        </div>
    </>;
};

export default CsaladiKedvezmeny;