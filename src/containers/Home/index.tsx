import React, {useEffect, useState} from 'react';
import {Text, Image, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/actions';
import CategoryList from './../../components/CategoryList';
import HeaderNav from './../../components/HeaderNav';
import {Routes} from '../../constants/NavigationUtils';
import {RootState} from '../../redux/reducers';
import images from './../../assets/index';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const Home = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [categoryGroup, setAllCategoryGroup] = useState([]);

  const {notes}: any = useSelector((s: RootState) => s);

  useEffect(() => {
    let categoryArr = notes.allNotes.map(function (obj) {
      return obj.category;
    });

    categoryArr = categoryArr.filter(function (v, i) {
      return categoryArr.indexOf(v) == i;
    });
    const categoryGroupArr = [];
    for (let j = 0; j < categoryArr.length; j++) {
      const arr = notes.allNotes.filter(function (obj) {
        return obj.category === categoryArr[j];
      });
      const catObj: any = {};
      catObj.data = arr;
      catObj.category = categoryArr[j];
      categoryGroupArr.push(catObj);
    }

    setAllCategoryGroup(categoryGroupArr);
  }, [notes]);

  useEffect(() => {
    dispatch(actions.notes.allnotes());
    dispatch(actions.categories.allcategories());
  }, [dispatch]);

  const renderRightNav = () => (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.CREATENODE)}
        testID="test-add">
        <Image source={images.notes.add} />
        <Text>Notes</Text>
      </TouchableOpacity>
      <Text
        testID="categories-text"
        style={styles.categoryMenu}
        onPress={() => navigation.navigate(Routes.CREATE_CATEGORY)}>
        Categories
      </Text>
    </>
  );

  return (
    <>
      <View style={styles.container}>
        <HeaderNav rightNav={renderRightNav()} title="Notes" />
        {categoryGroup.length > 0 ? (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {categoryGroup.map((data, index) => {
              return (
                data && (
                  <CategoryList
                    data={data}
                    navigation={navigation}
                    index={index}
                  />
                )
              );
            })}
          </ScrollView>
        ) : (
          <Text style={styles.noRecords} testID="no-record-found">
            No Records Found
          </Text>
        )}
      </View>
    </>
  );
};

export default Home;
