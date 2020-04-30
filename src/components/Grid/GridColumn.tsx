import React from 'react'
import classNames from 'classnames'
import css from './index.module.css'
import { CardComponent } from '../Card/CardComponent'
import {
  Cards,
  DragItem,
  ItemTypes,
  MoveCardParams,
  StatusType,
} from '../../redux/types'
import { Grid } from '@material-ui/core'
import { isColumnStatusValidForDrop } from '../../helpers'
import { useDrop } from 'react-dnd'

export const GridColumn: React.FC<{
  status: StatusType
  cards: Cards
  moveCard: (params: MoveCardParams) => void
}> = ({ status, cards, moveCard }) => {
  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: ItemTypes.CARD,
    drop: (item) => {
      moveCard({
        id: item.id,
        status: {
          from: item.status,
          to: status,
        },
      })
    },
    canDrop: (item) => isColumnStatusValidForDrop(item.status, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return (
    <Grid
      className={classNames(
        isOver && !canDrop && css.isUnavailableToDrag,
        isOver && canDrop && css.isAvailableToDrag
      )}
      ref={drop}
      item
      xs={3}
    >
      {cards.map((card) => (
        <CardComponent key={card.id} {...card} />
      ))}
    </Grid>
  )
}
