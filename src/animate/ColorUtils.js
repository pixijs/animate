/**
 * @namespace PIXI.animate
 * @class ColorUtils
 * @private
 * @description For converting colors
 */
export default class ColorUtils {
    /**
     * Convert the Hexidecimal string (e.g., "#fff") to uint
     * @static
     * @private
     * @method hexToUint
     */
    static hexToUint(hex) {
        // Remove the hash
        hex = hex.substr(1);

        // Convert shortcolors fc9 to ffcc99
        if (hex.length === 3) {
            hex = hex.replace(/([a-f0-9])/g, '$1$1');
        }
        return parseInt(hex, 16);
    }
}