import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import  {CartItemType} from './Cart.types';
import Button from '@material-ui/core/Button';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};


const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  const purchase =(items: CartItemType[])=> (async()=>{
    await fetch('api/purchases',{
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    });
  })();
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      <Button 
        variant='contained' 
        size='small' 
        disableElevation
        onClick={() => purchase(cartItems)}>Purchase </Button>
    </Wrapper>
  );
  
};

export default Cart;
