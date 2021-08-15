import { VwTruckList } from '../models'
export interface TruckList {
  truckAmount?: number | undefined
  truckTypes?: number | undefined

  id?: string | undefined
  truckType?: number | undefined
  loadingWeight?: number | undefined
  stallHeight?: string | undefined
  createdAt?: string | undefined
  updatedAt?: string | undefined
  approveStatus?: string | undefined
  registrationNumber?: Array<string> | undefined
  tipper?: boolean | undefined
  phoneNumber?: string | undefined
  isLiked?: boolean | undefined
  workingZones?: Array<{
    region?: number | undefined
    province?: number | undefined
  }>
  owner: {
    id?: number | undefined
    userId?: string | undefined
    companyName?: string | undefined
    fullName?: string | undefined
    mobileNo?: string | undefined
    email?: string | undefined
    avatar?: {
      object: string | undefined
      token: string | undefined
    }
  }
}

export interface TruckWithoutCarrierId {
  truckType: number
  loadingWeight?: number | null
  stallHeight: string | null
  tipper?: boolean | null
  registrationNumber: string[] | null
  truckPhotos: {
    front: string | null
    back: string | null
    left: string | null
    right: string | null
  } | null
  workingZones: Array<{
    region: number,
    province?: number | null
  }> | null
  createdFrom?: number | null
}

export interface Truck extends TruckWithoutCarrierId {
  carrierId: string
}

export interface RawTruck extends TruckWithoutCarrierId {
  carrierId: number
}


export interface TruckPhotoUpdate {
  front: {
    url: string | null
    action: string
  } | null
  back: {
    url: string | null
    action: string
  } | null
  left: {
    url: string | null
    action: string
  } | null
  right: {
    url: string | null
    action: string
  } | null
}
export interface UpdateTruck {
  // id: number
  // carrierId: number
  truckType: number
  loadingWeight?: number | null
  stallHeight: string | null
  tipper?: boolean | null
  registrationNumber: string[] | null
  truckPhotos: TruckPhotoUpdate
  workingZones: Array<{
    region: number,
    province?: number | null
  }> | null
}

export interface RawUpdateTruck extends UpdateTruck {
  id: string
  carrierId: string
}

export interface ParseUpdateTruck extends UpdateTruck {
  id: number
  carrierId?: number
}

export interface TruckFilter {
  descending?: boolean | undefined
  page?: number | string
  rowsPerPage?: number | string
  sortBy?: string | undefined
  truckTypes?: Array<number>
  workingZones?: Array<number>
}
export interface TruckFilterGet {
  descending?: boolean | undefined
  page?: number | string
  rowsPerPage?: number | string
  sortBy?: string | undefined
  truckTypes?: string | undefined
  status?: string | undefined
  workingZones?: string | undefined
  searchText?: string | undefined
}


export interface TruckListResponse {
  data: VwTruckList[]
  totalElements: number
  size: number
  numberOfElements: number
  currentPage: number
  totalPages: number
}


export interface PureTruck {
  id: number;
  name: string | null;
  carrierId: number;
  registrationNumber: string | null;
  loadingWeight: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  createdUser: string | null;
  updatedUser: string | null;
  isDeleted: boolean;
  truckType: number;
  approveStatus: number | string;
  approveDate: Date | null;
  groupTruckType: number | null;
  isTipper: boolean | null;
  stallHeight: string | null;
  createdFrom: number | null;
}
