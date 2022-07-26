import FormData from 'form-data';
import graphApi from '../../api/graph';
import { Arguments, Response } from './server-side-events.types';
import { sha256Hash } from '../../utils/hash';

/**
 * Send server side event to Facebook Graph API.
 *
 * @param eventName
 * @param eventId
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
 * @constructor
 */
const sendServerSideEvent = async ({
  eventName,
  eventId,
  externalId,
  emails,
  phones,
  products,
  value,
  currency,
  fbc,
  fbp,
  ipAddress,
  userAgent,
  sourceUrl,
  firstName,
  lastName,
  testEventCode
}: Arguments): Promise<Response> => {
  const formData = new FormData();

  const unixTimestampInSeconds = Math.floor(Date.now() / 1000);

  const eventData = [{
    event_name: eventName,
    event_time: unixTimestampInSeconds,
    event_id: eventId,
    event_source_url: sourceUrl,
    action_source: 'website',
    user_data: {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      external_id: sha256Hash(externalId),
      ...(firstName && {
        fn: sha256Hash(firstName),
      }),
      ...(lastName && {
        ln: sha256Hash(lastName),
      }),
      ...(emails && emails?.length > 0 && {
        em: emails.map((email) => (sha256Hash(email))),
      }),
      ...(phones && phones?.length > 0 && {
        ph: phones.map((phone) => (sha256Hash(phone))),
      }),
      fbc,
      fbp,
    },
    contents: products ? products.map((product) => (
      { id: product.sku, quantity: product.quantity }
    )) : [],
    custom_data: {
      ...(value && { value }),
      ...(currency && { currency }),
    },
  }];

  formData.append('data', JSON.stringify(eventData));
  if(testEventCode)
    formData.append('test_event_code', testEventCode);
  formData.append('access_token', process.env.FB_ACCESS_TOKEN ?? '');

  return graphApi({
    endpoint: 'events',
    body: formData,
  });
};

export {
  // eslint-disable-next-line import/prefer-default-export
  sendServerSideEvent,
};
