import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAgents,
  fetchAgentsSuccess,
  fetchAgentsFailure,
  addAgent,
  addAgentSuccess,
  addAgentFailure,
} from '../reducers/agentSlice';

function* fetchAgentsSaga() {
  try {
    const res: Response = yield call(fetch, '/api/agents');
    const data = yield call([res, 'json']);
    yield put(fetchAgentsSuccess(data));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch agents';
    yield put(fetchAgentsFailure(message));
  }
}

function* addAgentSaga(action: ReturnType<typeof addAgent>) {
  try {
    const res: Response = yield call(fetch, '/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.payload),
    });
    const data = yield call([res, 'json']);
    yield put(addAgentSuccess(data));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to add agent';
    yield put(addAgentFailure(message));
  }
}

export function* watchAgents() {
  yield takeLatest(fetchAgents.type, fetchAgentsSaga);
  yield takeLatest(addAgent.type, addAgentSaga);
}
