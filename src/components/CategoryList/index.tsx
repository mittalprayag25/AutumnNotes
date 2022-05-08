import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Routes} from '../../constants/NavigationUtils';
import styles from './styles';

const CategoryList = ({navigation, data}: any) => {
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        testID={`note-detail-item-${item.title}`}
        onPress={() =>
          navigation.navigate(Routes.NOTEDETAIL, {
            singleNote: item,
            noteList: [],
            index: index,
          })
        }>
        <Text style={styles.header}>{`${item.title}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.categoryGroup}>
      <Text style={styles.categoryLabel}>
        {data.category.length > 0 ? data.category : 'Misc'}
      </Text>
      <FlatList
        style={styles.container}
        data={data.data}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default CategoryList;
