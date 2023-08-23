import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../components/store/api-actions';

export default function ErrorPage() {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Не удалось загрузить предложения аренды</p>
      <button
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}
