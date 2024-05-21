import Tab from "./components/Tab.jsx";
import useStore from "../../store/familyStore.js";

const FamilyMemberTabs = () => {
    const { familyMembers, newMember } = useStore(state => state);

    const tab = (member, index) => {
        return <li key={index}>
            <Tab id={index} name={member.name}/>
        </li>;
    };

    return <>
        <div>
            <ul className="menu menu-horizontal justify-items-stretch gap-x-5 bg-neutral rounded-box">
                {familyMembers.map(tab)}
                <li>
                    <button onClick={newMember}
                            className="items-stretch btn btn-square text-3xl pt-[0.5px] pl-[0.5px] font-semibold bg-base-100">+
                    </button>
                </li>
            </ul>
        </div>
    </>
};

export default FamilyMemberTabs;