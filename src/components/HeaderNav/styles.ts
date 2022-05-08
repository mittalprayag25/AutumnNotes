import {StyleSheet} from 'react-native';
import {sizes} from './../../constants/sizes';
import {colors} from './../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: sizes.space.sm,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  headerLabel: {
    fontSize: sizes.font.lg,
    position: 'relative',
    alignItems: 'center',
    left: '40%',
    fontWeight: 'bold',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
