import React, { useState, useEffect } from 'react';
import CheckboxGroup from './CheckboxGroup';

const FilterPanel = ({ filters, setFilters, meta, resetFilters }) => {
    const handleCheckboxChange = (key) => (selectedValues) => {
        setFilters(prev => ({ ...prev, [key]: selectedValues }));
    };

    const handleRangeChange = (key) => (e) => {
        setFilters(prev => ({ ...prev, [key]: e.target.value }));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
                <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                >
                    Reset All
                </button>
            </div>

            <CheckboxGroup
                title="Region"
                options={meta.allRegions || []}
                selected={filters.regions || []}
                onChange={handleCheckboxChange('regions')}
            />

            <CheckboxGroup
                title="Category"
                options={meta.allCategories || []}
                selected={filters.categories || []}
                onChange={handleCheckboxChange('categories')}
            />

            <CheckboxGroup
                title="Payment"
                options={meta.allPaymentMethods || []}
                selected={filters.paymentMethods || []}
                onChange={handleCheckboxChange('paymentMethods')}
            />

            <CheckboxGroup
                title="Tags"
                options={meta.allTags || []}
                selected={filters.tags || []}
                onChange={handleCheckboxChange('tags')}
            />


            <div className="mb-4">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Age Range</h3>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        value={filters.ageMin || ''}
                        onChange={handleRangeChange('ageMin')}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        value={filters.ageMax || ''}
                        onChange={handleRangeChange('ageMax')}
                    />
                </div>
            </div>

            <div className="mb-4">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Date Range</h3>
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        value={filters.dateMin || ''}
                        onChange={handleRangeChange('dateMin')}
                    />
                    <input
                        type="date"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                        value={filters.dateMax || ''}
                        onChange={handleRangeChange('dateMax')}
                    />
                </div>
            </div>

            <div className="mb-4">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Gender</h3>
                {['Male', 'Female', 'Other'].map(gender => (
                    <label key={gender} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={filters.genders?.includes(gender)}
                            onChange={(e) => {
                                const current = filters.genders || [];
                                if (e.target.checked) handleCheckboxChange('genders')([...current, gender]);
                                else handleCheckboxChange('genders')(current.filter(g => g !== gender));
                            }}
                        />
                        {gender}
                    </label>
                ))}
            </div>

        </div>
    );
};

export default FilterPanel;
