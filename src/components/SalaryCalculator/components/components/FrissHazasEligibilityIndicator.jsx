import useStore from "../../../../store/familyStore.js";

const FrissHazasEligibilityIndicator = () => {
    const { selected, familyMembers } = useStore(state => state);

    const isEligible = familyMembers[selected].reliefs.newlywed.attrs.eligible;

    return <>
        <div className={`badge badge-${isEligible ? "success" : "error"} badge-outline border-2 badge-md font-bold py-3 px-4`}>
            {isEligible ? "Jogosult" : "Nem jogosult"}
        </div>
    </>
};

export default FrissHazasEligibilityIndicator;