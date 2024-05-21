import useStore from "../../../store/familyStore.js";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

const NevInput = () => {
    const { register, setValue } = useForm();
    const { selected, familyMembers, setName } = useStore(state => state);

    const handleInput = (e) => {
        setName(e.target.value);
    };

    const name = familyMembers[selected].name;
    const { ref } = register("name");

    useEffect(() => {
        setValue("name", name);
    }, [setValue, name]);

    return <>
        <div className="space-y-0">
            <div className="label">
                <span className="label-text">Családtag neve</span>
            </div>
            <input type="text" name="name" placeholder="Név" onInput={handleInput}
                   ref={ref} className="input input-bordered bg-white w-96" required/>
            <div className="label">
                <span className="label-text-alt text-neutral-500">Add meg a családtag nevét!</span>
            </div>
        </div>
    </>;
};

export default NevInput;