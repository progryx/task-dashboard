import Alert from '@material-ui/lab/Alert'
import React from 'react'
import css from './index.module.css'
import { CircularProgress, Grid } from '@material-ui/core'
import { DashboardComponentProps } from './types'
import { GridColumn } from '../Grid/GridColumn'
import { GridHeader } from '../Grid/GridHeader'

export const DashboardComponent: React.FC<DashboardComponentProps> = ({
  moveCard,
  isPageReady,
  cardsByGroup,
  serverMessage,
  getCards,
}) => {
  React.useEffect(() => {
    getCards()
  }, [getCards])

  if (serverMessage !== '') {
    return <Alert severity="error">{serverMessage}</Alert>
  }

  if (!isPageReady) {
    return <CircularProgress className={css.preloader} />
  }

  return (
    <React.Fragment>
      <Grid container>
        {cardsByGroup.map((group) => (
          <GridHeader
            key={group.status}
            status={group.status}
            cardsLength={group.cards.length}
          />
        ))}
      </Grid>
      <Grid container className={css.groups}>
        {cardsByGroup.map((group) => (
          <GridColumn key={group.status} moveCard={moveCard} {...group} />
        ))}
      </Grid>
    </React.Fragment>
  )
}
