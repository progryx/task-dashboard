import Backend from 'react-dnd-html5-backend'
import React from 'react'
import { AppBar, Container, Grid, Toolbar, Typography } from '@material-ui/core'
import { DashboardContainer } from './components/Dashboard/DashboardContainer'
import { DndProvider } from 'react-dnd'

import css from './index.module.css'

export const RootApp: React.FC = () => (
  <React.Fragment>
    <DndProvider backend={Backend}>
      <Container maxWidth="lg" className={css.main}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Task Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Grid container>
          <DashboardContainer />
        </Grid>
      </Container>
    </DndProvider>
  </React.Fragment>
)
