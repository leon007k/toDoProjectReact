import PropTypes from 'prop-types';
import "./Card.css"
export const Card = ({ titleTask, cardBodyContent, children, taskIsDone }) => {

  const cardTaskIsDone = taskIsDone ? 'card card-task__done' : 'card'
  // * We validate that there is some description of the task, but there is, the description body is hidden
  const cardBodyClasses = cardBodyContent
    ? 'card-body'
    : 'card-body hidden'

  return (
    <div className={cardTaskIsDone}>
      <div className='card-header'>
        {titleTask}
      </div>
      <div className={cardBodyClasses}>
        <p>{cardBodyContent}</p>
      </div>
      {children}
    </div>
  )
}

Card.propTypes = {
  titleTask: PropTypes.string,
  children: PropTypes.node,
  cardBodyContent: PropTypes.string,
  taskIsDone: PropTypes.bool
}