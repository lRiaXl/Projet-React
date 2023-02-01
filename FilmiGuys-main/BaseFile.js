import auth from '@react-native-firebase/auth';
import React, {useState, useEffect} from 'react';
import {
  View,
  LogBox,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import PageList from 'react-native-page-list';
import FastImage from 'react-native-fast-image';
import Slider from '@react-native-community/slider';
import AnyIcon, {Icons} from './src/components/AnyIcon';
import {UpdateFirebaseDocs} from './src/firebase/UpdateRatings';
import firestore from '@react-native-firebase/firestore';

const BaseFile = () => {
  const [isRate, setisRate] = useState(false);
  const [allRatings, setallRatings] = useState([]);
  const [ratings, setratings] = useState([]);
  const getAllDocs = async () => {
    try {
      const snapshot = await firestore().collection('acters').get();
      const allRatings = snapshot.docs.map(doc => {
        return {
          ...doc?.data(),
          docName: doc?.id,
        };
      });
      const ratings = snapshot.docs.map(doc => {
        const values = Object.values(doc?.data());
        const sum = values.reduce((accumulator, value) => {
          return accumulator + JSON.parse(value);
        }, 0);

        return {
          [doc.id]: sum?.toFixed(2),
        };
      });
      setratings(ratings);
      // console.log("allRatings====>>>  ", JSON.stringify(allRatings));
      console.log('allRatings====>>>  ', JSON.stringify(ratings));

      setallRatings(allRatings);
    } catch (error) {
      console.log('get All docs ', error);

      if (error.code === 'auth/network-request-failed') {
        // console.log('That email address is already in use!');
      }
    }
  };

  useEffect(() => {
    getAllDocs();
  }, [isRate]);

  const _renderItem = ({item, index}) => {
    let val;
    const obj = ratings?.map(obj => {
      if (obj[item?.name]) {
        val = obj[item?.name];
        return obj[item?.name];
      }
    });

    console.log('first===>>>   ', val);

    return (
      <TouchableOpacity
        key={index}
        style={{width: '50%', alignItems: 'center'}}
        activeOpacity={1}>
        <FastImage
          style={{
            borderRadius: 7,
            height: 200,
            width: '95%',
            margin: '3%',
            backgroundColor: 'black',
          }}
          resizeMode="contain"
          source={{
            uri: item.uri,
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
        />
        <View style={styles?.rateStar}>
          <AnyIcon
            disabled={true}
            type={Icons.Octicons}
            name={'star-fill'}
            color={!isRate ? '#EDEADE' : 'red'}
            size={20}
          />
        </View>
        <Text
          style={[
            styles?.name,
            {
              left: 16,
              bottom: 60,
            },
          ]}>
          Name: {item?.name}
        </Text>
        <Text
          style={[
            styles?.name,
            {
              left: 16,
              bottom: 38,
            },
          ]}>
          Age: {item?.age} years old
        </Text>
        <Text style={styles?.name}>Rating: {val} star</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View
        style={{
          backgroundColor: 'white',
          height: 38,
          justifyContent: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'lightgray',
          marginVertical: 10,
          width: '23%',
          alignSelf: 'center',
          borderRadius: 100,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[!isRate ? styles.activebtn : {marginLeft: 8}]}
          onPress={() => setisRate(!isRate)}>
          <AnyIcon
            type={Icons.FontAwesome5}
            name={'fire'}
            color={isRate ? '#EDEADE' : 'red'}
            size={28}
            disabled={true}
            style={[isRate ? {} : {}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[isRate ? styles.activebtn : {marginRight: 8}]}
          onPress={() => setisRate(!isRate)}>
          <AnyIcon
            disabled={true}
            type={Icons.Octicons}
            name={'star-fill'}
            color={!isRate ? '#EDEADE' : 'red'}
            size={28}
          />
        </TouchableOpacity>
      </View>
      {isRate ? (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <Text style={styles?.actors}>Actors</Text>
          <Text style={styles?.des}>
            They all are actors you can see their names and ratings here
          </Text>
          <FlatList
            style={{alignSelf: 'center', marginTop: 12}}
            data={data}
            renderItem={_renderItem}
            numColumns={2}
          />
        </View>
      ) : (
        <PageList
          data={data}
          renderItem={({item, index}) => {
            return (
              <View key={index} style={{flex: 1, backgroundColor: 'white'}}>
                <FastImage
                  style={{
                    width: '96%',
                    alignSelf: 'center',
                    borderRadius: 20,
                    height: '78%',
                    backgroundColor: 'lightgray',
                  }}
                  source={{
                    uri: item.uri,
                    headers: {Authorization: 'someAuthToken'},
                    priority: FastImage.priority.normal,
                  }}
                />
                <Text
                  style={[
                    styles?.name1,
                    {
                      left: 16,
                      bottom: '40%',
                    },
                  ]}>
                  Detail: {item?.des}
                </Text>
                <Text
                  style={[
                    styles?.name1,
                    {
                      left: 16,
                      bottom: '33%',
                      fontSize: 15,
                    },
                  ]}>
                  Name: {item?.name}
                </Text>
                <Text style={[styles?.name1, {fontSize: 15}]}>
                  Age: {item?.age} years old
                </Text>
                <SliderComp allRatings={allRatings} index={index} item={item} />
              </View>
            );
          }}
        />
      )}
    </>
  );
};

export default BaseFile;

const SignOutUser = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(e => {
      console.log('logout error  ===> ', e);
    });
};
const SliderComp = ({item, allRatings, index}) => {
  var foundValue = allRatings.filter(obj => obj?.docName === item?.name);
  const obj = Object.assign({}, foundValue[0]);
  // console.log("first==>>  ", obj)
  const [value, setvalue] = useState(0);

  return (
    <View
      style={{
        height: '10%',
        borderRadius: 20,
        backgroundColor: 'lightgray',
        marginTop: 18,
        width: '95%',
        alignSelf: 'center',
      }}>
      <Text style={{marginLeft: 15, marginVertical: 5, color: 'gray'}}>
        Your old Rating:{' '}
        {value == 0 ? obj[auth()?.currentUser?.uid] ?? 0 : value}
      </Text>
      <Slider
        style={{width: '100%'}}
        minimumValue={0}
        maximumValue={5}
        minimumTrackTintColor="green"
        maximumTrackTintColor="black"
        thumbTintColor="orange"
        onValueChange={value => {
          setvalue(value?.toFixed(2));
          UpdateFirebaseDocs(item?.name, value?.toFixed(2));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activebtn: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  name: {
    color: 'white',
    fontWeight: '700',
    position: 'absolute',
    left: 16,
    bottom: 16,
    maxWidth: 170,
    paddingHorizontal: 10,
    borderRadius: 2,
    zIndex: 1000,
    fontSize: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name1: {
    color: 'white',
    fontWeight: '700',
    position: 'absolute',
    left: 16,
    bottom: '29%',
    zIndex: 1000,
    fontSize: 12,
    maxWidth: '90%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 7,
    borderRadius: 5,
  },
  des: {
    color: 'lightgray',
    width: '65%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  actors: {
    fontWeight: '700',
    fontSize: 20,
    color: 'gray',
    alignSelf: 'center',
  },
  rateStar: {
    position: 'absolute',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderRadius: 100,
    width: 30,
    height: 30,
    right: 16,
    top: 16,
  },
});

const data = [
  {
    name: 'Jason Statham',
    age: '56',
    DOB: '26 July 1967',
    des: 'Jason Statham is an English actor. He is known for portraying characters in various action-thriller films who are typically tough, hardboiled, gritty, or violent.',
    uri: 'https://i.pinimg.com/originals/cb/b8/e4/cbb8e42c73e99b111e044b2853e4b44c.jpg',
  },
  {
    name: 'Vin Diesel',
    age: '56',
    DOB: 'July 18, 1967',
    des: "Mark Sinclair known professionally as Vin Diesel, is an American actor and producer. One of the world's highest-grossing actors, he is best known for playing Dominic Toretto in the Fast & Furious franchise. Alameda County, California, U.S.",
    uri: 'https://akns-images.eonline.com/eol_images/Entire_Site/2016711/rs_634x951-160811063528-634.vin-diesel-1.81116.jpg?fit=around%7C634:951&output-quality=90&crop=634:951;center,top',
  },
  {
    name: 'Anne Hathaway',
    age: '41',
    DOB: 'November 12, 1982',
    des: 'Anne Hathaway, in full Anne Jacqueline Hathaway, American actress known for her versatility, appearing in films that ranged from fairy tales to adult-oriented dramas and comedies.',
    uri: 'https://pyxis.nymag.com/v1/imgs/a0f/47b/814a6c926f53a88b42c9077f7ee4e59f0c-anne-hathaway.jpg',
  },
  {
    name: 'Dwayne johnson',
    age: '51',
    DOB: 'May 2, 1972',
    des: 'Dwayne Johnson, byname The Rock, American professional wrestler and actor whose charisma and athleticism made him a success in both fields. Johnson was born into a wrestling family.',
    uri: 'https://w0.peakpx.com/wallpaper/891/287/HD-wallpaper-dwayne-johnson-entrenamiento-gym.jpg',
  },
  {
    name: 'Jhonny Depp',
    age: '60',
    DOB: 'June 9, 1963',
    des: 'John Christopher Depp II is an American actor and musician. He is the recipient of multiple accolades, including a Golden Globe Award and a Screen Actors Guild Award, in addition to nominations for three Academy Awards and two BAFTA awards.',
    uri: 'https://wallpaperaccess.com/full/2420026.jpg',
  },
  {
    name: 'Scarlett Johansson',
    age: '39',
    DOB: 'November 22, 1984',
    des: 'Scarlett Johansson, American actress and singer whose acting range earned her popular acclaim in a variety of genres, from period drama to thriller and action adventure. Johansson, daughter of an architect and a producer, was raised in New York City.',
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhL3IfWzxk9CT9iZoNRB4vNPfKyNM8XauNg&usqp=CAU',
  },
  {
    name: 'Tom Cruise',
    age: '61',
    DOB: 'July 3, 1962',
    des: "Thomas Cruise Mapother IV is an American actor and producer. One of the world's highest-paid actors, he has received various accolades, including an Honorary Palme d'Or and three Golden Globe Awards, in addition to nominations for four Academy Awards.",
    uri: 'https://static.wikia.nocookie.net/topgun/images/7/73/Tom_Cruise.jpg/revision/latest?cb=20191214200827',
  },
  {
    name: 'Paul Walker',
    age: '40',
    DOB: 'September 11, 1973',
    des: "Paul William Walker IV was an American actor. Walker, who was famous for his role as Brian O'Conner in the “Fast & Furious” franchise, started acting in 1984 as a child actor. His talent, personality, and early demise have endeared him to millions of fans worldwide.",
    uri: 'https://people.com/thmb/rH6c4SXEYWlNTLlayGSIOxpoW3A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(877x0:879x2)/paul-walker-2000-13625613ecd24bf6bcd7b201a67a1573.jpg',
  },
  {
    name: 'Jennifer Lawrence',
    age: '33',
    DOB: 'August 15, 1990',
    des: "Jennifer Shrader Lawrence is an American actress. The world's highest-paid actress in 2015 and 2016, her films have grossed over $6 billion worldwide to date. She appeared in Time's 100 most influential people in the world list in 2013.",
    uri: 'https://s2.r29static.com/bin/entry/127/x,80/2163922/image.jpg',
  },
  {
    name: 'Will Smith',
    age: '55',
    DOB: 'September 25, 1968',
    des: 'Willard Carroll Will Smith II is an American actor, comedian, producer, rapper, and songwriter. He has enjoyed success in television, film, and music.',
    uri: 'https://wallpapers.com/images/hd/will-smith-in-formal-suit-cnhlihbdjs3amzkn.jpg',
  },
  {
    name: 'Angelina Jolie',
    age: '48',
    DOB: 'June 4, 1975',
    des: "Angelina Jolie DCMG is an American actress, filmmaker, and humanitarian. The recipient of numerous accolades, including an Academy Award and three Golden Globe Awards, she has been named Hollywood's highest-paid actress multiple times.",
    uri: 'https://static.toiimg.com/photo/94840559/94840559.jpg?imgsize=85026',
  },
  {
    name: 'Keanu Reeves',
    age: '59',
    DOB: 'September 2, 1964',
    des: 'Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto, Reeves began acting in theatre productions and in television films before making his feature film debut in Youngblood (1986).',
    uri: 'https://www.instyle.com.tr/Content/images/Haberler/Orjinal/keanu-reeves-ile-zoom-dateine-ne-dersiniz--65662-20062020124144.jpg',
  },
  {
    name: 'Matt Damon',
    age: '53',
    DOB: 'October 8, 1970',
    des: 'Matt Damon, in full Matthew Paige Damon, (born , Cambridge, Massachusetts, U.S.), American actor, screenwriter, and producer who was noted for his clean-cut good looks and intelligent performances.',
    uri: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Matt_Damon_TIFF_2015.jpg',
  },
  {
    name: 'Emily Blunt',
    age: '40',
    DOB: '23 February 1983',
    des: 'Emily Olivia Leah Blunt is a British actress. She is the recipient of several accolades, including a Golden Globe Award and a Screen Actors Guild Award, in addition to nominations for three British Academy Film Awards.',
    uri: 'https://i.pinimg.com/originals/86/22/62/86226235489e7b978cd77c116470d9c0.jpg',
  },
];

LogBox?.ignoreAllLogs();
