import FrissHazasKedvezmeny from "./components/FrissHazasKedvezmeny.jsx";
import CsaladiKedvezmeny from "./components/CsaladiKedvezmeny.jsx";
import SZJAKedvezmeny from "./components/SZJAKedvezmeny.jsx";
import SzemelyiKedvezmeny from "./components/SzemelyiKedvezmeny.jsx";

const Kedvezmenyek = () => {
    return <>
        <h2 className="small-caps font-bold text-4xl mb-2">Kedvezmények</h2>

        <div className="flex flex-col justify-evenly gap-y-2">
            <SZJAKedvezmeny />
            <FrissHazasKedvezmeny />
            <SzemelyiKedvezmeny />
            <CsaladiKedvezmeny />
        </div>
    </>;
};

export default Kedvezmenyek;