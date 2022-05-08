import {Text, Image, View, TouchableOpacity, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import HeaderNav from '../../components/HeaderNav';
import images from '../../assets/index';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../redux/actions';
import styles from './styles';

const Note = ({navigation}: any) => {
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const {
    categories: {categories},
  }: any = useSelector((s: RootState) => s);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState(categories ? categories : []);

  const saveNote = () => {
    if (note.length > 0) {
      const noteObj = createNoteObj(note);
      noteObj.category = value;
      dispatch(actions.notes.createnote({note: noteObj}));
      setNote('');
    }
  };

  const createNoteObj = rawNote => {
    const obj: any = {};
    obj.title = rawNote;
    obj.description = rawNote;
    obj.category = '';
    return obj;
  };

  const addNote = item => {
    setNote(item);
  };

  const renderLeftnav = () => (
    <>
      <TouchableOpacity onPress={() => navigation.goBack()} testID="test-back">
        <Image source={images.notes.back} />
      </TouchableOpacity>
    </>
  );

  const renderRightNav = () => (
    <>
      <TouchableOpacity onPress={() => saveNote()} testID="test-save">
        <Image source={images.notes.save} />
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <HeaderNav
        leftNav={renderLeftnav()}
        rightNav={renderRightNav()}
        title="Add Notes"
      />

      <View style={styles.container}>
        <View style={styles.editNote}>
          <TextInput
            testID="text-input-notes"
            value={note}
            onChangeText={addNote}
            multiline={true}
            placeholder={'Type here for making notes'}
            style={styles.noteFont}
            selectionColor="#000"
          />
        </View>
        {items.length > 0 && (
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Choose category"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Note;
