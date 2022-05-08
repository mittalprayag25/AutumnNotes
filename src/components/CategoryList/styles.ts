import {StyleSheet} from 'react-native';
import {sizes} from './../../constants/sizes';
import {colors} from './../../constants/colors';

const styles = StyleSheet.create({
  container: {
    //height: '20%',
  },
  header: {
    fontSize: sizes.font.md,
  },
  listItem: {
    height: 128,
    width: '45%',
    margin: sizes.space.sm,
    backgroundColor: colors.grey,
    alignItems: 'flex-start',
    padding: sizes.space.sm,
    borderRadius: sizes.borderRadius.sm,
  },
  categoryLabel: {
    fontSize: sizes.font.lg,
    marginLeft: sizes.space.sm,
    fontWeight: 'bold',
  },
  categoryGroup: {
    backgroundColor: colors.group,
    marginVertical: sizes.space.sm,
  },
});

export default styles;
