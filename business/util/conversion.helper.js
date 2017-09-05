let unit = module.exports = {
    "byteArrayToLong": (/*byte[]*/byteArray) => {
        var value = 0;
        for (var i = byteArray.length - 1; i >= 0; i--) {
            value = (value * 256) + byteArray[i];
        }

        return value;
    },
    "uintToString": (uintArray) => {
        var encodedString = String.fromCharCode.apply(null, uintArray),
            decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    },
    "readUTF16String": (bytes, bigEndian) => {
        let data = '';

        for (let i = 0; i < bytes.length; i += 2) {
            data +=
                String.fromCharCode(
                    unit.byteArrayToLong(bytes.slice(i, i + 1))
                )
        }

        return data;
    }
}