/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.CMsgSteamDatagramRelayAuthTicket = (function() {
    
        /**
         * Properties of a CMsgSteamDatagramRelayAuthTicket.
         * @exports ICMsgSteamDatagramRelayAuthTicket
         * @interface ICMsgSteamDatagramRelayAuthTicket
         * @property {number|null} [time_expiry] CMsgSteamDatagramRelayAuthTicket time_expiry
         * @property {number|Long|null} [authorized_steam_id] CMsgSteamDatagramRelayAuthTicket authorized_steam_id
         * @property {number|null} [authorized_public_ip] CMsgSteamDatagramRelayAuthTicket authorized_public_ip
         * @property {number|Long|null} [gameserver_steam_id] CMsgSteamDatagramRelayAuthTicket gameserver_steam_id
         * @property {number|Long|null} [gameserver_net_id] CMsgSteamDatagramRelayAuthTicket gameserver_net_id
         * @property {Uint8Array|null} [legacy_signature] CMsgSteamDatagramRelayAuthTicket legacy_signature
         * @property {number|null} [app_id] CMsgSteamDatagramRelayAuthTicket app_id
         * @property {number|null} [gameserver_pop_id] CMsgSteamDatagramRelayAuthTicket gameserver_pop_id
         * @property {number|null} [virtual_port] CMsgSteamDatagramRelayAuthTicket virtual_port
         * @property {Array.<CMsgSteamDatagramRelayAuthTicket.IExtraField>|null} [extra_fields] CMsgSteamDatagramRelayAuthTicket extra_fields
         */
    
        /**
         * Constructs a new CMsgSteamDatagramRelayAuthTicket.
         * @exports CMsgSteamDatagramRelayAuthTicket
         * @classdesc Represents a CMsgSteamDatagramRelayAuthTicket.
         * @implements ICMsgSteamDatagramRelayAuthTicket
         * @constructor
         * @param {ICMsgSteamDatagramRelayAuthTicket=} [properties] Properties to set
         */
        function CMsgSteamDatagramRelayAuthTicket(properties) {
            this.extra_fields = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CMsgSteamDatagramRelayAuthTicket time_expiry.
         * @member {number} time_expiry
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.time_expiry = 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket authorized_steam_id.
         * @member {number|Long} authorized_steam_id
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.authorized_steam_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket authorized_public_ip.
         * @member {number} authorized_public_ip
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.authorized_public_ip = 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket gameserver_steam_id.
         * @member {number|Long} gameserver_steam_id
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.gameserver_steam_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket gameserver_net_id.
         * @member {number|Long} gameserver_net_id
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.gameserver_net_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket legacy_signature.
         * @member {Uint8Array} legacy_signature
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.legacy_signature = $util.newBuffer([]);
    
        /**
         * CMsgSteamDatagramRelayAuthTicket app_id.
         * @member {number} app_id
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.app_id = 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket gameserver_pop_id.
         * @member {number} gameserver_pop_id
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.gameserver_pop_id = 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket virtual_port.
         * @member {number} virtual_port
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.virtual_port = 0;
    
        /**
         * CMsgSteamDatagramRelayAuthTicket extra_fields.
         * @member {Array.<CMsgSteamDatagramRelayAuthTicket.IExtraField>} extra_fields
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.extra_fields = $util.emptyArray;
    
        /**
         * Creates a new CMsgSteamDatagramRelayAuthTicket instance using the specified properties.
         * @function create
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramRelayAuthTicket=} [properties] Properties to set
         * @returns {CMsgSteamDatagramRelayAuthTicket} CMsgSteamDatagramRelayAuthTicket instance
         */
        CMsgSteamDatagramRelayAuthTicket.create = function create(properties) {
            return new CMsgSteamDatagramRelayAuthTicket(properties);
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramRelayAuthTicket message. Does not implicitly {@link CMsgSteamDatagramRelayAuthTicket.verify|verify} messages.
         * @function encode
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramRelayAuthTicket} message CMsgSteamDatagramRelayAuthTicket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramRelayAuthTicket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                writer.uint32(/* id 1, wireType 5 =*/13).fixed32(message.time_expiry);
            if (message.authorized_steam_id != null && message.hasOwnProperty("authorized_steam_id"))
                writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.authorized_steam_id);
            if (message.authorized_public_ip != null && message.hasOwnProperty("authorized_public_ip"))
                writer.uint32(/* id 3, wireType 5 =*/29).fixed32(message.authorized_public_ip);
            if (message.gameserver_steam_id != null && message.hasOwnProperty("gameserver_steam_id"))
                writer.uint32(/* id 4, wireType 1 =*/33).fixed64(message.gameserver_steam_id);
            if (message.gameserver_net_id != null && message.hasOwnProperty("gameserver_net_id"))
                writer.uint32(/* id 5, wireType 1 =*/41).fixed64(message.gameserver_net_id);
            if (message.legacy_signature != null && message.hasOwnProperty("legacy_signature"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.legacy_signature);
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.app_id);
            if (message.extra_fields != null && message.extra_fields.length)
                for (var i = 0; i < message.extra_fields.length; ++i)
                    $root.CMsgSteamDatagramRelayAuthTicket.ExtraField.encode(message.extra_fields[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.gameserver_pop_id != null && message.hasOwnProperty("gameserver_pop_id"))
                writer.uint32(/* id 9, wireType 5 =*/77).fixed32(message.gameserver_pop_id);
            if (message.virtual_port != null && message.hasOwnProperty("virtual_port"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.virtual_port);
            return writer;
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramRelayAuthTicket message, length delimited. Does not implicitly {@link CMsgSteamDatagramRelayAuthTicket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramRelayAuthTicket} message CMsgSteamDatagramRelayAuthTicket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramRelayAuthTicket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CMsgSteamDatagramRelayAuthTicket message from the specified reader or buffer.
         * @function decode
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CMsgSteamDatagramRelayAuthTicket} CMsgSteamDatagramRelayAuthTicket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramRelayAuthTicket.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CMsgSteamDatagramRelayAuthTicket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.time_expiry = reader.fixed32();
                    break;
                case 2:
                    message.authorized_steam_id = reader.fixed64();
                    break;
                case 3:
                    message.authorized_public_ip = reader.fixed32();
                    break;
                case 4:
                    message.gameserver_steam_id = reader.fixed64();
                    break;
                case 5:
                    message.gameserver_net_id = reader.fixed64();
                    break;
                case 6:
                    message.legacy_signature = reader.bytes();
                    break;
                case 7:
                    message.app_id = reader.uint32();
                    break;
                case 9:
                    message.gameserver_pop_id = reader.fixed32();
                    break;
                case 10:
                    message.virtual_port = reader.uint32();
                    break;
                case 8:
                    if (!(message.extra_fields && message.extra_fields.length))
                        message.extra_fields = [];
                    message.extra_fields.push($root.CMsgSteamDatagramRelayAuthTicket.ExtraField.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CMsgSteamDatagramRelayAuthTicket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CMsgSteamDatagramRelayAuthTicket} CMsgSteamDatagramRelayAuthTicket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramRelayAuthTicket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CMsgSteamDatagramRelayAuthTicket message.
         * @function verify
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CMsgSteamDatagramRelayAuthTicket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                if (!$util.isInteger(message.time_expiry))
                    return "time_expiry: integer expected";
            if (message.authorized_steam_id != null && message.hasOwnProperty("authorized_steam_id"))
                if (!$util.isInteger(message.authorized_steam_id) && !(message.authorized_steam_id && $util.isInteger(message.authorized_steam_id.low) && $util.isInteger(message.authorized_steam_id.high)))
                    return "authorized_steam_id: integer|Long expected";
            if (message.authorized_public_ip != null && message.hasOwnProperty("authorized_public_ip"))
                if (!$util.isInteger(message.authorized_public_ip))
                    return "authorized_public_ip: integer expected";
            if (message.gameserver_steam_id != null && message.hasOwnProperty("gameserver_steam_id"))
                if (!$util.isInteger(message.gameserver_steam_id) && !(message.gameserver_steam_id && $util.isInteger(message.gameserver_steam_id.low) && $util.isInteger(message.gameserver_steam_id.high)))
                    return "gameserver_steam_id: integer|Long expected";
            if (message.gameserver_net_id != null && message.hasOwnProperty("gameserver_net_id"))
                if (!$util.isInteger(message.gameserver_net_id) && !(message.gameserver_net_id && $util.isInteger(message.gameserver_net_id.low) && $util.isInteger(message.gameserver_net_id.high)))
                    return "gameserver_net_id: integer|Long expected";
            if (message.legacy_signature != null && message.hasOwnProperty("legacy_signature"))
                if (!(message.legacy_signature && typeof message.legacy_signature.length === "number" || $util.isString(message.legacy_signature)))
                    return "legacy_signature: buffer expected";
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                if (!$util.isInteger(message.app_id))
                    return "app_id: integer expected";
            if (message.gameserver_pop_id != null && message.hasOwnProperty("gameserver_pop_id"))
                if (!$util.isInteger(message.gameserver_pop_id))
                    return "gameserver_pop_id: integer expected";
            if (message.virtual_port != null && message.hasOwnProperty("virtual_port"))
                if (!$util.isInteger(message.virtual_port))
                    return "virtual_port: integer expected";
            if (message.extra_fields != null && message.hasOwnProperty("extra_fields")) {
                if (!Array.isArray(message.extra_fields))
                    return "extra_fields: array expected";
                for (var i = 0; i < message.extra_fields.length; ++i) {
                    var error = $root.CMsgSteamDatagramRelayAuthTicket.ExtraField.verify(message.extra_fields[i]);
                    if (error)
                        return "extra_fields." + error;
                }
            }
            return null;
        };
    
        /**
         * Creates a CMsgSteamDatagramRelayAuthTicket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CMsgSteamDatagramRelayAuthTicket} CMsgSteamDatagramRelayAuthTicket
         */
        CMsgSteamDatagramRelayAuthTicket.fromObject = function fromObject(object) {
            if (object instanceof $root.CMsgSteamDatagramRelayAuthTicket)
                return object;
            var message = new $root.CMsgSteamDatagramRelayAuthTicket();
            if (object.time_expiry != null)
                message.time_expiry = object.time_expiry >>> 0;
            if (object.authorized_steam_id != null)
                if ($util.Long)
                    (message.authorized_steam_id = $util.Long.fromValue(object.authorized_steam_id)).unsigned = false;
                else if (typeof object.authorized_steam_id === "string")
                    message.authorized_steam_id = parseInt(object.authorized_steam_id, 10);
                else if (typeof object.authorized_steam_id === "number")
                    message.authorized_steam_id = object.authorized_steam_id;
                else if (typeof object.authorized_steam_id === "object")
                    message.authorized_steam_id = new $util.LongBits(object.authorized_steam_id.low >>> 0, object.authorized_steam_id.high >>> 0).toNumber();
            if (object.authorized_public_ip != null)
                message.authorized_public_ip = object.authorized_public_ip >>> 0;
            if (object.gameserver_steam_id != null)
                if ($util.Long)
                    (message.gameserver_steam_id = $util.Long.fromValue(object.gameserver_steam_id)).unsigned = false;
                else if (typeof object.gameserver_steam_id === "string")
                    message.gameserver_steam_id = parseInt(object.gameserver_steam_id, 10);
                else if (typeof object.gameserver_steam_id === "number")
                    message.gameserver_steam_id = object.gameserver_steam_id;
                else if (typeof object.gameserver_steam_id === "object")
                    message.gameserver_steam_id = new $util.LongBits(object.gameserver_steam_id.low >>> 0, object.gameserver_steam_id.high >>> 0).toNumber();
            if (object.gameserver_net_id != null)
                if ($util.Long)
                    (message.gameserver_net_id = $util.Long.fromValue(object.gameserver_net_id)).unsigned = false;
                else if (typeof object.gameserver_net_id === "string")
                    message.gameserver_net_id = parseInt(object.gameserver_net_id, 10);
                else if (typeof object.gameserver_net_id === "number")
                    message.gameserver_net_id = object.gameserver_net_id;
                else if (typeof object.gameserver_net_id === "object")
                    message.gameserver_net_id = new $util.LongBits(object.gameserver_net_id.low >>> 0, object.gameserver_net_id.high >>> 0).toNumber();
            if (object.legacy_signature != null)
                if (typeof object.legacy_signature === "string")
                    $util.base64.decode(object.legacy_signature, message.legacy_signature = $util.newBuffer($util.base64.length(object.legacy_signature)), 0);
                else if (object.legacy_signature.length)
                    message.legacy_signature = object.legacy_signature;
            if (object.app_id != null)
                message.app_id = object.app_id >>> 0;
            if (object.gameserver_pop_id != null)
                message.gameserver_pop_id = object.gameserver_pop_id >>> 0;
            if (object.virtual_port != null)
                message.virtual_port = object.virtual_port >>> 0;
            if (object.extra_fields) {
                if (!Array.isArray(object.extra_fields))
                    throw TypeError(".CMsgSteamDatagramRelayAuthTicket.extra_fields: array expected");
                message.extra_fields = [];
                for (var i = 0; i < object.extra_fields.length; ++i) {
                    if (typeof object.extra_fields[i] !== "object")
                        throw TypeError(".CMsgSteamDatagramRelayAuthTicket.extra_fields: object expected");
                    message.extra_fields[i] = $root.CMsgSteamDatagramRelayAuthTicket.ExtraField.fromObject(object.extra_fields[i]);
                }
            }
            return message;
        };
    
        /**
         * Creates a plain object from a CMsgSteamDatagramRelayAuthTicket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @static
         * @param {CMsgSteamDatagramRelayAuthTicket} message CMsgSteamDatagramRelayAuthTicket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CMsgSteamDatagramRelayAuthTicket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.extra_fields = [];
            if (options.defaults) {
                object.time_expiry = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.authorized_steam_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.authorized_steam_id = options.longs === String ? "0" : 0;
                object.authorized_public_ip = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.gameserver_steam_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gameserver_steam_id = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.gameserver_net_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.gameserver_net_id = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.legacy_signature = "";
                else {
                    object.legacy_signature = [];
                    if (options.bytes !== Array)
                        object.legacy_signature = $util.newBuffer(object.legacy_signature);
                }
                object.app_id = 0;
                object.gameserver_pop_id = 0;
                object.virtual_port = 0;
            }
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                object.time_expiry = message.time_expiry;
            if (message.authorized_steam_id != null && message.hasOwnProperty("authorized_steam_id"))
                if (typeof message.authorized_steam_id === "number")
                    object.authorized_steam_id = options.longs === String ? String(message.authorized_steam_id) : message.authorized_steam_id;
                else
                    object.authorized_steam_id = options.longs === String ? $util.Long.prototype.toString.call(message.authorized_steam_id) : options.longs === Number ? new $util.LongBits(message.authorized_steam_id.low >>> 0, message.authorized_steam_id.high >>> 0).toNumber() : message.authorized_steam_id;
            if (message.authorized_public_ip != null && message.hasOwnProperty("authorized_public_ip"))
                object.authorized_public_ip = message.authorized_public_ip;
            if (message.gameserver_steam_id != null && message.hasOwnProperty("gameserver_steam_id"))
                if (typeof message.gameserver_steam_id === "number")
                    object.gameserver_steam_id = options.longs === String ? String(message.gameserver_steam_id) : message.gameserver_steam_id;
                else
                    object.gameserver_steam_id = options.longs === String ? $util.Long.prototype.toString.call(message.gameserver_steam_id) : options.longs === Number ? new $util.LongBits(message.gameserver_steam_id.low >>> 0, message.gameserver_steam_id.high >>> 0).toNumber() : message.gameserver_steam_id;
            if (message.gameserver_net_id != null && message.hasOwnProperty("gameserver_net_id"))
                if (typeof message.gameserver_net_id === "number")
                    object.gameserver_net_id = options.longs === String ? String(message.gameserver_net_id) : message.gameserver_net_id;
                else
                    object.gameserver_net_id = options.longs === String ? $util.Long.prototype.toString.call(message.gameserver_net_id) : options.longs === Number ? new $util.LongBits(message.gameserver_net_id.low >>> 0, message.gameserver_net_id.high >>> 0).toNumber() : message.gameserver_net_id;
            if (message.legacy_signature != null && message.hasOwnProperty("legacy_signature"))
                object.legacy_signature = options.bytes === String ? $util.base64.encode(message.legacy_signature, 0, message.legacy_signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.legacy_signature) : message.legacy_signature;
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                object.app_id = message.app_id;
            if (message.extra_fields && message.extra_fields.length) {
                object.extra_fields = [];
                for (var j = 0; j < message.extra_fields.length; ++j)
                    object.extra_fields[j] = $root.CMsgSteamDatagramRelayAuthTicket.ExtraField.toObject(message.extra_fields[j], options);
            }
            if (message.gameserver_pop_id != null && message.hasOwnProperty("gameserver_pop_id"))
                object.gameserver_pop_id = message.gameserver_pop_id;
            if (message.virtual_port != null && message.hasOwnProperty("virtual_port"))
                object.virtual_port = message.virtual_port;
            return object;
        };
    
        /**
         * Converts this CMsgSteamDatagramRelayAuthTicket to JSON.
         * @function toJSON
         * @memberof CMsgSteamDatagramRelayAuthTicket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CMsgSteamDatagramRelayAuthTicket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        CMsgSteamDatagramRelayAuthTicket.ExtraField = (function() {
    
            /**
             * Properties of an ExtraField.
             * @memberof CMsgSteamDatagramRelayAuthTicket
             * @interface IExtraField
             * @property {string|null} [name] ExtraField name
             * @property {string|null} [string_value] ExtraField string_value
             * @property {number|Long|null} [int64_value] ExtraField int64_value
             * @property {number|Long|null} [fixed64_value] ExtraField fixed64_value
             */
    
            /**
             * Constructs a new ExtraField.
             * @memberof CMsgSteamDatagramRelayAuthTicket
             * @classdesc Represents an ExtraField.
             * @implements IExtraField
             * @constructor
             * @param {CMsgSteamDatagramRelayAuthTicket.IExtraField=} [properties] Properties to set
             */
            function ExtraField(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ExtraField name.
             * @member {string} name
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @instance
             */
            ExtraField.prototype.name = "";
    
            /**
             * ExtraField string_value.
             * @member {string} string_value
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @instance
             */
            ExtraField.prototype.string_value = "";
    
            /**
             * ExtraField int64_value.
             * @member {number|Long} int64_value
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @instance
             */
            ExtraField.prototype.int64_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * ExtraField fixed64_value.
             * @member {number|Long} fixed64_value
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @instance
             */
            ExtraField.prototype.fixed64_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Creates a new ExtraField instance using the specified properties.
             * @function create
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {CMsgSteamDatagramRelayAuthTicket.IExtraField=} [properties] Properties to set
             * @returns {CMsgSteamDatagramRelayAuthTicket.ExtraField} ExtraField instance
             */
            ExtraField.create = function create(properties) {
                return new ExtraField(properties);
            };
    
            /**
             * Encodes the specified ExtraField message. Does not implicitly {@link CMsgSteamDatagramRelayAuthTicket.ExtraField.verify|verify} messages.
             * @function encode
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {CMsgSteamDatagramRelayAuthTicket.IExtraField} message ExtraField message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExtraField.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.string_value != null && message.hasOwnProperty("string_value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.string_value);
                if (message.int64_value != null && message.hasOwnProperty("int64_value"))
                    writer.uint32(/* id 3, wireType 0 =*/24).sint64(message.int64_value);
                if (message.fixed64_value != null && message.hasOwnProperty("fixed64_value"))
                    writer.uint32(/* id 5, wireType 1 =*/41).fixed64(message.fixed64_value);
                return writer;
            };
    
            /**
             * Encodes the specified ExtraField message, length delimited. Does not implicitly {@link CMsgSteamDatagramRelayAuthTicket.ExtraField.verify|verify} messages.
             * @function encodeDelimited
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {CMsgSteamDatagramRelayAuthTicket.IExtraField} message ExtraField message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ExtraField.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an ExtraField message from the specified reader or buffer.
             * @function decode
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {CMsgSteamDatagramRelayAuthTicket.ExtraField} ExtraField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExtraField.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CMsgSteamDatagramRelayAuthTicket.ExtraField();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.string_value = reader.string();
                        break;
                    case 3:
                        message.int64_value = reader.sint64();
                        break;
                    case 5:
                        message.fixed64_value = reader.fixed64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an ExtraField message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {CMsgSteamDatagramRelayAuthTicket.ExtraField} ExtraField
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ExtraField.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an ExtraField message.
             * @function verify
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ExtraField.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.string_value != null && message.hasOwnProperty("string_value"))
                    if (!$util.isString(message.string_value))
                        return "string_value: string expected";
                if (message.int64_value != null && message.hasOwnProperty("int64_value"))
                    if (!$util.isInteger(message.int64_value) && !(message.int64_value && $util.isInteger(message.int64_value.low) && $util.isInteger(message.int64_value.high)))
                        return "int64_value: integer|Long expected";
                if (message.fixed64_value != null && message.hasOwnProperty("fixed64_value"))
                    if (!$util.isInteger(message.fixed64_value) && !(message.fixed64_value && $util.isInteger(message.fixed64_value.low) && $util.isInteger(message.fixed64_value.high)))
                        return "fixed64_value: integer|Long expected";
                return null;
            };
    
            /**
             * Creates an ExtraField message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {CMsgSteamDatagramRelayAuthTicket.ExtraField} ExtraField
             */
            ExtraField.fromObject = function fromObject(object) {
                if (object instanceof $root.CMsgSteamDatagramRelayAuthTicket.ExtraField)
                    return object;
                var message = new $root.CMsgSteamDatagramRelayAuthTicket.ExtraField();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.string_value != null)
                    message.string_value = String(object.string_value);
                if (object.int64_value != null)
                    if ($util.Long)
                        (message.int64_value = $util.Long.fromValue(object.int64_value)).unsigned = false;
                    else if (typeof object.int64_value === "string")
                        message.int64_value = parseInt(object.int64_value, 10);
                    else if (typeof object.int64_value === "number")
                        message.int64_value = object.int64_value;
                    else if (typeof object.int64_value === "object")
                        message.int64_value = new $util.LongBits(object.int64_value.low >>> 0, object.int64_value.high >>> 0).toNumber();
                if (object.fixed64_value != null)
                    if ($util.Long)
                        (message.fixed64_value = $util.Long.fromValue(object.fixed64_value)).unsigned = false;
                    else if (typeof object.fixed64_value === "string")
                        message.fixed64_value = parseInt(object.fixed64_value, 10);
                    else if (typeof object.fixed64_value === "number")
                        message.fixed64_value = object.fixed64_value;
                    else if (typeof object.fixed64_value === "object")
                        message.fixed64_value = new $util.LongBits(object.fixed64_value.low >>> 0, object.fixed64_value.high >>> 0).toNumber();
                return message;
            };
    
            /**
             * Creates a plain object from an ExtraField message. Also converts values to other types if specified.
             * @function toObject
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @static
             * @param {CMsgSteamDatagramRelayAuthTicket.ExtraField} message ExtraField
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ExtraField.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.string_value = "";
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.int64_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.int64_value = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.fixed64_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.fixed64_value = options.longs === String ? "0" : 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.string_value != null && message.hasOwnProperty("string_value"))
                    object.string_value = message.string_value;
                if (message.int64_value != null && message.hasOwnProperty("int64_value"))
                    if (typeof message.int64_value === "number")
                        object.int64_value = options.longs === String ? String(message.int64_value) : message.int64_value;
                    else
                        object.int64_value = options.longs === String ? $util.Long.prototype.toString.call(message.int64_value) : options.longs === Number ? new $util.LongBits(message.int64_value.low >>> 0, message.int64_value.high >>> 0).toNumber() : message.int64_value;
                if (message.fixed64_value != null && message.hasOwnProperty("fixed64_value"))
                    if (typeof message.fixed64_value === "number")
                        object.fixed64_value = options.longs === String ? String(message.fixed64_value) : message.fixed64_value;
                    else
                        object.fixed64_value = options.longs === String ? $util.Long.prototype.toString.call(message.fixed64_value) : options.longs === Number ? new $util.LongBits(message.fixed64_value.low >>> 0, message.fixed64_value.high >>> 0).toNumber() : message.fixed64_value;
                return object;
            };
    
            /**
             * Converts this ExtraField to JSON.
             * @function toJSON
             * @memberof CMsgSteamDatagramRelayAuthTicket.ExtraField
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ExtraField.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ExtraField;
        })();
    
        return CMsgSteamDatagramRelayAuthTicket;
    })();
    
    $root.CMsgSteamDatagramSignedRelayAuthTicket = (function() {
    
        /**
         * Properties of a CMsgSteamDatagramSignedRelayAuthTicket.
         * @exports ICMsgSteamDatagramSignedRelayAuthTicket
         * @interface ICMsgSteamDatagramSignedRelayAuthTicket
         * @property {number|Long|null} [reserved_do_not_use] CMsgSteamDatagramSignedRelayAuthTicket reserved_do_not_use
         * @property {number|Long|null} [key_id] CMsgSteamDatagramSignedRelayAuthTicket key_id
         * @property {Uint8Array|null} [ticket] CMsgSteamDatagramSignedRelayAuthTicket ticket
         * @property {Uint8Array|null} [signature] CMsgSteamDatagramSignedRelayAuthTicket signature
         */
    
        /**
         * Constructs a new CMsgSteamDatagramSignedRelayAuthTicket.
         * @exports CMsgSteamDatagramSignedRelayAuthTicket
         * @classdesc Represents a CMsgSteamDatagramSignedRelayAuthTicket.
         * @implements ICMsgSteamDatagramSignedRelayAuthTicket
         * @constructor
         * @param {ICMsgSteamDatagramSignedRelayAuthTicket=} [properties] Properties to set
         */
        function CMsgSteamDatagramSignedRelayAuthTicket(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CMsgSteamDatagramSignedRelayAuthTicket reserved_do_not_use.
         * @member {number|Long} reserved_do_not_use
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramSignedRelayAuthTicket.prototype.reserved_do_not_use = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramSignedRelayAuthTicket key_id.
         * @member {number|Long} key_id
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramSignedRelayAuthTicket.prototype.key_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramSignedRelayAuthTicket ticket.
         * @member {Uint8Array} ticket
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramSignedRelayAuthTicket.prototype.ticket = $util.newBuffer([]);
    
        /**
         * CMsgSteamDatagramSignedRelayAuthTicket signature.
         * @member {Uint8Array} signature
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @instance
         */
        CMsgSteamDatagramSignedRelayAuthTicket.prototype.signature = $util.newBuffer([]);
    
        /**
         * Creates a new CMsgSteamDatagramSignedRelayAuthTicket instance using the specified properties.
         * @function create
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramSignedRelayAuthTicket=} [properties] Properties to set
         * @returns {CMsgSteamDatagramSignedRelayAuthTicket} CMsgSteamDatagramSignedRelayAuthTicket instance
         */
        CMsgSteamDatagramSignedRelayAuthTicket.create = function create(properties) {
            return new CMsgSteamDatagramSignedRelayAuthTicket(properties);
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramSignedRelayAuthTicket message. Does not implicitly {@link CMsgSteamDatagramSignedRelayAuthTicket.verify|verify} messages.
         * @function encode
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramSignedRelayAuthTicket} message CMsgSteamDatagramSignedRelayAuthTicket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramSignedRelayAuthTicket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reserved_do_not_use != null && message.hasOwnProperty("reserved_do_not_use"))
                writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.reserved_do_not_use);
            if (message.key_id != null && message.hasOwnProperty("key_id"))
                writer.uint32(/* id 2, wireType 1 =*/17).fixed64(message.key_id);
            if (message.ticket != null && message.hasOwnProperty("ticket"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.ticket);
            if (message.signature != null && message.hasOwnProperty("signature"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.signature);
            return writer;
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramSignedRelayAuthTicket message, length delimited. Does not implicitly {@link CMsgSteamDatagramSignedRelayAuthTicket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {ICMsgSteamDatagramSignedRelayAuthTicket} message CMsgSteamDatagramSignedRelayAuthTicket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramSignedRelayAuthTicket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CMsgSteamDatagramSignedRelayAuthTicket message from the specified reader or buffer.
         * @function decode
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CMsgSteamDatagramSignedRelayAuthTicket} CMsgSteamDatagramSignedRelayAuthTicket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramSignedRelayAuthTicket.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CMsgSteamDatagramSignedRelayAuthTicket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reserved_do_not_use = reader.fixed64();
                    break;
                case 2:
                    message.key_id = reader.fixed64();
                    break;
                case 3:
                    message.ticket = reader.bytes();
                    break;
                case 4:
                    message.signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CMsgSteamDatagramSignedRelayAuthTicket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CMsgSteamDatagramSignedRelayAuthTicket} CMsgSteamDatagramSignedRelayAuthTicket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramSignedRelayAuthTicket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CMsgSteamDatagramSignedRelayAuthTicket message.
         * @function verify
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CMsgSteamDatagramSignedRelayAuthTicket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reserved_do_not_use != null && message.hasOwnProperty("reserved_do_not_use"))
                if (!$util.isInteger(message.reserved_do_not_use) && !(message.reserved_do_not_use && $util.isInteger(message.reserved_do_not_use.low) && $util.isInteger(message.reserved_do_not_use.high)))
                    return "reserved_do_not_use: integer|Long expected";
            if (message.key_id != null && message.hasOwnProperty("key_id"))
                if (!$util.isInteger(message.key_id) && !(message.key_id && $util.isInteger(message.key_id.low) && $util.isInteger(message.key_id.high)))
                    return "key_id: integer|Long expected";
            if (message.ticket != null && message.hasOwnProperty("ticket"))
                if (!(message.ticket && typeof message.ticket.length === "number" || $util.isString(message.ticket)))
                    return "ticket: buffer expected";
            if (message.signature != null && message.hasOwnProperty("signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            return null;
        };
    
        /**
         * Creates a CMsgSteamDatagramSignedRelayAuthTicket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CMsgSteamDatagramSignedRelayAuthTicket} CMsgSteamDatagramSignedRelayAuthTicket
         */
        CMsgSteamDatagramSignedRelayAuthTicket.fromObject = function fromObject(object) {
            if (object instanceof $root.CMsgSteamDatagramSignedRelayAuthTicket)
                return object;
            var message = new $root.CMsgSteamDatagramSignedRelayAuthTicket();
            if (object.reserved_do_not_use != null)
                if ($util.Long)
                    (message.reserved_do_not_use = $util.Long.fromValue(object.reserved_do_not_use)).unsigned = false;
                else if (typeof object.reserved_do_not_use === "string")
                    message.reserved_do_not_use = parseInt(object.reserved_do_not_use, 10);
                else if (typeof object.reserved_do_not_use === "number")
                    message.reserved_do_not_use = object.reserved_do_not_use;
                else if (typeof object.reserved_do_not_use === "object")
                    message.reserved_do_not_use = new $util.LongBits(object.reserved_do_not_use.low >>> 0, object.reserved_do_not_use.high >>> 0).toNumber();
            if (object.key_id != null)
                if ($util.Long)
                    (message.key_id = $util.Long.fromValue(object.key_id)).unsigned = false;
                else if (typeof object.key_id === "string")
                    message.key_id = parseInt(object.key_id, 10);
                else if (typeof object.key_id === "number")
                    message.key_id = object.key_id;
                else if (typeof object.key_id === "object")
                    message.key_id = new $util.LongBits(object.key_id.low >>> 0, object.key_id.high >>> 0).toNumber();
            if (object.ticket != null)
                if (typeof object.ticket === "string")
                    $util.base64.decode(object.ticket, message.ticket = $util.newBuffer($util.base64.length(object.ticket)), 0);
                else if (object.ticket.length)
                    message.ticket = object.ticket;
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length)
                    message.signature = object.signature;
            return message;
        };
    
        /**
         * Creates a plain object from a CMsgSteamDatagramSignedRelayAuthTicket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @static
         * @param {CMsgSteamDatagramSignedRelayAuthTicket} message CMsgSteamDatagramSignedRelayAuthTicket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CMsgSteamDatagramSignedRelayAuthTicket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.reserved_do_not_use = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reserved_do_not_use = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.key_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.key_id = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.ticket = "";
                else {
                    object.ticket = [];
                    if (options.bytes !== Array)
                        object.ticket = $util.newBuffer(object.ticket);
                }
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
            }
            if (message.reserved_do_not_use != null && message.hasOwnProperty("reserved_do_not_use"))
                if (typeof message.reserved_do_not_use === "number")
                    object.reserved_do_not_use = options.longs === String ? String(message.reserved_do_not_use) : message.reserved_do_not_use;
                else
                    object.reserved_do_not_use = options.longs === String ? $util.Long.prototype.toString.call(message.reserved_do_not_use) : options.longs === Number ? new $util.LongBits(message.reserved_do_not_use.low >>> 0, message.reserved_do_not_use.high >>> 0).toNumber() : message.reserved_do_not_use;
            if (message.key_id != null && message.hasOwnProperty("key_id"))
                if (typeof message.key_id === "number")
                    object.key_id = options.longs === String ? String(message.key_id) : message.key_id;
                else
                    object.key_id = options.longs === String ? $util.Long.prototype.toString.call(message.key_id) : options.longs === Number ? new $util.LongBits(message.key_id.low >>> 0, message.key_id.high >>> 0).toNumber() : message.key_id;
            if (message.ticket != null && message.hasOwnProperty("ticket"))
                object.ticket = options.bytes === String ? $util.base64.encode(message.ticket, 0, message.ticket.length) : options.bytes === Array ? Array.prototype.slice.call(message.ticket) : message.ticket;
            if (message.signature != null && message.hasOwnProperty("signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            return object;
        };
    
        /**
         * Converts this CMsgSteamDatagramSignedRelayAuthTicket to JSON.
         * @function toJSON
         * @memberof CMsgSteamDatagramSignedRelayAuthTicket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CMsgSteamDatagramSignedRelayAuthTicket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CMsgSteamDatagramSignedRelayAuthTicket;
    })();
    
    $root.CMsgSteamDatagramCertificate = (function() {
    
        /**
         * Properties of a CMsgSteamDatagramCertificate.
         * @exports ICMsgSteamDatagramCertificate
         * @interface ICMsgSteamDatagramCertificate
         * @property {CMsgSteamDatagramCertificate.EKeyType|null} [key_type] CMsgSteamDatagramCertificate key_type
         * @property {Uint8Array|null} [key_data] CMsgSteamDatagramCertificate key_data
         * @property {number|Long|null} [steam_id] CMsgSteamDatagramCertificate steam_id
         * @property {Array.<number>|null} [gameserver_datacenter_ids] CMsgSteamDatagramCertificate gameserver_datacenter_ids
         * @property {number|null} [time_created] CMsgSteamDatagramCertificate time_created
         * @property {number|null} [time_expiry] CMsgSteamDatagramCertificate time_expiry
         * @property {number|null} [app_id] CMsgSteamDatagramCertificate app_id
         */
    
        /**
         * Constructs a new CMsgSteamDatagramCertificate.
         * @exports CMsgSteamDatagramCertificate
         * @classdesc Represents a CMsgSteamDatagramCertificate.
         * @implements ICMsgSteamDatagramCertificate
         * @constructor
         * @param {ICMsgSteamDatagramCertificate=} [properties] Properties to set
         */
        function CMsgSteamDatagramCertificate(properties) {
            this.gameserver_datacenter_ids = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CMsgSteamDatagramCertificate key_type.
         * @member {CMsgSteamDatagramCertificate.EKeyType} key_type
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.key_type = 0;
    
        /**
         * CMsgSteamDatagramCertificate key_data.
         * @member {Uint8Array} key_data
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.key_data = $util.newBuffer([]);
    
        /**
         * CMsgSteamDatagramCertificate steam_id.
         * @member {number|Long} steam_id
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.steam_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramCertificate gameserver_datacenter_ids.
         * @member {Array.<number>} gameserver_datacenter_ids
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.gameserver_datacenter_ids = $util.emptyArray;
    
        /**
         * CMsgSteamDatagramCertificate time_created.
         * @member {number} time_created
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.time_created = 0;
    
        /**
         * CMsgSteamDatagramCertificate time_expiry.
         * @member {number} time_expiry
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.time_expiry = 0;
    
        /**
         * CMsgSteamDatagramCertificate app_id.
         * @member {number} app_id
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         */
        CMsgSteamDatagramCertificate.prototype.app_id = 0;
    
        /**
         * Creates a new CMsgSteamDatagramCertificate instance using the specified properties.
         * @function create
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {ICMsgSteamDatagramCertificate=} [properties] Properties to set
         * @returns {CMsgSteamDatagramCertificate} CMsgSteamDatagramCertificate instance
         */
        CMsgSteamDatagramCertificate.create = function create(properties) {
            return new CMsgSteamDatagramCertificate(properties);
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramCertificate message. Does not implicitly {@link CMsgSteamDatagramCertificate.verify|verify} messages.
         * @function encode
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {ICMsgSteamDatagramCertificate} message CMsgSteamDatagramCertificate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramCertificate.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key_type != null && message.hasOwnProperty("key_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.key_type);
            if (message.key_data != null && message.hasOwnProperty("key_data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.key_data);
            if (message.steam_id != null && message.hasOwnProperty("steam_id"))
                writer.uint32(/* id 4, wireType 1 =*/33).fixed64(message.steam_id);
            if (message.gameserver_datacenter_ids != null && message.gameserver_datacenter_ids.length)
                for (var i = 0; i < message.gameserver_datacenter_ids.length; ++i)
                    writer.uint32(/* id 5, wireType 5 =*/45).fixed32(message.gameserver_datacenter_ids[i]);
            if (message.time_created != null && message.hasOwnProperty("time_created"))
                writer.uint32(/* id 8, wireType 5 =*/69).fixed32(message.time_created);
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                writer.uint32(/* id 9, wireType 5 =*/77).fixed32(message.time_expiry);
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.app_id);
            return writer;
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramCertificate message, length delimited. Does not implicitly {@link CMsgSteamDatagramCertificate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {ICMsgSteamDatagramCertificate} message CMsgSteamDatagramCertificate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramCertificate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CMsgSteamDatagramCertificate message from the specified reader or buffer.
         * @function decode
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CMsgSteamDatagramCertificate} CMsgSteamDatagramCertificate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramCertificate.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CMsgSteamDatagramCertificate();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key_type = reader.int32();
                    break;
                case 2:
                    message.key_data = reader.bytes();
                    break;
                case 4:
                    message.steam_id = reader.fixed64();
                    break;
                case 5:
                    if (!(message.gameserver_datacenter_ids && message.gameserver_datacenter_ids.length))
                        message.gameserver_datacenter_ids = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.gameserver_datacenter_ids.push(reader.fixed32());
                    } else
                        message.gameserver_datacenter_ids.push(reader.fixed32());
                    break;
                case 8:
                    message.time_created = reader.fixed32();
                    break;
                case 9:
                    message.time_expiry = reader.fixed32();
                    break;
                case 10:
                    message.app_id = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CMsgSteamDatagramCertificate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CMsgSteamDatagramCertificate} CMsgSteamDatagramCertificate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramCertificate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CMsgSteamDatagramCertificate message.
         * @function verify
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CMsgSteamDatagramCertificate.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key_type != null && message.hasOwnProperty("key_type"))
                switch (message.key_type) {
                default:
                    return "key_type: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.key_data != null && message.hasOwnProperty("key_data"))
                if (!(message.key_data && typeof message.key_data.length === "number" || $util.isString(message.key_data)))
                    return "key_data: buffer expected";
            if (message.steam_id != null && message.hasOwnProperty("steam_id"))
                if (!$util.isInteger(message.steam_id) && !(message.steam_id && $util.isInteger(message.steam_id.low) && $util.isInteger(message.steam_id.high)))
                    return "steam_id: integer|Long expected";
            if (message.gameserver_datacenter_ids != null && message.hasOwnProperty("gameserver_datacenter_ids")) {
                if (!Array.isArray(message.gameserver_datacenter_ids))
                    return "gameserver_datacenter_ids: array expected";
                for (var i = 0; i < message.gameserver_datacenter_ids.length; ++i)
                    if (!$util.isInteger(message.gameserver_datacenter_ids[i]))
                        return "gameserver_datacenter_ids: integer[] expected";
            }
            if (message.time_created != null && message.hasOwnProperty("time_created"))
                if (!$util.isInteger(message.time_created))
                    return "time_created: integer expected";
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                if (!$util.isInteger(message.time_expiry))
                    return "time_expiry: integer expected";
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                if (!$util.isInteger(message.app_id))
                    return "app_id: integer expected";
            return null;
        };
    
        /**
         * Creates a CMsgSteamDatagramCertificate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CMsgSteamDatagramCertificate} CMsgSteamDatagramCertificate
         */
        CMsgSteamDatagramCertificate.fromObject = function fromObject(object) {
            if (object instanceof $root.CMsgSteamDatagramCertificate)
                return object;
            var message = new $root.CMsgSteamDatagramCertificate();
            switch (object.key_type) {
            case "INVALID":
            case 0:
                message.key_type = 0;
                break;
            case "ED25519":
            case 1:
                message.key_type = 1;
                break;
            }
            if (object.key_data != null)
                if (typeof object.key_data === "string")
                    $util.base64.decode(object.key_data, message.key_data = $util.newBuffer($util.base64.length(object.key_data)), 0);
                else if (object.key_data.length)
                    message.key_data = object.key_data;
            if (object.steam_id != null)
                if ($util.Long)
                    (message.steam_id = $util.Long.fromValue(object.steam_id)).unsigned = false;
                else if (typeof object.steam_id === "string")
                    message.steam_id = parseInt(object.steam_id, 10);
                else if (typeof object.steam_id === "number")
                    message.steam_id = object.steam_id;
                else if (typeof object.steam_id === "object")
                    message.steam_id = new $util.LongBits(object.steam_id.low >>> 0, object.steam_id.high >>> 0).toNumber();
            if (object.gameserver_datacenter_ids) {
                if (!Array.isArray(object.gameserver_datacenter_ids))
                    throw TypeError(".CMsgSteamDatagramCertificate.gameserver_datacenter_ids: array expected");
                message.gameserver_datacenter_ids = [];
                for (var i = 0; i < object.gameserver_datacenter_ids.length; ++i)
                    message.gameserver_datacenter_ids[i] = object.gameserver_datacenter_ids[i] >>> 0;
            }
            if (object.time_created != null)
                message.time_created = object.time_created >>> 0;
            if (object.time_expiry != null)
                message.time_expiry = object.time_expiry >>> 0;
            if (object.app_id != null)
                message.app_id = object.app_id >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a CMsgSteamDatagramCertificate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CMsgSteamDatagramCertificate
         * @static
         * @param {CMsgSteamDatagramCertificate} message CMsgSteamDatagramCertificate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CMsgSteamDatagramCertificate.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.gameserver_datacenter_ids = [];
            if (options.defaults) {
                object.key_type = options.enums === String ? "INVALID" : 0;
                if (options.bytes === String)
                    object.key_data = "";
                else {
                    object.key_data = [];
                    if (options.bytes !== Array)
                        object.key_data = $util.newBuffer(object.key_data);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.steam_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steam_id = options.longs === String ? "0" : 0;
                object.time_created = 0;
                object.time_expiry = 0;
                object.app_id = 0;
            }
            if (message.key_type != null && message.hasOwnProperty("key_type"))
                object.key_type = options.enums === String ? $root.CMsgSteamDatagramCertificate.EKeyType[message.key_type] : message.key_type;
            if (message.key_data != null && message.hasOwnProperty("key_data"))
                object.key_data = options.bytes === String ? $util.base64.encode(message.key_data, 0, message.key_data.length) : options.bytes === Array ? Array.prototype.slice.call(message.key_data) : message.key_data;
            if (message.steam_id != null && message.hasOwnProperty("steam_id"))
                if (typeof message.steam_id === "number")
                    object.steam_id = options.longs === String ? String(message.steam_id) : message.steam_id;
                else
                    object.steam_id = options.longs === String ? $util.Long.prototype.toString.call(message.steam_id) : options.longs === Number ? new $util.LongBits(message.steam_id.low >>> 0, message.steam_id.high >>> 0).toNumber() : message.steam_id;
            if (message.gameserver_datacenter_ids && message.gameserver_datacenter_ids.length) {
                object.gameserver_datacenter_ids = [];
                for (var j = 0; j < message.gameserver_datacenter_ids.length; ++j)
                    object.gameserver_datacenter_ids[j] = message.gameserver_datacenter_ids[j];
            }
            if (message.time_created != null && message.hasOwnProperty("time_created"))
                object.time_created = message.time_created;
            if (message.time_expiry != null && message.hasOwnProperty("time_expiry"))
                object.time_expiry = message.time_expiry;
            if (message.app_id != null && message.hasOwnProperty("app_id"))
                object.app_id = message.app_id;
            return object;
        };
    
        /**
         * Converts this CMsgSteamDatagramCertificate to JSON.
         * @function toJSON
         * @memberof CMsgSteamDatagramCertificate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CMsgSteamDatagramCertificate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        /**
         * EKeyType enum.
         * @name CMsgSteamDatagramCertificate.EKeyType
         * @enum {string}
         * @property {number} INVALID=0 INVALID value
         * @property {number} ED25519=1 ED25519 value
         */
        CMsgSteamDatagramCertificate.EKeyType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "INVALID"] = 0;
            values[valuesById[1] = "ED25519"] = 1;
            return values;
        })();
    
        return CMsgSteamDatagramCertificate;
    })();
    
    $root.CMsgSteamDatagramCertificateSigned = (function() {
    
        /**
         * Properties of a CMsgSteamDatagramCertificateSigned.
         * @exports ICMsgSteamDatagramCertificateSigned
         * @interface ICMsgSteamDatagramCertificateSigned
         * @property {Uint8Array|null} [cert] CMsgSteamDatagramCertificateSigned cert
         * @property {number|Long|null} [ca_key_id] CMsgSteamDatagramCertificateSigned ca_key_id
         * @property {Uint8Array|null} [ca_signature] CMsgSteamDatagramCertificateSigned ca_signature
         */
    
        /**
         * Constructs a new CMsgSteamDatagramCertificateSigned.
         * @exports CMsgSteamDatagramCertificateSigned
         * @classdesc Represents a CMsgSteamDatagramCertificateSigned.
         * @implements ICMsgSteamDatagramCertificateSigned
         * @constructor
         * @param {ICMsgSteamDatagramCertificateSigned=} [properties] Properties to set
         */
        function CMsgSteamDatagramCertificateSigned(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CMsgSteamDatagramCertificateSigned cert.
         * @member {Uint8Array} cert
         * @memberof CMsgSteamDatagramCertificateSigned
         * @instance
         */
        CMsgSteamDatagramCertificateSigned.prototype.cert = $util.newBuffer([]);
    
        /**
         * CMsgSteamDatagramCertificateSigned ca_key_id.
         * @member {number|Long} ca_key_id
         * @memberof CMsgSteamDatagramCertificateSigned
         * @instance
         */
        CMsgSteamDatagramCertificateSigned.prototype.ca_key_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
        /**
         * CMsgSteamDatagramCertificateSigned ca_signature.
         * @member {Uint8Array} ca_signature
         * @memberof CMsgSteamDatagramCertificateSigned
         * @instance
         */
        CMsgSteamDatagramCertificateSigned.prototype.ca_signature = $util.newBuffer([]);
    
        /**
         * Creates a new CMsgSteamDatagramCertificateSigned instance using the specified properties.
         * @function create
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {ICMsgSteamDatagramCertificateSigned=} [properties] Properties to set
         * @returns {CMsgSteamDatagramCertificateSigned} CMsgSteamDatagramCertificateSigned instance
         */
        CMsgSteamDatagramCertificateSigned.create = function create(properties) {
            return new CMsgSteamDatagramCertificateSigned(properties);
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramCertificateSigned message. Does not implicitly {@link CMsgSteamDatagramCertificateSigned.verify|verify} messages.
         * @function encode
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {ICMsgSteamDatagramCertificateSigned} message CMsgSteamDatagramCertificateSigned message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramCertificateSigned.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cert != null && message.hasOwnProperty("cert"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.cert);
            if (message.ca_key_id != null && message.hasOwnProperty("ca_key_id"))
                writer.uint32(/* id 5, wireType 1 =*/41).fixed64(message.ca_key_id);
            if (message.ca_signature != null && message.hasOwnProperty("ca_signature"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.ca_signature);
            return writer;
        };
    
        /**
         * Encodes the specified CMsgSteamDatagramCertificateSigned message, length delimited. Does not implicitly {@link CMsgSteamDatagramCertificateSigned.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {ICMsgSteamDatagramCertificateSigned} message CMsgSteamDatagramCertificateSigned message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CMsgSteamDatagramCertificateSigned.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CMsgSteamDatagramCertificateSigned message from the specified reader or buffer.
         * @function decode
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CMsgSteamDatagramCertificateSigned} CMsgSteamDatagramCertificateSigned
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramCertificateSigned.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CMsgSteamDatagramCertificateSigned();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 4:
                    message.cert = reader.bytes();
                    break;
                case 5:
                    message.ca_key_id = reader.fixed64();
                    break;
                case 6:
                    message.ca_signature = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CMsgSteamDatagramCertificateSigned message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CMsgSteamDatagramCertificateSigned} CMsgSteamDatagramCertificateSigned
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CMsgSteamDatagramCertificateSigned.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CMsgSteamDatagramCertificateSigned message.
         * @function verify
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CMsgSteamDatagramCertificateSigned.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cert != null && message.hasOwnProperty("cert"))
                if (!(message.cert && typeof message.cert.length === "number" || $util.isString(message.cert)))
                    return "cert: buffer expected";
            if (message.ca_key_id != null && message.hasOwnProperty("ca_key_id"))
                if (!$util.isInteger(message.ca_key_id) && !(message.ca_key_id && $util.isInteger(message.ca_key_id.low) && $util.isInteger(message.ca_key_id.high)))
                    return "ca_key_id: integer|Long expected";
            if (message.ca_signature != null && message.hasOwnProperty("ca_signature"))
                if (!(message.ca_signature && typeof message.ca_signature.length === "number" || $util.isString(message.ca_signature)))
                    return "ca_signature: buffer expected";
            return null;
        };
    
        /**
         * Creates a CMsgSteamDatagramCertificateSigned message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CMsgSteamDatagramCertificateSigned} CMsgSteamDatagramCertificateSigned
         */
        CMsgSteamDatagramCertificateSigned.fromObject = function fromObject(object) {
            if (object instanceof $root.CMsgSteamDatagramCertificateSigned)
                return object;
            var message = new $root.CMsgSteamDatagramCertificateSigned();
            if (object.cert != null)
                if (typeof object.cert === "string")
                    $util.base64.decode(object.cert, message.cert = $util.newBuffer($util.base64.length(object.cert)), 0);
                else if (object.cert.length)
                    message.cert = object.cert;
            if (object.ca_key_id != null)
                if ($util.Long)
                    (message.ca_key_id = $util.Long.fromValue(object.ca_key_id)).unsigned = false;
                else if (typeof object.ca_key_id === "string")
                    message.ca_key_id = parseInt(object.ca_key_id, 10);
                else if (typeof object.ca_key_id === "number")
                    message.ca_key_id = object.ca_key_id;
                else if (typeof object.ca_key_id === "object")
                    message.ca_key_id = new $util.LongBits(object.ca_key_id.low >>> 0, object.ca_key_id.high >>> 0).toNumber();
            if (object.ca_signature != null)
                if (typeof object.ca_signature === "string")
                    $util.base64.decode(object.ca_signature, message.ca_signature = $util.newBuffer($util.base64.length(object.ca_signature)), 0);
                else if (object.ca_signature.length)
                    message.ca_signature = object.ca_signature;
            return message;
        };
    
        /**
         * Creates a plain object from a CMsgSteamDatagramCertificateSigned message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CMsgSteamDatagramCertificateSigned
         * @static
         * @param {CMsgSteamDatagramCertificateSigned} message CMsgSteamDatagramCertificateSigned
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CMsgSteamDatagramCertificateSigned.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.cert = "";
                else {
                    object.cert = [];
                    if (options.bytes !== Array)
                        object.cert = $util.newBuffer(object.cert);
                }
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ca_key_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ca_key_id = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.ca_signature = "";
                else {
                    object.ca_signature = [];
                    if (options.bytes !== Array)
                        object.ca_signature = $util.newBuffer(object.ca_signature);
                }
            }
            if (message.cert != null && message.hasOwnProperty("cert"))
                object.cert = options.bytes === String ? $util.base64.encode(message.cert, 0, message.cert.length) : options.bytes === Array ? Array.prototype.slice.call(message.cert) : message.cert;
            if (message.ca_key_id != null && message.hasOwnProperty("ca_key_id"))
                if (typeof message.ca_key_id === "number")
                    object.ca_key_id = options.longs === String ? String(message.ca_key_id) : message.ca_key_id;
                else
                    object.ca_key_id = options.longs === String ? $util.Long.prototype.toString.call(message.ca_key_id) : options.longs === Number ? new $util.LongBits(message.ca_key_id.low >>> 0, message.ca_key_id.high >>> 0).toNumber() : message.ca_key_id;
            if (message.ca_signature != null && message.hasOwnProperty("ca_signature"))
                object.ca_signature = options.bytes === String ? $util.base64.encode(message.ca_signature, 0, message.ca_signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.ca_signature) : message.ca_signature;
            return object;
        };
    
        /**
         * Converts this CMsgSteamDatagramCertificateSigned to JSON.
         * @function toJSON
         * @memberof CMsgSteamDatagramCertificateSigned
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CMsgSteamDatagramCertificateSigned.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CMsgSteamDatagramCertificateSigned;
    })();

    return $root;
});
