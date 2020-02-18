const qEditSymb = 2001;
const littleEndian = true;

/**
 * Class representing the v9 backend
 * @example
 * <!doctype html>
 * <html>
 * <head>
 *   <script src="../_vxaapi-1.0.0/v9.js"></script>
 *   <script>
 * 
 *     class MyFeed extends v9.feed {
 *       onOpen(pMeta) {
 *       }
 *
 *       onLoad () {
 *       }
 *
 *       onStop () {
 *       }
 *
 *       onRender () {
 *       }
 * 
 *       onEvent(pSymbol, pEvent, pRealTime) {
 *       }
 *     }
 *
 *     let	feed = new MyFeed(new v9.edit().symbol);
 *   </script>
 * </head>
 * <style>
 *   html, body, #container {
 *     width: 100%;
 *     height: 100%;
 *     margin: 0;
 *     padding: 0;
 *   }
 * </style>
 * <body>
 *   <div id="container"></div>
 * </body>
 * </html>
 * 
 */

/**
 * Class used for referencing all v9 event enumerations and data
 */
export class v9 {
    constructor() {
        /**
         * Value used specify a non-existent 32 bit price returned
         * @type {Number}
         * @private
         */
        this.PRICE_NULL_32 = 2147483647;

        /**
         * Value used specify a non-existent 32 bit price returned
         * @type {Bigint}
         * @private
         */
        this.PRICE_NULL_64 = 9223372036854775807;

        /**
         * @ignore
         * @type {Number}
         * @private
         */
        this.sGroupSettleID = 4294967293;

        /**
         * Enumerated event type in kEvent.Type (See manual for event types)
         * @type {Number}
         * @public
         * @example
         * Trade: 0,
         * Bid: 1,
         * Ask: 2,
         * ImpliedBid: 3,
         * ImpliedAsk: 4,
         * BookReset: 5,
         */
        this.Aggressor =
        {
            NoAggressor: 0,
            Buy: 1,
            Sell: 2
        },

        this.HaltReason =
        {
            NotSet: 255,
            GroupSchedule: 0,
            SurveillanceIntervention: 1,
            MarketEvent: 2,
            InstrumentActivation: 3,
            InstrumentExpiration: 4,
            Unknown: 5,
            RecoveryInProcess: 6
        },

        this.SecurityType =
        {
            NotSet: 0,
            TradingHalt: 2,
            Close: 4,
            NewPriceIndication: 15,
            ReadyToTrade: 17,
            NotAvailableForTrading: 18,
            UnknownorInvalid: 20,
            PreOpen: 21,
            PreCross: 24,
            Cross: 25,
            PostClose: 26,
            NoChange: 103,
            PreClos: 150,
            Restricted: 200,
            Freeze: 201
        },

        this.SecurityEvent =
        {
            NoEvent: 0,
            NoCancel: 1,
            ResetStatistics: 4,
            ImpliedMatchingON: 5,
            ImpliedMatchingOFF: 6
        },

        this.BookType =
        {
            NotSet: 85,
            Bid: 66,
            Ask: 83,
            ImpliedBid: 98,
            ImpliedAsk: 115,
            BookReset: 82
        },

        this.DailyStatisticsType =
        {
            SettlementPrice: 54,
            ClearedVolume: 66,
            OpenInterest: 67,
            FixingPrice: 87
        },

        this.BookAction =
        {
            NotSet: 255,
            New: 0,
            Change: 1,
            Delete: 2,
            DeleteThru: 3,
            DeleteFrom: 4,
            Overlay: 5,
            Replace: 6
        },

        this.SessionStatisticsType =
        {
            NotSet: 127,
            OpenPrice: 0,
            HighTrade: 1,
            LowTrade: 2,
            LastTrade: 3,
            HighestBid: 4,
            LowestAsk: 5,
            ClosePrice: 6
        },


        this.StateType =
        {
            NotSet: 255,
            DailyOpenPrice: 0,
            IndicativeOpeningPrice: 5,
            DailyClosePrice: 10
        },

        this.PutOrCall =
        {
            NotSet: 255,
            Put: 0,
            Call: 1
        },

        this.SettleType =
        {
            Final: 1,
            Actual: 2,
            Rounded: 4,
            Intraday: 8,
            ReservedBits: 16,
            NullValue: 128
        },

        this.TransactionType =
        {
            NotSet: 255,
            TransactionStart: 0,
            TransactionEnd: 1
        },

        this.EventIndicator =
        {
            NotSet: 0,
            LastOfType: 1,
            EndOfEvent: 128
        },

        this.UnionID =
        {
            NotSet: 255,
            NotMapped: 250,
            TradeSummary: 0,
            TradeMatch: 1,
            VolumeUpdate: 2,
            BookLevel: 3,
            OrderBook: 4,
            SecurityStatus: 5,
            DailyStatistics: 6,
            SessionStatistics: 7,
            LimitsBanding: 8,
            ChannelReset: 9,
            TransactionMarker: 10,
            Test: 11,
            ClearingPrice: 12
        }
    }
    
};

v9.edit = class {
    constructor() {
    }

    set symbol(pSymb) {
        return gHome._pagesave(gUniq, qEditSymb, pSymb);
    }

    get symbol() {
        return gHome._pageread(gUniq, qEditSymb);
    }
}

v9.lineChart = class {
    constructor(pID) {
        this.fLineEnum = gHome.MakeLine(gUniq, (pID) ? document.getElementById(pID) : null);
    }

    linePush(pItem, pRate, pTime) {
        gHome.LinePush(gUniq, pItem.fCalcEnum, pRate, pTime);
    }
}

v9.cubeChart = class {
    constructor(pID) {
        this.fCubeEnum = gHome.MakeCube(gUniq, (pID) ? document.getElementById(pID) : null);
    }

    cubePlus(pItem, pData, pSize) {
        gHome.CubePlus(gUniq, pItem, pData, pSize);
    }

    cubeDele(pItem, pData) {
        gHome.CubeDele(gUniq, pItem, pData);
    }

    cubeSave(pItem, pData, pSize) {
        gHome.CubeSave(gUniq, pItem, pData, pSize);
    }

    cubeRead(pItem, pData) {
        gHome.CubeRead(gUniq, pItem, pData);
    }

    cubeFree(pItem) {
        gHome.CubeFree(gUniq, pItem);
    }

    cubePush(pItem, pSave) {
        gHome.CubePush(gUniq, pItem, pSave);
    }

}

v9.lineItem = class {
    constructor(pPane) {
        try {
            this.fCalcEnum = gHome.MakeCalc(gUniq, this);
        }
        catch (e) {
            gHome.PageErro(gUniq, "MakeCalc", e);
        }
    }

    /**
     * Stroke width in pixels
     * @type {Number}
     * @public
     */
    set lineWidth(pData) {
        try {
            this._lineWidth = pData;
            gHome.Calc_lineWidth(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "lineWidth", e);
        }
    }

    /**
     * Stroke color in hexadecimal as a String
     * @type {String}
     * @public
     */
    set strokeStyle(pData) {
        try {
            this._strokeStyle = pData;
            gHome.Calc_strokeStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErroo(gUniq, "strokeStyle", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    set format(pData) {
        try {
            this._format = pData;
            gHome.Calc_format(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "format", e);
        }
    }

    /**
     * Text color in hexadecimal as a String
     * @type {String}
     * @public
     */
    set textStyle(pData) {
        try {
            this._textStyle = pData;
            gHome.Calc_textStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "textStyle", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    set bodyStyle(pData) {
        try {
            this._bodyStyle = pData;
            gHome.Calc_bodyStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "textStyle", e);
        }
    }

    /**
     * Text corresponding to current line price
     * @type {String}
     * @public
     */
    set title(pData) {
        try {
            this._title = pData;
            gHome.Calc_title(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "title", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    set name(pData) {
        try {
            this._name = pData;
            gHome.Calc_name(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "name", e);
        }
    }

    /**
     * Stroke width in pixels
     * @type {Number}
     * @public
     */
    get lineWidth() {
        return this._lineWidth;
    }

    /**
     * Stroke color in hexadecimal as a String
     * @type {String}
     * @public
     */
    get strokeStyle() {
        return this._strokeStyle;
    }

    /**
     * Text color in hexadecimal as a String
     * @type {String}
     * @public
     */
    get textStyle() {
        return this._textStyle;
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @readonly
     */
    get eventStyle() {
        return this._eventStyle;
    }

    /**
     * Text corresponding to current line price
     * @type {String}
     * @public
     */
    get title() {
        return this._title;
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    get format() {
        return this._format;
    }
}

v9.cubeItem = class {
    constructor(pPane) {
        try {
            this.fCalcEnum = gHome.MakeCalc(gUniq, this);
            this.fCubeMaps = new Map();
        }
        catch (e) {
            gHome.PageErro(gUniq, "MakeCalc", e);
        }
    }

    /**
     * Stroke width in pixels
     * @type {Number}
     * @public
     */
    set lineWidth(pData) {
        try {
            this._lineWidth = pData;
            gHome.Calc_lineWidth(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "lineWidth", e);
        }
    }

    /**
     * Stroke color in hexadecimal as a String
     * @type {String}
     * @public
     */
    set strokeStyle(pData) {
        try {
            this._strokeStyle = pData;
            gHome.Calc_strokeStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErroo(gUniq, "strokeStyle", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @readonly
     */
    set format(pData) {
        try {
            this._format = pData;
            gHome.Calc_format(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "format", e);
        }
    }

    /**
     * Text color in hexadecimal as a String
     * @type {String}
     * @public
     */
    set textStyle(pData) {
        try {
            this._textStyle = pData;
            gHome.Calc_textStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "textStyle", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    set bodyStyle(pData) {
        try {
            this._bodyStyle = pData;
            gHome.Calc_bodyStyle(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "textStyle", e);
        }
    }

    /**
     * Text corresponding to current cube price
     * @type {String}
     * @public
     */
    set title(pData) {
        try {
            this._title = pData;
            gHome.Calc_title(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "title", e);
        }
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    set name(pData) {
        try {
            this._name = pData;
            gHome.Calc_name(gUniq, this.fCalcEnum, pData);
        }
        catch (e) {
            gHome.PageErro(gUniq, "name", e);
        }
    }

    /**
     * Stroke width in pixels
     * @type {Number}
     * @public
     */
    get lineWidth() {
        return this._lineWidth;
    }

    /**
     * Stroke color in hexadecimal as a String
     * @type {String}
     * @public
     */
    get strokeStyle() {
        return this._strokeStyle;
    }

    /**
     * Text color in hexadecimal as a String
     * @type {String}
     * @public
     */
    get textStyle() {
        return this._textStyle;
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @readonly 
     */
    get eventStyle() {
        return this._eventStyle;
    }

    /**
     * Text corresponding to current cube price
     * @type {String}
     * @public
     */
    get title() {
        return this._title;
    }

    /**
     * @todo figure out what this does
     * @type {String}
     * @public
     */
    get format() {
        return this._format;
    }
}

/**
 * Returns a JSON object representing the provided event
 * @param {Event} pEvent
 */
v9.eventToJson = function (pEvent) {
    let tEvent = v9.eventCopy(pEvent);

    if (tEvent !== undefined) {
        let intCount = 0, repCount = 0;
        const json = JSON.stringify(tEvent, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization pattern conflict with a string value.`);
        }
        return res;
    }
}

/**
 * Returns a copy of a provided event
 * @param {Event} pEvent
 */
v9.eventCopy = function (pEvent) {

    let tEvent = {};

    if (pEvent.header) {
        tEvent.header = {};
        tEvent.header = Object.assign(pEvent.header);
    }

    try {
        switch (pEvent.header.unionID) {
            case v9.UnionID.TransactionMarker:
                tEvent.transactionMarker = {};
                tEvent.transactionMarker = Object.assign(pEvent.transactionMarker);
                break;
            case v9.UnionID.ChannelReset:
                tEvent.channelReset = {};
                tEvent.channelReset = Object.assign(pEvent.channelReset);
                break;
            case v9.UnionID.TradeSummary:
                tEvent.tradeSummary = {};
                tEvent.tradeSummary = Object.assign(pEvent.tradeSummary);
                break;
            case v9.UnionID.TradeMatch:
                tEvent.tradeMatch = {};
                tEvent.tradeMatch = Object.assign(pEvent.tradeMatch);
                break;
            case v9.UnionID.VolumeUpdate:
                tEvent.volumeUpdate = {};
                tEvent.volumeUpdate = Object.assign(pEvent.volumeUpdate);
                break;
            case v9.UnionID.BookLevel:
                tEvent.bookLevel = {};
                tEvent.bookLevel = Object.assign(pEvent.bookLevel);
                break;
            case v9.UnionID.OrderBook:
                tEvent.orderBook = {};
                tEvent.orderBook = Object.assign(pEvent.orderBook);
                break;
            case v9.UnionID.SecurityStatus:
                tEvent.securityStatus = {};
                tEvent.securityStatus = Object.assign(pEvent.securityStatus);
                break;
            case v9.UnionID.DailyStatistics:
                tEvent.dailyStatistics = {};
                tEvent.dailyStatistics = Object.assign(pEvent.dailyStatistics);
                break;
            case v9.UnionID.SessionStatistics:
                tEvent.sessionStatistics = {};
                tEvent.sessionStatistics = Object.assign(pEvent.sessionStatistics);
                break;
            case v9.UnionID.LimitsBanding:
                tEvent.limitsBanding = {};
                tEvent.limitsBanding = Object.assign(pEvent.limitsBanding);
                break;
            case v9.UnionID.ClearingPrice:
                tEvent.clearingPrice = {};
                tEvent.clearingPrice = Object.assign(pEvent.clearingPrice);
                break;
        }
    }
    catch (e) {
    }

    return tEvent;
}

/**
 * This class' functions should be overridden in each script for handling user actions and symbol events
 * @example
 * class MyFeed extends v9.feed	{
 *		onOpen ()
 *		{
 *		}
 *
 *		onLoad ()
 *		{
 *		}
 *
 *		onStop ()
 *		{
 *		}
 *
 *		onRender ()
 *		{
 *		}
 *
 *		onEvent (pSymbol,pEvent,pRealTime)
 *		{
 *		}
 * }
 *
 * let feed = new MyFeed(new v9.edit().symbol);
 */
v9.feed = class {
    /**
     * 
     * @param {String} pSymbol
     */
    constructor(pSymbol) {
        gHome.MakeFeed(gUniq, pSymbol);
        gFeed = this;
    }

    /**
     * Built in feed function that is called when the start button is pressed in order to initialize variables.
     * @param {Object} pMeta - Object representing json meta information. It currently provides the instrument definitions of the supplied symbol.
     * @abstract
     * @example
     * onOpen(pMeta) {
     *
     * }
     */
    onOpen(pMeta) {

    }

    /**
     * Built in feed function that is called once the script has read every previous event in the symbol Feed.
     * @abstract
     * @example
     * onLoad() {
     *
     * }
     */
    onLoad() {
    }

    /**
     * The built in onEvent function is called once for each timestamp tracked in your symbol.
     *
     * This is where you'll be doing most of your calculations on the specific things you're looking for in your symbol. It allows your script to perform different tasks depending on the current event's conditions.
     * @param {String} pSymbol - Name of the current symbol
     * @param {Object} pEvent - Current event being handled
     * @param {Boolean} pRealTime - Boolean determining whether or not to only handle current events
     * @abstract
     * @example
     * onEvent(pSymbol, pEvent, pRealTime) {
     *
     * }
     */
    onEvent(pSymbol, pEvent, pRealTime) {
    }

    /**
     * Built in feed function that is called once for each frame that is rendered to the viewport.
     * @abstract
     * @example
     * onRender() {
     *
     * }
     */
    onRender() {
    }

    /**
     * Built in feed function that is called when the stop button is pressed.
     * @abstract
     * @example
     * onStop() {
     *
     * }
     */
    onStop() {
    }
}

/**
 * Reports errors to the debugging window
 * @param {String} msg
 * @param {String} url
 * @param {Number} lineNo
 * @param {Number} columnNo
 * @param {any} error
 */
window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1) {
        gHome._pageerro(gUniq, 'Script Error: See Browser Console for Detail');
    }
    else {
        //var message = [
        //	'Message: ' + msg,
        //	'URL: ' + url,
        //	'Line: ' + lineNo,
        //	'Column: ' + columnNo,
        //	'Error object: ' + JSON.stringify(error)
        //].join(' - ');

        var message = [
            'Message: ' + msg,
            'Line: ' + lineNo,
            'Column: ' + columnNo
        ].join(' - ');

        gHome._pageerro(gUniq, message);
    }
}

window.onfocus = function () {
    gHome._pagesele(gUniq);
};
