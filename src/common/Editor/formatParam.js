
import Quill from 'quill';

const Inline = Quill.import('blots/inline');

class formatParam extends Inline {
    static create() {
        const node = super.create();
        return node;
    }

    static formats(node) {
        return node;
    }
}

formatParam.blotName = 'formatParam';
formatParam.tagName = 'span';

export default formatParam;
