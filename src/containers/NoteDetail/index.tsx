import {Text, Image, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderNav from './../../components/HeaderNav';
import {useDispatch} from 'react-redux';
import actions from '../../redux/actions';
import images from './../../assets/index';
import styles from './styles';

const NoteDetail = ({navigation}: any): JSX.Element => {
  const dispatch = useDispatch();

  const singleNote = navigation.getParam('singleNote');
  const index = navigation.getParam('index');

  const [note, setNote] = useState('');
  useEffect(() => {
    setNote(singleNote.description);
  }, [singleNote]);

  const deleteNote = () => {
    dispatch(actions.notes.deletenote(index));
  };

  const saveNote = () => {
    if (note.length > 0) {
      dispatch(actions.notes.editnote({note: createNoteObj(note), index}));
    }
  };

  const createNoteObj = rawNote => {
    const obj: any = {};
    obj.title = rawNote;
    obj.description = rawNote;
    obj.category = '';
    return obj;
  };

  const renderLeftnav = () => (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        testID="note-detail-back">
        <Image source={images.notes.back} />
      </TouchableOpacity>
    </>
  );

  const renderRightNav = () => (
    <>
      <TouchableOpacity
        testID="note-detail-save"
        onPress={() => {
          saveNote();
        }}>
        <Image source={images.notes.save} />
      </TouchableOpacity>
      <TouchableOpacity
        testID="note-detail-delete"
        onPress={() => {
          deleteNote();
        }}>
        <Image source={images.notes.delete} />
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <HeaderNav leftNav={renderLeftnav()} rightNav={renderRightNav()} />

      <View style={styles.container}>
        <View style={styles.editNote}>
          <TextInput
            testID="note-detail-text-input"
            value={note}
            onChangeText={setNote}
            multiline={true}
            autoFocus
            style={styles.noteFont}
            placeholder={'Edit your note'}
            selectionColor="#000"
          />
        </View>
      </View>
    </View>
  );
};

export default NoteDetail;
