import { useMemo } from 'react';

const sortByAbc = ([a], [b]) => a.localeCompare(b);
const sortByZxy = ([a], [b]) => b.localeCompare(a);
const sortNone = () => 0;

/**
 * Renders <ul> list with all properties of the given JavaScript object
 * @param {object} object - object to print out
 * @param {boolean} [sortAbc] - properties sorted A-Z when true
 * @param {boolean} [sortZxy] - properties sorted Z-A when true
 */
export const ObjectAsList = ({
  className = '',
  object = {},
  sortAbc = false,
  sortZxy = false,
  ...restOfProps
}) => {
  const objectPropsWithSorting = useMemo(() => {
    const sortFunc = sortAbc ? sortByAbc : sortZxy ? sortByZxy : sortNone;
    return Object.entries(object)
      .sort(sortFunc)
      .map(([key, value]) =>
        typeof value === 'object' ? (
          <li key={key} className="propertyAsObject">
            <span className="key title">{key}:</span>
            <ObjectAsList object={value} {...{ sortAbc, sortZxy }} />
          </li>
        ) : (
          <li key={key}>
            <span className="key title">{key}:</span>{' '}
            <span className="value property">{String(value)}</span>
          </li>
        )
      );
  }, [object, sortAbc, sortZxy]);

  return (
    <ul className={`objectAsList ${className}`} {...restOfProps}>
      {objectPropsWithSorting}
    </ul>
  );
};

export default ObjectAsList;
