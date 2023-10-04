import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image,
  FlatList
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import FastImage from 'react-native-fast-image'

import { connect, useDispatch, useSelector } from 'react-redux';
import { addToCart, changeCount } from '../actions/counts';
import { SCREEN_HEIGHT } from '../common';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import { ExoText, MediumText } from '../components/Text';
import { foodType } from '../global/types';
import color from '../modules/Color';
import sampleStore from '../store/SampleStore';
import { getStringForKey, keys } from '../modules/Strings';

const Sample = (props: any) => {
  const dispatch = useDispatch()
  const cartItems : foodType[] = useSelector((state: any) => state.count.cartItem);
  const initialList : foodType[] = []

  const [loading,setLoading] = useState(false)
  const [food , setFood] = useState(initialList)

  useEffect(() => {
    setLoading(true)
    getListData()
  }, [])

  const getListData =()=>{
    sampleStore.getFoodList((status,result) => {
      setLoading(false)
      if (status) {
        let updateData : foodType[] = []
        result?.meals.map((item : foodType , index : any)=>{
           item.count = 0
           updateData.push(item)
        })
        setFood( updateData)
      }
    })
  }

  const onAddtoCart =(foodItem: foodType)=>{
    let filteredData : foodType[] = cartItems.filter((item:foodType , index: any)=>{
      return item.idMeal == foodItem.idMeal
    })
    
    if(filteredData.length){
      increamentCart(foodItem)   
    }else{
      addItem(foodItem)
    }
  }

  const addItem =(foodItem: foodType)=>{
    setLoading(true)
    let updatedData : foodType[] = cartItems
     foodItem.count = 1
     updatedData.push(foodItem)
     dispatch(addToCart(updatedData))
     setLoading(false)
  }

  const increamentCart =(foodItem: foodType)=>{
    let updatedData : foodType[] = []

    cartItems.map((item:foodType,index:any)=>{
      if(item.idMeal == foodItem.idMeal){
        item.count = item.count +1
      }
      updatedData.push(item)  
    })
    dispatch(addToCart(updatedData))
  }

  const decremetCart =(foodItem: foodType)=>{
    let updatedData : foodType[] = []

    cartItems.map((item:foodType,index:any)=>{
      if(item.idMeal == foodItem.idMeal){
        item.count = item.count - 1
        if(item.count > 0){
          updatedData.push(item)
        }  
      }else{
        updatedData.push(item)
      }     
    })
    dispatch(addToCart(updatedData))
  }

  const checkIsAdded = (foodItem : foodType)=>{
    let filteredData : foodType[] = cartItems.filter((item:foodType , index: any)=>{
      return item.idMeal == foodItem.idMeal
    })

    if(filteredData.length){
      return true
    }else{
      return false
    }
  }

  const getCount =(foodItem : foodType)=>{
    let filteredData : foodType[] = cartItems.filter((item:foodType , index: any)=>{
      return item.idMeal == foodItem.idMeal
    })

    if(filteredData.length){
      return filteredData[0].count
    }else{
      return 0
    }
  }

  const renderIncrementButton =(item : foodType)=>{
    return(
      <TouchableOpacity onPress={()=>increamentCart(item)}>
        <View style={styles.actionButtion}>
          <Image
            source={require('../assets/icons/Plus/ic-plus.png')} 
            resizeMode = 'contain'
            style={{tintColor:color.white ,height:10,width:10}}
          />
        </View>
     </TouchableOpacity>
    )
  }

  const renderDecrementButton =(item : foodType)=>{
    return(
        <TouchableOpacity onPress={()=>decremetCart(item)}>
          <View style={styles.actionButtion}>
            <Image
              source={require('../assets/icons/minus/ic-minus.png')} 
              resizeMode = 'contain'
              style={{tintColor:color.white ,height:10,width:10}}
            />
          </View>
        </TouchableOpacity>
    )
  }

  const renderImageView = (url : string) => {
      return (
        <FastImage
          style={{ width: '100%', height: "100%" }}
          source={{uri:url}}
          resizeMode='contain'
        />
      )
    }

  const renderFoodModal =({item,index}: {item: foodType, index: number})=>{
    return(
      <View style={styles.foodContainer}>
        <View style={styles.foodItem}>
          <View style={[styles.imageView]}>
            {renderImageView(item?.strMealThumb)}
          </View>
          <ExoText  style={{fontSize :14 ,marginTop:10 }}>{item.strMeal.slice(0,10)}</ExoText>
          {getCount(item) ? renderCount(item) : renderCartButton(item) }
        </View>
      </View>
    )

  }

  const renderCartButton =(item:foodType)=>{
    return(
      <TouchableOpacity onPress={()=>onAddtoCart(item)}>
        <View style={styles.cartButton}>
          <MediumText style={{fontSize :14 ,color:color.white}}>{getStringForKey(keys.kAddtoCart)}</MediumText>
        </View>
    </TouchableOpacity> 
    )
  }

  const renderCount =(item : foodType)=>{
    return(
      <View style={[styles.cartButton,{flexDirection:'row',justifyContent:'space-evenly'}]}>
        {renderDecrementButton(item)}
        <View style={styles.countView}>
          <MediumText style={{fontSize :14 ,color:color.black}}>{getCount(item) ? getCount(item) : item.count}</MediumText>
        </View>
        {renderIncrementButton(item)}
      </View>
    )
  }

  const renderListingView = () => {
    return (
        <FlatList
            contentContainerStyle={{ marginTop: 20 }}
            keyExtractor={(item, index) => index.toString()}
            data={food}
            renderItem={renderFoodModal}
            numColumns ={2}
            extraData={food.slice()}
        />
    )
}

  const renderCounter =()=>{
    return(
      <View style={styles.counter}>
        <View style={{alignItems:"center",justifyContent:'center',marginRight:20}}>
           <Image
              source={require('../assets/icons/ic_cart/ic_cart.png')} 
              resizeMode = 'contain'
              style={{height:50,width:50}}
            />
            <ExoText style={{fontSize:14,fontWeight:'800'}}>{getStringForKey(keys.kCart)}</ExoText>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <ExoText  style={styles.countText}>{cartItems.reduce((sum  ,{count}) => sum + count , 0) ? cartItems.reduce((sum  ,{count}) => sum + count , 0) : 0}</ExoText>
        </View>
      </View>
    )
  }

  return (
    <CustomSafeAreaView showLoadingIndicator={loading} style={styles.container} edges={['top']} darkContent = {true} translucent={true}>
      {renderCounter()}
      {food.length > 0 ? renderListingView() : null}
    </CustomSafeAreaView>
  );
}


const styles = StyleSheet.create({
  container                 : {
    flex                    : 1 ,
    backgroundColor         : color.white
  },
  counter                   :{
    width                   : "100%",
    height                  : SCREEN_HEIGHT/4,
    justifyContent          : "center",
    alignItems              : "center",
    flexDirection           : "row"
  },
  countText               : {
    fontSize              : 150,
    color                 : color.black,
    opacity               : 0.32,
    shadowColor           : "#000",
    shadowOffset          : {
      width: 0,
      height: 1,
    },
    shadowOpacity         : 0.20,
    shadowRadius          : 1.41,
    elevation             : 2,
  },
  innerView               :{
    width                 :200,
    height                :200,
    justifyContent        :'center',
    alignItems            :'center'
  },
  foodContainer           :{
    width                    : "50%",
    marginBottom             : 12,
    flexDirection            : 'row',
    alignSelf                :  'center',
    alignItems               : 'center',
    justifyContent            :"center",
  },
  imageView                  : {
    width                    : 88,
    height                   : 88, 
    alignItems               :'center',
    justifyContent           : 'center',
    marginTop                : 10
  },
  foodItem                   :{
    width                    :'70%',
    backgroundColor          : color.white,
    alignItems               :'center',
    borderTopLeftRadius      :15,
    borderTopEndRadius       :15,
    borderBottomLeftRadius   :5,
    borderBottomRightRadius  :5,
    shadowOffset             : {
      width                  : 0,
      height                 : -16,
  },  
  shadowOpacity              : 0.15,
  shadowRadius               : 24.0,
  shadowColor                : color.cardShadow,
  elevation                  : 10,
  },
  cartButton                  :{
    width                     :100,
    height                    :30 ,
    backgroundColor           :color.lightBlue,
    marginTop                 :10,
    marginBottom              :10,
    justifyContent            :'center',
    alignItems                :'center',
    borderRadius              :15
  },
  actionButtion               :{
    width                     :20,
    height                    :20,
    backgroundColor           :color.lightBlue,
    justifyContent            :'center',
    alignItems                :'center'
  },
  countView                   :{
    width                     :30,
    height                    :20,
    backgroundColor           :color.white,
    justifyContent            :'center',
    alignItems                :'center',
    borderRadius              :10
  }
});

export default Sample