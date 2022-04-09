import css from "./checkbox.module.css";
import {v4 as uuidv4} from "uuid"


function Checkbox({ value, label, checked, onChange }) {
  return (
    <label className={css.filter}>
      <input  type="radio" name="tasks" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

export const CheckboxGroup = ({ value: groupValue, options, onChange }) => {
  return (
    <>
      {options.map(({ value, label }) => (
        <Checkbox key={uuidv4()} value={value} label={label} checked={value === groupValue} onChange={onChange} />
      ))}
    </>
  );
};
