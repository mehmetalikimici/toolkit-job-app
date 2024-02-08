import { useState } from 'react';
import { sortOpt, statusOpt, typeOpt } from '../constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearFilter, filterBySearch, sortJobs } from '../redux/slices/jobSlice';

const Filter = ({ jobs }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(filterBySearch({ field: 'company', text }));
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine göre ara:</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: 'status', text: e.target.value })
              )
            }
            name="status"
          >
            <option value={''} hidden>
              Seçiniz
            </option>
            {statusOpt.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: 'type', text: e.target.value }))
            }
            name="type"
          >
            <option value={''} hidden>
              Seçiniz
            </option>
            {typeOpt.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            {sortOpt.map((i, index) => (
              <option key={index}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="button-borders">
            <button onClick={() => dispatch(clearFilter())} type="reset" className="primary-button">
              {' '}
              Filtreleri Uygula
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Filter;
