import React, {useState } from "react";
import { useQuery } from 'react-query';
// Components
import Item from './Cart/Item/Item';
import Cart from './Cart/Cart';
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RestoreIcon from '@material-ui/icons/Restore';
import Badge from '@material-ui/core/Badge';
import RecentPurchase from './Cart/RecentPurchase/RecentPurchase';
// Styles
import { Wrapper, StyledButton, StyledAppBar, HeaderTypography, DialogImage, StyledDialogTitle, DialogText } from './App.styles';
import { Toolbar, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";

// Types
import { CartItemType } from "../client/App.types";

const getCheeses = async (): Promise<CartItemType[]> =>
  await (await fetch(`api/cheeses`)).json();

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<CartItemType>({
    id: 0,
    category: '',
    description: '',
    image: '',
    price: 0,
    title: '',
    amount: 0,
  });
  const handleDialogToggle = () => setDialogOpen((prev) => !prev);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [recentOpen, setRecentOpen] = useState(false);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'cheeses',
    getCheeses
  );
  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };
  const handleOpenDialog = (clickedItem: CartItemType) => {
    setDialogContent(clickedItem); // Set current dialog
    handleDialogToggle(); // Toggle dialog
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (

    <Wrapper>
      <StyledAppBar position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StyledButton onClick={()=> setRecentOpen(true)}>
              <RestoreIcon />
              <Typography variant="subtitle2">
                Recent Purchases
              </Typography>
            </StyledButton>

            <HeaderTypography variant="h3" noWrap>
              Welcome to Patient Zero's Cheeseria
            </HeaderTypography>

            <StyledButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={getTotalItems(cartItems)}
                color='error'
                data-cy="badge-count">
                <AddShoppingCartIcon />
              </Badge>

              <Typography variant="subtitle2">
                Cart
              </Typography>
            </StyledButton>

          </Grid>
        </Toolbar>
      </StyledAppBar>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Dialog
        onClose={handleDialogToggle}
        aria-labelledby="simple-dialog-title"
        open={dialogOpen}
      >
        <DialogImage src={dialogContent.image} alt={`${dialogContent.title}`} />
        <DialogContent>
          <StyledDialogTitle id="simple-dialog-title">{dialogContent.title}</StyledDialogTitle>
          <DialogText>{dialogContent.description}</DialogText>
          <DialogText>{dialogContent.category}</DialogText>
          <DialogText>{dialogContent.price}</DialogText>
          <DialogText>{dialogContent.amount}</DialogText>
        </DialogContent>
      </Dialog>
      <Drawer anchor='left' open={recentOpen} onClose={()=> setRecentOpen(false)}>
        <RecentPurchase
          cartItems={cartItems}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item 
            item={item} 
            handleAddToCart={handleAddToCart} 
            handleOpenDialog={handleOpenDialog}
            />
          </Grid>
        ))}
      </Grid>
    </Wrapper>

  );
};

export default App;
