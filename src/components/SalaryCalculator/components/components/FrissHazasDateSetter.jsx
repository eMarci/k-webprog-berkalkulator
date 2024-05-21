import {useRef} from "react";
import useStore from "../../../../store/familyStore.js";
import {DateTime} from "luxon";

const FrissHazasDateSetter = () => {
    const { setNewlywedDate, updateNewlywedEligibility } = useStore(state => state);

    const buttonRef = useRef();
    const dateFieldRef = useRef();

    const openModal = () => {
        document.getElementById("date_setter").showModal();
        document.querySelector("#date_setter input").value = null;
        buttonRef.current.focus();
        buttonRef.current.disabled = true;
    };

    const handleSave = () => {
        setNewlywedDate(dateFieldRef.current.valueAsNumber);
        updateNewlywedEligibility();
    };

    const updateButton = (e) => {
        buttonRef.current.disabled = e.target.value === "";
    };

    return <>
        <button onClick={openModal}
                className="btn btn-xs btn-neutral">Dátum hozzáadása
        </button>
        <dialog id="date_setter" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Házasságkötés dátuma</h3>
                <p className="py-4">
                    A kedvezmény először a házasságkötést követő hónapra vehető igénybe és a házassági életközösség
                    alatt legfeljebb 24 hónapon keresztül jár.</p>
                <div className="space-y-0">
                    <div className="label">
                        <label>Add meg a házasságkötés dátumát:</label>
                    </div>
                    <input type="date" max={DateTime.local().toISODate()} onInput={updateButton} ref={dateFieldRef} className="input input-bordered"/>
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <button onClick={handleSave} ref={buttonRef} className="btn">Mentés</button>
                    </form>
                </div>
            </div>
        </dialog>
    </>;
};

export default FrissHazasDateSetter;