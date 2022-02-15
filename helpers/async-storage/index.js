// import AsyncStorage from '@react-native-async-storage/async-storage';

// const setValue = async (value) => {
//     try {
//       await AsyncStorage.setItem('@storage_Key', value)
//     } catch (e) {
//       // saving error
//     }
//   }
// const  getMyObject = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('@key')
//       return jsonValue != null ? JSON.parse(jsonValue) : null
//     } catch(e) {
//       // read error
//     }

//     console.log('Done.')

//   }
// const getData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('@storage_Key')
//       if(value !== null) {
//         // value previously stored
//       }
//     } catch(e) {
//       // error reading value
//     }
//   }
// removeData = async () => {
//     try {
//       await AsyncStorage.removeItem('@MyApp_key')
//     } catch(e) {
//       // remove error
//     }

//     console.log('Done.')
//   }
