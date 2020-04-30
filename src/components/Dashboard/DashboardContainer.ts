import { DashboardComponent } from './DashboardComponent'
import { MapDispatchPropsType, MapStatePropsType } from './types'
import { RootState } from '../../redux/redux-store'
import { actions } from '../../redux/main-reducer'
import { cardsSelector } from '../../redux/selectors'
import { connect } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  cardsByGroup: cardsSelector(state),
  serverMessage: state.mainPage.serverMessage,
  isPageReady: state.mainPage.isPageReady,
})

export const DashboardContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  unknown,
  RootState
>(mapStateToProps, {
  getCards: actions.getCards,
  moveCard: actions.moveCard,
})(DashboardComponent)
