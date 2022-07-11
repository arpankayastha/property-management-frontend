import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE } from "./actionTypes"
import { profileEdited,profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
 

function* editProfile({ payload: { user } }) {
  debugger
  try {
      const response = yield call({}, {
        username: user.username,
        idx: user.idx,
      })
      debugger
      
      yield put(profileEdited(user))
      yield put(profileSuccess(response))
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
