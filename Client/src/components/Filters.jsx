import { SlidersHorizontal, Trash2 } from 'lucide-react'
import '../styles/Filters.css'
import { useState, useEffect } from 'react'
import { FilterModal } from './FilterModal'

export const Filters = ({ 
  inputSearch, 
  setInputSearch, 
  selectedFilter,
  setSelectedFilter,
  maxAmount
}) => {
  const [rangeValues, setRangeValues] = useState([0, maxAmount])
  const MIN_BOUND = 0
  const MAX_BOUND = maxAmount

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  useEffect(() => {
    setRangeValues([MIN_BOUND, MAX_BOUND])
  }, [maxAmount])
  const handleFilterSelect = (option) => {
    console.log('Selected Filter:', option);
    setSelectedFilter(option);
    setIsFilterModalOpen(false);
  }

  const handleClearFilter = () => {
    setSelectedFilter(null);
    setRangeValues([MIN_BOUND, MAX_BOUND]);
  }

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search.."
          value={inputSearch}
          onChange={({ target }) => setInputSearch(target.value)}
        />
        <button onClick={() => setIsFilterModalOpen(true)}>
          <SlidersHorizontal />
        </button>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilterSelect={handleFilterSelect}
        rangeValues={rangeValues}
        setRangeValues={setRangeValues}
        MIN_BOUND={MIN_BOUND}
        MAX_BOUND={MAX_BOUND}
      />

      {selectedFilter && (
        <div className="selected-filter">
          <span className="filter-label">
            filter: min: {selectedFilter.min} - max: {selectedFilter.max}
          </span>
          <Trash2 className="close-filter-icon" onClick={handleClearFilter} />
        </div>
      )}
    </>
  )
}
