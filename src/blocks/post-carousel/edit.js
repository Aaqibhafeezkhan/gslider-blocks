/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps, import/no-unresolved, jsdoc/require-param, no-nested-ternary, jsx-a11y/anchor-is-valid */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Placeholder } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import renderSVG from '@Components/icon-picker/components/icon-picker/controls/renderIcon';
import SwitchToBlockSettings from '@Utils/switchToBlockSettings';
import Inspector from './inspector';
import useBlockIdGenerator from '@Utils/useBlockIdGenerator';
import generatePostCarouselStyle from './styling';
import { normalizeContentOrder } from './content-order';
import usePostQuery from '@Utils/hooks/usePostQuery';
import {
	getFeaturedImageUrl,
	getPostCategories,
	getPostTags,
	getExcerpt,
	getAuthorName,
	getAuthorAvatarUrl,
	getFormattedDate,
	decodeHtmlEntities,
} from '@Utils/postHelpers';
import { getPostQueryArgs } from '@Utils/getPostQueryArgs';
import {
	initCardTilt,
	initEntranceAnimations,
	applyStaggerDelays,
} from '@Utils/animation-utils';

export default function Edit( {
	attributes,
	setAttributes,
	clientId,
	isSelected,
} ) {
	const {
		blockId,
		blockStyle,
		deviceType,
		carouselPerColumn,
		carouselPerColumnGap,
		speed,
		autoplay,
		autoplayDelay,
		infiniteLoop,
		allowTouchMove,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		carouselEffect,
		mousewheelControl,
		keyboardNavigation,
		paginationType,
		dynamicBullets,

		paginationPositionType,
		showNavigation,
		showPagination,
		showFeaturedImage,
		showPostTitle,
		showExcerpt,
		showMeta,
		showMetaAuthor,
		showMetaAvatar,
		showMetaDate,
		showTaxonomy,

		globalID,
		globalClass,
		navigationArrowPositionType,
		navigationArrowPosition,

		navigationArrowsIconSwitcher,
		navigationArrowsIconLeftAlign,
		navigationArrowsIconLeft,
		navigationArrowsIconLeftImageUrl,
		navigationArrowsIconLeftImageAlt,

		navigationArrowsIconRightAlign,
		navigationArrowsIconRight,
		navigationArrowsIconRightImageUrl,
		navigationArrowsIconRightImageAlt,

		enableLazyLoad,
		contentOrder,
		postTaxonomyDisplay,

		readMoreButtonText,
		showReadMoreButton,
		readMoreButtonLinkType,
		readMoreButtonLink,
		readMoreButtonTargetLink,
		readMoreButtonNofollow,
		readMoreButtonSponsored,

		readMoreButtonIconSwitcher,
		readMoreButtonIconType,
		readMoreButtonIconPosition,
		readMoreButtonIcon,
		readMoreButtonIconImageUrl,
		readMoreButtonIconImageAlt,

		postType,
		useRelatedPostsQuery,
		relatedPostsTaxonomy,
		postTitleHtmlTag,
		enablePostTitleLimit,
		postTitleLimitType,
		postTitleLimit,
		postTitleLimitSuffix,

		enablePostTitleLink,
		postTitleLinkTarget,
		postTitleLinkNofollow,
		postTitleLinkSponsored,

		enablePostTitleHoverUnderlineAnim,
		postTitleHoverUnderlineColor,
		postTitleHoverUnderlineHeight,
		postTitleHoverUnderlineBottomOffset,
		postTitleHoverUnderlineTransitionSpeed,

		showPostTitleDivider,
		postTitleDividerStyle,
		postTitleDividerColorSwitcher,
		postTitleDividerColor,
		postTitleDividerHoverColor,
		postTitleDividerWidth,
		postTitleDividerWidthUnits,
		postTitleDividerHeight,
		postTitleDividerHeightUnits,
		enablePostTitleDividerHoverExpand,
		postExcerptHtmlTag,
		enablePostExcerptLimit,
		postExcerptLimitType,
		postExcerptLimit,
		postExcerptLimitSuffix,
		postExcerptSource,
		postExcerptLineClamp,

		// Animations
		cardEntranceAnimation,
		cardEntranceAnimationDuration,
		cardEntranceAnimationDelay,
		cardEntranceAnimationOffset,
		cardEntranceAnimationEasing,
		enableStaggerAnimation,
		cardStaggerDelay,
		cardHoverAnimation,
		cardHoverAnimationDuration,
		enableCardTilt,
		cardTiltMaxAngle,
		cardTiltPerspective,
		cardTiltHoverScale,
		cardTiltTransitionSpeed,
		enableTaxonomyBadgeOverlay,
		taxonomyBadgeOverlayPosition,
		taxonomyBadgeOverlayVisibility,
	} = attributes;

	/** Handle block ID generation (handles duplication and initial ID) */
	useBlockIdGenerator( {
		clientId,
		blockId,
		blockPrefix: 'gslider-post-carousel',
		isSelected,
		attributes,
		setAttributes,
	} );

	/** Start Generate Block Style */
	useEffect( () => {
		if ( blockId ) {
			const css = generatePostCarouselStyle( attributes );
			setAttributes( { blockStyle: css } );
		}
	}, [ attributes, blockId ] );
	/** End Generate Block Style */

	const hasEntranceAnimation =
		cardEntranceAnimation && cardEntranceAnimation !== 'none';

	/** Block props for container */
	const blockProps = useBlockProps( {
		className: `gslider-post-carousel-wrapper ${ blockId } ${ navigationArrowPositionType } ${ navigationArrowPosition } ${
			showPagination ? 'has-pagination' : ''
		} ${
			cardHoverAnimation !== 'none'
				? `gslider-card-hover-${ cardHoverAnimation }`
				: ''
		}`,
		'data-animation-settings': hasEntranceAnimation
			? JSON.stringify( {
					duration: {
						Desktop: cardEntranceAnimationDuration?.Desktop ?? 600,
						Tablet: cardEntranceAnimationDuration?.Tablet ?? 600,
						Mobile: cardEntranceAnimationDuration?.Mobile ?? 600,
					},
					delay: {
						Desktop: cardEntranceAnimationDelay?.Desktop ?? 0,
						Tablet: cardEntranceAnimationDelay?.Tablet ?? 0,
						Mobile: cardEntranceAnimationDelay?.Mobile ?? 0,
					},
					offset: {
						Desktop: cardEntranceAnimationOffset?.Desktop ?? 15,
						Tablet: cardEntranceAnimationOffset?.Tablet ?? 15,
						Mobile: cardEntranceAnimationOffset?.Mobile ?? 15,
					},
					easing: cardEntranceAnimationEasing,
			  } )
			: undefined,
		'data-stagger-enabled':
			enableStaggerAnimation && hasEntranceAnimation ? '1' : undefined,
		'data-stagger-delay':
			enableStaggerAnimation && hasEntranceAnimation
				? JSON.stringify( {
						Desktop: cardStaggerDelay?.Desktop ?? 100,
						Tablet: cardStaggerDelay?.Tablet ?? 100,
						Mobile: cardStaggerDelay?.Mobile ?? 100,
				  } )
				: undefined,
		'data-tilt-perspective': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltPerspective?.Desktop ?? 800,
					Tablet: cardTiltPerspective?.Tablet ?? 800,
					Mobile: cardTiltPerspective?.Mobile ?? 800,
			  } )
			: undefined,
		'data-tilt-scale': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltHoverScale?.Desktop ?? 1.02,
					Tablet: cardTiltHoverScale?.Tablet ?? 1.02,
					Mobile: cardTiltHoverScale?.Mobile ?? 1.02,
			  } )
			: undefined,
		'data-tilt-speed': enableCardTilt
			? JSON.stringify( {
					Desktop: cardTiltTransitionSpeed?.Desktop ?? 400,
					Tablet: cardTiltTransitionSpeed?.Tablet ?? 400,
					Mobile: cardTiltTransitionSpeed?.Mobile ?? 400,
			  } )
			: undefined,
	} );

	const normalizedContentOrder = normalizeContentOrder( contentOrder );

	/** Fetch current post ID, categories, tags, and CPT taxonomies for query mapping */
	const {
		currentPostId,
		taxonomies,
		currentPostCategories,
		currentPostTags,
		currentPostType,
	} = useSelect( ( select ) => {
		const { getCurrentPostId, getEditedPostAttribute, getCurrentPostType } =
			select( 'core/editor' ) || {};
		const { getTaxonomies } = select( 'core' );
		return {
			currentPostId: getCurrentPostId ? getCurrentPostId() : null,
			taxonomies: getTaxonomies ? getTaxonomies() || [] : [],
			currentPostCategories: getEditedPostAttribute
				? getEditedPostAttribute( 'categories' ) || []
				: [],
			currentPostTags: getEditedPostAttribute
				? getEditedPostAttribute( 'tags' ) || []
				: [],
			currentPostType: getCurrentPostType ? getCurrentPostType() : null,
		};
	}, [] );

	/** Construct dynamic query arguments for the REST API */
	const queryArgs = getPostQueryArgs(
		attributes,
		deviceType,
		currentPostId,
		taxonomies,
		currentPostCategories,
		currentPostTags
	);

	/** Fetch posts using global usePostQuery hook */
	const resolvedPostType =
		useRelatedPostsQuery && currentPostType ? currentPostType : postType;
	const { posts, isLoading } = usePostQuery( queryArgs, resolvedPostType );

	/** Refs for vanilla JS Swiper */
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );

	/** Ref for panel settings focus management */
	const panelRef = useRef( null );
	SwitchToBlockSettings( panelRef );

	/** Refs for navigation buttons */
	const prevRef = useRef( null );
	const nextRef = useRef( null );
	const paginationInsideRef = useRef( null );
	const paginationOutsideRef = useRef( null );

	/**
	 * Vanilla JS Swiper initialization
	 * Destroys and recreates Swiper when settings change for instant updates
	 */
	useEffect( () => {
		// Check if Swiper is available globally and container exists
		if (
			! window.Swiper ||
			! swiperContainerRef.current ||
			! posts ||
			posts.length === 0
		) {
			return;
		}

		// Destroy previous instance if exists
		if ( swiperInstanceRef.current ) {
			swiperInstanceRef.current.destroy( true, true );
			swiperInstanceRef.current = null;
		}

		// Clean up any Swiper loop duplicates from the DOM before re-initialization
		if ( swiperContainerRef.current ) {
			const duplicates = swiperContainerRef.current.querySelectorAll(
				'.swiper-slide-duplicate'
			);
			duplicates.forEach( ( slide ) => slide.remove() );
		}

		// Clear both pagination elements to prevent stale bullets when switching position
		if ( paginationInsideRef.current ) {
			paginationInsideRef.current.innerHTML = '';
		}
		if ( paginationOutsideRef.current ) {
			paginationOutsideRef.current.innerHTML = '';
		}

		// Build Swiper settings
		const swiperSettings = {
			effect: carouselEffect,
			breakpoints: {
				0: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 1,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] || 0,
				},
				768: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 2,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] || 20,
				},
				1025: {
					slidesPerView: carouselPerColumn?.[ deviceType ] || 3,
					spaceBetween: carouselPerColumnGap?.[ deviceType ] || 20,
				},
			},
			loop: infiniteLoop,
			autoplay: autoplay
				? {
						delay: autoplayDelay?.[ deviceType ] || 1000,
						pauseOnMouseEnter:
							pauseOnHover ||
							enableCardTilt ||
							cardHoverAnimation !== 'none',
						disableOnInteraction: false,
						stopOnLastSlide,
						reverseDirection,
				  }
				: false,
			speed: speed?.[ deviceType ] || 800,
			allowTouchMove,
			mousewheel: mousewheelControl,
			keyboard: keyboardNavigation
				? {
						enabled: true,
						onlyInViewport: true,
						pageUpDown: false,
				  }
				: false,
			navigation: showNavigation?.[ deviceType ]
				? {
						prevEl: prevRef.current,
						nextEl: nextRef.current,
				  }
				: false,
			pagination: showPagination?.[ deviceType ]
				? {
						el:
							paginationPositionType === 'outside'
								? paginationOutsideRef.current
								: paginationInsideRef.current,
						type: paginationType,
						dynamicBullets:
							paginationType === 'bullets'
								? dynamicBullets
								: false,
						clickable: true,
				  }
				: false,
		};

		// Initialize new Swiper instance
		swiperInstanceRef.current = new window.Swiper(
			swiperContainerRef.current,
			swiperSettings
		);

		// Initialize Card Tilt & Entrance Animations in editor
		if ( swiperContainerRef.current ) {
			const wrapper = swiperContainerRef.current.closest(
				'.gslider-post-carousel-wrapper'
			);
			if ( wrapper ) {
				if ( enableCardTilt ) {
					wrapper.dataset.tiltMax = String( cardTiltMaxAngle );
					wrapper.dataset.tiltPerspective =
						String( cardTiltPerspective );
					wrapper.dataset.tiltScale = String( cardTiltHoverScale );
					wrapper.dataset.tiltSpeed = String(
						cardTiltTransitionSpeed
					);
					initCardTilt( wrapper );
				}

				if ( hasEntranceAnimation ) {
					// Reset inline styles on cards before initializing to trigger replay
					const cards = wrapper.querySelectorAll(
						'.gslider-has-entrance-anim'
					);
					cards.forEach( ( card ) => {
						card.style.visibility = '';
						card.style.animationDelay = '';
						card.style.animationTimingFunction = '';
						card.style.removeProperty( '--animate-duration' );
					} );
					applyStaggerDelays( wrapper );
					initEntranceAnimations( wrapper );
				}
			}
		}

		// Cleanup on unmount or before re-initialization
		return () => {
			if ( swiperInstanceRef.current ) {
				swiperInstanceRef.current.destroy( true, true );
				swiperInstanceRef.current = null;
			}
			if ( swiperContainerRef.current ) {
				const duplicates = swiperContainerRef.current.querySelectorAll(
					'.swiper-slide-duplicate'
				);
				duplicates.forEach( ( slide ) => slide.remove() );
			}
		};
	}, [
		blockId,
		deviceType,
		posts,
		carouselEffect,
		carouselPerColumn,
		carouselPerColumnGap,
		infiniteLoop,
		autoplay,
		autoplayDelay,
		pauseOnHover,
		stopOnLastSlide,
		reverseDirection,
		speed,
		allowTouchMove,
		mousewheelControl,
		keyboardNavigation,
		showNavigation,
		showPagination,
		paginationType,
		dynamicBullets,
		paginationPositionType,
		navigationArrowPositionType,
		navigationArrowPosition,
		navigationArrowsIconSwitcher,
		navigationArrowsIconLeft,
		navigationArrowsIconRight,
		enableCardTilt,
		cardTiltMaxAngle,
		cardTiltPerspective,
		cardTiltHoverScale,
		cardTiltTransitionSpeed,
		cardEntranceAnimation,
		cardEntranceAnimationDuration,
		cardEntranceAnimationDelay,
		cardEntranceAnimationOffset,
		cardEntranceAnimationEasing,
		enableStaggerAnimation,
		cardStaggerDelay,
	] );

	return (
		<>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps }>
				{ ( isLoading || ! posts ) && (
					<div className="gslider-post-carousel-loading-container">
						<div
							className="gslider-post-carousel-skeleton-wrapper"
							style={ {
								display: 'grid',
								gridTemplateColumns: `repeat(${
									carouselPerColumn?.[ deviceType ] || 3
								}, 1fr)`,
								gap: `${
									carouselPerColumnGap?.[ deviceType ] || 20
								}px`,
							} }
						>
							{ Array.from( {
								length: carouselPerColumn?.[ deviceType ] || 3,
							} ).map( ( _, idx ) => (
								<div
									key={ idx }
									className="gslider-post-carousel-skeleton-card"
								>
									<div className="gslider-skeleton-item gslider-skeleton-image"></div>
									<div className="gslider-skeleton-content">
										<div className="gslider-skeleton-item gslider-skeleton-category"></div>
										<div className="gslider-skeleton-item gslider-skeleton-title"></div>
										<div className="gslider-skeleton-item gslider-skeleton-text"></div>
										<div className="gslider-skeleton-item gslider-skeleton-text short"></div>
										<div className="gslider-skeleton-item gslider-skeleton-meta"></div>
									</div>
								</div>
							) ) }
						</div>
					</div>
				) }

				{ ! isLoading && posts && posts.length === 0 && (
					<Placeholder
						icon={
							<span className="dashicons dashicons-admin-post" />
						}
						label={ __( 'Post Carousel', 'gslider-blocks' ) }
						instructions={ __(
							'No posts found. Create some posts to display in the carousel.',
							'gslider-blocks'
						) }
					/>
				) }

				{ ! isLoading && posts && posts.length > 0 && (
					<div
						className="swiper"
						ref={ swiperContainerRef }
						role="region"
						aria-label="Post Carousel"
						key={ posts.map( ( p ) => p.id ).join( '-' ) }
					>
						<div className="swiper-wrapper">
							{ posts.map( ( post ) => {
								const featuredImageUrl =
									getFeaturedImageUrl( post );
								const categories = getPostCategories( post );
								const tags = getPostTags( post );
								const excerpt = getExcerpt( post, 20, {
									enablePostExcerptLimit,
									postExcerptLimitType,
									postExcerptLimit,
									postExcerptLimitSuffix,
									postExcerptSource,
									deviceType,
								} );
								const authorName = getAuthorName( post );
								const authorAvatarUrl =
									getAuthorAvatarUrl( post );
								const formattedDate = getFormattedDate( post );
								const TagName = postTitleHtmlTag || 'h3';
								const ExcerptTagName =
									postExcerptHtmlTag || 'p';

								const renderTaxonomies = () => {
									if ( ! showTaxonomy?.[ deviceType ] ) {
										return null;
									}
									const showCat =
										postTaxonomyDisplay === 'category' ||
										postTaxonomyDisplay === 'both';
									const showTag =
										postTaxonomyDisplay === 'tag' ||
										postTaxonomyDisplay === 'both';

									const hasCat =
										showCat && categories.length > 0;
									const hasTag = showTag && tags.length > 0;

									if ( ! hasCat && ! hasTag ) {
										return null;
									}

									return (
										<>
											{ hasCat && (
												<div
													key="categories-wrap"
													className="gslider-post-carousel-categories"
												>
													{ categories.map(
														( cat ) => (
															<span
																key={ `cat-${ cat.id }` }
																className="gslider-category-item"
															>
																{ cat.name }
															</span>
														)
													) }
												</div>
											) }
											{ hasTag && (
												<div
													key="tags-wrap"
													className="gslider-post-carousel-tags"
												>
													{ tags.map( ( tag ) => (
														<span
															key={ `tag-${ tag.id }` }
															className="gslider-tag-item"
														>
															{ tag.name }
														</span>
													) ) }
												</div>
											) }
										</>
									);
								};

								return (
									<div
										className="swiper-slide"
										key={ post.id }
									>
										<div
											className={ `gslider-post-carousel-content-wrapper ${ globalClass }` }
											{ ...( globalID && {
												id: globalID,
											} ) }
											ref={ panelRef }
										>
											<article
												className={ `gslider-post-carousel-card${
													hasEntranceAnimation
														? ` animated ${ cardEntranceAnimation } gslider-has-entrance-anim`
														: ''
												}${
													enableCardTilt
														? ' gslider-has-tilt'
														: ''
												}` }
											>
												{ ( () => {
													const renderGroupMap = {
														thumbnail:
															showFeaturedImage?.[
																deviceType
															] &&
															featuredImageUrl ? (
																<div
																	key="thumbnail"
																	className="gslider-post-carousel-image"
																>
																	<img
																		src={
																			featuredImageUrl
																		}
																		alt={ decodeHtmlEntities(
																			post
																				.title
																				.rendered
																		) }
																		loading={
																			enableLazyLoad
																				? 'lazy'
																				: undefined
																		}
																	/>
																	{ enableTaxonomyBadgeOverlay && (
																		<div
																			className={ `gslider-taxonomy-badge-overlay gslider-badge-visibility-${ taxonomyBadgeOverlayVisibility } gslider-badge-position-${ taxonomyBadgeOverlayPosition }` }
																		>
																			{ renderTaxonomies() }
																		</div>
																	) }
																</div>
															) : null,

														categories:
															! enableTaxonomyBadgeOverlay ||
															! (
																showFeaturedImage?.[
																	deviceType
																] &&
																featuredImageUrl
															)
																? renderTaxonomies()
																: null,

														title: showPostTitle?.[
															deviceType
														]
															? ( () => {
																	const rawTitleText =
																		decodeHtmlEntities(
																			post
																				.title
																				.rendered
																		);
																	let trimmedTitle =
																		rawTitleText;
																	if (
																		enablePostTitleLimit
																	) {
																		const limitVal =
																			parseInt(
																				postTitleLimit?.[
																					deviceType
																				] ||
																					( postTitleLimitType ===
																					'words'
																						? '10'
																						: '50' ),
																				10
																			);
																		if (
																			postTitleLimitType ===
																			'words'
																		) {
																			const words =
																				rawTitleText.split(
																					/\s+/
																				);
																			if (
																				words.length >
																				limitVal
																			) {
																				trimmedTitle =
																					words
																						.slice(
																							0,
																							limitVal
																						)
																						.join(
																							' '
																						) +
																					( postTitleLimitSuffix ||
																						'...' );
																			}
																		} else if (
																			rawTitleText.length >
																			limitVal
																		) {
																			trimmedTitle =
																				rawTitleText.substring(
																					0,
																					limitVal
																				) +
																				( postTitleLimitSuffix ||
																					'...' );
																		}
																	}

																	const wrapperClass = `gslider-post-carousel-title-wrapper${
																		showPostTitleDivider
																			? ' has-divider'
																			: ''
																	}`;
																	const titleClass = `gslider-post-carousel-title${
																		enablePostTitleHoverUnderlineAnim
																			? ' hover-underline-anim'
																			: ''
																	}`;

																	return (
																		<div
																			key="title"
																			className={
																				wrapperClass
																			}
																		>
																			<TagName
																				className={
																					titleClass
																				}
																			>
																				{ enablePostTitleLink ? (
																					<a
																						href="#"
																						onClick={ (
																							e
																						) =>
																							e.preventDefault()
																						}
																					>
																						{
																							trimmedTitle
																						}
																					</a>
																				) : (
																					trimmedTitle
																				) }
																			</TagName>
																		</div>
																	);
															  } )()
															: null,

														excerpt:
															showExcerpt?.[
																deviceType
															] && excerpt
																? ( () => {
																		const clampValue =
																			postExcerptLineClamp?.[
																				deviceType
																			];
																		const clampStyles =
																			clampValue
																				? {
																						display:
																							'-webkit-box',
																						WebkitBoxOrient:
																							'vertical',
																						overflow:
																							'hidden',
																						WebkitLineClamp:
																							clampValue,
																				  }
																				: {};

																		return (
																			<div
																				key="excerpt"
																				className="gslider-post-carousel-excerpt-wrapper"
																			>
																				<ExcerptTagName
																					className="gslider-post-carousel-excerpt"
																					style={
																						clampStyles
																					}
																				>
																					{
																						excerpt
																					}
																				</ExcerptTagName>
																			</div>
																		);
																  } )()
																: null,

														meta:
															showMeta?.[
																deviceType
															] &&
															( ( ( showMetaAuthor?.[
																deviceType
															] ??
																true ) &&
																authorName ) ||
																( ( showMetaDate?.[
																	deviceType
																] ??
																	true ) &&
																	formattedDate ) ) ? (
																<div
																	key="meta"
																	className="gslider-post-carousel-meta"
																>
																	{ ( showMetaAuthor?.[
																		deviceType
																	] ??
																		true ) &&
																		authorName && (
																			<div className="gslider-post-author-wrapper">
																				{ ( showMetaAvatar?.[
																					deviceType
																				] ??
																					true ) && (
																					<div className="gslider-post-author-avatar-wrapper">
																						{ authorAvatarUrl ? (
																							<img
																								className="gslider-post-author-avatar"
																								src={
																									authorAvatarUrl
																								}
																								alt={
																									authorName
																								}
																								width="28"
																								height="28"
																							/>
																						) : (
																							<svg
																								className="gslider-post-author-avatar-placeholder"
																								width="28"
																								height="28"
																								viewBox="0 0 24 24"
																								fill="none"
																								stroke="currentColor"
																								strokeWidth="2"
																							>
																								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
																								<circle
																									cx="12"
																									cy="7"
																									r="4"
																								/>
																							</svg>
																						) }
																					</div>
																				) }
																				<div className="gslider-post-author">
																					{
																						authorName
																					}
																				</div>
																			</div>
																		) }
																	{ ( showMetaDate?.[
																		deviceType
																	] ??
																		true ) &&
																		formattedDate && (
																			<div className="gslider-post-date-wrapper">
																				<div className="gslider-post-date">
																					{
																						formattedDate
																					}
																				</div>
																			</div>
																		) }
																</div>
															) : null,

														readmore:
															showReadMoreButton?.[
																deviceType
															]
																? ( () => {
																		const readMoreText =
																			readMoreButtonText ||
																			__(
																				'Read More',
																				'gslider-blocks'
																			);
																		const hasIcon =
																			readMoreButtonIconSwitcher;

																		let iconMarkup =
																			null;
																		if (
																			hasIcon
																		) {
																			if (
																				readMoreButtonIconType ===
																					'icon' &&
																				readMoreButtonIcon
																			) {
																				iconMarkup =
																					(
																						<span className="gslider-readmore-icon-wrap">
																							{ renderSVG(
																								readMoreButtonIcon
																							) }
																						</span>
																					);
																			} else if (
																				readMoreButtonIconType ===
																					'image' &&
																				readMoreButtonIconImageUrl
																			) {
																				iconMarkup =
																					(
																						<span className="gslider-readmore-icon-wrap">
																							<img
																								src={
																									readMoreButtonIconImageUrl
																								}
																								alt={
																									readMoreButtonIconImageAlt
																								}
																							/>
																						</span>
																					);
																			}
																		}

																		return (
																			<div
																				key="readmore"
																				className="gslider-post-carousel-readmore"
																			>
																				<a
																					className="gslider-post-carousel-readmore-btn"
																					href="#"
																					onClick={ (
																						e
																					) =>
																						e.preventDefault()
																					}
																				>
																					{ hasIcon &&
																						readMoreButtonIconPosition ===
																							'left' &&
																						iconMarkup }
																					<span className="gslider-readmore-text">
																						{
																							readMoreText
																						}
																					</span>
																					{ hasIcon &&
																						readMoreButtonIconPosition ===
																							'right' &&
																						iconMarkup }
																				</a>
																			</div>
																		);
																  } )()
																: null,
													};

													return normalizedContentOrder.map(
														( groupKey ) =>
															renderGroupMap[
																groupKey
															] || null
													);
												} )() }
											</article>
										</div>
									</div>
								);
							} ) }
						</div>

						{ showNavigation?.[ deviceType ] &&
							! navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' && (
								<>
									<div
										className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
									>
										<div
											ref={ prevRef }
											className="swiper-button-prev"
											role="button"
											tabIndex={ 0 }
											aria-label="Previous slide"
										></div>
										<div
											ref={ nextRef }
											className="swiper-button-next"
											role="button"
											tabIndex={ 0 }
											aria-label="Next slide"
										></div>
									</div>
								</>
							) }

						{ showNavigation?.[ deviceType ] &&
							navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' &&
							( navigationArrowsIconLeftAlign === 'icon' ||
								navigationArrowsIconRightAlign === 'icon' ) && (
								<div
									className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										ref={ prevRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									>
										{ renderSVG(
											navigationArrowsIconLeft
										) }
									</div>
									<div
										className="swiper-button-next"
										ref={ nextRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									>
										{ renderSVG(
											navigationArrowsIconRight
										) }
									</div>
								</div>
							) }

						{ showNavigation?.[ deviceType ] &&
							navigationArrowsIconSwitcher &&
							navigationArrowPositionType === 'inside' &&
							( navigationArrowsIconLeftAlign === 'image' ||
								navigationArrowsIconRightAlign === 'image' ) &&
							( navigationArrowsIconLeftImageUrl ||
								navigationArrowsIconRightImageUrl ) && (
								<div
									className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
								>
									<div
										className="swiper-button-prev"
										ref={ prevRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Previous slide"
									>
										<img
											src={
												navigationArrowsIconLeftImageUrl
											}
											alt={
												navigationArrowsIconLeftImageAlt
											}
										/>
									</div>
									<div
										className="swiper-button-next"
										ref={ nextRef }
										role="button"
										tabIndex={ 0 }
										aria-label="Next slide"
									>
										<img
											src={
												navigationArrowsIconRightImageUrl
											}
											alt={
												navigationArrowsIconRightImageAlt
											}
										/>
									</div>
								</div>
							) }

						{ /* Pagination inside swiper container */ }
						<div
							className="swiper-pagination swiper-pagination-post-carousel"
							ref={ paginationInsideRef }
						></div>
					</div>
				) }

				{ showNavigation?.[ deviceType ] &&
					! navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' && (
						<>
							<div
								className={ `gslider-navigation-default-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
							>
								<div
									ref={ prevRef }
									className="swiper-button-prev"
									role="button"
									tabIndex={ 0 }
									aria-label="Previous slide"
								></div>
								<div
									ref={ nextRef }
									className="swiper-button-next"
									role="button"
									tabIndex={ 0 }
									aria-label="Next slide"
								></div>
							</div>
						</>
					) }

				{ showNavigation?.[ deviceType ] &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'icon' ||
						navigationArrowsIconRightAlign === 'icon' ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								ref={ prevRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								{ renderSVG( navigationArrowsIconLeft ) }
							</div>
							<div
								className="swiper-button-next"
								ref={ nextRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								{ renderSVG( navigationArrowsIconRight ) }
							</div>
						</div>
					) }

				{ showNavigation?.[ deviceType ] &&
					navigationArrowsIconSwitcher &&
					navigationArrowPositionType === 'outside' &&
					( navigationArrowsIconLeftAlign === 'image' ||
						navigationArrowsIconRightAlign === 'image' ) &&
					( navigationArrowsIconLeftImageUrl ||
						navigationArrowsIconRightImageUrl ) && (
						<div
							className={ `gslider-navigation-custom-icon-wrapper ${ navigationArrowPositionType } ${ navigationArrowPosition }` }
						>
							<div
								className="swiper-button-prev"
								ref={ prevRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Previous slide"
							>
								<img
									src={ navigationArrowsIconLeftImageUrl }
									alt={ navigationArrowsIconLeftImageAlt }
								/>
							</div>
							<div
								className="swiper-button-next"
								ref={ nextRef }
								role="button"
								tabIndex={ 0 }
								aria-label="Next slide"
							>
								<img
									src={ navigationArrowsIconRightImageUrl }
									alt={ navigationArrowsIconRightImageAlt }
								/>
							</div>
						</div>
					) }

				{ /* Pagination outside swiper container */ }
				<div
					className="swiper-pagination swiper-pagination-post-carousel"
					ref={ paginationOutsideRef }
					aria-label="Carousel pagination"
				></div>
			</div>
			<style>{ blockStyle }</style>
		</>
	);
}
