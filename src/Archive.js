/**
 * @module asme
 */

//namesapce
if (typeof window === 'undefined') {
    this.asme = this.asme || {};
} else {
    window.asme = window.asme || {};
}



(function () {
    "use strict";



    /**
     * @static
     * @public
     * @property ARCHIVE_HISTORY_JSON
     * @readOnly
     * @type String
     */
    Object.defineProperty(Archive, 'ARCHIVE_HISTORY_JSON', {
        value: 'history.json'
    });

    /**
     * @static
     * @public
     * @property ARCHIVE_SCREENSHOT_PNG
     * @readOnly
     * @type String
     */
    Object.defineProperty(Archive, 'ARCHIVE_SCREENSHOT_PNG', {
        value: 'screenshot.png'
    });
    /**
     * @static
     * @public
     * @property HISTORY_SYNC_DELAY
     * @readOnly
     * @type Number
     */
    Object.defineProperty(Archive, 'HISTORY_SYNC_DELAY', {
        value: 100
    });
    /**
     * @static
     * @public
     * @property THUMBNAIL_SIZE
     * @readOnly
     * @type Number
     */
    Object.defineProperty(Archive, 'THUMBNAIL_SIZE', {
        value: 200
    });
    /**
     * @static
     * @public
     * @property ARCHIVE_THUMBNAIL_PNG
     * @readOnly
     * @type String
     */
    Object.defineProperty(Archive, 'ARCHIVE_THUMBNAIL_PNG', {
        value: 'thumbnail.png'
    });


    Archive._history = null;

    /**
     * @public
     * @property history
     * @readOnly
     * @type JSON
     */
    Object.defineProperty(Archive, 'history', {
        get: function () {
            /*if (!Archive._history)
                Archive._history = new weavecore.SessionStateLog(WeaveAPI.globalHashMap, Archive.HISTORY_SYNC_DELAY);*/
            return Archive._history;
        },
        set: function (history) {
            Archive._history = history;
        }
    });

    /**
     * @public
     * @property zip
     * @readOnly
     * @type JSZip
     */
    Object.defineProperty(Archive, 'zip', {
        value: new JSZip()
    });



    // constructor:
    /**
     * An object that implements this empty interface has an associated CallbackCollection and session state,
     * accessible through the global functions in the WeaveAPI Object. In order for an ILinkableObject to
     * be created dynamically at runtime, it must not require any constructor parameters.
     * @class Archive
     * @constructor
     */
    function Archive(input) {
        /**
         * temporary solution to save the namespace for this class/prototype
         * @public
         * @property ns
         * @readOnly
         * @type String
         */
        Object.defineProperty(this, 'ns', {
            value: 'asme'
        });



        /**
         * This is a dynamic object containing all the amf objects stored in the archive.
         * The property names used in this object must be valid filenames or serialize() will fail.
         * @public
         * @property zip
         * @readOnly
         * @type JSZip
         */
        Object.defineProperty(this, 'objects', {
            value: {}
        });

        if (input) {
            this._readArchive(input)
        }

    }

    Archive.createScreenshot = function (thumbnailSize) {


    }

    Archive.updateLocalThumbnailAndScreenshot = function (saveScreenshot) {


    }


    /**
     * This function will create an object that can be saved to a file and recalled later with loadWeaveFileContent().
     */
    Archive.createFileContent = function (saveScreenshot) {
        var output = new asme.Archive();

        //thumbnail should go first in the stream because we will often just want to extract the thumbnail and nothing
        //Archive.updateLocalThumbnailAndScreenshot(saveScreenshot);



        // session history
        var _history = Archive.history;
        output.objects[Archive.ARCHIVE_HISTORY_JSON] = _history;

        // TEMPORARY SOLUTION - url cache
        //if (WeaveAPI.URLRequestUtils['saveCache'])
        //output.objects[ARCHIVE_URL_CACHE_AMF] = WeaveAPI.URLRequestUtils.getCache();

        return output.serialize();
    }




    var p = Archive.prototype;

    p.serialize = function () {
        var name;
        var copy = {};
        for (name in this.objects)
            copy[name] = this.objects[name];
        return Archive.zip.generate(copy);
    }

    p._readArchive = function (fileData) {
        var zip = Archive.zip.load(fileData);
        for (var path in zip) {
            var fileName = path.substr(path.indexOf('/') + 1);
            objects[fileName] = zip[path];
        }
    }

    asme.Archive = Archive;

}());
