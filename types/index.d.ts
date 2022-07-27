type FBEventType = {
  eventName: string
  eventId?: string
  externalId: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  products?: {
    sku: string
    quantity: number
  }[] | [] | null
  value?: number
  currency?: string
  enableStandardPixel?: boolean
  firstName?: string
  lastName?: string
  testEventCode?: string
};

export default FBEventType;
