import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import useStore from "../store/familyStore.js";

const HouseholdSalaryCalculator = () => {
    const selected = useStore(state => state.selected);

    const splitNumber = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return <>
        <div className="flex flex-col mx-20 my-10 gap-y-10">
            <header>
                <FamilyMemberTabs />
            </header>
            <main className="flex flex-row gap-x-6">
                {selected >= 0 ? <SalaryCalculator splitNumber={splitNumber} /> : null}
                <HouseholdSummary splitNumber={splitNumber} />
            </main>
        </div>
    </>;
};

export default HouseholdSalaryCalculator;