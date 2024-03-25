import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TaskTab from '../TaskTab'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class TaskCreate extends Component {
  state = {
    taskList: [],
    task: '',
    tags: tagsList[0].displayText,
    activeTab: '',
  }

  onInputTask = event => {
    this.setState({task: event.target.value})
  }

  // onSelectTask = event => {
  //   this.setState({tags: event.target.value})
  // }

  onSelectTask = event => {
    const selectedOption = event.target.value
    const selectedTag = tagsList.find(tag => tag.optionId === selectedOption)
    this.setState({tags: selectedTag ? selectedTag.displayText : ''})
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {task, tags} = this.state
    const selecttags = tagsList.find(each => each.displayText === tags)
    const newTaskList = {
      id: uuidv4(),
      task,
      tags,
      selectTags: selecttags ? selecttags.optionId : '',
    }

    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTaskList],
      task: ' ',
    }))
  }

  renderTaskCreate = () => {
    const {tags, task} = this.state
    return (
      <>
        <div className="task-create-container">
          <h1 className="task-main-heading"> Create a Task! </h1>
          <form className="form-container" onSubmit={this.onSubmitTask}>
            <div className="task-input-container">
              <label className="task-label" htmlFor="task">
                Task
              </label>
              <br />
              <input
                type="text"
                id="task"
                placeholder="Enter the task here"
                className="task-input"
                onChange={this.onInputTask}
                value={task}
              />
            </div>
            <div className="task-input-container">
              <label className="task-label" htmlFor="tags">
                Tags
              </label>
              <br />
              <select
                id="tags"
                className="task-input"
                onChange={this.onSelectTask}
                value={tags}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="task-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
      </>
    )
  }

  onTab = optionId => {
    this.setState({activeTab: optionId})
  }

  renderTasktab = () => {
    const {taskList, activeTab} = this.state
    const filterTask =
      activeTab === ''
        ? taskList
        : taskList.filter(each => each.selectTags === activeTab)

    return (
      <>
        <div className="tag-container">
          <h1 className="tag-heading"> Tags </h1>
          <ul className="tag-tab-list">
            {tagsList.map(each => (
              <TaskTab
                tab={each}
                key={each.optionId}
                onTab={this.onTab}
                isActive={each.optionId === activeTab}
              />
            ))}
          </ul>
          <h1 className="tag-heading"> Tasks </h1>
          {filterTask.length === 0 ? (
            <p className="no-task-para"> No Tasks Added Yet </p>
          ) : (
            <ul className="task-list">
              {filterTask.map(each => (
                <li className="task"  key={each.id}>
                  <p className="taskList-heading"> {each.task} </p>
                  <button className="taskList-button"> {each.tags} </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  render() {
    return (
      <>
        <div className="task-main-container">
          {this.renderTaskCreate()}
          {this.renderTasktab()}
        </div>
      </>
    )
  }
}

export default TaskCreate
