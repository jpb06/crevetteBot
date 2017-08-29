module.exports = {
    byteArrayToLong: function(/*byte[]*/byteArray) {
        var value = 0;
        for ( var i = byteArray.length - 1; i >= 0; i--) {
            value = (value * 256) + byteArray[i];
        }
    
        return value;
    },
    uintToString: function (uintArray) {
        var encodedString = String.fromCharCode.apply(null, uintArray),
            decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    },
    readUTF16String: function (bytes, bigEndian) {
        let data = '';

        for(let i = 0; i < bytes.length; i+=2) {
            data +=
                String.fromCharCode(
                    this.byteArrayToLong(bytes.slice(i, i+1) )
                )
        }

        return data;
    }
}