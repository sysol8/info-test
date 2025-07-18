import styles from './Filter.module.css'
import { useState } from 'react'

function Filter({ columns, onFilter }) {
  const [fieldKey, setFieldKey] = useState(
    columns.length > 0 ? columns[0].key : '',
  );
  const [value, setValue] = useState('');

  const currentColumn = columns.find((column) => column.key === fieldKey);

  const handleFieldChange = (e) => {
    setFieldKey(e.target.value);
    setValue('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(fieldKey, value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <select className={styles.selectMain} value={fieldKey} onChange={handleFieldChange}>
        {columns.map((column) => (
          <option key={column.key} value={column.key}>
            {column.label}
          </option>
        ))}
      </select>
      {currentColumn.type === 'select' &&
      Array.isArray(currentColumn.options) ? (
        <select className={styles.selectSecondary} value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="" unselectable={"on"}>-выберите-</option>
          {currentColumn.options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={styles.input}
          type={currentColumn.type === 'number' ? 'number' : 'text'}
          placeholder={`${currentColumn.label.toLowerCase()}`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}

      <button className={styles.button} type="submit">Применить</button>
    </form>
  );
}

export default Filter;
