import React from 'react';

const DataTable = ({ data, pagination, onSort, sortConfig, onPageChange }) => {
    const { page, totalPages } = pagination || { page: 1, totalPages: 1 };



    const headers = [
        { key: 'id', label: 'Transaction ID' },
        { key: 'date', label: 'Date' },
        { key: 'customerId', label: 'Customer ID' },
        { key: 'customerName', label: 'Customer name' },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'gender', label: 'Gender' },
        { key: 'age', label: 'Age' },
        { key: 'category', label: 'Product Category' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'totalAmount', label: 'Total Amount' },
        { key: 'region', label: 'Customer region' },
        { key: 'productId', label: 'Product ID' },
        { key: 'employeeName', label: 'Employee name' }
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }

        pageNumbers.push(1);

        let startPage = Math.max(2, page - 1);
        let endPage = Math.min(totalPages - 1, page + 1);

        if (page <= 3) {
            endPage = 4;
        }

        if (page >= totalPages - 2) {
            startPage = totalPages - 3;
        }

        if (startPage > 2) {
            pageNumbers.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (endPage < totalPages - 1) {
            pageNumbers.push('...');
        }

        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 font-medium bg-gray-100">
                    <tr>
                        {headers.map(header => (
                            <th
                                key={header.key}
                                scope="col"
                                className="px-6 py-4 cursor-pointer hover:text-slate-700 transition-colors font-medium tracking-normal whitespace-nowrap"
                                onClick={() => onSort(header.key)}
                            >
                                <div className="flex items-center">
                                    {header.label}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={headers.length} className="px-6 py-8 text-center text-slate-400">No results found</td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="bg-white hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 text-slate-500 font-medium">#{item.id}</td>
                                <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{new Date(item.date).toLocaleDateString('en-CA')}</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{item.customerId}</td>
                                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                    {item.customerName}
                                </td>
                                <td className="px-6 py-4 text-slate-500 flex items-center gap-2 whitespace-nowrap">
                                    {item.phoneNumber}
                                    <svg className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{item.gender}</td>
                                <td className="px-6 py-4 text-slate-900 font-medium">{item.age}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold whitespace-nowrap">
                                    {item.category}
                                </td>
                                <td className="px-6 py-4 text-slate-900 font-bold">{item.quantity ? item.quantity.toString().padStart(2, '0') : '00'}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold whitespace-nowrap">
                                    {formatCurrency(item.totalAmount || 0)}
                                </td>
                                <td className="px-6 py-4 text-slate-900 font-bold">{item.region}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold">{item.productId}</td>
                                <td className="px-6 py-4 text-slate-900 font-bold whitespace-nowrap">{item.employeeName}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}

            <nav className="flex items-center justify-center p-4 bg-white border-t border-slate-200 gap-2" aria-label="Table navigation">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="p-2 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, index) => (
                        pageNum === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-slate-400">...</span>
                        ) : (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${page === pageNum
                                    ? 'bg-slate-800 text-white'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        )
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
            </nav>
        </div>
    );
};

export default DataTable;
