import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';

import {
  IconButton,
  EmojiedText,
  FinalFormTextField
} from '../../../index'
import {
  StyledMessage,
  MessageDate,
  MessageAvatar,
  MessageText,
} from '../styles'
import { H4, GridItem } from '../../../../styles'
import MessageShouldUpdate from './MessageShouldUpdate';
import DefaultAvatar from '../../../../../assets/defaultAvatar.jpg'

const Message = React.forwardRef((props, ref) => {
  const [edited, setEdited] = useState(false)

  const {
    message,
    deleteMessage,
    starMessage,
    updateMessage,
  } = props

  const { id, sender, text, date, stared } = message
  let avatar
  if ( sender && sender.avatar ) {
    avatar = sender.avatar
  }
  else {
    avatar = DefaultAvatar
  }

  const toggleEdit = () => {
    setEdited(!edited);
  }

  const handleDelete = () => {
    deleteMessage({id})
  }

  const handleStar = () => {
    starMessage({
      message_id: id,
      star: !stared
    })
  }

  const handleUpdate = ({text}) => {
    updateMessage({id, text})
    setEdited(false)
  }


  let starBtnColor
  if (stared) {
    starBtnColor = "active"
  } else {
    starBtnColor = "normal"
  }

  return (
    <StyledMessage ref={ref}>
      <MessageAvatar src={avatar} alt='avatar' />

      <GridItem
        component={H4}
        column="2"
        row="1/2"
        >
        {sender && sender.username}
      </GridItem>

      <MessageDate>{new Date(date).toLocaleString()}</MessageDate>

      <GridItem
        column="4"
        row="1"
        center
      >
        <IconButton icon="edit"
          onClick={toggleEdit}
          size="small"
        />
        <IconButton icon="star"
          onClick={handleStar}
          size="small"
          color={starBtnColor}
        />
        <IconButton icon="delete"
          onClick={handleDelete}
          size="small"
        />
      </GridItem>

      <MessageText>
        {
          edited ?
          <Form
            onSubmit={handleUpdate}
            render={
              ({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    component={FinalFormTextField}
                    name="text"
                    defaultValue={text}
                    InputProps={{disableUnderline: true}}
                    styled
                    multiline
                    autoFocus
                  />
                </form>
              )
            }
          />
          :
          <EmojiedText text={text}/>
        }
      </MessageText>
    </StyledMessage>
  )
})

Message.propTypes = {
  deleteMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  starMessage: PropTypes.func.isRequired,
  setAsRead: PropTypes.func.isRequired,
  maxOffset: PropTypes.number,
  message: PropTypes.shape({
    sender: PropTypes.number.isRequired,
    chat_id: PropTypes.number.isRequired,
    sender: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
    unread: PropTypes.bool.isRequired,
    stared: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired
};

export default MessageShouldUpdate(Message);
