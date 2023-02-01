
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UpdateFirebaseDocs = async (doc, item) => {
    console.log('FIREBASE FUNC => ', "       =doc=       ", doc, "       =item=       ", item);
    const key = auth()?.currentUser?.uid
    try {
        await firestore().collection("acters").doc(`${doc}`).update({
            [key]: item
        })
            .then(() => {
                console.log('Update profile!');
            })
            .catch(error => {
                console.log('FireStore error ->  ', error);
            });
    } catch (error) {
        console.log('catch error ->  ', error);
    }
};


