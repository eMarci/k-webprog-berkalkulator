import {useForm} from "react-hook-form";
import useStore from "../../../../store/familyStore.js";
import {useEffect} from "react";

const SzemelyiKedvezmeny = () => {
    const { register, setValue } = useForm();
    const { selected, familyMembers, setPersonal, updateComputedSalary } = useStore(state => state);

    const handleClick = (e) => {
        setPersonal(e.target.checked);
        updateComputedSalary();
    };

    const isSelected = familyMembers[selected].reliefs.personal.active;

    useEffect(() => {
        setValue("select", isSelected)
    }, [setValue, isSelected]);

    return <>
        <div className="flex flex-row gap-x-2 items-center">
            <input type="checkbox" onClick={handleClick} {...register("select")} className="toggle toggle-primary"/>
            <span className="label-text font-semibold">Személyi adókedvezmény</span>
        </div>
    </>;
};

export default SzemelyiKedvezmeny;