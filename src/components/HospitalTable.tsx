import React, { useState } from 'react';
import { HospitalYearlyStats, HospitalProfile } from '../types/hospital';
import { Search, ArrowUpDown, ChevronRight, Building, MapPin } from 'lucide-react';

interface HospitalTableProps {
  stats: HospitalYearlyStats[];
  hospitals: HospitalProfile[];
  selectedYear: number;
  onSelectHospital: (hospitalId: string) => void;
  onOpenHospitalProfile: (hospital: HospitalProfile) => void;
}

type SortField = 'hospitalCode' | 'admissions' | 'rate' | 'waitTime' | 'beds' | 'occupancy';

export const HospitalTable: React.FC<HospitalTableProps> = ({
  stats,
  hospitals,
  selectedYear,
  onSelectHospital,
  onOpenHospitalProfile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('admissions');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Enrich stats with hospital details
  const enrichedData = stats.map((stat) => {
    const profile = hospitals.find((h) => h.id === stat.hospitalId);
    return {
      ...stat,
      hospitalName: profile?.name || stat.hospitalId,
      shortName: profile?.shortName || stat.hospitalId,
      code: `${(profile?.shortName || stat.hospitalId).toUpperCase()}-01`,
      cluster: profile?.cluster || 'Public Healthcare Cluster',
      region: profile?.region || 'Singapore',
      beds: profile?.beds || 800,
      profile,
    };
  });

  // Filter
  const filteredData = enrichedData.filter(
    (item) =>
      item.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cluster.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    let valA: number | string = 0;
    let valB: number | string = 0;

    switch (sortField) {
      case 'hospitalCode':
        valA = a.code;
        valB = b.code;
        break;
      case 'admissions':
        valA = a.inpatientAdmissions;
        valB = b.inpatientAdmissions;
        break;
      case 'rate':
        valA = a.admissionRatePer1000;
        valB = b.admissionRatePer1000;
        break;
      case 'waitTime':
        valA = a.avgWaitTimeToWardHours;
        valB = b.avgWaitTimeToWardHours;
        break;
      case 'beds':
        valA = a.beds;
        valB = b.beds;
        break;
      case 'occupancy':
        valA = a.bedOccupancyRate;
        valB = b.bedOccupancyRate;
        break;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (occ: number) => {
    if (occ >= 91.0) {
      return (
        <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold border border-red-200 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> CRITICAL
        </span>
      );
    } else if (occ >= 87.0) {
      return (
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold border border-amber-200 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span> HIGH
        </span>
      );
    } else {
      return (
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> OPTIMAL
        </span>
      );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
      {/* Table Toolbar */}
      <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by hospital name, cluster, region..."
              className="w-full bg-slate-50 border border-slate-200 rounded text-xs pl-8 pr-3 py-1.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-3">
          <span>Showing: {filteredData.length} Public Institutions ({selectedYear})</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 select-none">
            <tr>
              <th
                onClick={() => handleSort('hospitalCode')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>Hospital / Code</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('admissions')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>Inpatient Admissions</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('rate')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>Rate / 1k Pop.</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('waitTime')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>A&E Ward Wait Time</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('beds')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>Available Beds</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('occupancy')}
                className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 cursor-pointer hover:text-slate-700"
              >
                <div className="flex items-center gap-1">
                  <span>Utilization</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-bold uppercase text-slate-400 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((item) => (
              <tr
                key={item.hospitalId}
                className="hover:bg-slate-50 transition-colors group cursor-pointer"
                onClick={() => onSelectHospital(item.hospitalId)}
              >
                <td className="px-4 sm:px-6 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {item.code}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600">
                        {item.hospitalName}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Building className="w-2.5 h-2.5" /> {item.cluster} &bull; <MapPin className="w-2.5 h-2.5" /> {item.region}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 font-mono text-xs font-bold text-slate-900">
                  {item.inpatientAdmissions.toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-3 font-mono text-xs text-blue-700 font-bold">
                  {item.admissionRatePer1000}
                </td>
                <td className="px-4 sm:px-6 py-3 font-mono text-xs text-slate-600">
                  {item.avgWaitTimeToWardHours}h
                </td>
                <td className="px-4 sm:px-6 py-3 font-mono text-xs text-slate-700">
                  {item.beds.toLocaleString()}
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.bedOccupancyRate)}
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      {item.bedOccupancyRate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.profile) onOpenHospitalProfile(item.profile);
                    }}
                    className="text-xs text-slate-500 hover:text-blue-600 font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Profile</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
