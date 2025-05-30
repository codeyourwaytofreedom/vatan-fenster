import style from './style/NumberInput.module.css';

interface NumberInputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width: number;
  rules?: ((value: number) => boolean)[];
}
export default function NumberInput({ value, width, rules, onChange }: NumberInputProps) {
  const clean = rules ? rules?.every((r) => Boolean(r(value))) : true;
  const inputClass = clean ? style.clean : style.warn;
  return (
    <input
      min={0}
      style={{ width: width }}
      className={inputClass}
      value={value}
      onChange={onChange}
      type="number"
    />
  );
}
