import { useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Sorting } from '../../types/sorting-types';
import { SortingMap } from '../../const';

type SortingProps = {
  activeSorting: Sorting;
  onChange: (newSorting: Sorting) => void;
}

export function SortOffers({activeSorting,onChange}:SortingProps) {
  const [isOpened,setIsOpened] = useState(false);
  const iconStyle = {
    transform: `translateY(-50%) ${isOpened ? 'rotate(180deg)' : '' }`
  };

  function handleKeydown(evt:KeyboardEvent) {
    if (evt.key === 'Escape' && isOpened) {
      evt.preventDefault();
      setIsOpened(false);
    }
  }

  function handleTypeClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleSortingItemClick(type:Sorting) {
    onChange(type);
    setIsOpened(false);
  }

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      onKeyDown={handleKeydown}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {activeSorting}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
          style={iconStyle}
        >
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={classNames({'places__options--opened' : isOpened}, 'places__options', 'places__options--custom')}
      >
        {Object.values(SortingMap).map((type) => (
          <li
            key={type}
            className={classNames({'places__option--active': type === activeSorting}, 'places__option')}
            tabIndex={0}
            onClick={() => handleSortingItemClick(type as Sorting)}
          >
            {type};
          </li>
        ))}
      </ul>
    </form>
  );
}
