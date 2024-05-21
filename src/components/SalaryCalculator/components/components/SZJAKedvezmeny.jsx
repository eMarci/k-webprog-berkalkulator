import {useForm} from "react-hook-form";
import useStore from "../../../../store/familyStore.js";
import {useEffect} from "react";

const SZJAKedvezmeny = () => {
    const { register, setValue } = useForm();
    const { selected, familyMembers, setPIT, updateComputedSalary } = useStore(state => state);

    const handleClick = (e) => {
        setPIT(e.target.checked);
        updateComputedSalary();
    };

    const isSelected = familyMembers[selected].reliefs.pit.active;

    useEffect(() => {
        setValue("select", isSelected)
    }, [setValue, isSelected]);

    return <>
        <div className="flex flex-row gap-x-2 items-center">
            <input type="checkbox" onClick={handleClick} {...register("select")} className="toggle toggle-primary" />
            <span className="label-text font-semibold">25 év alattiak SZJA mentessége</span>
        </div>
    </>;
};

export default SZJAKedvezmeny;