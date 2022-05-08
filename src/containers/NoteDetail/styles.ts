import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    marginBottom: 16,
    fontSize: 24,
  },
  topContainer: {
    minHeight: 128,
  },
  editNote: {
    height: '80%',
    borderColor: '#eeeee4',
    padding: 16,
    borderWidth: 2,
    marginHorizontal: 16,
  },
  listItem: {
    height: 128,
    width: '45%',
    margin: 10,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
  },
  noteFont: {
    fontSize: 20,
  },
});

export default styles;
