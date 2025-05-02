// import React, { useEffect, useState, useRef } from 'react';
// import { useDispatchCard, useCard } from './ContextReducer';

// export const Card = (props) => {

// let dispatch = useDispatchCard();
// let data = useCard();
// let priceRef = useRef()
// let options = props.options;
// let priceOptions = Object.keys(options);
// const [qty, setqty] = useState(1);
// const [size, setSize] = useState("")
// // let foodItem = props.foodName;


// // let handleAddToCart = async()=>{

// //   let food = []
// //     for (const item of data) {
// //       if (item.id === props.foodName._id) {
// //         food = item;

// //         break;
// //       }
// //     }
// //     if(food !== []){
// //       if (food.size === size) {
// //         await dispatch({ type: "UPDATE", id: props.foodName._id, price: finalPrice, qty: qty })
// //         return
// //       }
// //       else if (food.size !== size) {
// //     await dispatch({type: "ADD", id:props.foodName._id, name:props.foodName.name, price: finalPrice, qty: qty, size: size})
// //     }
// //     await dispatch({type: "ADD", id:props.foodName._id, name:props.foodName.name, price: finalPrice, qty: qty, size: size})
// //     }
 
  
// // }

// let handleAddToCart = async () => {
//   let food = null;
//   for (const item of data) {
//     if (item.id === props.foodName._id) {
//       food = item;
//       break;
//     }
//   }

//   if (food !== null) {
//     if (food.size === size) {
//       await dispatch({ type: "UPDATE", id: props.foodName._id, price: finalPrice, qty: qty });
//       return;
//     } else {
//       await dispatch({ type: "ADD", id: props.foodName._id, name: props.foodName.name, price: finalPrice, qty: qty, size: size });
//     }
//   }
// };

// let finalPrice = qty*parseInt(options[size]);
// useEffect(()=>{
//   setSize(priceRef.current.value)
// }, [])

//   return (
//     <div className="card mt-3" style={{"width": "18rem", "maxHeight":"360px", "marginBottom":"10px"}}>
//         <img src={props.foodName.img} className="card-img-top" alt="..." style={{height: "120px", objectFit: "fill"}}/>
//           <div className="card-body">
//             <h5 className="card-title text-white">{props.foodName.name}</h5>
//             <p className="card-text">
//               Some quick example text to build on the card title</p>

//               <div className="container w-100">
//                 <select className="m-2 h-100  bg-success rounded" onChange={(e) => setqty(e.target.value)} >
//                   {Array.from(Array(6), (e, i)=>{
//                     return(
//                       <option key={i+1} value={i+1}> {i+1}</option>
//                     )
//                   })}
//                 </select>
//                 <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} >
//                   {priceOptions.map((data)=>{
//                     return (
//                       <option key={data} value={data}>{data}</option>
//                     )
//                   })}
//                 </select>

//                 <div className="d-inline h-100 fs-5">
//                   {finalPrice}rs
//                 </div>
//               <hr />
//               <button className='btn btn-success justify-center ' onClick={handleAddToCart}>Add To Cart</button>
//               </div>
//           </div>
//       </div>
//   )
// }

import React, { useEffect, useState, useRef } from 'react';
import { useDispatchCard, useCard } from './ContextReducer';

export const Card = (props) => {
  const dispatch = useDispatchCard();
  const data = useCard();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    // Setting default size when component loads
    setSize(priceRef.current.value);
  }, [priceOptions]); // dependent on priceOptions

  const handleAddToCart = async () => {
    const finalPrice = qty * parseInt(options[size]); // Calculate finalPrice on click
    let food = null;

    for (const item of data) {
      if (item.id === props.foodName._id) {
        food = item;
        break;
      }
    }

    if (food !== null) {
      if (food.size === size) {
        await dispatch({type: "UPDATE",id: props.foodName._id,price: finalPrice,qty: qty,
        });
        return;
        
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodName._id,
          name: props.foodName.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: props.foodName._id,
        name: props.foodName.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  const finalPrice = qty * parseInt(options[size] || 0); // fallback 0 to avoid NaN

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px", marginBottom: "10px" }}>
      <img
        src={props.foodName.img}
        className="card-img-top"
        alt="Food Item"
        style={{ height: "120px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title text-white">{props.foodName.name}</h5>
        <p className="card-text text-light">
          Some quick example text to build on the card title.
        </p>

        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>

          <select
            className="m-2 h-100 bg-success rounded"
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>

          <div className="d-inline h-100 fs-5 text-white">
          ₹{finalPrice}/-
          </div>

          <hr />

          <button
            className="btn btn-success justify-center"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};
