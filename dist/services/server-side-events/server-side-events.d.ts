import { Arguments, Response } from './server-side-events.types';
/**
 * Send server side event to Facebook Graph API.
 *
 * @param eventName
 * @param eventId
 * @param externalId
 * @param emails
 * @param phones
 * @param products
 * @param value
 * @param currency
 * @param fbc
 * @param fbp
 * @param ipAddress
 * @param userAgent
 * @param sourceUrl
 * @param firstName
 * @param lastName
 * @param testEventCode
 * @constructor
 */
declare const sendServerSideEvent: ({ eventName, eventId, externalId, emails, phones, products, value, currency, fbc, fbp, ipAddress, userAgent, sourceUrl, firstName, lastName, testEventCode, }: Arguments) => Promise<Response>;
export { sendServerSideEvent, };
