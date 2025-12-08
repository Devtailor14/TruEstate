import React, { useState, useRef, useEffect } from 'react';

const FilterDropdown = ({ title, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOption = (opt) => {
        const newSelected = selected.includes(opt)
            ? selected.filter(s => s !== opt)
            : [...selected, opt];
        onChange(newSelected);
    };

    return (
        <div className="relative group" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium h-9 min-w-max transition-colors ${selected.length > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                    }`}
            >
                <span>{title} {selected.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-indigo-100 rounded-full text-xs">{selected.length}</span>}</span>
                <svg className={`w-4 h-4 ml-2 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-2 max-h-64 overflow-y-auto">
                    {options.map((opt, idx) => (
                        <label key={idx} className="flex items-center px-3 py-2 hover:bg-slate-50 rounded cursor-pointer transition-colors">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${selected.includes(opt) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                                }`}>
                                {selected.includes(opt) && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                            <span className={`text-sm ${selected.includes(opt) ? 'text-indigo-900 font-medium' : 'text-slate-700'}`}>{opt}</span>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selected.includes(opt)}
                                onChange={() => toggleOption(opt)}
                            />
                        </label>
                    ))}
                    {options.length === 0 && <div className="px-3 py-2 text-sm text-slate-400">No options available</div>}
                </div>
            )}
        </div>
    );
};

// Simple Chip for items without dropdown logic implemented yet
const FilterChip = ({ label }) => (
    <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-slate-700 h-9 transition-colors">
        {label}
        <svg className="w-4 h-4 ml-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
    </button>
);

const FilterBar = ({ filters, setFilters, meta, resetFilters, sort, onSortChange }) => {

    const handleFilterChange = (key) => (val) => {
        setFilters(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6">

            <FilterDropdown
                title="Customer Region"
                options={meta.allRegions || []}
                selected={filters.regions || []}
                onChange={handleFilterChange('regions')}
            />

            <FilterDropdown
                title="Gender"
                options={['Male', 'Female', 'Other']}
                selected={filters.genders || []}
                onChange={handleFilterChange('genders')}
            />

            <FilterChip label="Age Range" />

            <FilterDropdown
                title="Product Category"
                options={meta.allCategories || []}
                selected={filters.categories || []}
                onChange={handleFilterChange('categories')}
            />

            <FilterChip label="Tags" />

            <FilterDropdown
                title="Payment Method"
                options={meta.allPaymentMethods || []}
                selected={filters.paymentMethods || []}
                onChange={handleFilterChange('paymentMethods')}
            />

            <div className="relative">
                {/* Date Chip */}
                <button className="flex items-center bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium text-slate-700 h-9 transition-colors">
                    Date
                    <svg className="w-4 h-4 ml-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md h-9 hover:bg-gray-200 transition-colors">
                    <span className="text-sm text-slate-500 mr-2">Sort by:</span>
                    <select
                        value={`${sort.key}:${sort.direction}`}
                        onChange={(e) => {
                            const [key, direction] = e.target.value.split(':');
                            onSortChange({ key, direction });
                        }}
                        className="bg-transparent border-none p-0 text-sm font-medium text-slate-800 focus:ring-0 cursor-pointer outline-none"
                    >
                        <option value="customerName:asc">Customer Name (A-Z)</option>
                        <option value="customerName:desc">Customer Name (Z-A)</option>
                        <option value="date:desc">Date (Newest)</option>
                        <option value="date:asc">Date (Oldest)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
