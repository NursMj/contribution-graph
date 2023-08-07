import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { parseISO, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import './Block.scss'

const Block = ({ value, date, selected, handleBlockClick, info = false }) => {
  let color = '#EDEDED'
  if ((value >= 1 && value <= 9) || value === '1-9') color = '#ACD5F2'
  else if ((value >= 10 && value <= 19) || value === '10-19') color = '#7FA8C9'
  else if ((value >= 20 && value <= 29) || value === '20-29') color = '#527BA0'
  else if (value >= 30 || value === '30+') color = '#254E77'

  const dateObj = !info && parseISO(date)
  const outputDate =
    !info && format(dateObj, `EEEE, MMMM d, yyyy`, { locale: ru })
  const classes = 'block ' + (selected ? 'block-selected' : '')

  return (
    <OverlayTrigger
      show={selected}
      placement="top"
      style={{ backgroundColor: 'black' }}
      overlay={
        <Tooltip
          id="tooltip"
          className="p-0 tooltip"
          style={{ backgroundColor: 'black' }}
        >
          <div className="tooltip-count">{value || 'No'} contributions</div>
          <div className="tooltip-date">{outputDate}</div>
        </Tooltip>
      }
    >
      <div
        className={classes}
        onClick={() => handleBlockClick(date)}
        style={{ backgroundColor: color }}
      ></div>
    </OverlayTrigger>
  )
}

export default Block
