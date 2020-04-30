import { CardData, Cards, statuses } from './types'
import { RootState } from './redux-store'
import { createSelector } from 'reselect'

const dashBoardSelector = (state: RootState) => state.mainPage.dashboard.cards

export const cardsSelector = createSelector(dashBoardSelector, (cards) =>
  statuses.reduce(
    (
      acc: Array<{ status: CardData['status']; cards: Cards }>,
      currentStatus
    ) => {
      const cardsGroupItems = cards.filter(
        (card) => card.status === currentStatus
      )

      return [...acc, { status: currentStatus, cards: cardsGroupItems }]
    },
    []
  )
)
