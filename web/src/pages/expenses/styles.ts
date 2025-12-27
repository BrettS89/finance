import { colors } from '../../styles/colors';

export const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column' as const,
    // width: '100%',
    height: '100%',
    padding: 12,
  },
  mainHeader: {
    textAlign: 'center' as const,
    display: 'flex',
    // justifyContent: 'space-between' as const,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center' as const
  },
  headerShadow: {
    borderRadius: 16,
    overflow: "visible",
    background: "transparent",
    boxShadow: '0 1.5px 5px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.18)',
    marginBottom: 18,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // width: '100%',
    background:
    "linear-gradient(135deg, #5a8fe0 0%, #466fcb 45%, #395bb8 100%)",
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  headerText: {
    width: '100%',
    fontSize: 16,
    fontWeight: 600,
    color: colors.white,
    paddingLeft: 10,
  },
  cardShadow: {
    // borderRadius: R,
    borderRadius: 16,
    overflow: "visible",
    background: "transparent",
    boxShadow: '0 2px 6px rgba(0,0,0,0.14), 0 2px 4px rgba(0,0,0,0.22)',
    marginBottom: 18,
  } satisfies React.CSSProperties,

  cardContainer: {
    borderRadius: 16,
    background: "linear-gradient(90deg, #333e5f 0%, #303c5f 50%, #2e3959 100%)",
    // border: "1px solid rgba(255, 255, 255, 0.045)",
  } satisfies React.CSSProperties,

  card: {
    borderRadius: 16,           // match
    overflow: "hidden",         // clip header/rows
    background:
    "linear-gradient(90deg, #333e5f 0%, #303c5f 50%, #2e3959 100%)",
  } satisfies React.CSSProperties,
  expenseTypeList: {
    paddingLeft: 15,
    paddingRight: 9,
    paddingBottom: 5
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
