# Gutenberg Block Deprecation & Migration Guide

In WordPress Gutenberg, when you modify the HTML markup returned by `save.js` or change the structure/type of existing block `attributes`, WordPress compares the post's saved HTML against the current `save.js` output. If they do not match byte-for-byte, Gutenberg flags the block as invalid ("This block contains unexpected or invalid content").

To prevent broken blocks on existing user sites, you **MUST** create a deprecation entry in `deprecated.js`.

---

## 🏗️ Structure of `deprecated.js`

Every block has a `deprecated.js` file that exports an array of deprecation objects, ordered from newest to oldest:

```javascript
import { useBlockProps } from '@wordpress/block-editor';
import attributes from './attributes';

// 1. Deprecation for version 1.1.5
const v1_1_5 = {
    attributes: {
        ...attributes,
        // Any old attribute definitions that were removed or changed
    },
    supports: {
        html: false,
        className: false,
    },
    save({ attributes }) {
        // The EXACT JSX / HTML output from version 1.1.5
        const { blockId, sliderType, ...otherAttributes } = attributes;
        const blockProps = useBlockProps.save({
            className: `gslider-wrapper ${blockId}`,
        });

        return (
            <div {...blockProps}>
                {/* Old DOM Structure */}
            </div>
        );
    },
    migrate(attributes) {
        // Transform old attributes into the new schema format
        return {
            ...attributes,
            // Example: migrating old string into responsive object
            speed: typeof attributes.speed === 'number'
                ? { Desktop: attributes.speed, Tablet: attributes.speed, Mobile: attributes.speed }
                : attributes.speed,
        };
    },
};

// 2. Export array (newest to oldest)
const deprecated = [
    v1_1_5,
];

export default deprecated;
```

---

## 📋 Step-by-Step Deprecation Checklist

1. **Copy Current `save.js`**:
   - Before modifying `save.js` for a new release, copy the existing `save.js` function into `deprecated.js` as a new version object (e.g., `const v1_1_8 = { ... }`).
2. **Include Previous Attributes**:
   - If attributes were renamed, deleted, or changed type, keep the old attribute schema in the deprecation object.
3. **Write `migrate()` Function**:
   - If attribute values need transforming (e.g. converting a flat number to `{ Desktop, Tablet, Mobile }`), implement `migrate(attributes)`.
4. **Prepend to Deprecations Array**:
   - Add the newest deprecation object to the beginning of the `deprecated` array:
     `const deprecated = [ v1_1_8, v1_1_5, v1_0_7 ];`.
5. **Verify with Existing Content**:
   - In the WordPress editor, open an existing post containing the block.
   - Verify that the block loads cleanly without any "Attempt Block Recovery" errors.
