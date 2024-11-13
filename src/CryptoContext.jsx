import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';


const Crypto = createContext()

const CryptoContext = ({children}) => {
  const [currency,setCurrency] = useState('INR');
  const [symbol,setSymbol] = useState("₹");
  const [user,setUser] = useState(null);
  const [alert,setAlert] = useState({
    open:false,
    message:"",
    type:"success",
  });
  const [watchlist,setWatchList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);
  
      let unSubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          // console.log(coin.data().coins);
          setWatchList(coin.data().coins);
        } else {
          setWatchList([]);
        }
      });
      return () => {
        unSubscribe();
      };
    }else{
      setWatchList([]);
    }
  }, [user]);
  

  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user) setUser(user);
      else setUser(null);
    });
  },[])

  useEffect(()=>{
    if(currency === "INR"){
      setSymbol("₹")
    }
    else if(currency === "USD"){
      setSymbol("$")
    }

  },[currency])

  return (
    <Crypto.Provider value={{currency,symbol,setCurrency, alert, setAlert, user, watchlist, coins, loading, setLoading, setCoins, setWatchList }}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = ()=>{
    return useContext(Crypto);
}