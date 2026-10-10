export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export type ItemCondition = 'MINT' | 'GOOD' | 'FAIR' | 'FOR_PARTS';

export type PackagingStatus = 'CIB' | 'BOX_ONLY' | 'MANUAL_ONLY' | 'LOOSE';

export type ListingStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD' | 'REMOVED';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface UserDTO {
  id: number;
  username: string;
  email: string;
  role: Role;
}

export interface RegisterRequestDTO {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  user: UserDTO;
}

export interface PlatformDTO {
  id: number;
  name: string;
  code: string;
  manufacturer: string;
  releaseYear: number;
  generation: number;
}

export interface CategoryDTO {
  id: number;
  name: string;
  description: string;
}

export interface ListingSummaryDTO {
  id: number;
  title: string;
  price: number;
  itemCondition: ItemCondition;
  packagingStatus: PackagingStatus;
  status: ListingStatus;
  imageUrl: string;
  createdAt: string;
  platformId?: number;
  platformName?: string;
  platformCode?: string;
  categoryId?: number;
  categoryName?: string;
  sellerId?: number;
  sellerUsername?: string;
}

export interface ListingDetailDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  itemCondition: ItemCondition;
  packagingStatus: PackagingStatus;
  status: ListingStatus;
  imageUrl: string;
  createdAt: string;
  platform: PlatformDTO;
  category: CategoryDTO;
  seller: UserDTO;
  orderId?: number;
}

export interface ListingCreateDTO {
  title: string;
  description: string;
  price: number;
  itemCondition: ItemCondition;
  packagingStatus: PackagingStatus;
  imageUrl: string;
  platformId: number;
  categoryId: number;
}

export interface OrderSummaryDTO {
  id: number;
  orderDate: string;
  totalPrice: number;
  shippingAddress: string;
  status: OrderStatus;
  listingId: number;
  listingTitle: string;
  listingImageUrl: string;
  platformCode?: string;
  buyerId: number;
  buyerUsername: string;
  sellerId: number;
  sellerUsername: string;
  hasReview: boolean;
  reviewRating?: number;
  reviewComment?: string;
}

export interface ReviewDTO {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  authorUsername: string;
  targetUsername: string;
  orderId: number;
}

export interface OrderDetailDTO {
  id: number;
  orderDate: string;
  totalPrice: number;
  shippingAddress: string;
  status: OrderStatus;
  buyer: UserDTO;
  listing: ListingSummaryDTO;
  review?: ReviewDTO;
}

export interface OrderCreateDTO {
  listingId: number;
  shippingAddress: string;
}

export interface ReviewCreateDTO {
  rating: number;
  comment: string;
}

export interface AdminMetricsDTO {
  totalGrossVolume: number;
  totalListings: number;
  availableListings: number;
  soldListings: number;
  totalOrders: number;
  pendingOrders: number;
  registeredUsers: number;
}

export interface FilterParams {
  platformId?: number | '';
  categoryId?: number | '';
  condition?: ItemCondition | '';
  maxPrice?: number | '';
  search?: string;
}
