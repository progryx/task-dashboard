import { actions } from '../main-reducer'
import { call, put, takeLatest } from 'redux-saga/effects'
import { mockData } from '../mockData'

const getServerData = () =>
  new Promise((resolve, reject) => {
    // return reject('No data available') // Проверка вывода ошибки

    setTimeout(() => {
      resolve(mockData)
    }, 2000)
  })

function* getCardsFromServer() {
  try {
    const data = yield call(getServerData)
    yield put(actions.setCards(data))
  } catch (e) {
    yield put(actions.setError(e))
  }
}

export function* rootSaga() {
  yield takeLatest('GET_CARDS', getCardsFromServer)
}
