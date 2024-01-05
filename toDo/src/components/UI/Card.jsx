import PropTypes from 'prop-types';
import "./Card.css"
export const Card = ({ titleTask, cardBodyContent, children, taskIsDone }) => {

  const cardTaskIsDone = taskIsDone ? 'card card-task__done' : 'card'

  return (
    <div className={cardTaskIsDone}>
      <div className='card-header'>
        {titleTask}
      </div>
      <div className='card-body'>
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