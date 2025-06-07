import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchNFTs,
  fetchNFTsSuccess,
  fetchNFTsFailure,
} from '../reducers/nftSlice';

function* fetchNFTsSaga() {
  try {
    const res: Response = yield call(fetch, '/api/nfts');
    const data = yield call([res, 'json']);
    yield put(fetchNFTsSuccess(data));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'An unknown error occurred while fetching NFTs';
    yield put(fetchNFTsFailure(errorMessage));
  }
}

export function* watchNFTs() {
  yield takeLatest(fetchNFTs.type, fetchNFTsSaga);
}