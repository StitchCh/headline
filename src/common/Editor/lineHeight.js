import * as Quill from 'quill'

const Parchment = Quill.import("parchment");

class lineHeightAttributor extends Parchment.Attributor.Class {}
const lineHeightStyle = new lineHeightAttributor(
    "lineHeight",
    "ql-lineHeight",
    {
        scope: Parchment.Scope.INLINE,
        whitelist: []
    }
);



export default lineHeightStyle
