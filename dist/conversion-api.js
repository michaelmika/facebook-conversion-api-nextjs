"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbPageView = exports.fbEvent = void 0;
const uuid_1 = require("uuid");
const debug_1 = __importDefault(require("./utils/debug"));
/**
 * Trigger Facebook PageView Event (Standard Pixel).
 *
 * @constructor
 */
const fbPageView = () => {
    (0, debug_1.default)('Client Side Event: PageView');
    window.fbq('track', 'PageView');
};
exports.fbPageView = fbPageView;
/**
 * Trigger custom Facebook Event (Conversion API and optionally Standard Pixel).
 *
 * @param event
 * @constructor
 */
const fbEvent = (event) => {
    const eventId = event.eventId ? event.eventId : (0, uuid_1.v4)();
    if (event.enableStandardPixel) {
        const clientSidePayload = Object.assign(Object.assign({ content_type: 'product', contents: event.products ? event.products.map((product) => ({ id: product.sku, quantity: product.quantity })) : [] }, (event.value && { value: event.value })), (event.currency && { currency: event.currency }));
        window.fbq('track', event.eventName, clientSidePayload, { eventID: eventId });
        (0, debug_1.default)(`Client Side Event: ${event.eventName}`);
        (0, debug_1.default)(`Client Side Payload: ${JSON.stringify(clientSidePayload)}`);
        (0, debug_1.default)(`Client Side Event ID: ${eventId}`);
    }
    setTimeout(() => {
        (0, debug_1.default)(JSON.stringify(event));
        const serverSidePayload = JSON.stringify({
            eventName: event.eventName,
            eventId,
            externalId: event.externalId,
            emails: event.emails,
            phones: event.phones,
            products: event.products,
            value: event.value,
            currency: event.currency,
            firstName: event.firstName,
            lastName: event.lastName,
            testEventCode: event.testEventCode,
            userAgent: navigator.userAgent,
            sourceUrl: window.location.href,
        });
        fetch('/api/fb-events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: serverSidePayload,
        }).then((response) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${response.status})`);
            (0, debug_1.default)(`Server Side Payload: ${serverSidePayload}`);
        }).catch((error) => {
            (0, debug_1.default)(`Server Side Event: ${event.eventName} (${error.status})`);
        });
    }, 250);
};
exports.fbEvent = fbEvent;
