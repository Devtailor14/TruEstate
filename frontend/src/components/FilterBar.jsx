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

const RangeDropdown = ({ title, minVal, maxVal, onMinChange, onMaxChange, type = "number", align = "left", minLabel = "Min", maxLabel = "Max" }) => {
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

    const hasValue = minVal || maxVal;

    return (
        <div className="relative group" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium h-9 min-w-max transition-colors ${hasValue ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}
            >
                <span>{title}</span>
                <svg className={`w-4 h-4 ml-2 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {isOpen && (
                <div className={`absolute top-full ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-4`}>
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-500 mb-1">{minLabel}</label>
                            <input
                                type={type}
                                className="w-full p-2 border border-slate-300 rounded text-sm"
                                value={minVal || ''}
                                onChange={(e) => onMinChange(e.target.value)}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-slate-500 mb-1">{maxLabel}</label>
                            <input
                                type={type}
                                className="w-full p-2 border border-slate-300 rounded text-sm"
                                value={maxVal || ''}
                                onChange={(e) => onMaxChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const FilterBar = ({ filters, setFilters, meta, resetFilters, sort, onSortChange }) => {

    const handleFilterChange = (key) => (val) => {
        setFilters(prev => ({ ...prev, [key]: val }));
    };

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6">

            {/* Reset Button */}
            <button
                onClick={resetFilters}
                className="flex items-center justify-center w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-md text-slate-500 transition-colors"
                title="Reset Filters"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button>

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

            <RangeDropdown
                title="Age Range"
                minVal={filters.ageMin}
                maxVal={filters.ageMax}
                onMinChange={handleFilterChange('ageMin')}
                onMaxChange={handleFilterChange('ageMax')}
            />

            <FilterDropdown
                title="Product Category"
                options={meta.allCategories || []}
                selected={filters.categories || []}
                onChange={handleFilterChange('categories')}
            />

            <FilterDropdown
                title="Tags"
                options={meta.allTags || []}
                selected={filters.tags || []}
                onChange={handleFilterChange('tags')}
            />

            <FilterDropdown
                title="Payment Method"
                options={meta.allPaymentMethods || []}
                selected={filters.paymentMethods || []}
                onChange={handleFilterChange('paymentMethods')}
            />

            <RangeDropdown
                title="Date"
                minVal={filters.dateMin}
                maxVal={filters.dateMax}
                onMinChange={handleFilterChange('dateMin')}
                onMaxChange={handleFilterChange('dateMax')}
                type="date"
                align="right"
                minLabel="Start"
                maxLabel="End"
            />

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

