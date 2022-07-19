type FBEventType = {
  eventName: string
  eventId?: string
  externalId?: string
  emails?: Array<string> | null
  phones?: Array<string> | null
  products: {
    sku: string
    quantity: number
  }[]
  value?: number
  currency?: string
  enableStandardPixel?: boolean
};

export default FBEventType;
