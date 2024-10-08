import { renderHook } from '@testing-library/react'
import {
  isFloat,
  numberFormatter,
  precisionFormatter,
  useStacked,
} from 'components/ui/Charts/Charts.utils'
import { test, expect } from 'vitest'

test('isFloat', () => {
  expect(isFloat(123)).toBe(false)
  expect(isFloat(123.123)).toBe(true)
})
test('numberFormatter', () => {
  expect(numberFormatter(123)).toBe('123')
  expect(numberFormatter(123.123)).toBe('123.12')
  expect(numberFormatter(123456.78)).toBe('123,456.78')
})

test('precisionFormatter', () => {
  expect(precisionFormatter(123, 1)).toBe('123.0')
  expect(precisionFormatter(123.12345, 4)).toBe('123.1234')
  expect(precisionFormatter(123456, 2)).toBe('123,456.00')
  expect(precisionFormatter(123456.78, 2)).toBe('123,456.78')
})

test('useStacked', () => {
  const { result } = renderHook(() =>
    useStacked({
      data: [
        { label: 'a', x: 1, y: 2 },
        { label: 'b', x: 1, y: 3 },
      ] as any,
      xAxisKey: 'x',
      yAxisKey: 'y',
      stackKey: 'label',
      variant: 'percentages',
    })
  )
  expect(result.current).toMatchObject({
    stackedData: [
      {
        a: 2,
        b: 3,
        x: 1,
      },
    ],
    percentagesStackedData: [
      {
        a: 2 / 5,
        b: 3 / 5,
        x: 1,
      },
    ],
  })
})
