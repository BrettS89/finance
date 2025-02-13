import { colors } from '../../styles/colors';

export const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
    height: '100%',
  },
  taskItem: {
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
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
  taskList: {
    display: 'flex',
    flexDirection: 'column' as const,
    flexGrow: 1,
    height: 100,
    overflowY: 'auto' as const,
  }
};
