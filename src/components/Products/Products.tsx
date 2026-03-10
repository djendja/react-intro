import { Button, Card } from "@mui/material";
import { products } from "./data";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import type { CartItem } from "../ShoppingCart/shoppingCartModels";
import { useAppDispatch } from "../../state/store";
import { addItem } from "../ShoppingCart/ShoppingCartSlice";

export const Products = () => {
  //SORT
  const byCheapest = products.sort((a, b) => a.price - b.price);
  const dispatch = useAppDispatch();

  const handleAddItem = (product: Omit<CartItem, "quantity">) => {
    console.log(product);
    
      dispatch(addItem(product));
  }

  return (
    <div>
      <h2>Products List</h2>
      <div>
        {byCheapest.map((product) => {
          return (
            <Card key={product.id} sx={{marginBottom: "10px", padding: "10px", width: "50%"}}>
              <div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.created}</div>
                <Button onClick={() => handleAddItem(product)}>Add to cart<AddCircleOutlineOutlinedIcon/></Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};



