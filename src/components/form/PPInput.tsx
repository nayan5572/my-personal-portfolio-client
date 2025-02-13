import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    suffix?: React.ReactNode;
    required?: boolean;
};

const PPInput = ({ type, name, label, placeholder, style, disabled, suffix, required }: TInputProps) => {
    return (
        <Controller
            name={name}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
                <div className="mb-4">
                    {label && <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>}
                    <div className="relative">
                        <input
                            type={type}
                            id={name}
                            {...field}
                            value={field.value ?? ""}
                            placeholder={placeholder}
                            disabled={disabled}
                            style={style}
                            required={required}
                            className={`w-full border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {suffix && <span className="absolute right-3 top-2">{suffix}</span>}
                    </div>
                    {error && <small className="text-red-500">{error.message}</small>}
                </div>
            )}
        />
    );
};

export default PPInput;
