import React from 'react'
import { Modal } from './Modal'
import '../styles/FilterModal.css'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export const FilterModal = ({
  isOpen,
  onClose,
  onFilterSelect,
  rangeValues = [0, 1000],
  setRangeValues,
  MIN_BOUND = 0,
  MAX_BOUND = 1000
}) => {
  const handleSliderChange = (value) => {
    setRangeValues(value)
  }

  const handleApplyAmountFilter = () => {
    onFilterSelect({
      type: 'amount',
      min: Number(rangeValues[0]),
      max: Number(rangeValues[1])
    });
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='filter-modal'>
        <h2 className='filter-modal-title'>Filter by amount</h2>
        <div className='slider-content'>
          <div className='slider-values'>
            <span>{rangeValues?.[0] || MIN_BOUND}</span> - <span>{rangeValues?.[1] || MAX_BOUND}</span>
          </div>

          <Slider
            range
            min={MIN_BOUND}
            max={MAX_BOUND}
            value={rangeValues}
            onChange={handleSliderChange}
            styles={{
              track: {
                backgroundColor: '#26415e',
                height: '4px',
                borderRadius: '4px',
                border: 'none',
              },
              rail: {
                backgroundColor: '#e0e0e0',
                height: '4px',
                borderRadius: '4px',
                border: 'none',
              },
              handle: {
                backgroundColor: '#26415e',
                border: 'none',
                height: '16px',
                width: '16px',
                marginTop: '-6px',
              },
            }}
          />
          <div className="filter-modal-buttons">
            <button className='filter-modal_cancel' onClick={onClose}>Close</button>
            <button className='filter-modal_apply' onClick={handleApplyAmountFilter}>Apply</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}