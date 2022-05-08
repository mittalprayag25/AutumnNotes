import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import HeaderNav from '../../components/HeaderNav';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../assets/index';
import actions from '../../redux/actions';
import styles from './styles';

const Category = ({navigation}: any) => {
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  const {categories}: any = useSelector((s: RootState) => s);

  const saveCategory = () => {
    if (category) {
      dispatch(actions.categories.createcategory({category}));
      setCategory(null);
    }
  };

  const createCategoryObject = rawCategory => {
    const obj: any = {};
    obj.label = rawCategory;
    obj.value = rawCategory;
    return obj;
  };

  const removeCategory = (data: any, index: number) => {
    dispatch(actions.categories.deletecategory({category: data, index}));
  };

  const renderItem = ({item, index}) => (
    <View style={styles.category}>
      <Text style={styles.listItem}>{`${item.value}`}</Text>
      <Text
        testID={`create-category-remove-${item.value}`}
        onPress={text => {
          removeCategory(text, index);
        }}>
        x
      </Text>
    </View>
  );

  const addCategory = item => {
    setCategory(createCategoryObject(item));
  };

  const renderLeftnav = () => (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        testID="create-category-back">
        <Image source={images.notes.back} />
      </TouchableOpacity>
    </>
  );

  const renderRightNav = () => (
    <>
      <TouchableOpacity
        onPress={() => saveCategory()}
        testID="create-category-save">
        <Image source={images.notes.save} />
      </TouchableOpacity>
    </>
  );

  return (
    <>
      <View style={styles.container}>
        <HeaderNav
          leftNav={renderLeftnav()}
          rightNav={renderRightNav()}
          title="Create category"
        />
        <View style={styles.container}>
          <View style={styles.editNote}>
            <TextInput
              value={category ? category : ''}
              onChangeText={addCategory}
              testID="create-category-input-text"
              multiline={true}
              autoFocus
              selectionColor="#000"
            />
          </View>
          <FlatList
            style={styles.listContainer}
            data={categories.categories}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>
      </View>
    </>
  );
};

export default Category;
