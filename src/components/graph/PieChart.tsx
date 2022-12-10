import React, { memo, useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'

const PieChart = (props: { totalResult: any }) => {
  const [data, setData] = useState([
    {
      id: '패배',
      value: 0,
      // color: 'hsl(203, 65, 78)',
    },
    {
      id: '승리',
      value: 0,
      // color: 'hsl(0, 28, 73)',
    },
  ])

  const wins = props.totalResult.win
  const losses = props.totalResult.lose

  useEffect(() => {
    setData((prevState) =>
      prevState.map((item) => {
        if (item.id === '승리') {
          return {
            ...item,
            value: wins,
          }
        } else {
          return {
            ...item,
            value: losses,
          }
        }
      })
    )
  }, [props])

  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'pastel1' }}
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
        sortByValue
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
            symbolSize: 24,
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
    </>
  )
}

export default memo(PieChart)
