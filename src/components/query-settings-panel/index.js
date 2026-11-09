import { __ } from '@wordpress/i18n';
import { useMemo, useCallback } from '@wordpress/element';
import {
    PanelBody,
    BaseControl,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import Select from 'react-select';
import SwitcherControl from '@Components/switcher-control';
import ResponsiveRangeControl from '@Components/responsive-range-control';
import {
    ORDER_BY_OPTIONS,
    SORT_ORDER_OPTIONS,
    STICKY_POSTS_OPTIONS,
    DATE_RANGE_OPTIONS,
    META_COMPARE_OPTIONS,
    INCLUDE_EXCLUDE_OPTIONS,
} from '@Constants/query-constants';

import './editor.scss';

/**
 * QuerySettingsPanel — Reusable query settings component
 *
 * Uses react-select for all dropdowns, SwitcherControl for Include/Exclude toggles.
 * Dynamically fetches post types, taxonomies, terms, and authors via WordPress REST API.
 *
 * Usage:
 *   import QuerySettingsPanel from '@Components/query-settings-panel';
 *   <QuerySettingsPanel attributes={attributes} setAttributes={setAttributes} />
 */
const QuerySettingsPanel = ({
    attributes,
    setAttributes,
    showMetaQuery = true,
    showDateRange = true,
    showStickyPosts = true,
    showSearchQuery = true,
    showExcludePosts = true,
    showExcludeCurrentPost = true,
    showOffset = true,
    maxPosts = 100,
    panelTitle = __('Query', 'gslider-blocks'),
    initialOpen = false,
    opened,
    onToggle,
    deviceType = 'Desktop',
    showRelatedPostsQuery = false,
}) => {
    const {
        postType,
        postsPerPage,
        categories,
        categoryFilterType,
        tags,
        tagFilterType,
        authors,
        authorFilterType,
        excludePosts,
        offset,
        orderBy,
        order,
        searchQuery,
        stickyPosts,
        taxonomyQuery,
        taxonomyFilterTypes,
        metaKey,
        metaValue,
        metaCompare,
        dateRange,
        excludeCurrentPost,
        useRelatedPostsQuery = false,
        relatedPostsTaxonomy = 'category',
    } = attributes;

    /**
     * Fetch registered post types, taxonomies, terms, and authors from 
     * the WordPress REST API dynamically when the selected post type changes.
     */
    const { postTypes, taxonomies, termsData, allAuthors } = useSelect(
        (select) => {
            const { getPostTypes, getTaxonomies, getEntityRecords } = select('core');

            const activePostTypes = getPostTypes() || [];
            const allTax = getTaxonomies() || [];

            // Filter taxonomies belonging to the selected postType
            const postTax = allTax.filter(
                (tax) => tax.types && tax.types.includes(postType)
            );

            // Fetch terms for each taxonomy
            const termsMap = {};
            postTax.forEach((tax) => {
                termsMap[tax.slug] =
                    getEntityRecords('taxonomy', tax.slug, {
                        per_page: 100,
                        _fields: 'id,name',
                        context: 'view',
                    }) || [];
            });

            return {
                postTypes: activePostTypes,
                taxonomies: postTax,
                termsData: termsMap,
                allAuthors:
                    getEntityRecords('root', 'user', {
                        per_page: 100,
                        _fields: 'id,name',
                        context: 'view',
                    }) || [],
            };
        },
        [postType]
    );

    /**
     * Format the fetched post types into select option objects for the dropdown,
     * filtering out non-viewable types and the 'attachment' (media) type.
     */
    const postTypeOptions = useMemo(() => {
        if (!postTypes) return [];
        return postTypes
            .filter((type) => type.viewable && type.slug !== 'attachment')
            .map((type) => ({ value: type.slug, label: type.name }));
    }, [postTypes]);

    /**
     * Match and return the selected post type option object to populate the current dropdown value.
     */
    const selectedPostType = useMemo(
        () => postTypeOptions.find((opt) => opt.value === postType) || null,
        [postTypeOptions, postType]
    );

    /**
     * Handle post type changes by saving the new type and clearing out terms and 
     * taxonomies selected for the previous post type.
     */
    const handlePostTypeChange = useCallback(
        (option) => {
            if (option) {
                setAttributes({
                    postType: option.value,
                    categories: [],
                    tags: [],
                    taxonomyQuery: {},
                    taxonomyFilterTypes: {},
                });
            }
        },
        [setAttributes]
    );

    /**
     * Retrieve terms list, active selected items, and filter mode (include/exclude)
     * for a specific taxonomy (category, tag, or custom taxonomies).
     */
    const getTaxonomyData = useCallback(
        (taxSlug) => {
            const terms = termsData[taxSlug] || [];
            const options = terms.map((t) => ({ value: t.id, label: t.name }));

            let selectedIds = [];
            let filterType = 'include';

            if (taxSlug === 'category') {
                selectedIds = categories || [];
                filterType = categoryFilterType || 'include';
            } else if (taxSlug === 'post_tag') {
                selectedIds = tags || [];
                filterType = tagFilterType || 'include';
            } else {
                selectedIds = (taxonomyQuery && taxonomyQuery[taxSlug]) || [];
                filterType = (taxonomyFilterTypes && taxonomyFilterTypes[taxSlug]) || 'include';
            }

            const selectedOptions = selectedIds
                .map((id) => {
                    const found = options.find((opt) => opt.value === id);
                    return found || { value: id, label: String( id ) };
                })
                .filter(Boolean);

            return { options, selectedOptions, filterType };
        },
        [termsData, categories, categoryFilterType, tags, tagFilterType, taxonomyQuery, taxonomyFilterTypes]
    );

    /**
     * Save the newly selected term IDs to block attributes for category, tag, or custom taxonomies.
     */
    const handleTaxonomyChange = useCallback(
        (taxSlug, selectedOptions) => {
            const newIds = selectedOptions
                ? selectedOptions.map((opt) => opt.value)
                : [];

            if (taxSlug === 'category') {
                setAttributes({ categories: newIds });
            } else if (taxSlug === 'post_tag') {
                setAttributes({ tags: newIds });
            } else {
                setAttributes({
                    taxonomyQuery: {
                        ...taxonomyQuery,
                        [taxSlug]: newIds,
                    },
                });
            }
        },
        [setAttributes, taxonomyQuery]
    );

    /**
     * Toggle the filter mode (include/exclude) for categories, tags, or custom taxonomies.
     */
    const handleTaxonomyFilterTypeChange = useCallback(
        (taxSlug, value) => {
            if (taxSlug === 'category') {
                setAttributes({ categoryFilterType: value });
            } else if (taxSlug === 'post_tag') {
                setAttributes({ tagFilterType: value });
            } else {
                setAttributes({
                    taxonomyFilterTypes: {
                        ...taxonomyFilterTypes,
                        [taxSlug]: value,
                    },
                });
            }
        },
        [setAttributes, taxonomyFilterTypes]
    );

    /**
     * Transform WordPress users/authors list into dropdown select options.
     */
    const authorOptions = useMemo(
        () => allAuthors.map((user) => ({ value: user.id, label: user.name })),
        [allAuthors]
    );

    /**
     * Match and return the selected author option objects to populate the dropdown state.
     */
    const selectedAuthorOptions = useMemo(() => {
        if (!authors || !authorOptions.length) return [];
        return authors
            .map((id) => authorOptions.find((opt) => opt.value === id))
            .filter(Boolean);
    }, [authors, authorOptions]);

    /**
     * Save the chosen author IDs into block attributes.
     */
    const handleAuthorsChange = useCallback(
        (selectedOptions) => {
            const newIds = selectedOptions
                ? selectedOptions.map((opt) => opt.value)
                : [];
            setAttributes({ authors: newIds });
        },
        [setAttributes]
    );

    /**
     * Get the active orderby option object (e.g. date, title, ID) to select it in the dropdown.
     */
    const selectedOrderBy = useMemo(
        () => ORDER_BY_OPTIONS.find((opt) => opt.value === orderBy) || ORDER_BY_OPTIONS[0],
        [orderBy]
    );

    /**
     * Get the active sort order option object (ASC/DESC) to select it in the dropdown.
     */
    const selectedSortOrder = useMemo(
        () => SORT_ORDER_OPTIONS.find((opt) => opt.value === order) || SORT_ORDER_OPTIONS[0],
        [order]
    );

    /**
     * Get the active sticky posts behavior option object (include/exclude/ignore) to select it in the dropdown.
     */
    const selectedStickyPosts = useMemo(
        () => STICKY_POSTS_OPTIONS.find((opt) => opt.value === stickyPosts) || STICKY_POSTS_OPTIONS[0],
        [stickyPosts]
    );

    /**
     * Get the active date range limit option object to select it in the dropdown.
     */
    const selectedDateRange = useMemo(
        () => DATE_RANGE_OPTIONS.find((opt) => opt.value === dateRange) || DATE_RANGE_OPTIONS[0],
        [dateRange]
    );

    /**
     * Get the active comparison operator option object for Custom Field filtering to select it in the dropdown.
     */
    const selectedMetaCompare = useMemo(
        () => META_COMPARE_OPTIONS.find((opt) => opt.value === metaCompare) || META_COMPARE_OPTIONS[0],
        [metaCompare]
    );

    /**
     * Generate a localized label for the terms dropdown depending on inclusion/exclusion setting.
     * 
     * @param {string} filterType   Filter behavior ('include' or 'exclude').
     * @param {string} taxonomyName The human-readable name of the taxonomy (e.g. Category).
     * @returns {string} The formatted localized label.
     */
    const getTaxLabel = (filterType, taxonomyName) => {
        if (filterType === 'exclude') {
            return __('Exclude', 'gslider-blocks') + ' ' + taxonomyName;
        }
        return __('Include', 'gslider-blocks') + ' ' + taxonomyName;
    };

    /**
     * Setup panel toggle states dynamically, supporting either Gutenberg-controlled
     * state management or local state management.
     */
    const panelProps = {};
    if (typeof opened !== 'undefined') {
        panelProps.opened = opened;
    }
    if (typeof onToggle === 'function') {
        panelProps.onToggle = onToggle;
    }
    if (typeof opened === 'undefined') {
        panelProps.initialOpen = initialOpen;
    }

    /**
     * Render the Query Settings panel including all sub-panels and custom controls.
     */
    return (
        <PanelBody
            title={panelTitle}
            {...panelProps}
        >
            <div className="gslider-query-settings-panel">

                {/* Related Posts Mode */}
                {showRelatedPostsQuery && (
                    <div className="gslider-query-related-posts-section" style={{ marginBottom: '15px', borderBottom: '1px solid #e0e0e0', paddingBottom: '15px' }}>
                        <ToggleControl
                            label={__('Related Posts Mode', 'gslider-blocks')}
                            checked={!!useRelatedPostsQuery}
                            onChange={(value) => setAttributes({ useRelatedPostsQuery: value })}
                            help={__('Automatically fetch posts related to the current post by category or tag.', 'gslider-blocks')}
                        />
                        {!!useRelatedPostsQuery && (
                            <BaseControl
                                label={__('Match Taxonomy By', 'gslider-blocks')}
                                className="gslider-query-related-taxonomy"
                            >
                                <Select
                                    options={[
                                        { label: __('Categories', 'gslider-blocks'), value: 'category' },
                                        { label: __('Tags', 'gslider-blocks'), value: 'post_tag' },
                                        { label: __('Categories & Tags', 'gslider-blocks'), value: 'both' },
                                    ]}
                                    value={[
                                        { label: __('Categories', 'gslider-blocks'), value: 'category' },
                                        { label: __('Tags', 'gslider-blocks'), value: 'post_tag' },
                                        { label: __('Categories & Tags', 'gslider-blocks'), value: 'both' },
                                    ].find(opt => opt.value === relatedPostsTaxonomy) || { label: __('Categories', 'gslider-blocks'), value: 'category' }}
                                    onChange={(option) => setAttributes({ relatedPostsTaxonomy: option.value })}
                                    className="gslider-query-select2-control"
                                    classNamePrefix="gslider-select2"
                                />
                            </BaseControl>
                        )}
                    </div>
                )}

                {/* Post Type (Hide if related query active) */}
                {!useRelatedPostsQuery && (
                    <BaseControl
                        label={__('Post Type', 'gslider-blocks')}
                        className="gslider-query-post-type"
                    >
                        <Select
                            options={postTypeOptions}
                            value={selectedPostType}
                            onChange={handlePostTypeChange}
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Dynamic Taxonomies (Category, Tag, Custom Taxonomies) (Hide if related query active) */}
                {!useRelatedPostsQuery && taxonomies && taxonomies.map((taxonomy) => {
                    const { options, selectedOptions, filterType } = getTaxonomyData(taxonomy.slug);

                    return (
                        <div key={taxonomy.slug} className="gslider-query-taxonomy-section">
                            <SwitcherControl
                                label={taxonomy.name}
                                options={INCLUDE_EXCLUDE_OPTIONS}
                                value={filterType}
                                onChange={(value) =>
                                    handleTaxonomyFilterTypeChange(taxonomy.slug, value)
                                }
                            />

                            <BaseControl
                                label={getTaxLabel(filterType, taxonomy.name)}
                                className="gslider-query-taxonomy-select"
                            >
                                <Select
                                    options={options}
                                    value={selectedOptions}
                                    onChange={(selected) =>
                                        handleTaxonomyChange(taxonomy.slug, selected)
                                    }
                                    isMulti
                                    isClearable
                                    placeholder={__('Select...', 'gslider-blocks')}
                                    className="gslider-query-select2-control"
                                    classNamePrefix="gslider-select2"
                                />
                            </BaseControl>
                        </div>
                    );
                })}

                {/* Authors (Hide if related query active) */}
                {!useRelatedPostsQuery && (
                    <div className="gslider-query-taxonomy-section">
                        <SwitcherControl
                            label={__('Author', 'gslider-blocks')}
                            options={INCLUDE_EXCLUDE_OPTIONS}
                            value={authorFilterType || 'include'}
                            onChange={(value) =>
                                setAttributes({ authorFilterType: value })
                            }
                        />

                        <BaseControl
                            label={
                                (authorFilterType || 'include') === 'exclude'
                                    ? __('Exclude Authors', 'gslider-blocks')
                                    : __('Include Authors', 'gslider-blocks')
                            }
                            className="gslider-query-author-select"
                        >
                            <Select
                                options={authorOptions}
                                value={selectedAuthorOptions}
                                onChange={handleAuthorsChange}
                                isMulti
                                isClearable
                                placeholder={__('Select...', 'gslider-blocks')}
                                className="gslider-query-select2-control"
                                classNamePrefix="gslider-select2"
                            />
                        </BaseControl>
                    </div>
                )}

                {/* Order By */}
                <BaseControl
                    label={__('Order By', 'gslider-blocks')}
                    className="gslider-query-order-by"
                >
                    <Select
                        options={ORDER_BY_OPTIONS}
                        value={selectedOrderBy}
                        onChange={(option) =>
                            setAttributes({ orderBy: option.value })
                        }
                        className="gslider-query-select2-control"
                        classNamePrefix="gslider-select2"
                    />
                </BaseControl>

                {/* Sort Order */}
                <BaseControl
                    label={__('Sort Order', 'gslider-blocks')}
                    className="gslider-query-sort-order"
                >
                    <Select
                        options={SORT_ORDER_OPTIONS}
                        value={selectedSortOrder}
                        onChange={(option) =>
                            setAttributes({ order: option.value })
                        }
                        className="gslider-query-select2-control"
                        classNamePrefix="gslider-select2"
                    />
                </BaseControl>

                {/* Posts Per Page */}
                <ResponsiveRangeControl
                    label={panelTitle === __('Query Settings', 'gslider-blocks') ? __('Posts Count', 'gslider-blocks') : __('Post Per Page', 'gslider-blocks')}
                    rangeValue={postsPerPage}
                    onChangeValue={(value) => setAttributes({ postsPerPage: value })}
                    deviceType={deviceType}
                    min={1}
                    max={maxPosts}
                    step={1}
                    resetFallbackValue="6"
                    isRangeUnit={false}
                />

                {/* Offset */}
                {showOffset && (
                    <ResponsiveRangeControl
                        label={__('Offset', 'gslider-blocks')}
                        rangeValue={offset}
                        onChangeValue={(value) => setAttributes({ offset: value })}
                        deviceType={deviceType}
                        min={0}
                        max={100}
                        step={1}
                        resetFallbackValue="0"
                        isRangeUnit={false}
                    />
                )}

                {/* Sticky Posts (Hide if related query active) */}
                {!useRelatedPostsQuery && showStickyPosts && (
                    <BaseControl
                        label={__('Sticky Posts', 'gslider-blocks')}
                        className="gslider-query-sticky-posts"
                    >
                        <Select
                            options={STICKY_POSTS_OPTIONS}
                            value={selectedStickyPosts}
                            onChange={(option) =>
                                setAttributes({ stickyPosts: option.value })
                            }
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Date Range (Hide if related query active) */}
                {!useRelatedPostsQuery && showDateRange && (
                    <BaseControl
                        label={__('Date Range', 'gslider-blocks')}
                        className="gslider-query-date-range"
                    >
                        <Select
                            options={DATE_RANGE_OPTIONS}
                            value={selectedDateRange}
                            onChange={(option) =>
                                setAttributes({ dateRange: option.value })
                            }
                            className="gslider-query-select2-control"
                            classNamePrefix="gslider-select2"
                        />
                    </BaseControl>
                )}

                {/* Meta Query (Hide if related query active) */}
                {!useRelatedPostsQuery && showMetaQuery && (
                    <>
                        <ToggleControl
                            label={__('Filter by Custom Field (Meta)', 'gslider-blocks')}
                            checked={!!metaKey}
                            onChange={(value) => {
                                if (!value) {
                                    setAttributes({
                                        metaKey: '',
                                        metaValue: '',
                                        metaCompare: '=',
                                    });
                                } else {
                                    setAttributes({ metaKey: 'featured' });
                                }
                            }}
                        />

                        {!!metaKey && (
                            <div className="gslider-meta-query-settings">
                                <TextControl
                                    label={__('Meta Key', 'gslider-blocks')}
                                    value={metaKey}
                                    onChange={(value) =>
                                        setAttributes({ metaKey: value })
                                    }
                                    help={__('Enter the custom field name/key.', 'gslider-blocks')}
                                />

                                <BaseControl
                                    label={__('Comparison Operator', 'gslider-blocks')}
                                    className="gslider-query-meta-compare"
                                >
                                    <Select
                                        options={META_COMPARE_OPTIONS}
                                        value={selectedMetaCompare}
                                        onChange={(option) =>
                                            setAttributes({ metaCompare: option.value })
                                        }
                                        className="gslider-query-select2-control"
                                        classNamePrefix="gslider-select2"
                                    />
                                </BaseControl>

                                {!['EXISTS', 'NOT EXISTS'].includes(metaCompare) && (
                                    <TextControl
                                        label={__('Meta Value', 'gslider-blocks')}
                                        value={metaValue}
                                        onChange={(value) =>
                                            setAttributes({ metaValue: value })
                                        }
                                        help={__('Enter the custom field value to compare.', 'gslider-blocks')}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* Search Keyword (Hide if related query active) */}
                {!useRelatedPostsQuery && showSearchQuery && (
                    <TextControl
                        label={__('Search Keyword', 'gslider-blocks')}
                        value={searchQuery}
                        onChange={(value) =>
                            setAttributes({ searchQuery: value })
                        }
                        help={__('Filter posts by search terms.', 'gslider-blocks')}
                    />
                )}

                {/* Exclude Post IDs (Hide if related query active) */}
                {!useRelatedPostsQuery && showExcludePosts && (
                    <TextControl
                        label={__('Exclude Post IDs', 'gslider-blocks')}
                        value={excludePosts}
                        onChange={(value) =>
                            setAttributes({ excludePosts: value })
                        }
                        help={__('Comma-separated list of post IDs to exclude.', 'gslider-blocks')}
                    />
                )}

                {/* Exclude Current Post (Hide if related query active - automatically excluded) */}
                {!useRelatedPostsQuery && showExcludeCurrentPost && (
                    <ToggleControl
                        label={__('Exclude Current Post', 'gslider-blocks')}
                        checked={excludeCurrentPost}
                        onChange={(value) =>
                            setAttributes({ excludeCurrentPost: value })
                        }
                        help={__('Prevent the current post from showing up.', 'gslider-blocks')}
                    />
                )}
            </div>
        </PanelBody>
    );
};

export default QuerySettingsPanel;
