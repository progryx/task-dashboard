import { Cards, DashboardData, MoveCardParams } from './types'
import { InferActionTypes } from './redux-store'
import { generateId, isColumnStatusValidForDrop } from '../helpers'

type ActionTypes = InferActionTypes<typeof actions>

export const actions = {
  setError: (error: string) =>
    ({ type: 'SET_ERROR', payload: { error } } as const),
  setCards: (cards: Cards) =>
    ({ type: 'SET_CARDS', payload: { cards } } as const),
  getCards: () => ({ type: 'GET_CARDS' } as const),
  moveCard: (payload: MoveCardParams) =>
    ({ type: 'MOVE_CARD', payload } as const),
}

const initialState: {
  dashboard: DashboardData
  isPageReady: boolean
  serverMessage: string
} = {
  dashboard: {
    cards: [],
  },
  isPageReady: false,
  serverMessage: '',
}

export const mainReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    default: {
      return state
    }

    case 'SET_ERROR': {
      return {
        ...state,
        serverMessage: action.payload.error,
      }
    }

    case 'SET_CARDS': {
      return {
        ...state,
        isPageReady: true,
        dashboard: {
          ...state.dashboard,
          cards: action.payload.cards.map((row) => ({
            id: generateId(),
            ...row,
          })),
        },
      }
    }

    case 'MOVE_CARD': {
      const statusFrom = action.payload.status.from
      const statusTo = action.payload.status.to

      const cards = state.dashboard.cards.map((card) => {
        if (
          card.id === action.payload.id &&
          isColumnStatusValidForDrop(statusFrom, statusTo)
        ) {
          card.status = statusTo
        }
        return card
      })

      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          cards,
        },
      }
    }
  }
}
