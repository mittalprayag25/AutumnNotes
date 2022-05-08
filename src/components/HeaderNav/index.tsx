import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {Routes} from '../../constants/NavigationUtils';
import styles from './styles';

const HeaderNav = ({navigation, leftNav, rightNav, title}: any) => {
  return (
    <View style={styles.container}>
      {leftNav && <View style={styles.left}>{leftNav}</View>}
      {title && <Text style={styles.headerLabel}>{title}</Text>}
      {rightNav && <View style={styles.left}>{rightNav}</View>}
    </View>
  );
};

export default HeaderNav;
