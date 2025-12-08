import React from 'react';

const DataTable = ({ data, pagination, onSort, sortConfig, onPageChange }) => {
    const { page, totalPages } = pagination || { page: 1, totalPages: 1 };

    const renderSortJob = (key) => {
        let icon = <span className="text-slate-300 ml-1">↕</span>;
        if (sortConfig.key === key) {
            icon = sortConfig.direction === 'asc'
                ? <span className="text-indigo-600 ml-1">↑</span>
                : <span className="text-indigo-600 ml-1">↓</span>;
        }
        return icon;
    };

    const headers = [
        { key: 'transactionId', label: 'Transaction ID' },
        { key: 'date', label: 'Date' },
        { key: 'customerId', label: 'Customer ID' },
        { key: 'customerName', label: 'Customer name' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'gender', label: 'Gender' },
        { key: 'age', label: 'Age' },
        { key: 'category', label: 'Product Category' },
        { key: 'quantity', label: 'Quantity' }
    ];

    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 font-medium bg-slate-50 opacity-70">
                    <tr>
                        {headers.map(header => (
                            <th
                                key={header.key}
                                scope="col"
                                className="px-6 py-4 cursor-pointer hover:text-slate-700 transition-colors font-medium tracking-normal"
                                onClick={() => onSort(header.key)}
                            >
                                <div className="flex items-center">
                                    {header.label}
                                    {renderSortJob(header.key)}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={10} className="px-6 py-8 text-center text-slate-400">No results found</td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="bg-white hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-500">1234567</td>
                                <td className="px-6 py-4 text-slate-500">{new Date(item.date).toLocaleDateString('en-CA')}</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">CUST{Math.floor(Math.random() * 10000)}</td>
                                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                    {item.customerName}
                                </td>
                                <td className="px-6 py-4 text-slate-500 flex items-center gap-2">
                                    {item.phoneNumber}
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{item.gender}</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{item.age}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4 text-slate-900 font-bold">{item.quantity.toString().padStart(2, '0')}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <nav className="flex items-center justify-between p-4 bg-white border-t border-slate-200" aria-label="Table navigation">
                <span className="text-sm font-normal text-slate-500">
                    Page <span className="font-semibold text-slate-900">{page}</span> of <span className="font-semibold text-slate-900">{totalPages}</span>
                </span>
                <ul className="inline-flex -space-x-px text-sm">
                    <li>
                        <button
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                            className="flex items-center justify-center px-4 py-2 ml-0 leading-tight text-slate-500 bg-white border border-slate-300 rounded-l-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center justify-center px-4 py-2 leading-tight text-slate-500 bg-white border border-slate-300 rounded-r-lg hover:bg-slate-50 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default DataTable;
