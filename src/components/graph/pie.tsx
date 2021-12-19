import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { TotalResultModel } from '../match'

type PieModel = {
  total_result: TotalResultModel
}
const Pie = ({ total_result }: PieModel) => {
  const [show, setIsShow] = useState(false)
  const [data, setData] = useState([
    {
      id: '승리',
      value: 0,
      color: '#1a78ae',
    },
    {
      id: '패배',
      value: 0,
      color: '#c6443e',
    },
  ])

  useEffect(() => {
    const win = total_result.win
    const lose = total_result.lose

    setData((prev) => {
      prev.map((item) => {
        if (item.id === '승리') {
          item.value = win
          return item
        } else {
          item.value = lose
          return item
        }
      })
      return prev
    })
  }, [total_result])

  useEffect(() => {
    setTimeout(() => {
      setIsShow(true)
    }, 1000)
  }, [show])

  return (
    <>
      {show && (
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor='#333333'
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          enableArcLinkLabels={false}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 30,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  )
}

export default Pie
