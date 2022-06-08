import {
  SortingOption,
  SortingType,
  OrderBy,
  OrderParams,
} from '@interfaces/index';

export const sortingData = (orderParams: OrderParams | undefined) => {
  const orderBy = [];

  switch (orderParams?.orderOption) {
    case SortingOption.price:
      orderBy.push(SortingOption.price);
      break;
    case SortingOption.stock:
      orderBy.push(SortingOption.stock);
      break;
    case SortingOption.price:
      orderBy.push(SortingOption.price);
      break;
    case SortingOption.sellPrice:
      orderBy.push(SortingOption.sellPrice);
      break;
    case SortingOption.name:
      orderBy.push(SortingOption.name);
      break;
    case SortingOption.userName:
      orderBy.push(SortingOption.userName);
      break;
    case SortingOption.quantity:
      orderBy.push(SortingOption.quantity);
      break;
    case SortingOption.transDate:
      orderBy.push(SortingOption.transDate);
      break;
    case SortingOption.salesTotal:
      orderBy.push(SortingOption.salesTotal);
      break;
    case SortingOption.subTotal:
      orderBy.push(SortingOption.subTotal);
      break;
    default:
      orderBy.push(SortingOption.createdTime);
  }

  switch (orderParams?.orderType) {
    case SortingType.ASC:
      orderBy.push(SortingType.ASC);
      break;
    default:
      orderBy.push(SortingType.DESC);
  }

  return orderBy as OrderBy;
};
