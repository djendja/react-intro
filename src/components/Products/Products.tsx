import { products } from "./data";

export const Products = () => {
  //SORT
  const byCheapest = products.sort((a, b) => a.price - b.price);


  return (
    <div>
      <h2>Products List</h2>
      <div>
        {byCheapest.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <span>{product.price}</span>
              <span>{product.created}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};



