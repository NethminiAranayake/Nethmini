import { useQuery } from 'react-query';
import RecentPurchaseItem from './RecentPurchaseItem';
import { Wrapper } from './RecentPurchase.styles';
import {CartItemType}  from '../../App.types';

type Props = {
  cartItems: CartItemType[];
};

// Types
export type RecentItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };

const getRecentPurchase = async (): Promise<RecentItemType[]> =>
        await (await fetch(`api/recent_purchases`)).json();

const RecentPurchase: React.FC<Props> = () => {
    const { data, isLoading, error } = useQuery(
        'recent_purchases',
        getRecentPurchase
      );
  return (
    <Wrapper>
      <h2>Most Recent Purchase/s</h2>
      {data?.map(item => (
        <RecentPurchaseItem
          key={item.id}
          item={item} 
        />
      ))} 

    </Wrapper>
  );
};

export default RecentPurchase;