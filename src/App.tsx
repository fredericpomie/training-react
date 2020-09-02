import React, {useReducer, useState} from "react";
import "./App.css";
import Brand from "./Brand";
import useBrands from "./useBrands";

export const BoldContext = React.createContext(false);
BoldContext.displayName = 'DisplayContext';

interface AppState {
  query: string;
  page: number;
}

type Action =
  | {type: 'PAGE_UP'}
  | {type: 'PAGE_DOWN'}
  | {type: 'QUERY_UPDATED', payload: string};

function paginationReducer(state: AppState, action: Action) {
  const draft = {...state};

  switch (action.type) {
    case "PAGE_UP":
      draft.page =  draft.page + 1;
      break;
    case "PAGE_DOWN":
      draft.page =  draft.page - 1;
      break;
    case "QUERY_UPDATED":
      draft.page =  1;
      draft.query = action.payload
      break;
    default:
      throw new Error();
  }

  return draft;
}

function App() {
  const [bold, setBold] = useState(false);
  const [{page, query}, dispatch] = useReducer(paginationReducer, {page: 1, query: ""});
  const brands = useBrands(page, query);

  return (
    <BoldContext.Provider value={bold}>
      <div className="App container">
        <div className="form-group">
          <label>Search</label>
          <input
            type="checkbox"
            onChange={({target}) => setBold(target.checked)}
            checked={bold}
          />
          <input
            type="search"
            className="form-control"
            value={query}
            onChange={({ target }) => {
              dispatch({type: 'QUERY_UPDATED', payload: target.value});
            }}
            data-testid="search-input"
          />
        </div>
        {null === brands ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          brands.map((brand) => <Brand brand={brand} key={brand.id} />)
        )}

        {page > 1 && (
          <button className="btn btn-dark" onClick={() => {
            dispatch({type: 'PAGE_DOWN'});
          }}>
            PREVIOUS
          </button>
        )}
        <button className="btn btn-dark" onClick={() => {
          dispatch({type: 'PAGE_UP'});
        }}>
          NEXT
        </button>
      </div>
    </BoldContext.Provider>
  );
}

export default App;
