import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { descreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  console.log('Pizza id : ', pizzaId);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(descreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
