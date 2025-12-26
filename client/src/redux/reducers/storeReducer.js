import { 
  STORE_TYPES,
  STORE_CREATE_REQUEST,
  STORE_CREATE_SUCCESS,
  STORE_CREATE_FAIL,
  STORE_CREATE_RESET,
  STORE_GET_REQUEST,
  STORE_GET_SUCCESS,
  STORE_GET_FAIL,
  STORE_UPDATE_REQUEST,
  STORE_UPDATE_SUCCESS,
  STORE_UPDATE_FAIL,
  STORE_UPDATE_RESET
} from '../constants/storeConstants'

// Estado inicial
const initialState = {
  loading: false,
  stores: [],
  currentStore: null,
  error: null,
  success: false,
  // Estados individuales para compatibilidad
  createLoading: false,
  createError: null,
  createSuccess: false,
  createdStore: null,
  getLoading: false,
  getError: null,
  updateLoading: false,
  updateError: null
}

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    // ========== NUEVO SISTEMA ==========
    case STORE_TYPES.LOADING_STORE:
      return {
        ...state,
        loading: action.payload
      }

    case STORE_TYPES.CREATE_STORE:
      return {
        ...state,
        stores: [action.payload, ...state.stores],
        currentStore: action.payload,
        success: true,
        error: null,
        createSuccess: true,
        createdStore: action.payload,
        createLoading: false
      }

    case STORE_TYPES.GET_STORES:
      return {
        ...state,
        stores: action.payload,
        error: null,
        getLoading: false
      }

    case STORE_TYPES.GET_STORE:
      return {
        ...state,
        currentStore: action.payload,
        error: null,
        getLoading: false
      }

    case STORE_TYPES.UPDATE_STORE:
      return {
        ...state,
        stores: state.stores.map(store =>
          store._id === action.payload._id ? action.payload : store
        ),
        currentStore: action.payload,
        success: true,
        error: null,
        updateLoading: false
      }

    case STORE_TYPES.CHANGE_PLAN:
      return {
        ...state,
        stores: state.stores.map(store =>
          store._id === action.payload._id ? action.payload : store
        ),
        currentStore: action.payload,
        success: true,
        error: null
      }

    case STORE_TYPES.DELETE_STORE:
      return {
        ...state,
        stores: state.stores.filter(store => store._id !== action.payload),
        currentStore: state.currentStore?._id === action.payload ? null : state.currentStore,
        success: true,
        error: null
      }

    case STORE_TYPES.ERROR_STORE:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
        createLoading: false,
        getLoading: false,
        updateLoading: false
      }

    // ========== SISTEMA LEGACY (para compatibilidad) ==========
    case STORE_CREATE_REQUEST:
      return {
        ...state,
        createLoading: true,
        createError: null,
        createSuccess: false
      }

    case STORE_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        createdStore: action.payload,
        stores: [action.payload.store, ...state.stores],
        currentStore: action.payload.store,
        createError: null
      }

    case STORE_CREATE_FAIL:
      return {
        ...state,
        createLoading: false,
        createError: action.payload,
        createSuccess: false,
        createdStore: null
      }

    case STORE_CREATE_RESET:
      return {
        ...state,
        createLoading: false,
        createError: null,
        createSuccess: false,
        createdStore: null
      }

    case STORE_GET_REQUEST:
      return {
        ...state,
        getLoading: true,
        getError: null
      }

    case STORE_GET_SUCCESS:
      return {
        ...state,
        getLoading: false,
        currentStore: action.payload,
        getError: null
      }

    case STORE_GET_FAIL:
      return {
        ...state,
        getLoading: false,
        getError: action.payload
      }

    case STORE_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateError: null
      }

    case STORE_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        currentStore: action.payload,
        stores: state.stores.map(store =>
          store._id === action.payload._id ? action.payload : store
        ),
        updateError: null
      }

    case STORE_UPDATE_FAIL:
      return {
        ...state,
        updateLoading: false,
        updateError: action.payload
      }

    case STORE_UPDATE_RESET:
      return {
        ...state,
        updateLoading: false,
        updateError: null
      }

    default:
      return state
  }
}

export default storeReducer