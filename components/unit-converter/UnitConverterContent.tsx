'use client'

import { useState } from 'react'

type ConversionCategory = 'length' | 'weight' | 'volume' | 'temperature'

export default function UnitConverterContent() {
  const [category, setCategory] = useState<ConversionCategory>('length')
  const [fromUnit, setFromUnit] = useState('centimeter')
  const [toUnit, setToUnit] = useState('inch')
  const [inputValue, setInputValue] = useState('1')

  // Conversion rates to base unit (kg for weight, m for length, L for volume, C for temp)
  const conversions: Record<ConversionCategory, Record<string, { name: string, rate: number }>> = {
    length: {
      meter: { name: 'Meter (m)', rate: 1 },
      kilometer: { name: 'Kilometer (km)', rate: 0.001 },
      centimeter: { name: 'Centimeter (cm)', rate: 100 },
      millimeter: { name: 'Millimeter (mm)', rate: 1000 },
      mile: { name: 'Mile (mi)', rate: 0.000621371 },
      yard: { name: 'Yard (yd)', rate: 1.09361 },
      foot: { name: 'Foot (ft)', rate: 3.28084 },
      inch: { name: 'Inch (in)', rate: 39.3701 }
    },
    weight: {
      kilogram: { name: 'Kilogram (kg)', rate: 1 },
      gram: { name: 'Gram (g)', rate: 1000 },
      milligram: { name: 'Milligram (mg)', rate: 1000000 },
      ton: { name: 'Metric Ton (t)', rate: 0.001 },
      pound: { name: 'Pound (lb)', rate: 2.20462262 },
      ounce: { name: 'Ounce (oz)', rate: 35.27396195 }
    },
    volume: {
      liter: { name: 'Liter (L)', rate: 1 },
      milliliter: { name: 'Milliliter (mL)', rate: 1000 },
      cubicMeter: { name: 'Cubic Meter (m³)', rate: 0.001 },
      gallon: { name: 'Gallon (gal)', rate: 0.264172 },
      quart: { name: 'Quart (qt)', rate: 1.05669 },
      pint: { name: 'Pint (pt)', rate: 2.11338 },
      cup: { name: 'Cup', rate: 4.22675 },
      fluidOunce: { name: 'Fluid Ounce (fl oz)', rate: 33.814 }
    },
    temperature: {
      celsius: { name: 'Celsius (°C)', rate: 1 },
      fahrenheit: { name: 'Fahrenheit (°F)', rate: 1 },
      kelvin: { name: 'Kelvin (K)', rate: 1 }
    }
  }

  const convertValue = (value: number, from: string, to: string): number => {
    if (category === 'temperature') {
      let celsius: number
      if (from === 'celsius') {
        celsius = value
      } else if (from === 'fahrenheit') {
        celsius = (value - 32) * 5 / 9
      } else {
        celsius = value - 273.15
      }

      if (to === 'celsius') {
        return celsius
      } else if (to === 'fahrenheit') {
        return celsius * 9 / 5 + 32
      } else {
        return celsius + 273.15
      }
    } else {
      const fromRate = conversions[category][from].rate
      const toRate = conversions[category][to].rate
      return (value * toRate) / fromRate
    }
  }

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory)
    const units = Object.keys(conversions[newCategory])
    setFromUnit(units[0])
    setToUnit(units[1] || units[0])
    setInputValue('1')
  }

  const currentUnits = conversions[category]
  const unitKeys = Object.keys(currentUnits)

  const numValue = parseFloat(inputValue) || 0
  const result = fromUnit && toUnit ? convertValue(numValue, fromUnit, toUnit) : 0

  // Get all conversion results for the current input
  const getAllConversions = () => {
    if (!fromUnit || !inputValue) return []
    const value = parseFloat(inputValue) || 0

    return unitKeys.map(unit => ({
      unit,
      name: currentUnits[unit].name,
      value: convertValue(value, fromUnit, unit)
    }))
  }

  const allConversions = getAllConversions()

  const swapUnits = () => {
    const temp = fromUnit
    setFromUnit(toUnit)
    setToUnit(temp)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-3xl font-bold">UNIT CONVERTER</h1>
        </div>

        <div className="p-8">

        {/* Category Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6 overflow-x-auto">
            {(['length', 'weight', 'volume', 'temperature'] as ConversionCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`pb-3 px-2 capitalize whitespace-nowrap border-b-2 transition-all ${
                  category === cat
                    ? 'border-orange-500 text-orange-500 font-semibold'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {cat === 'length' ? 'Length' : cat === 'weight' ? 'Weight' : cat === 'volume' ? 'Volume' : 'Temperature'}
              </button>
            ))}
          </div>
        </div>

        {/* Main Converter */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {currentUnits[key].name}
                </option>
              ))}
            </select>

            <span className="text-xl text-gray-400">→</span>

            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {unitKeys.map((key) => (
                <option key={key} value={key}>
                  {currentUnits[key].name}
                </option>
              ))}
            </select>

            <button
              onClick={swapUnits}
              className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              title="Swap units"
            >
              ⇄
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-lg">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <span className="text-gray-600">{fromUnit}</span>
            </div>

            <span className="text-2xl font-bold text-gray-400">=</span>

            <div className="text-2xl font-bold text-orange-500">
              {result.toFixed(6).replace(/\.?0+$/, '')} {toUnit}
            </div>
          </div>
        </div>

        {/* All Conversions Grid */}
        <div className="grid grid-cols-3 gap-4">
          {allConversions.map((conv) => (
            <div key={conv.unit} className="text-center">
              <div className="text-lg font-semibold text-orange-500">
                {conv.value.toFixed(6).replace(/\.?0+$/, '')}
              </div>
              <div className="text-sm text-gray-600">{conv.name}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
