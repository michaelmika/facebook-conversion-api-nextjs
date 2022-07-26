"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendServerSideEvent = void 0;
const form_data_1 = __importDefault(require("form-data"));
const graph_1 = __importDefault(require("../../api/graph"));
/**
 * Send server side events to Facebook Graph API.
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
const sendServerSideEvent = ({ eventName, eventId, emails, phones, products, value, currency, fbc, fbp, ipAddress, userAgent, sourceUrl, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const formData = new form_data_1.default();
    const unixTimestampInSeconds = Math.floor(Date.now() / 1000);
    const eventData = [{
            event_name: eventName,
            event_time: unixTimestampInSeconds,
            event_id: eventId,
            event_source_url: sourceUrl,
            action_source: 'website',
            user_data: Object.assign(Object.assign(Object.assign({ client_ip_address: ipAddress, client_user_agent: userAgent }, (emails && (emails === null || emails === void 0 ? void 0 : emails.length) > 0 && { em: emails })), (phones && (phones === null || phones === void 0 ? void 0 : phones.length) > 0 && { ph: phones })), { fbc,
                fbp }),
            contents: products ? products.map((product) => ({ id: product.sku, quantity: product.quantity })) : [],
            custom_data: Object.assign(Object.assign({}, (value && { value })), (currency && { currency })),
        }];
    formData.append('data', JSON.stringify(eventData));
    formData.append('access_token', (_a = process.env.FB_ACCESS_TOKEN) !== null && _a !== void 0 ? _a : '');
    return (0, graph_1.default)({
        endpoint: 'events',
        body: formData,
    });
});
exports.sendServerSideEvent = sendServerSideEvent;
