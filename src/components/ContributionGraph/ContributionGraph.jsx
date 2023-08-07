import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { subDays, format } from 'date-fns'
import Block from '../Block/Block'
import {
  getWeekDaysStartingFromToday,
  getMonthsStartingFromToday,
} from '../../utils/getDayAndMonth'
import './ContributionGraph.scss'

const url = 'https://dpg.gg/test/calendar.json'

const ContributionGraph = () => {
  const [data, setData] = useState({})
  const [selectedDate, setSelectedDate] = useState('')

  const handleBlockClick = (date) => {
    setSelectedDate(date)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(url)
      setData(response.data)
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  useEffect(() => {
    fetchData()
    window.addEventListener('click', (e) => {
      if (e.target.classList.contains('block-selected')) return
      setSelectedDate('')
    })
  }, [])

  const renderGraph = () => {
    const today = new Date()
    const graph = []
    for (let i = 0; i < 51; i++) {
      const column = []
      for (let j = 0; j < 7; j++) {
        const date = subDays(today, i * 7 + (6 - j))
        const dateString = format(date, 'yyyy-MM-dd')
        let contributionCount = data[dateString] || 0
        column.push(
          <Block
            key={dateString}
            date={dateString}
            selected={selectedDate === dateString}
            handleBlockClick={handleBlockClick}
            value={contributionCount}
          />
        )
      }
      graph.push(
        <div key={i} className="column">
          {column}
        </div>
      )
    }
    return graph
  }

  return (
    <div className="contribution-graph">
      <div className="months">
        {Array.from({ length: 12 }).map((_, index) => (
          <div className="months-item" key={index}>
            {getMonthsStartingFromToday()[index]}
          </div>
        ))}
      </div>
      <div className="contribution-graph_days">
        <div className="days-of-week">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index}>{getWeekDaysStartingFromToday()[index]}</div>
          ))}
        </div>
        <div className="graph">{renderGraph()}</div>
      </div>
      <div className="contribution-graph-info">
        <span>Меньше</span>
        <div className="blocks">
          <Block value={0} info />
          <Block value="1-9" info />
          <Block value="10-19" info />
          <Block value="20-29" info />
          <Block value="30+" info />
        </div>
        <span>Больше</span>
      </div>
    </div>
  )
}

export default ContributionGraph
