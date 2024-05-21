import useStore from "../../store/familyStore.js";
import PropTypes from "prop-types";

const HouseholdSummary = ({ splitNumber }) => {
    const familyMembers = useStore(state => state.familyMembers);

    let totalSalary;

    if (familyMembers.length > 0) {
        totalSalary = familyMembers.map(member => member.computedSalary).reduce((a, b) => a + b);
    } else {
        totalSalary = 0;
    }

    return <>
        <div className="form-control justify-start pt-20 gap-y-10">
            <h1 className="text-center font-bold text-3xl">Háztartás összesített jövedelme</h1>
            <table className="table text-xl">
                <thead>
                    <tr>
                        <th className="font-extrabold">Családtag</th>
                        <th className="font-extrabold">Nettó bér</th>
                    </tr>
                </thead>
                <tbody>
                    {familyMembers.map((familyMember, index) => {
                        return (<tr key={index}>
                            <td>{familyMember.name}</td>
                            <td>{splitNumber(familyMember.computedSalary)}</td>
                        </tr>);
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="font-semibold">Összesen:</td>
                        <td className="font-semibold">{splitNumber(totalSalary)} Ft</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </>;
};

export default HouseholdSummary;

HouseholdSummary.propTypes = {
    splitNumber: PropTypes.func.isRequired
};