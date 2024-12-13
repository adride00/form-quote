import { createContext, useReducer, useContext, ReactNode } from 'react';
import type { Dispatch } from 'react';
import { actionType, steps } from '../constants/formQuotes'
type State = {
  step: number;
  formDone: boolean;
  informationAboutYou: {
    fullName: string;
    email: string;
    phoneNumber: string;
    job?: string;
    companyName?: string;
  },
  informationAboutProject: any,
  selectStaff?: string
  country_code?: string
  budgetInformation?: any
}

export const initialState: State = {
  step: steps.STEP1,
  formDone: false,
  informationAboutYou: {
    fullName: '',
    email: '',
    phoneNumber: '',
    job: '',
    companyName: ''
  },
  informationAboutProject: null,
  selectStaff: '',
  country_code: '',
  budgetInformation: null
}

type ReducerAction = {
  type: actionType,
  payload?: State
}

interface FormQuotesContextType {
  state: State;
  dispatch: Dispatch<ReducerAction>;
}

export const FormQuoteContext = createContext<FormQuotesContextType | undefined>(undefined);

const reducer = (state: typeof initialState, action: ReducerAction): State => {
  if (action.type === actionType.NEXT_STEP) {
    return { ...state, step: state.step + 1 };
  }

  if (action.type === actionType.PREVIOUS_STEP) {
    return { ...state, step: state.step - 1 };
  }

  if (action.type === actionType.SET_INFORMATION_ABOUT_YOU) {
    return { ...state, informationAboutYou: action.payload.informationAboutYou };
  }

  if (action.type === actionType.FORM_DONE) {
    return { ...state, formDone: true };
  }

  if (action.type === actionType.SET_INFORMATION_ABOUT_PROJECT) {
    return { ...state, informationAboutProject: action.payload.informationAboutProject };
  }

  if (action.type === actionType.SET_STAFF) {
    return { ...state, selectStaff: action.payload.selectStaff };
  }

  if (action.type === actionType.SET_COUNTRY_CODE) {
    return { ...state, country_code: action.payload.country_code };
  }

  if (action.type === actionType.SET_BUDGET_INFORMATION) {
    return { ...state, budgetInformation: action.payload.budgetInformation };
  }
  return state;
}

interface FormQuoteContextProviderProps {
  children: ReactNode;
}

const FormQuoteContextProvider = ({ children }: FormQuoteContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormQuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </FormQuoteContext.Provider>
  );
};

const useFormQuote = () => {
  const context = useContext(FormQuoteContext);
  if (!context) {
    throw new Error('useFormAddSchool must be used within a FormSchoolContextProvider');
  }
  return context;
};

export { FormQuoteContextProvider, useFormQuote };