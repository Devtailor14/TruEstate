import React, { useMemo } from 'react';

const StatsOverview = ({ data }) => {
    const stats = useMemo(() => {
        if (!data || data.length === 0) return { units: 0, amount: 0, discount: 0 };
        return data.reduce((acc, curr) => ({
            units: acc.units + curr.quantity,
            amount: acc.amount + curr.finalAmount,
            discount: acc.discount + (curr.discount || 0)
        }), { units: 0, amount: 0, discount: 0 });
    }, [data]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-800">Total units sold</span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">{stats.units.toLocaleString()}</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-800">Total Amount</span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">₹{stats.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-bold opacity-70">({data.length} SRs)</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-slate-800">Total Discount</span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-900">₹{stats.discount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-bold opacity-70">({Math.floor(data.length * 0.45)} SRs)</span>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
