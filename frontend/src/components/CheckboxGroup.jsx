import React from 'react';

const CheckboxGroup = ({ title, options, selected, onChange }) => {
    const handleChange = (option) => {
        let newSelected;
        if (selected.includes(option)) {
            newSelected = selected.filter(item => item !== option);
        } else {
            newSelected = [...selected, option];
        }
        onChange(newSelected);
    };

    return (
        <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-slate-700">{title}</h3>
            <div className="space-y-2">
                {options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                        <input
                            id={`${title}-${option}`}
                            type="checkbox"
                            checked={selected.includes(option)}
                            onChange={() => handleChange(option)}
                            className="w-4 h-4 text-indigo-600 bg-white border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0 transition-colors cursor-pointer"
                        />
                        <label htmlFor={`${title}-${option}`} className="ml-2 text-sm text-slate-600 cursor-pointer select-none">
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
