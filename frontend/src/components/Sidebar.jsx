import React from 'react';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-20 font-sans">
            {/* Logo / Profile Card */}
            <div className="p-4">
                <div className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="bg-black text-white p-1.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-slate-900 leading-none">Vault</h2>
                            <p className="text-xs text-slate-500 mt-1">Dev Tailor</p>
                        </div>
                    </div>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
            </div>

            {/* Nav Links */}
            <div className="flex-1 px-4 space-y-4 overflow-y-auto">
                <nav className="space-y-1">
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-100 hover:text-slate-900 group">
                        <svg className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-100 hover:text-slate-900 group">
                        <svg className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Nexus
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-100 hover:text-slate-900 group">
                        <svg className="mr-3 h-5 w-5 text-slate-400 group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Intake
                    </a>
                </nav>

                {/* Services Card */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between px-3 py-3 text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 rounded-t-lg">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            Services
                        </div>
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                    </div>
                    <div className="px-3 pb-3 space-y-1">
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 rounded-md hover:text-indigo-600 hover:bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Pre-active
                        </a>
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 rounded-md hover:text-indigo-600 hover:bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Active
                        </a>
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 rounded-md hover:text-indigo-600 hover:bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Blocked
                        </a>
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 rounded-md hover:text-indigo-600 hover:bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Closed
                        </a>
                    </div>
                </div>

                {/* Invoices Card */}
                <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center justify-between px-3 py-3 text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 rounded-t-lg">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Invoices
                        </div>
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                    </div>
                    <div className="px-3 pb-3 space-y-1">
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm text-slate-900 rounded-md hover:text-indigo-600 hover:bg-slate-50 font-bold bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Proforma Invoices
                        </a>
                        <a href="#" className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 rounded-md hover:text-indigo-600 hover:bg-slate-50">
                            <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Final Invoices
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;


