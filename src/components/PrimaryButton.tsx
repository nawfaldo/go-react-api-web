import { FC } from "react";

interface Props {
  text: string;
  disabled: boolean;
  action: () => void;
}

const PrimaryButton: FC<Props> = ({ text, disabled, action }) => {
  return (
    <button
      className={`h-full font-semibold text-white items-center flex ${disabled ? "bg-blue-600 border-blue-700" : "bg-blue-500 hover:bg-blue-600 border-blue-600 hover:border-blue-700 "} w-full justify-center border-b-[5px] rounded-lg`}
      onClick={action}
      disabled={disabled}
    >
      <p className="text-white text-lg">{text}</p>
    </button>
  );
};

export default PrimaryButton;
