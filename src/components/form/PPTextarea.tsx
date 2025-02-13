import { Controller } from "react-hook-form";

type TTextareaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    rows?: number;
    required?: boolean
};

const PPTextarea = ({ name, label, placeholder, style, rows = 4, required }: TTextareaProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className="mb-4">
                    {label && <label htmlFor={name} className="block text-gray-700 font-medium mb-1">{label}</label>}
                    <textarea
                        {...field}
                        required={required}
                        id={name}
                        placeholder={placeholder}
                        rows={rows}
                        style={style}
                        className={`w-full border p-2 rounded-md ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    />
                    {error && <small className="text-red-500">{error.message}</small>}
                </div>
            )}
        />
    );
};

export default PPTextarea;
