import { colors } from '../../styles/colors';

export const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.blue,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 10,
  },
  headerText: {
    width: '100%',
    fontSize: 16,
    fontWeight: 600,
    color: colors.white,
    paddingLeft: 10,
  },
  expenseTypeList: {
    paddingLeft: 10,
    paddingRight: 6,
  },
  expenseTypeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
    paddingBottom: 2,
  },
  expenseTypeHeaderRight: {
    display: 'flex',
    alignItems: 'center',
  },
  expenseTypeText: {
    fontSize: 16,
    fontWeight: 500,
  },
  expenseList: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column' as const,
    marginBottom: 10,
  },
  expense: {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
    alignItems: 'space-between',
  },
  expenseText: {
    fontSize: 14,
  },
  expenseRight: {
    display: 'flex',
    alignItems: 'center',
  },

  modalBody: {
    backgroundColor: colors.background,
    width: '100%',
    padding: 30,
    borderRadius: 8,
    border: '1px solid #1d2026'
  },
  modalInputs: {
    marginBottom: 30,
    marginTop: 30,
  },
  scrollable: {
    display: 'flex',
    flexDirection: 'column' as const,
    flexGrow: 1,
    height: 100,
    overflowY: 'auto' as const,
  }
};
