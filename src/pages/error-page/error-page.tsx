import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../components/store/api-actions';
import { memo } from 'react';

const ErrorComponent = () => {
  const dispatch = useAppDispatch();

  const handleErrorButtonClick = () => {
    dispatch(fetchOffersAction());
  };

  return (
    <>
      <p className="error__text">Не удалось загрузить предложения аренды</p>
      <button
        onClick={handleErrorButtonClick}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
};

export const ErrorPage = memo(ErrorComponent);
