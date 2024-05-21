import useStore from "../../../../store/familyStore.js";

const CsaladiKedvezmenySetter = () => {
    const { selected, familyMembers, changeFamilySupports, changeFamilyRelieved, updateComputedSalary } = useStore(state => state);

    const supports = familyMembers[selected].reliefs.family.attrs.supports;
    const relieved = familyMembers[selected].reliefs.family.attrs.relieved;

    const handleChangeSupports = (offset) => {
        if (supports-1 < relieved && offset === -1) {
            changeFamilyRelieved(offset);
        }
        changeFamilySupports(offset);
        updateComputedSalary();
    };

    const handleChangeRelieved = (offset) => {
        changeFamilyRelieved(offset);
        updateComputedSalary();
    };

    return <>
        <div className="flex flex-row gap-x-2 items-center">
            <button disabled={supports === 0} onClick={() => handleChangeSupports(-1)} className="items-start btn btn-xs btn-circle text-sm">–
            </button>
            <span>{supports}</span>
            <button onClick={() => handleChangeSupports(1)}
                    className="items-start btn btn-xs btn-circle text-sm font-bold">+
            </button>
            <span>Eltartott, ebből kedvezményezett:</span>
            <button disabled={relieved === 0} onClick={() => handleChangeRelieved(-1)} className="items-start btn btn-xs btn-circle text-sm">–
            </button>
            <span>{relieved}</span>
            <button disabled={relieved === supports || relieved === 3} onClick={() => handleChangeRelieved(1)}
                    className="items-start btn btn-xs btn-circle text-sm font-bold">+
            </button>
        </div>
    </>;
};

export default CsaladiKedvezmenySetter;