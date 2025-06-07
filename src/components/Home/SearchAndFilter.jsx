import { Filter, Search } from 'lucide-react';
import Greeting from '../Gallery/Greeting';

export default function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters
}) {
  return (
    <div className="w-full bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-3 items-start">
        
          {/* greeting  */}
          <div className="w-full lg:w-1/2">
            <Greeting />
          </div>

      {/* search & filter */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search artworks or artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Filters Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-amber-500 border border-amber-600 rounded-lg">
                <Filter size={20} />
                Filters
              </button>

              {/* Filters */}
              <div className={`flex flex-col md:flex-row gap-4 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Categories</option>
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                  <option value="nature">Nature</option>
                  <option value="urban">Urban</option>
                  <option value="abstract">Abstract</option>
                </select>

                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 border border-amber-600 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under100">Under 100</option>
                  <option value="100to200">100 - 200</option>
                  <option value="over200">Over 200</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
