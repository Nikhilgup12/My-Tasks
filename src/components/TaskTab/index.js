import './index.css'

const TaskTab = props => {
  const {tab, isActive} = props
  const {displayText, optionId} = tab

  const onClicktab = () => {
    const {onTab} = props
    onTab(optionId)
  }
  const activetab = isActive ? 'active-tab' : ''
  return (
    <li className="tab-list">
      <button className={`tab-btn ${activetab}`} onClick={onClicktab}>
        {displayText}
      </button>
    </li>
  )
}

export default TaskTab
