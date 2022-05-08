import {StyleSheet} from 'react-native';
import {sizes} from './../../constants/sizes';
import {colors} from './../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    marginBottom: sizes.space.md,
    fontSize: sizes.font.xl,
  },
  topContainer: {
    minHeight: 128,
  },
  editNote: {
    height: '20%',
    borderColor: colors.border,
    padding: sizes.space.md,
    borderWidth: 2,
    marginHorizontal: sizes.space.md,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    marginLeft: sizes.space.sm,
  },
  title: {
    fontSize: sizes.font.xl,
    alignSelf: 'flex-start',
    marginLeft: sizes.space.sm,
  },
  noRecords: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  categoryMenu: {
    marginLeft: 10,
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default styles;
