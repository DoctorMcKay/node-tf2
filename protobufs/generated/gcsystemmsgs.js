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
    
    /**
     * EGCSystemMsg enum.
     * @exports EGCSystemMsg
     * @enum {string}
     * @property {number} k_EGCMsgInvalid=0 k_EGCMsgInvalid value
     * @property {number} k_EGCMsgMulti=1 k_EGCMsgMulti value
     * @property {number} k_EGCMsgGenericReply=10 k_EGCMsgGenericReply value
     * @property {number} k_EGCMsgSystemBase=50 k_EGCMsgSystemBase value
     * @property {number} k_EGCMsgAchievementAwarded=51 k_EGCMsgAchievementAwarded value
     * @property {number} k_EGCMsgConCommand=52 k_EGCMsgConCommand value
     * @property {number} k_EGCMsgStartPlaying=53 k_EGCMsgStartPlaying value
     * @property {number} k_EGCMsgStopPlaying=54 k_EGCMsgStopPlaying value
     * @property {number} k_EGCMsgStartGameserver=55 k_EGCMsgStartGameserver value
     * @property {number} k_EGCMsgStopGameserver=56 k_EGCMsgStopGameserver value
     * @property {number} k_EGCMsgWGRequest=57 k_EGCMsgWGRequest value
     * @property {number} k_EGCMsgWGResponse=58 k_EGCMsgWGResponse value
     * @property {number} k_EGCMsgGetUserGameStatsSchema=59 k_EGCMsgGetUserGameStatsSchema value
     * @property {number} k_EGCMsgGetUserGameStatsSchemaResponse=60 k_EGCMsgGetUserGameStatsSchemaResponse value
     * @property {number} k_EGCMsgGetUserStatsDEPRECATED=61 k_EGCMsgGetUserStatsDEPRECATED value
     * @property {number} k_EGCMsgGetUserStatsResponse=62 k_EGCMsgGetUserStatsResponse value
     * @property {number} k_EGCMsgAppInfoUpdated=63 k_EGCMsgAppInfoUpdated value
     * @property {number} k_EGCMsgValidateSession=64 k_EGCMsgValidateSession value
     * @property {number} k_EGCMsgValidateSessionResponse=65 k_EGCMsgValidateSessionResponse value
     * @property {number} k_EGCMsgLookupAccountFromInput=66 k_EGCMsgLookupAccountFromInput value
     * @property {number} k_EGCMsgSendHTTPRequest=67 k_EGCMsgSendHTTPRequest value
     * @property {number} k_EGCMsgSendHTTPRequestResponse=68 k_EGCMsgSendHTTPRequestResponse value
     * @property {number} k_EGCMsgPreTestSetup=69 k_EGCMsgPreTestSetup value
     * @property {number} k_EGCMsgRecordSupportAction=70 k_EGCMsgRecordSupportAction value
     * @property {number} k_EGCMsgGetAccountDetails_DEPRECATED=71 k_EGCMsgGetAccountDetails_DEPRECATED value
     * @property {number} k_EGCMsgReceiveInterAppMessage=73 k_EGCMsgReceiveInterAppMessage value
     * @property {number} k_EGCMsgFindAccounts=74 k_EGCMsgFindAccounts value
     * @property {number} k_EGCMsgPostAlert=75 k_EGCMsgPostAlert value
     * @property {number} k_EGCMsgGetLicenses=76 k_EGCMsgGetLicenses value
     * @property {number} k_EGCMsgGetUserStats=77 k_EGCMsgGetUserStats value
     * @property {number} k_EGCMsgGetCommands=78 k_EGCMsgGetCommands value
     * @property {number} k_EGCMsgGetCommandsResponse=79 k_EGCMsgGetCommandsResponse value
     * @property {number} k_EGCMsgAddFreeLicense=80 k_EGCMsgAddFreeLicense value
     * @property {number} k_EGCMsgAddFreeLicenseResponse=81 k_EGCMsgAddFreeLicenseResponse value
     * @property {number} k_EGCMsgGetIPLocation=82 k_EGCMsgGetIPLocation value
     * @property {number} k_EGCMsgGetIPLocationResponse=83 k_EGCMsgGetIPLocationResponse value
     * @property {number} k_EGCMsgSystemStatsSchema=84 k_EGCMsgSystemStatsSchema value
     * @property {number} k_EGCMsgGetSystemStats=85 k_EGCMsgGetSystemStats value
     * @property {number} k_EGCMsgGetSystemStatsResponse=86 k_EGCMsgGetSystemStatsResponse value
     * @property {number} k_EGCMsgSendEmail=87 k_EGCMsgSendEmail value
     * @property {number} k_EGCMsgSendEmailResponse=88 k_EGCMsgSendEmailResponse value
     * @property {number} k_EGCMsgGetEmailTemplate=89 k_EGCMsgGetEmailTemplate value
     * @property {number} k_EGCMsgGetEmailTemplateResponse=90 k_EGCMsgGetEmailTemplateResponse value
     * @property {number} k_EGCMsgGrantGuestPass=91 k_EGCMsgGrantGuestPass value
     * @property {number} k_EGCMsgGrantGuestPassResponse=92 k_EGCMsgGrantGuestPassResponse value
     * @property {number} k_EGCMsgGetAccountDetails=93 k_EGCMsgGetAccountDetails value
     * @property {number} k_EGCMsgGetAccountDetailsResponse=94 k_EGCMsgGetAccountDetailsResponse value
     * @property {number} k_EGCMsgGetPersonaNames=95 k_EGCMsgGetPersonaNames value
     * @property {number} k_EGCMsgGetPersonaNamesResponse=96 k_EGCMsgGetPersonaNamesResponse value
     * @property {number} k_EGCMsgMultiplexMsg=97 k_EGCMsgMultiplexMsg value
     * @property {number} k_EGCMsgWebAPIRegisterInterfaces=101 k_EGCMsgWebAPIRegisterInterfaces value
     * @property {number} k_EGCMsgWebAPIJobRequest=102 k_EGCMsgWebAPIJobRequest value
     * @property {number} k_EGCMsgWebAPIJobRequestHttpResponse=104 k_EGCMsgWebAPIJobRequestHttpResponse value
     * @property {number} k_EGCMsgWebAPIJobRequestForwardResponse=105 k_EGCMsgWebAPIJobRequestForwardResponse value
     * @property {number} k_EGCMsgMemCachedGet=200 k_EGCMsgMemCachedGet value
     * @property {number} k_EGCMsgMemCachedGetResponse=201 k_EGCMsgMemCachedGetResponse value
     * @property {number} k_EGCMsgMemCachedSet=202 k_EGCMsgMemCachedSet value
     * @property {number} k_EGCMsgMemCachedDelete=203 k_EGCMsgMemCachedDelete value
     * @property {number} k_EGCMsgMemCachedStats=204 k_EGCMsgMemCachedStats value
     * @property {number} k_EGCMsgMemCachedStatsResponse=205 k_EGCMsgMemCachedStatsResponse value
     * @property {number} k_EGCMsgSQLStats=210 k_EGCMsgSQLStats value
     * @property {number} k_EGCMsgSQLStatsResponse=211 k_EGCMsgSQLStatsResponse value
     * @property {number} k_EGCMsgMasterSetDirectory=220 k_EGCMsgMasterSetDirectory value
     * @property {number} k_EGCMsgMasterSetDirectoryResponse=221 k_EGCMsgMasterSetDirectoryResponse value
     * @property {number} k_EGCMsgMasterSetWebAPIRouting=222 k_EGCMsgMasterSetWebAPIRouting value
     * @property {number} k_EGCMsgMasterSetWebAPIRoutingResponse=223 k_EGCMsgMasterSetWebAPIRoutingResponse value
     * @property {number} k_EGCMsgMasterSetClientMsgRouting=224 k_EGCMsgMasterSetClientMsgRouting value
     * @property {number} k_EGCMsgMasterSetClientMsgRoutingResponse=225 k_EGCMsgMasterSetClientMsgRoutingResponse value
     * @property {number} k_EGCMsgSetOptions=226 k_EGCMsgSetOptions value
     * @property {number} k_EGCMsgSetOptionsResponse=227 k_EGCMsgSetOptionsResponse value
     * @property {number} k_EGCMsgSystemBase2=500 k_EGCMsgSystemBase2 value
     * @property {number} k_EGCMsgGetPurchaseTrustStatus=501 k_EGCMsgGetPurchaseTrustStatus value
     * @property {number} k_EGCMsgGetPurchaseTrustStatusResponse=502 k_EGCMsgGetPurchaseTrustStatusResponse value
     * @property {number} k_EGCMsgUpdateSession=503 k_EGCMsgUpdateSession value
     * @property {number} k_EGCMsgGCAccountVacStatusChange=504 k_EGCMsgGCAccountVacStatusChange value
     * @property {number} k_EGCMsgCheckFriendship=505 k_EGCMsgCheckFriendship value
     * @property {number} k_EGCMsgCheckFriendshipResponse=506 k_EGCMsgCheckFriendshipResponse value
     * @property {number} k_EGCMsgGetPartnerAccountLink=507 k_EGCMsgGetPartnerAccountLink value
     * @property {number} k_EGCMsgGetPartnerAccountLinkResponse=508 k_EGCMsgGetPartnerAccountLinkResponse value
     * @property {number} k_EGCMsgVSReportedSuspiciousActivity=509 k_EGCMsgVSReportedSuspiciousActivity value
     * @property {number} k_EGCMsgAccountTradeBanStatusChange=510 k_EGCMsgAccountTradeBanStatusChange value
     * @property {number} k_EGCMsgAccountLockStatusChange=511 k_EGCMsgAccountLockStatusChange value
     * @property {number} k_EGCMsgDPPartnerMicroTxns=512 k_EGCMsgDPPartnerMicroTxns value
     * @property {number} k_EGCMsgDPPartnerMicroTxnsResponse=513 k_EGCMsgDPPartnerMicroTxnsResponse value
     * @property {number} k_EGCMsgGetIPASN=514 k_EGCMsgGetIPASN value
     * @property {number} k_EGCMsgGetIPASNResponse=515 k_EGCMsgGetIPASNResponse value
     * @property {number} k_EGCMsgGetAppFriendsList=516 k_EGCMsgGetAppFriendsList value
     * @property {number} k_EGCMsgGetAppFriendsListResponse=517 k_EGCMsgGetAppFriendsListResponse value
     * @property {number} k_EGCMsgVacVerificationChange=518 k_EGCMsgVacVerificationChange value
     * @property {number} k_EGCMsgAccountPhoneNumberChange=519 k_EGCMsgAccountPhoneNumberChange value
     * @property {number} k_EGCMsgAccountTwoFactorChange=520 k_EGCMsgAccountTwoFactorChange value
     * @property {number} k_EGCMsgCheckClanMembership=521 k_EGCMsgCheckClanMembership value
     * @property {number} k_EGCMsgCheckClanMembershipResponse=522 k_EGCMsgCheckClanMembershipResponse value
     * @property {number} k_EGCMsgInviteUserToLobby=523 k_EGCMsgInviteUserToLobby value
     * @property {number} k_EGCMsgGetGamePersonalDataCategoriesRequest=524 k_EGCMsgGetGamePersonalDataCategoriesRequest value
     * @property {number} k_EGCMsgGetGamePersonalDataCategoriesResponse=525 k_EGCMsgGetGamePersonalDataCategoriesResponse value
     * @property {number} k_EGCMsgGetGamePersonalDataEntriesRequest=526 k_EGCMsgGetGamePersonalDataEntriesRequest value
     * @property {number} k_EGCMsgGetGamePersonalDataEntriesResponse=527 k_EGCMsgGetGamePersonalDataEntriesResponse value
     * @property {number} k_EGCMsgTerminateGamePersonalDataEntriesRequest=528 k_EGCMsgTerminateGamePersonalDataEntriesRequest value
     * @property {number} k_EGCMsgTerminateGamePersonalDataEntriesResponse=529 k_EGCMsgTerminateGamePersonalDataEntriesResponse value
     */
    $root.EGCSystemMsg = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "k_EGCMsgInvalid"] = 0;
        values[valuesById[1] = "k_EGCMsgMulti"] = 1;
        values[valuesById[10] = "k_EGCMsgGenericReply"] = 10;
        values[valuesById[50] = "k_EGCMsgSystemBase"] = 50;
        values[valuesById[51] = "k_EGCMsgAchievementAwarded"] = 51;
        values[valuesById[52] = "k_EGCMsgConCommand"] = 52;
        values[valuesById[53] = "k_EGCMsgStartPlaying"] = 53;
        values[valuesById[54] = "k_EGCMsgStopPlaying"] = 54;
        values[valuesById[55] = "k_EGCMsgStartGameserver"] = 55;
        values[valuesById[56] = "k_EGCMsgStopGameserver"] = 56;
        values[valuesById[57] = "k_EGCMsgWGRequest"] = 57;
        values[valuesById[58] = "k_EGCMsgWGResponse"] = 58;
        values[valuesById[59] = "k_EGCMsgGetUserGameStatsSchema"] = 59;
        values[valuesById[60] = "k_EGCMsgGetUserGameStatsSchemaResponse"] = 60;
        values[valuesById[61] = "k_EGCMsgGetUserStatsDEPRECATED"] = 61;
        values[valuesById[62] = "k_EGCMsgGetUserStatsResponse"] = 62;
        values[valuesById[63] = "k_EGCMsgAppInfoUpdated"] = 63;
        values[valuesById[64] = "k_EGCMsgValidateSession"] = 64;
        values[valuesById[65] = "k_EGCMsgValidateSessionResponse"] = 65;
        values[valuesById[66] = "k_EGCMsgLookupAccountFromInput"] = 66;
        values[valuesById[67] = "k_EGCMsgSendHTTPRequest"] = 67;
        values[valuesById[68] = "k_EGCMsgSendHTTPRequestResponse"] = 68;
        values[valuesById[69] = "k_EGCMsgPreTestSetup"] = 69;
        values[valuesById[70] = "k_EGCMsgRecordSupportAction"] = 70;
        values[valuesById[71] = "k_EGCMsgGetAccountDetails_DEPRECATED"] = 71;
        values[valuesById[73] = "k_EGCMsgReceiveInterAppMessage"] = 73;
        values[valuesById[74] = "k_EGCMsgFindAccounts"] = 74;
        values[valuesById[75] = "k_EGCMsgPostAlert"] = 75;
        values[valuesById[76] = "k_EGCMsgGetLicenses"] = 76;
        values[valuesById[77] = "k_EGCMsgGetUserStats"] = 77;
        values[valuesById[78] = "k_EGCMsgGetCommands"] = 78;
        values[valuesById[79] = "k_EGCMsgGetCommandsResponse"] = 79;
        values[valuesById[80] = "k_EGCMsgAddFreeLicense"] = 80;
        values[valuesById[81] = "k_EGCMsgAddFreeLicenseResponse"] = 81;
        values[valuesById[82] = "k_EGCMsgGetIPLocation"] = 82;
        values[valuesById[83] = "k_EGCMsgGetIPLocationResponse"] = 83;
        values[valuesById[84] = "k_EGCMsgSystemStatsSchema"] = 84;
        values[valuesById[85] = "k_EGCMsgGetSystemStats"] = 85;
        values[valuesById[86] = "k_EGCMsgGetSystemStatsResponse"] = 86;
        values[valuesById[87] = "k_EGCMsgSendEmail"] = 87;
        values[valuesById[88] = "k_EGCMsgSendEmailResponse"] = 88;
        values[valuesById[89] = "k_EGCMsgGetEmailTemplate"] = 89;
        values[valuesById[90] = "k_EGCMsgGetEmailTemplateResponse"] = 90;
        values[valuesById[91] = "k_EGCMsgGrantGuestPass"] = 91;
        values[valuesById[92] = "k_EGCMsgGrantGuestPassResponse"] = 92;
        values[valuesById[93] = "k_EGCMsgGetAccountDetails"] = 93;
        values[valuesById[94] = "k_EGCMsgGetAccountDetailsResponse"] = 94;
        values[valuesById[95] = "k_EGCMsgGetPersonaNames"] = 95;
        values[valuesById[96] = "k_EGCMsgGetPersonaNamesResponse"] = 96;
        values[valuesById[97] = "k_EGCMsgMultiplexMsg"] = 97;
        values[valuesById[101] = "k_EGCMsgWebAPIRegisterInterfaces"] = 101;
        values[valuesById[102] = "k_EGCMsgWebAPIJobRequest"] = 102;
        values[valuesById[104] = "k_EGCMsgWebAPIJobRequestHttpResponse"] = 104;
        values[valuesById[105] = "k_EGCMsgWebAPIJobRequestForwardResponse"] = 105;
        values[valuesById[200] = "k_EGCMsgMemCachedGet"] = 200;
        values[valuesById[201] = "k_EGCMsgMemCachedGetResponse"] = 201;
        values[valuesById[202] = "k_EGCMsgMemCachedSet"] = 202;
        values[valuesById[203] = "k_EGCMsgMemCachedDelete"] = 203;
        values[valuesById[204] = "k_EGCMsgMemCachedStats"] = 204;
        values[valuesById[205] = "k_EGCMsgMemCachedStatsResponse"] = 205;
        values[valuesById[210] = "k_EGCMsgSQLStats"] = 210;
        values[valuesById[211] = "k_EGCMsgSQLStatsResponse"] = 211;
        values[valuesById[220] = "k_EGCMsgMasterSetDirectory"] = 220;
        values[valuesById[221] = "k_EGCMsgMasterSetDirectoryResponse"] = 221;
        values[valuesById[222] = "k_EGCMsgMasterSetWebAPIRouting"] = 222;
        values[valuesById[223] = "k_EGCMsgMasterSetWebAPIRoutingResponse"] = 223;
        values[valuesById[224] = "k_EGCMsgMasterSetClientMsgRouting"] = 224;
        values[valuesById[225] = "k_EGCMsgMasterSetClientMsgRoutingResponse"] = 225;
        values[valuesById[226] = "k_EGCMsgSetOptions"] = 226;
        values[valuesById[227] = "k_EGCMsgSetOptionsResponse"] = 227;
        values[valuesById[500] = "k_EGCMsgSystemBase2"] = 500;
        values[valuesById[501] = "k_EGCMsgGetPurchaseTrustStatus"] = 501;
        values[valuesById[502] = "k_EGCMsgGetPurchaseTrustStatusResponse"] = 502;
        values[valuesById[503] = "k_EGCMsgUpdateSession"] = 503;
        values[valuesById[504] = "k_EGCMsgGCAccountVacStatusChange"] = 504;
        values[valuesById[505] = "k_EGCMsgCheckFriendship"] = 505;
        values[valuesById[506] = "k_EGCMsgCheckFriendshipResponse"] = 506;
        values[valuesById[507] = "k_EGCMsgGetPartnerAccountLink"] = 507;
        values[valuesById[508] = "k_EGCMsgGetPartnerAccountLinkResponse"] = 508;
        values[valuesById[509] = "k_EGCMsgVSReportedSuspiciousActivity"] = 509;
        values[valuesById[510] = "k_EGCMsgAccountTradeBanStatusChange"] = 510;
        values[valuesById[511] = "k_EGCMsgAccountLockStatusChange"] = 511;
        values[valuesById[512] = "k_EGCMsgDPPartnerMicroTxns"] = 512;
        values[valuesById[513] = "k_EGCMsgDPPartnerMicroTxnsResponse"] = 513;
        values[valuesById[514] = "k_EGCMsgGetIPASN"] = 514;
        values[valuesById[515] = "k_EGCMsgGetIPASNResponse"] = 515;
        values[valuesById[516] = "k_EGCMsgGetAppFriendsList"] = 516;
        values[valuesById[517] = "k_EGCMsgGetAppFriendsListResponse"] = 517;
        values[valuesById[518] = "k_EGCMsgVacVerificationChange"] = 518;
        values[valuesById[519] = "k_EGCMsgAccountPhoneNumberChange"] = 519;
        values[valuesById[520] = "k_EGCMsgAccountTwoFactorChange"] = 520;
        values[valuesById[521] = "k_EGCMsgCheckClanMembership"] = 521;
        values[valuesById[522] = "k_EGCMsgCheckClanMembershipResponse"] = 522;
        values[valuesById[523] = "k_EGCMsgInviteUserToLobby"] = 523;
        values[valuesById[524] = "k_EGCMsgGetGamePersonalDataCategoriesRequest"] = 524;
        values[valuesById[525] = "k_EGCMsgGetGamePersonalDataCategoriesResponse"] = 525;
        values[valuesById[526] = "k_EGCMsgGetGamePersonalDataEntriesRequest"] = 526;
        values[valuesById[527] = "k_EGCMsgGetGamePersonalDataEntriesResponse"] = 527;
        values[valuesById[528] = "k_EGCMsgTerminateGamePersonalDataEntriesRequest"] = 528;
        values[valuesById[529] = "k_EGCMsgTerminateGamePersonalDataEntriesResponse"] = 529;
        return values;
    })();
    
    /**
     * ESOMsg enum.
     * @exports ESOMsg
     * @enum {string}
     * @property {number} k_ESOMsg_Create=21 k_ESOMsg_Create value
     * @property {number} k_ESOMsg_Update=22 k_ESOMsg_Update value
     * @property {number} k_ESOMsg_Destroy=23 k_ESOMsg_Destroy value
     * @property {number} k_ESOMsg_CacheSubscribed=24 k_ESOMsg_CacheSubscribed value
     * @property {number} k_ESOMsg_CacheUnsubscribed=25 k_ESOMsg_CacheUnsubscribed value
     * @property {number} k_ESOMsg_UpdateMultiple=26 k_ESOMsg_UpdateMultiple value
     * @property {number} k_ESOMsg_CacheSubscriptionCheck=27 k_ESOMsg_CacheSubscriptionCheck value
     * @property {number} k_ESOMsg_CacheSubscriptionRefresh=28 k_ESOMsg_CacheSubscriptionRefresh value
     * @property {number} k_ESOMsg_CacheSubscribedUpToDate=29 k_ESOMsg_CacheSubscribedUpToDate value
     */
    $root.ESOMsg = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[21] = "k_ESOMsg_Create"] = 21;
        values[valuesById[22] = "k_ESOMsg_Update"] = 22;
        values[valuesById[23] = "k_ESOMsg_Destroy"] = 23;
        values[valuesById[24] = "k_ESOMsg_CacheSubscribed"] = 24;
        values[valuesById[25] = "k_ESOMsg_CacheUnsubscribed"] = 25;
        values[valuesById[26] = "k_ESOMsg_UpdateMultiple"] = 26;
        values[valuesById[27] = "k_ESOMsg_CacheSubscriptionCheck"] = 27;
        values[valuesById[28] = "k_ESOMsg_CacheSubscriptionRefresh"] = 28;
        values[valuesById[29] = "k_ESOMsg_CacheSubscribedUpToDate"] = 29;
        return values;
    })();
    
    /**
     * EGCBaseClientMsg enum.
     * @exports EGCBaseClientMsg
     * @enum {string}
     * @property {number} k_EMsgGCPingRequest=3001 k_EMsgGCPingRequest value
     * @property {number} k_EMsgGCPingResponse=3002 k_EMsgGCPingResponse value
     * @property {number} k_EMsgGCClientWelcome=4004 k_EMsgGCClientWelcome value
     * @property {number} k_EMsgGCServerWelcome=4005 k_EMsgGCServerWelcome value
     * @property {number} k_EMsgGCClientHello=4006 k_EMsgGCClientHello value
     * @property {number} k_EMsgGCServerHello=4007 k_EMsgGCServerHello value
     * @property {number} k_EMsgGCClientGoodbye=4008 k_EMsgGCClientGoodbye value
     * @property {number} k_EMsgGCServerGoodbye=4009 k_EMsgGCServerGoodbye value
     */
    $root.EGCBaseClientMsg = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[3001] = "k_EMsgGCPingRequest"] = 3001;
        values[valuesById[3002] = "k_EMsgGCPingResponse"] = 3002;
        values[valuesById[4004] = "k_EMsgGCClientWelcome"] = 4004;
        values[valuesById[4005] = "k_EMsgGCServerWelcome"] = 4005;
        values[valuesById[4006] = "k_EMsgGCClientHello"] = 4006;
        values[valuesById[4007] = "k_EMsgGCServerHello"] = 4007;
        values[valuesById[4008] = "k_EMsgGCClientGoodbye"] = 4008;
        values[valuesById[4009] = "k_EMsgGCServerGoodbye"] = 4009;
        return values;
    })();
    
    /**
     * EGCToGCMsg enum.
     * @exports EGCToGCMsg
     * @enum {string}
     * @property {number} k_EGCToGCMsgMasterAck=150 k_EGCToGCMsgMasterAck value
     * @property {number} k_EGCToGCMsgMasterAckResponse=151 k_EGCToGCMsgMasterAckResponse value
     * @property {number} k_EGCToGCMsgRouted=152 k_EGCToGCMsgRouted value
     * @property {number} k_EGCToGCMsgRoutedReply=153 k_EGCToGCMsgRoutedReply value
     * @property {number} k_EMsgGCUpdateSubGCSessionInfo=154 k_EMsgGCUpdateSubGCSessionInfo value
     * @property {number} k_EMsgGCRequestSubGCSessionInfo=155 k_EMsgGCRequestSubGCSessionInfo value
     * @property {number} k_EMsgGCRequestSubGCSessionInfoResponse=156 k_EMsgGCRequestSubGCSessionInfoResponse value
     * @property {number} k_EGCToGCMsgMasterStartupComplete=157 k_EGCToGCMsgMasterStartupComplete value
     * @property {number} k_EMsgGCToGCSOCacheSubscribe=158 k_EMsgGCToGCSOCacheSubscribe value
     * @property {number} k_EMsgGCToGCSOCacheUnsubscribe=159 k_EMsgGCToGCSOCacheUnsubscribe value
     */
    $root.EGCToGCMsg = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[150] = "k_EGCToGCMsgMasterAck"] = 150;
        values[valuesById[151] = "k_EGCToGCMsgMasterAckResponse"] = 151;
        values[valuesById[152] = "k_EGCToGCMsgRouted"] = 152;
        values[valuesById[153] = "k_EGCToGCMsgRoutedReply"] = 153;
        values[valuesById[154] = "k_EMsgGCUpdateSubGCSessionInfo"] = 154;
        values[valuesById[155] = "k_EMsgGCRequestSubGCSessionInfo"] = 155;
        values[valuesById[156] = "k_EMsgGCRequestSubGCSessionInfoResponse"] = 156;
        values[valuesById[157] = "k_EGCToGCMsgMasterStartupComplete"] = 157;
        values[valuesById[158] = "k_EMsgGCToGCSOCacheSubscribe"] = 158;
        values[valuesById[159] = "k_EMsgGCToGCSOCacheUnsubscribe"] = 159;
        return values;
    })();
    
    $root.CCommunity_GamePersonalDataCategoryInfo = (function() {
    
        /**
         * Properties of a CCommunity_GamePersonalDataCategoryInfo.
         * @exports ICCommunity_GamePersonalDataCategoryInfo
         * @interface ICCommunity_GamePersonalDataCategoryInfo
         * @property {string|null} [type] CCommunity_GamePersonalDataCategoryInfo type
         * @property {string|null} [localization_token] CCommunity_GamePersonalDataCategoryInfo localization_token
         * @property {string|null} [template_file] CCommunity_GamePersonalDataCategoryInfo template_file
         */
    
        /**
         * Constructs a new CCommunity_GamePersonalDataCategoryInfo.
         * @exports CCommunity_GamePersonalDataCategoryInfo
         * @classdesc Represents a CCommunity_GamePersonalDataCategoryInfo.
         * @implements ICCommunity_GamePersonalDataCategoryInfo
         * @constructor
         * @param {ICCommunity_GamePersonalDataCategoryInfo=} [properties] Properties to set
         */
        function CCommunity_GamePersonalDataCategoryInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_GamePersonalDataCategoryInfo type.
         * @member {string} type
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @instance
         */
        CCommunity_GamePersonalDataCategoryInfo.prototype.type = "";
    
        /**
         * CCommunity_GamePersonalDataCategoryInfo localization_token.
         * @member {string} localization_token
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @instance
         */
        CCommunity_GamePersonalDataCategoryInfo.prototype.localization_token = "";
    
        /**
         * CCommunity_GamePersonalDataCategoryInfo template_file.
         * @member {string} template_file
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @instance
         */
        CCommunity_GamePersonalDataCategoryInfo.prototype.template_file = "";
    
        /**
         * Creates a new CCommunity_GamePersonalDataCategoryInfo instance using the specified properties.
         * @function create
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {ICCommunity_GamePersonalDataCategoryInfo=} [properties] Properties to set
         * @returns {CCommunity_GamePersonalDataCategoryInfo} CCommunity_GamePersonalDataCategoryInfo instance
         */
        CCommunity_GamePersonalDataCategoryInfo.create = function create(properties) {
            return new CCommunity_GamePersonalDataCategoryInfo(properties);
        };
    
        /**
         * Encodes the specified CCommunity_GamePersonalDataCategoryInfo message. Does not implicitly {@link CCommunity_GamePersonalDataCategoryInfo.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {ICCommunity_GamePersonalDataCategoryInfo} message CCommunity_GamePersonalDataCategoryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GamePersonalDataCategoryInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            if (message.localization_token != null && message.hasOwnProperty("localization_token"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.localization_token);
            if (message.template_file != null && message.hasOwnProperty("template_file"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.template_file);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_GamePersonalDataCategoryInfo message, length delimited. Does not implicitly {@link CCommunity_GamePersonalDataCategoryInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {ICCommunity_GamePersonalDataCategoryInfo} message CCommunity_GamePersonalDataCategoryInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GamePersonalDataCategoryInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_GamePersonalDataCategoryInfo message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_GamePersonalDataCategoryInfo} CCommunity_GamePersonalDataCategoryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GamePersonalDataCategoryInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_GamePersonalDataCategoryInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.string();
                    break;
                case 2:
                    message.localization_token = reader.string();
                    break;
                case 3:
                    message.template_file = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_GamePersonalDataCategoryInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_GamePersonalDataCategoryInfo} CCommunity_GamePersonalDataCategoryInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GamePersonalDataCategoryInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_GamePersonalDataCategoryInfo message.
         * @function verify
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_GamePersonalDataCategoryInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.localization_token != null && message.hasOwnProperty("localization_token"))
                if (!$util.isString(message.localization_token))
                    return "localization_token: string expected";
            if (message.template_file != null && message.hasOwnProperty("template_file"))
                if (!$util.isString(message.template_file))
                    return "template_file: string expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_GamePersonalDataCategoryInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_GamePersonalDataCategoryInfo} CCommunity_GamePersonalDataCategoryInfo
         */
        CCommunity_GamePersonalDataCategoryInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_GamePersonalDataCategoryInfo)
                return object;
            var message = new $root.CCommunity_GamePersonalDataCategoryInfo();
            if (object.type != null)
                message.type = String(object.type);
            if (object.localization_token != null)
                message.localization_token = String(object.localization_token);
            if (object.template_file != null)
                message.template_file = String(object.template_file);
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_GamePersonalDataCategoryInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @static
         * @param {CCommunity_GamePersonalDataCategoryInfo} message CCommunity_GamePersonalDataCategoryInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_GamePersonalDataCategoryInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = "";
                object.localization_token = "";
                object.template_file = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.localization_token != null && message.hasOwnProperty("localization_token"))
                object.localization_token = message.localization_token;
            if (message.template_file != null && message.hasOwnProperty("template_file"))
                object.template_file = message.template_file;
            return object;
        };
    
        /**
         * Converts this CCommunity_GamePersonalDataCategoryInfo to JSON.
         * @function toJSON
         * @memberof CCommunity_GamePersonalDataCategoryInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_GamePersonalDataCategoryInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_GamePersonalDataCategoryInfo;
    })();
    
    $root.CCommunity_GetGamePersonalDataCategories_Request = (function() {
    
        /**
         * Properties of a CCommunity_GetGamePersonalDataCategories_Request.
         * @exports ICCommunity_GetGamePersonalDataCategories_Request
         * @interface ICCommunity_GetGamePersonalDataCategories_Request
         * @property {number|null} [appid] CCommunity_GetGamePersonalDataCategories_Request appid
         */
    
        /**
         * Constructs a new CCommunity_GetGamePersonalDataCategories_Request.
         * @exports CCommunity_GetGamePersonalDataCategories_Request
         * @classdesc Represents a CCommunity_GetGamePersonalDataCategories_Request.
         * @implements ICCommunity_GetGamePersonalDataCategories_Request
         * @constructor
         * @param {ICCommunity_GetGamePersonalDataCategories_Request=} [properties] Properties to set
         */
        function CCommunity_GetGamePersonalDataCategories_Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_GetGamePersonalDataCategories_Request appid.
         * @member {number} appid
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @instance
         */
        CCommunity_GetGamePersonalDataCategories_Request.prototype.appid = 0;
    
        /**
         * Creates a new CCommunity_GetGamePersonalDataCategories_Request instance using the specified properties.
         * @function create
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Request=} [properties] Properties to set
         * @returns {CCommunity_GetGamePersonalDataCategories_Request} CCommunity_GetGamePersonalDataCategories_Request instance
         */
        CCommunity_GetGamePersonalDataCategories_Request.create = function create(properties) {
            return new CCommunity_GetGamePersonalDataCategories_Request(properties);
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataCategories_Request message. Does not implicitly {@link CCommunity_GetGamePersonalDataCategories_Request.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Request} message CCommunity_GetGamePersonalDataCategories_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataCategories_Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.appid != null && message.hasOwnProperty("appid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.appid);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataCategories_Request message, length delimited. Does not implicitly {@link CCommunity_GetGamePersonalDataCategories_Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Request} message CCommunity_GetGamePersonalDataCategories_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataCategories_Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataCategories_Request message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_GetGamePersonalDataCategories_Request} CCommunity_GetGamePersonalDataCategories_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataCategories_Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_GetGamePersonalDataCategories_Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.appid = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataCategories_Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_GetGamePersonalDataCategories_Request} CCommunity_GetGamePersonalDataCategories_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataCategories_Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_GetGamePersonalDataCategories_Request message.
         * @function verify
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_GetGamePersonalDataCategories_Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.appid != null && message.hasOwnProperty("appid"))
                if (!$util.isInteger(message.appid))
                    return "appid: integer expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_GetGamePersonalDataCategories_Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_GetGamePersonalDataCategories_Request} CCommunity_GetGamePersonalDataCategories_Request
         */
        CCommunity_GetGamePersonalDataCategories_Request.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_GetGamePersonalDataCategories_Request)
                return object;
            var message = new $root.CCommunity_GetGamePersonalDataCategories_Request();
            if (object.appid != null)
                message.appid = object.appid >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_GetGamePersonalDataCategories_Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @static
         * @param {CCommunity_GetGamePersonalDataCategories_Request} message CCommunity_GetGamePersonalDataCategories_Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_GetGamePersonalDataCategories_Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.appid = 0;
            if (message.appid != null && message.hasOwnProperty("appid"))
                object.appid = message.appid;
            return object;
        };
    
        /**
         * Converts this CCommunity_GetGamePersonalDataCategories_Request to JSON.
         * @function toJSON
         * @memberof CCommunity_GetGamePersonalDataCategories_Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_GetGamePersonalDataCategories_Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_GetGamePersonalDataCategories_Request;
    })();
    
    $root.CCommunity_GetGamePersonalDataCategories_Response = (function() {
    
        /**
         * Properties of a CCommunity_GetGamePersonalDataCategories_Response.
         * @exports ICCommunity_GetGamePersonalDataCategories_Response
         * @interface ICCommunity_GetGamePersonalDataCategories_Response
         * @property {Array.<ICCommunity_GamePersonalDataCategoryInfo>|null} [categories] CCommunity_GetGamePersonalDataCategories_Response categories
         * @property {string|null} [app_assets_basename] CCommunity_GetGamePersonalDataCategories_Response app_assets_basename
         */
    
        /**
         * Constructs a new CCommunity_GetGamePersonalDataCategories_Response.
         * @exports CCommunity_GetGamePersonalDataCategories_Response
         * @classdesc Represents a CCommunity_GetGamePersonalDataCategories_Response.
         * @implements ICCommunity_GetGamePersonalDataCategories_Response
         * @constructor
         * @param {ICCommunity_GetGamePersonalDataCategories_Response=} [properties] Properties to set
         */
        function CCommunity_GetGamePersonalDataCategories_Response(properties) {
            this.categories = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_GetGamePersonalDataCategories_Response categories.
         * @member {Array.<ICCommunity_GamePersonalDataCategoryInfo>} categories
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @instance
         */
        CCommunity_GetGamePersonalDataCategories_Response.prototype.categories = $util.emptyArray;
    
        /**
         * CCommunity_GetGamePersonalDataCategories_Response app_assets_basename.
         * @member {string} app_assets_basename
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @instance
         */
        CCommunity_GetGamePersonalDataCategories_Response.prototype.app_assets_basename = "";
    
        /**
         * Creates a new CCommunity_GetGamePersonalDataCategories_Response instance using the specified properties.
         * @function create
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Response=} [properties] Properties to set
         * @returns {CCommunity_GetGamePersonalDataCategories_Response} CCommunity_GetGamePersonalDataCategories_Response instance
         */
        CCommunity_GetGamePersonalDataCategories_Response.create = function create(properties) {
            return new CCommunity_GetGamePersonalDataCategories_Response(properties);
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataCategories_Response message. Does not implicitly {@link CCommunity_GetGamePersonalDataCategories_Response.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Response} message CCommunity_GetGamePersonalDataCategories_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataCategories_Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.categories != null && message.categories.length)
                for (var i = 0; i < message.categories.length; ++i)
                    $root.CCommunity_GamePersonalDataCategoryInfo.encode(message.categories[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.app_assets_basename != null && message.hasOwnProperty("app_assets_basename"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.app_assets_basename);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataCategories_Response message, length delimited. Does not implicitly {@link CCommunity_GetGamePersonalDataCategories_Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataCategories_Response} message CCommunity_GetGamePersonalDataCategories_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataCategories_Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataCategories_Response message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_GetGamePersonalDataCategories_Response} CCommunity_GetGamePersonalDataCategories_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataCategories_Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_GetGamePersonalDataCategories_Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.categories && message.categories.length))
                        message.categories = [];
                    message.categories.push($root.CCommunity_GamePersonalDataCategoryInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.app_assets_basename = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataCategories_Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_GetGamePersonalDataCategories_Response} CCommunity_GetGamePersonalDataCategories_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataCategories_Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_GetGamePersonalDataCategories_Response message.
         * @function verify
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_GetGamePersonalDataCategories_Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.categories != null && message.hasOwnProperty("categories")) {
                if (!Array.isArray(message.categories))
                    return "categories: array expected";
                for (var i = 0; i < message.categories.length; ++i) {
                    var error = $root.CCommunity_GamePersonalDataCategoryInfo.verify(message.categories[i]);
                    if (error)
                        return "categories." + error;
                }
            }
            if (message.app_assets_basename != null && message.hasOwnProperty("app_assets_basename"))
                if (!$util.isString(message.app_assets_basename))
                    return "app_assets_basename: string expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_GetGamePersonalDataCategories_Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_GetGamePersonalDataCategories_Response} CCommunity_GetGamePersonalDataCategories_Response
         */
        CCommunity_GetGamePersonalDataCategories_Response.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_GetGamePersonalDataCategories_Response)
                return object;
            var message = new $root.CCommunity_GetGamePersonalDataCategories_Response();
            if (object.categories) {
                if (!Array.isArray(object.categories))
                    throw TypeError(".CCommunity_GetGamePersonalDataCategories_Response.categories: array expected");
                message.categories = [];
                for (var i = 0; i < object.categories.length; ++i) {
                    if (typeof object.categories[i] !== "object")
                        throw TypeError(".CCommunity_GetGamePersonalDataCategories_Response.categories: object expected");
                    message.categories[i] = $root.CCommunity_GamePersonalDataCategoryInfo.fromObject(object.categories[i]);
                }
            }
            if (object.app_assets_basename != null)
                message.app_assets_basename = String(object.app_assets_basename);
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_GetGamePersonalDataCategories_Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @static
         * @param {CCommunity_GetGamePersonalDataCategories_Response} message CCommunity_GetGamePersonalDataCategories_Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_GetGamePersonalDataCategories_Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.categories = [];
            if (options.defaults)
                object.app_assets_basename = "";
            if (message.categories && message.categories.length) {
                object.categories = [];
                for (var j = 0; j < message.categories.length; ++j)
                    object.categories[j] = $root.CCommunity_GamePersonalDataCategoryInfo.toObject(message.categories[j], options);
            }
            if (message.app_assets_basename != null && message.hasOwnProperty("app_assets_basename"))
                object.app_assets_basename = message.app_assets_basename;
            return object;
        };
    
        /**
         * Converts this CCommunity_GetGamePersonalDataCategories_Response to JSON.
         * @function toJSON
         * @memberof CCommunity_GetGamePersonalDataCategories_Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_GetGamePersonalDataCategories_Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_GetGamePersonalDataCategories_Response;
    })();
    
    $root.CCommunity_GetGamePersonalDataEntries_Request = (function() {
    
        /**
         * Properties of a CCommunity_GetGamePersonalDataEntries_Request.
         * @exports ICCommunity_GetGamePersonalDataEntries_Request
         * @interface ICCommunity_GetGamePersonalDataEntries_Request
         * @property {number|null} [appid] CCommunity_GetGamePersonalDataEntries_Request appid
         * @property {number|Long|null} [steamid] CCommunity_GetGamePersonalDataEntries_Request steamid
         * @property {string|null} [type] CCommunity_GetGamePersonalDataEntries_Request type
         * @property {string|null} [continue_token] CCommunity_GetGamePersonalDataEntries_Request continue_token
         */
    
        /**
         * Constructs a new CCommunity_GetGamePersonalDataEntries_Request.
         * @exports CCommunity_GetGamePersonalDataEntries_Request
         * @classdesc Represents a CCommunity_GetGamePersonalDataEntries_Request.
         * @implements ICCommunity_GetGamePersonalDataEntries_Request
         * @constructor
         * @param {ICCommunity_GetGamePersonalDataEntries_Request=} [properties] Properties to set
         */
        function CCommunity_GetGamePersonalDataEntries_Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Request appid.
         * @member {number} appid
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Request.prototype.appid = 0;
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Request steamid.
         * @member {number|Long} steamid
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Request type.
         * @member {string} type
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Request.prototype.type = "";
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Request continue_token.
         * @member {string} continue_token
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Request.prototype.continue_token = "";
    
        /**
         * Creates a new CCommunity_GetGamePersonalDataEntries_Request instance using the specified properties.
         * @function create
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Request=} [properties] Properties to set
         * @returns {CCommunity_GetGamePersonalDataEntries_Request} CCommunity_GetGamePersonalDataEntries_Request instance
         */
        CCommunity_GetGamePersonalDataEntries_Request.create = function create(properties) {
            return new CCommunity_GetGamePersonalDataEntries_Request(properties);
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataEntries_Request message. Does not implicitly {@link CCommunity_GetGamePersonalDataEntries_Request.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Request} message CCommunity_GetGamePersonalDataEntries_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataEntries_Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.appid != null && message.hasOwnProperty("appid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.appid);
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.steamid);
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.type);
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.continue_token);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataEntries_Request message, length delimited. Does not implicitly {@link CCommunity_GetGamePersonalDataEntries_Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Request} message CCommunity_GetGamePersonalDataEntries_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataEntries_Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataEntries_Request message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_GetGamePersonalDataEntries_Request} CCommunity_GetGamePersonalDataEntries_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataEntries_Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_GetGamePersonalDataEntries_Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.appid = reader.uint32();
                    break;
                case 2:
                    message.steamid = reader.uint64();
                    break;
                case 3:
                    message.type = reader.string();
                    break;
                case 4:
                    message.continue_token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataEntries_Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_GetGamePersonalDataEntries_Request} CCommunity_GetGamePersonalDataEntries_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataEntries_Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_GetGamePersonalDataEntries_Request message.
         * @function verify
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_GetGamePersonalDataEntries_Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.appid != null && message.hasOwnProperty("appid"))
                if (!$util.isInteger(message.appid))
                    return "appid: integer expected";
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                    return "steamid: integer|Long expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                if (!$util.isString(message.continue_token))
                    return "continue_token: string expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_GetGamePersonalDataEntries_Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_GetGamePersonalDataEntries_Request} CCommunity_GetGamePersonalDataEntries_Request
         */
        CCommunity_GetGamePersonalDataEntries_Request.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_GetGamePersonalDataEntries_Request)
                return object;
            var message = new $root.CCommunity_GetGamePersonalDataEntries_Request();
            if (object.appid != null)
                message.appid = object.appid >>> 0;
            if (object.steamid != null)
                if ($util.Long)
                    (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = true;
                else if (typeof object.steamid === "string")
                    message.steamid = parseInt(object.steamid, 10);
                else if (typeof object.steamid === "number")
                    message.steamid = object.steamid;
                else if (typeof object.steamid === "object")
                    message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
            if (object.type != null)
                message.type = String(object.type);
            if (object.continue_token != null)
                message.continue_token = String(object.continue_token);
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_GetGamePersonalDataEntries_Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @static
         * @param {CCommunity_GetGamePersonalDataEntries_Request} message CCommunity_GetGamePersonalDataEntries_Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_GetGamePersonalDataEntries_Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.appid = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamid = options.longs === String ? "0" : 0;
                object.type = "";
                object.continue_token = "";
            }
            if (message.appid != null && message.hasOwnProperty("appid"))
                object.appid = message.appid;
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                if (typeof message.steamid === "number")
                    object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
                else
                    object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                object.continue_token = message.continue_token;
            return object;
        };
    
        /**
         * Converts this CCommunity_GetGamePersonalDataEntries_Request to JSON.
         * @function toJSON
         * @memberof CCommunity_GetGamePersonalDataEntries_Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_GetGamePersonalDataEntries_Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_GetGamePersonalDataEntries_Request;
    })();
    
    $root.CCommunity_GetGamePersonalDataEntries_Response = (function() {
    
        /**
         * Properties of a CCommunity_GetGamePersonalDataEntries_Response.
         * @exports ICCommunity_GetGamePersonalDataEntries_Response
         * @interface ICCommunity_GetGamePersonalDataEntries_Response
         * @property {number|null} [gceresult] CCommunity_GetGamePersonalDataEntries_Response gceresult
         * @property {Array.<string>|null} [entries] CCommunity_GetGamePersonalDataEntries_Response entries
         * @property {string|null} [continue_token] CCommunity_GetGamePersonalDataEntries_Response continue_token
         */
    
        /**
         * Constructs a new CCommunity_GetGamePersonalDataEntries_Response.
         * @exports CCommunity_GetGamePersonalDataEntries_Response
         * @classdesc Represents a CCommunity_GetGamePersonalDataEntries_Response.
         * @implements ICCommunity_GetGamePersonalDataEntries_Response
         * @constructor
         * @param {ICCommunity_GetGamePersonalDataEntries_Response=} [properties] Properties to set
         */
        function CCommunity_GetGamePersonalDataEntries_Response(properties) {
            this.entries = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Response gceresult.
         * @member {number} gceresult
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Response.prototype.gceresult = 0;
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Response entries.
         * @member {Array.<string>} entries
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Response.prototype.entries = $util.emptyArray;
    
        /**
         * CCommunity_GetGamePersonalDataEntries_Response continue_token.
         * @member {string} continue_token
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @instance
         */
        CCommunity_GetGamePersonalDataEntries_Response.prototype.continue_token = "";
    
        /**
         * Creates a new CCommunity_GetGamePersonalDataEntries_Response instance using the specified properties.
         * @function create
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Response=} [properties] Properties to set
         * @returns {CCommunity_GetGamePersonalDataEntries_Response} CCommunity_GetGamePersonalDataEntries_Response instance
         */
        CCommunity_GetGamePersonalDataEntries_Response.create = function create(properties) {
            return new CCommunity_GetGamePersonalDataEntries_Response(properties);
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataEntries_Response message. Does not implicitly {@link CCommunity_GetGamePersonalDataEntries_Response.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Response} message CCommunity_GetGamePersonalDataEntries_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataEntries_Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.gceresult);
            if (message.entries != null && message.entries.length)
                for (var i = 0; i < message.entries.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.entries[i]);
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.continue_token);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_GetGamePersonalDataEntries_Response message, length delimited. Does not implicitly {@link CCommunity_GetGamePersonalDataEntries_Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_GetGamePersonalDataEntries_Response} message CCommunity_GetGamePersonalDataEntries_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_GetGamePersonalDataEntries_Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataEntries_Response message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_GetGamePersonalDataEntries_Response} CCommunity_GetGamePersonalDataEntries_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataEntries_Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_GetGamePersonalDataEntries_Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gceresult = reader.uint32();
                    break;
                case 2:
                    if (!(message.entries && message.entries.length))
                        message.entries = [];
                    message.entries.push(reader.string());
                    break;
                case 3:
                    message.continue_token = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_GetGamePersonalDataEntries_Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_GetGamePersonalDataEntries_Response} CCommunity_GetGamePersonalDataEntries_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_GetGamePersonalDataEntries_Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_GetGamePersonalDataEntries_Response message.
         * @function verify
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_GetGamePersonalDataEntries_Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                if (!$util.isInteger(message.gceresult))
                    return "gceresult: integer expected";
            if (message.entries != null && message.hasOwnProperty("entries")) {
                if (!Array.isArray(message.entries))
                    return "entries: array expected";
                for (var i = 0; i < message.entries.length; ++i)
                    if (!$util.isString(message.entries[i]))
                        return "entries: string[] expected";
            }
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                if (!$util.isString(message.continue_token))
                    return "continue_token: string expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_GetGamePersonalDataEntries_Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_GetGamePersonalDataEntries_Response} CCommunity_GetGamePersonalDataEntries_Response
         */
        CCommunity_GetGamePersonalDataEntries_Response.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_GetGamePersonalDataEntries_Response)
                return object;
            var message = new $root.CCommunity_GetGamePersonalDataEntries_Response();
            if (object.gceresult != null)
                message.gceresult = object.gceresult >>> 0;
            if (object.entries) {
                if (!Array.isArray(object.entries))
                    throw TypeError(".CCommunity_GetGamePersonalDataEntries_Response.entries: array expected");
                message.entries = [];
                for (var i = 0; i < object.entries.length; ++i)
                    message.entries[i] = String(object.entries[i]);
            }
            if (object.continue_token != null)
                message.continue_token = String(object.continue_token);
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_GetGamePersonalDataEntries_Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @static
         * @param {CCommunity_GetGamePersonalDataEntries_Response} message CCommunity_GetGamePersonalDataEntries_Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_GetGamePersonalDataEntries_Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.entries = [];
            if (options.defaults) {
                object.gceresult = 0;
                object.continue_token = "";
            }
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                object.gceresult = message.gceresult;
            if (message.entries && message.entries.length) {
                object.entries = [];
                for (var j = 0; j < message.entries.length; ++j)
                    object.entries[j] = message.entries[j];
            }
            if (message.continue_token != null && message.hasOwnProperty("continue_token"))
                object.continue_token = message.continue_token;
            return object;
        };
    
        /**
         * Converts this CCommunity_GetGamePersonalDataEntries_Response to JSON.
         * @function toJSON
         * @memberof CCommunity_GetGamePersonalDataEntries_Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_GetGamePersonalDataEntries_Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_GetGamePersonalDataEntries_Response;
    })();
    
    $root.CCommunity_TerminateGamePersonalDataEntries_Request = (function() {
    
        /**
         * Properties of a CCommunity_TerminateGamePersonalDataEntries_Request.
         * @exports ICCommunity_TerminateGamePersonalDataEntries_Request
         * @interface ICCommunity_TerminateGamePersonalDataEntries_Request
         * @property {number|null} [appid] CCommunity_TerminateGamePersonalDataEntries_Request appid
         * @property {number|Long|null} [steamid] CCommunity_TerminateGamePersonalDataEntries_Request steamid
         */
    
        /**
         * Constructs a new CCommunity_TerminateGamePersonalDataEntries_Request.
         * @exports CCommunity_TerminateGamePersonalDataEntries_Request
         * @classdesc Represents a CCommunity_TerminateGamePersonalDataEntries_Request.
         * @implements ICCommunity_TerminateGamePersonalDataEntries_Request
         * @constructor
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Request=} [properties] Properties to set
         */
        function CCommunity_TerminateGamePersonalDataEntries_Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_TerminateGamePersonalDataEntries_Request appid.
         * @member {number} appid
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.prototype.appid = 0;
    
        /**
         * CCommunity_TerminateGamePersonalDataEntries_Request steamid.
         * @member {number|Long} steamid
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @instance
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.prototype.steamid = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
        /**
         * Creates a new CCommunity_TerminateGamePersonalDataEntries_Request instance using the specified properties.
         * @function create
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Request=} [properties] Properties to set
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Request} CCommunity_TerminateGamePersonalDataEntries_Request instance
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.create = function create(properties) {
            return new CCommunity_TerminateGamePersonalDataEntries_Request(properties);
        };
    
        /**
         * Encodes the specified CCommunity_TerminateGamePersonalDataEntries_Request message. Does not implicitly {@link CCommunity_TerminateGamePersonalDataEntries_Request.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Request} message CCommunity_TerminateGamePersonalDataEntries_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.appid != null && message.hasOwnProperty("appid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.appid);
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.steamid);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_TerminateGamePersonalDataEntries_Request message, length delimited. Does not implicitly {@link CCommunity_TerminateGamePersonalDataEntries_Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Request} message CCommunity_TerminateGamePersonalDataEntries_Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_TerminateGamePersonalDataEntries_Request message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Request} CCommunity_TerminateGamePersonalDataEntries_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_TerminateGamePersonalDataEntries_Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.appid = reader.uint32();
                    break;
                case 2:
                    message.steamid = reader.uint64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_TerminateGamePersonalDataEntries_Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Request} CCommunity_TerminateGamePersonalDataEntries_Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_TerminateGamePersonalDataEntries_Request message.
         * @function verify
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.appid != null && message.hasOwnProperty("appid"))
                if (!$util.isInteger(message.appid))
                    return "appid: integer expected";
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                if (!$util.isInteger(message.steamid) && !(message.steamid && $util.isInteger(message.steamid.low) && $util.isInteger(message.steamid.high)))
                    return "steamid: integer|Long expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_TerminateGamePersonalDataEntries_Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Request} CCommunity_TerminateGamePersonalDataEntries_Request
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_TerminateGamePersonalDataEntries_Request)
                return object;
            var message = new $root.CCommunity_TerminateGamePersonalDataEntries_Request();
            if (object.appid != null)
                message.appid = object.appid >>> 0;
            if (object.steamid != null)
                if ($util.Long)
                    (message.steamid = $util.Long.fromValue(object.steamid)).unsigned = true;
                else if (typeof object.steamid === "string")
                    message.steamid = parseInt(object.steamid, 10);
                else if (typeof object.steamid === "number")
                    message.steamid = object.steamid;
                else if (typeof object.steamid === "object")
                    message.steamid = new $util.LongBits(object.steamid.low >>> 0, object.steamid.high >>> 0).toNumber(true);
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_TerminateGamePersonalDataEntries_Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @static
         * @param {CCommunity_TerminateGamePersonalDataEntries_Request} message CCommunity_TerminateGamePersonalDataEntries_Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.appid = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.steamid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamid = options.longs === String ? "0" : 0;
            }
            if (message.appid != null && message.hasOwnProperty("appid"))
                object.appid = message.appid;
            if (message.steamid != null && message.hasOwnProperty("steamid"))
                if (typeof message.steamid === "number")
                    object.steamid = options.longs === String ? String(message.steamid) : message.steamid;
                else
                    object.steamid = options.longs === String ? $util.Long.prototype.toString.call(message.steamid) : options.longs === Number ? new $util.LongBits(message.steamid.low >>> 0, message.steamid.high >>> 0).toNumber(true) : message.steamid;
            return object;
        };
    
        /**
         * Converts this CCommunity_TerminateGamePersonalDataEntries_Request to JSON.
         * @function toJSON
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_TerminateGamePersonalDataEntries_Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_TerminateGamePersonalDataEntries_Request;
    })();
    
    $root.CCommunity_TerminateGamePersonalDataEntries_Response = (function() {
    
        /**
         * Properties of a CCommunity_TerminateGamePersonalDataEntries_Response.
         * @exports ICCommunity_TerminateGamePersonalDataEntries_Response
         * @interface ICCommunity_TerminateGamePersonalDataEntries_Response
         * @property {number|null} [gceresult] CCommunity_TerminateGamePersonalDataEntries_Response gceresult
         */
    
        /**
         * Constructs a new CCommunity_TerminateGamePersonalDataEntries_Response.
         * @exports CCommunity_TerminateGamePersonalDataEntries_Response
         * @classdesc Represents a CCommunity_TerminateGamePersonalDataEntries_Response.
         * @implements ICCommunity_TerminateGamePersonalDataEntries_Response
         * @constructor
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Response=} [properties] Properties to set
         */
        function CCommunity_TerminateGamePersonalDataEntries_Response(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * CCommunity_TerminateGamePersonalDataEntries_Response gceresult.
         * @member {number} gceresult
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @instance
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.prototype.gceresult = 0;
    
        /**
         * Creates a new CCommunity_TerminateGamePersonalDataEntries_Response instance using the specified properties.
         * @function create
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Response=} [properties] Properties to set
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Response} CCommunity_TerminateGamePersonalDataEntries_Response instance
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.create = function create(properties) {
            return new CCommunity_TerminateGamePersonalDataEntries_Response(properties);
        };
    
        /**
         * Encodes the specified CCommunity_TerminateGamePersonalDataEntries_Response message. Does not implicitly {@link CCommunity_TerminateGamePersonalDataEntries_Response.verify|verify} messages.
         * @function encode
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Response} message CCommunity_TerminateGamePersonalDataEntries_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.gceresult);
            return writer;
        };
    
        /**
         * Encodes the specified CCommunity_TerminateGamePersonalDataEntries_Response message, length delimited. Does not implicitly {@link CCommunity_TerminateGamePersonalDataEntries_Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {ICCommunity_TerminateGamePersonalDataEntries_Response} message CCommunity_TerminateGamePersonalDataEntries_Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a CCommunity_TerminateGamePersonalDataEntries_Response message from the specified reader or buffer.
         * @function decode
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Response} CCommunity_TerminateGamePersonalDataEntries_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CCommunity_TerminateGamePersonalDataEntries_Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gceresult = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a CCommunity_TerminateGamePersonalDataEntries_Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Response} CCommunity_TerminateGamePersonalDataEntries_Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a CCommunity_TerminateGamePersonalDataEntries_Response message.
         * @function verify
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                if (!$util.isInteger(message.gceresult))
                    return "gceresult: integer expected";
            return null;
        };
    
        /**
         * Creates a CCommunity_TerminateGamePersonalDataEntries_Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {CCommunity_TerminateGamePersonalDataEntries_Response} CCommunity_TerminateGamePersonalDataEntries_Response
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.fromObject = function fromObject(object) {
            if (object instanceof $root.CCommunity_TerminateGamePersonalDataEntries_Response)
                return object;
            var message = new $root.CCommunity_TerminateGamePersonalDataEntries_Response();
            if (object.gceresult != null)
                message.gceresult = object.gceresult >>> 0;
            return message;
        };
    
        /**
         * Creates a plain object from a CCommunity_TerminateGamePersonalDataEntries_Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @static
         * @param {CCommunity_TerminateGamePersonalDataEntries_Response} message CCommunity_TerminateGamePersonalDataEntries_Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.gceresult = 0;
            if (message.gceresult != null && message.hasOwnProperty("gceresult"))
                object.gceresult = message.gceresult;
            return object;
        };
    
        /**
         * Converts this CCommunity_TerminateGamePersonalDataEntries_Response to JSON.
         * @function toJSON
         * @memberof CCommunity_TerminateGamePersonalDataEntries_Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CCommunity_TerminateGamePersonalDataEntries_Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return CCommunity_TerminateGamePersonalDataEntries_Response;
    })();

    return $root;
});
