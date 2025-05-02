import React, { useContext, useReducer } from 'react';
import { createContext } from 'react';


const CartStateContext = createContext();
const CardDispatchConstext = createContext();


const reducer = (state, action)=>{
  switch (action.type) {
    case "ADD":
      return[...state,{id:action.id, name:action.name, price: action.price, qty: action.qty, size: action.size, img:action.img

      }]

    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1)
      return newArr;
      
      case "UPDATE":
        let arr = [...state]
        arr.find((food, index) => {
            if (food.id === action.id) {
                console.log(food.qty, parseInt(action.qty), action.price + food.price)
                arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
            }
            return arr
        })
        return arr
        case "DROP":
          let empArray=[];
          return empArray;
    default:
      console.log("error in Reducer");
      
  }

};


export const CardProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer,[]);

  return (
    <CardDispatchConstext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>

    </CardDispatchConstext.Provider>
  )
}

export const useCard = ()=>useContext(CartStateContext);
export const useDispatchCard = ()=>useContext(CardDispatchConstext);

