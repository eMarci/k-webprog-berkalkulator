import useStore from "../../../../store/familyStore.js";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import FrissHazasDateSetter from "./FrissHazasDateSetter.jsx";
import FrissHazasEligibilityIndicator from "./FrissHazasEligibilityIndicator.jsx";

const FrissHazasKedvezmeny = () => {
  const { register, setValue } = useForm();
  const { selected, familyMembers, setNewlywed, updateComputedSalary } = useStore(state => state);

  const handleClick = (e) => {
    setNewlywed(e.target.checked);
    updateComputedSalary();
  };

  const isSelected = familyMembers[selected].reliefs.newlywed.active;
  const isDateSet = familyMembers[selected].reliefs.newlywed.attrs.date !== null;

  useEffect(() => {
    setValue("select", isSelected)
  }, [setValue, isSelected]);

  return <>
    <div className="flex flex-row gap-x-2 items-center">
      <input type="checkbox" onClick={ handleClick } { ...register("select") } className="toggle toggle-primary"/>
      <span className="label-text font-semibold">Friss házasok kedvezménye</span>
      { isSelected ? <FrissHazasDateSetter/> : null }
      { isSelected && isDateSet ? <FrissHazasEligibilityIndicator/> : null }
    </div>
  </>
};

export default FrissHazasKedvezmeny;