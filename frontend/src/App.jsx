import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchSales } from './api/api';
import SearchBar from './components/SearchBar';
import DataTable from './components/DataTable';
import Sidebar from './components/Sidebar';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';

function App() {
    const [search, setSearch] = useState('');
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({ key: 'date', direction: 'desc' });
    const [page, setPage] = useState(1);

    useEffect(() => {
    }, [filters]);

    const queryParams = {
        q: search,
        sort: `${sort.key}:${sort.direction}`,
        page,
        limit: 10,
        regions: filters.regions,
        categories: filters.categories,
        paymentMethods: filters.paymentMethods,
        genders: filters.genders,
        tags: filters.tags,
        ageMin: filters.ageMin,
        ageMax: filters.ageMax,
        dateMin: filters.dateMin,
        dateMax: filters.dateMax,
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['sales', queryParams],
        queryFn: () => fetchSales(queryParams),
        placeholderData: keepPreviousData,
    });

    // Mock meta if lazy, or extract from data
    const meta = data?.meta || {};

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">

                {/* Header: Title + Search */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Sales Management System</h1>
                    <div className="w-96">
                        <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
                    </div>
                </header>

                {/* Filter Bar (Horizontal) */}
                <FilterBar
                    filters={filters}
                    setFilters={(f) => { setFilters(f); setPage(1); }}
                    meta={meta}
                    resetFilters={() => { setFilters({}); setSearch(''); setPage(1); }}
                    sort={sort}
                    onSortChange={setSort}
                />

                {/* Stats Cards */}
                <StatsOverview data={data?.data || []} />

                {/* Data Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-20 text-slate-500">Loading data...</div>
                    ) : isError ? (
                        <div className="text-center py-20 text-red-500">Error loading data. Ensure backend is running.</div>
                    ) : (
                        <DataTable
                            data={data?.data || []}
                            pagination={data?.pagination}
                            onSort={(key) => {
                                setSort(prev => ({
                                    key,
                                    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
                                }));
                            }}
                            sortConfig={sort}
                            onPageChange={setPage}
                        />
                    )}
                </div>

            </main>
        </div>
    );
}

export default App;
