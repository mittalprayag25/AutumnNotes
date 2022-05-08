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
    height: '20%',
    borderColor: '#abc',
    padding: 16,
    borderWidth: 2,
    marginHorizontal: 16,
  },
  listItem: {
    padding: 5,
    margin: 10,
    alignItems: 'flex-start',
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
  listContainer: {
    marginHorizontal: 16,
  },
  category: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eeeee4',
    margin: 8,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default styles;
