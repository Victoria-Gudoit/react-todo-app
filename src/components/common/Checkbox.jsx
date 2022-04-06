function Checkbox({ value, checked, label }) {
  return (
    <label>
      <input type="radio" name="users" value={value} checked={checked} />
      {label}
    </label>
  );
}

export const CheckboxGroup = ({ value: groupValue, options }) => {
  return (
    <>
      {options.map(({ value, label }) => (
        <Checkbox value={value} label={label} checked={value === groupValue} />
      ))}
    </>
  );
};
