import { Button, Card } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { emptyCart, removeItem, selectCartCount, selectCartItems, selectCartTotal, updateQuantity } from "./ShoppingCartSlice";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

export const ShoppingCart = () => {
  const items = useAppSelector(selectCartItems);
  const cartCount = useAppSelector(selectCartCount);
  const cartTotal = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const [updatedQuantity, setUpdatedQuantity] = useState<number>(0);

  const handleUpdateQuantity = (id: number) => {
    dispatch(updateQuantity({id: id, quantity: updatedQuantity}));
    setEdit(false);
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items.map((item) => {
        return (
          <Card
            key={item.id}
            sx={{ marginBottom: "10px", padding: "10px", width: "50%" }}
          >
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.created}</div>
            {edit ? <div>
                    <input type="number" defaultValue={item.quantity} onChange={(e) => setUpdatedQuantity(Number(e.target.value))}/> 
                    <Button onClick={() => handleUpdateQuantity(item.id)}>Save</Button>
                </div>
            : <div>
                {item.quantity}
                 <EditIcon onClick={() => setEdit(true)} />    
            </div>}
            <Button onClick={() => dispatch(removeItem(item.id))}>Remove item</Button>
          </Card>
        );
      })}
     {cartTotal > 0 && <div>Total: ${cartTotal.toFixed(2)}</div>}
     {cartCount > 0 && <Button onClick={() => dispatch(emptyCart())}>Empty cart</Button>}
    </div>
  );
};
