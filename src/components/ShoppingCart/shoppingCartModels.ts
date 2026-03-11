export interface CartItem {
    id: number;
    name: string;
    price: number;
    created: string;
    quantity: number;
}

export interface ShoppingCartState {
    items: CartItem[]
}

export const initialState: ShoppingCartState = {
    items: []
}