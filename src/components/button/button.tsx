import { LucideIcon } from "lucide-react";

type ButtonProps = {
  onClick: (() => void) | undefined;
  label: string;
  fullWidth: boolean;
  bgLight: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  disabled?: boolean;
  icon?: LucideIcon;
};

const Button = ({
  onClick,
  label,
  fullWidth = false,
  bgLight = false,
  variant = "default",
  disabled = false,
  icon: Icon,
}: ButtonProps) => {
  const baseClass =
    "flex items-center justify-center gap-3 rounded md:rounded-md text-xs font-bold md:text-sm md:font-medium ring-offset-background transition-colors focus-visible:outline-none";
  const fullWidthClass = fullWidth ? "w-full text-center" : "";
  const bgLightClass = bgLight
    ? "bg-indigo-100 hover:bg-indigo-200 text-indigo-600 hover:text-indigo-800"
    : "";
  const variantClass = {
    default: "bg-indigo-500 text-white hover:bg-indigo-600",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-slate-300 bg-white hover:bg-slate-100",
    secondary: "bg-slate-700 text-white hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-200 hover:text-slate-800 font-semibold",
    link: "text-blue-600 underline hover:text-blue-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${fullWidthClass} ${bgLightClass} ${
        !bgLight && variantClass[variant]
      }`}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
};

export default Button;
