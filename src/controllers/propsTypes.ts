import { DtbTruck } from '../models'
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

export interface TruckFilter {
  descending?: boolean | undefined
  page?: number | string
  rowsPerPage?: number | string
  sortBy?: string | undefined
  truckTypes?: Array<number>
  workingZones?: Array<number>
}


export interface TruckListResponse {
  data: DtbTruck[]
  totalElements: number
  size: number
  numberOfElements: number
  currentPage: number
  totalPages: number
}
