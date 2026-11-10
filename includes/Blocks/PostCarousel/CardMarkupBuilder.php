<?php
/**
 * Post Carousel Card Markup Builder.
 *
 * Builds the inner Swiper slide and article card HTML markup in configured
 * content order while preserving LCP optimization and security escaping.
 *
 * @package GSlider\Blocks\PostCarousel
 * @since   1.2.3
 */

namespace GSlider\Blocks\PostCarousel;

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( CardMarkupBuilder::class, false ) ) {

    /**
     * Renders individual Post Carousel slide cards.
     *
     * @since 1.2.3
     */
    class CardMarkupBuilder {

        /**
         * Allowed HTML elements/attributes for taxonomy badge markup.
         *
         * @since 1.2.3
         *
         * @var array<string, array<string, bool>>
         */
        private const TAXONOMY_ALLOWED_HTML = array(
            'div'  => array(
                'class' => true,
            ),
            'span' => array(
                'class' => true,
            ),
            'a'    => array(
                'href' => true,
            ),
        );

        /**
         * Renders a complete `.swiper-slide` card element for the active queried post.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID inside the WP_Query loop.
         * @param array $context Compiled block rendering context.
         * @return string Rendered slide card HTML.
         */
        public static function render_card( int $post_id, array $context ): string {
            $taxonomy_markup = self::build_taxonomy_markup( $post_id, $context );
            $excerpt         = self::build_excerpt( $post_id, $context );

            $article_class = 'gslider-post-carousel-card';
            if ( ! empty( $context['has_entrance_animation'] ) ) {
                $article_class .= ' animated ' . esc_attr( (string) $context['card_entrance_animation'] ) . ' gslider-has-entrance-anim';
            }
            if ( ! empty( $context['enable_tilt'] ) ) {
                $article_class .= ' gslider-has-tilt';
            }

            $elements_html = '';
            $content_order = isset( $context['content_order'] ) && is_array( $context['content_order'] )
                ? $context['content_order']
                : array();

            foreach ( $content_order as $element ) {
                switch ( $element ) {
                    case 'thumbnail':
                        $elements_html .= self::render_thumbnail( $post_id, $taxonomy_markup, $context );
                        break;

                    case 'categories':
                        $has_image = ! empty( $context['any_image_enabled'] ) && has_post_thumbnail( $post_id );
                        if ( ( empty( $context['enable_taxonomy_badge_overlay'] ) || ! $has_image ) && '' !== $taxonomy_markup ) {
                            $elements_html .= wp_kses( $taxonomy_markup, self::TAXONOMY_ALLOWED_HTML );
                        }
                        break;

                    case 'title':
                        $elements_html .= self::render_title( $post_id, $context );
                        break;

                    case 'excerpt':
                        $elements_html .= self::render_excerpt( $excerpt, $context );
                        break;

                    case 'meta':
                        $elements_html .= self::render_meta( $post_id, $context );
                        break;

                    case 'readmore':
                        $elements_html .= self::render_readmore( $post_id, $context );
                        break;
                }
            }

            return '<div class="swiper-slide">' . "\n"
                . '    <div class="gslider-post-carousel-content-wrapper">' . "\n"
                . '        <article class="' . esc_attr( $article_class ) . '">' . "\n"
                . $elements_html
                . '        </article>' . "\n"
                . '    </div>' . "\n"
                . '</div>' . "\n";
        }

        /**
         * Builds the reusable category and tag markup for a post card.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Taxonomy HTML markup.
         */
        private static function build_taxonomy_markup( int $post_id, array $context ): string {
            if ( empty( $context['any_taxonomy_enabled'] ) ) {
                return '';
            }

            $categories            = get_the_category( $post_id );
            $post_taxonomy_display = isset( $context['post_taxonomy_display'] ) ? (string) $context['post_taxonomy_display'] : 'category';
            $show_cat              = ( 'category' === $post_taxonomy_display || 'both' === $post_taxonomy_display );
            $show_tag              = ( 'tag' === $post_taxonomy_display || 'both' === $post_taxonomy_display );

            ob_start();
            if ( $show_cat && ! empty( $categories ) ) {
                ?>
                <div class="gslider-post-carousel-categories">
                    <?php foreach ( $categories as $cat ) : ?>
                        <span class="gslider-category-item"><a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>"><?php echo esc_html( $cat->name ); ?></a></span>
                    <?php endforeach; ?>
                </div>
                <?php
            }

            if ( $show_tag ) {
                $post_tags = get_the_tags( $post_id );
                if ( ! empty( $post_tags ) ) {
                    ?>
                    <div class="gslider-post-carousel-tags">
                        <?php foreach ( $post_tags as $tag ) : ?>
                            <span class="gslider-tag-item"><a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>"><?php echo esc_html( $tag->name ); ?></a></span>
                        <?php endforeach; ?>
                    </div>
                    <?php
                }
            }

            return (string) ob_get_clean();
        }

        /**
         * Extracts and truncates the post excerpt according to source and limit settings.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Prepared excerpt string.
         */
        private static function build_excerpt( int $post_id, array $context ): string {
            $source      = isset( $context['post_excerpt_source'] ) ? (string) $context['post_excerpt_source'] : 'auto';
            $raw_excerpt = '';

            if ( 'excerpt' === $source ) {
                if ( has_excerpt( $post_id ) ) {
                    $raw_excerpt = get_the_excerpt( $post_id );
                }
            } elseif ( 'content' === $source ) {
                $raw_excerpt = get_the_content( null, false, $post_id );
            } else {
                $raw_excerpt = get_the_excerpt( $post_id );
            }

            $clean_excerpt = strip_shortcodes( $raw_excerpt );
            $clean_excerpt = wp_strip_all_tags( $clean_excerpt );
            $clean_excerpt = trim( $clean_excerpt );

            if ( empty( $context['enable_post_excerpt_limit'] ) ) {
                return $clean_excerpt;
            }

            $limit_val = isset( $context['post_excerpt_limit']['Desktop'] ) ? intval( $context['post_excerpt_limit']['Desktop'] ) : 20;
            if ( $limit_val <= 0 ) {
                $limit_val = 20;
            }

            $suffix = isset( $context['post_excerpt_limit_suffix'] ) ? (string) $context['post_excerpt_limit_suffix'] : '...';
            if ( 'characters' === ( $context['post_excerpt_limit_type'] ?? 'words' ) ) {
                if ( mb_strlen( $clean_excerpt ) > $limit_val ) {
                    return mb_substr( $clean_excerpt, 0, $limit_val ) . $suffix;
                }
                return $clean_excerpt;
            }

            return wp_trim_words( $clean_excerpt, $limit_val, $suffix );
        }

        /**
         * Renders the card featured thumbnail wrapper and optional taxonomy badge overlay.
         *
         * Preserves the global `$gslider_first_image_optimized` LCP optimization contract.
         *
         * @since 1.2.3
         *
         * @param int    $post_id         Current post ID.
         * @param string $taxonomy_markup Pre-rendered taxonomy HTML.
         * @param array  $context         Compiled block rendering context.
         * @return string Rendered thumbnail HTML or empty string.
         */
        private static function render_thumbnail( int $post_id, string $taxonomy_markup, array $context ): string {
            if ( empty( $context['any_image_enabled'] ) || ! has_post_thumbnail( $post_id ) ) {
                return '';
            }

            global $gslider_first_image_optimized;
            $enable_lazy_load = ! empty( $context['enable_lazy_load'] );

            $img_attributes = array(
                'loading' => ( ! isset( $gslider_first_image_optimized ) || ! $gslider_first_image_optimized ) ? 'eager' : ( $enable_lazy_load ? 'lazy' : 'eager' ),
                'alt'     => get_the_title( $post_id ),
            );

            if ( ! isset( $gslider_first_image_optimized ) || ! $gslider_first_image_optimized ) {
                $img_attributes['fetchpriority'] = 'high';
                $gslider_first_image_optimized   = true;
            }

            ob_start();
            ?>
            <div class="gslider-post-carousel-image">
                <a href="<?php the_permalink(); ?>" aria-label="<?php the_title_attribute(); ?>">
                    <?php the_post_thumbnail( 'medium_large', $img_attributes ); ?>
                </a>
                <?php if ( ! empty( $context['enable_taxonomy_badge_overlay'] ) && '' !== $taxonomy_markup ) : ?>
                    <div class="gslider-taxonomy-badge-overlay gslider-badge-visibility-<?php echo esc_attr( (string) $context['taxonomy_badge_overlay_visibility'] ); ?> gslider-badge-position-<?php echo esc_attr( (string) $context['taxonomy_badge_overlay_position'] ); ?>">
                        <?php echo wp_kses( $taxonomy_markup, self::TAXONOMY_ALLOWED_HTML ); ?>
                    </div>
                <?php endif; ?>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Renders the card post title wrapper and optional link/divider classes.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered title HTML or empty string.
         */
        private static function render_title( int $post_id, array $context ): string {
            if ( empty( $context['any_title_enabled'] ) ) {
                return '';
            }

            $raw_title      = get_the_title( $post_id );
            $rendered_title = $raw_title;
            $limit_type     = isset( $context['post_title_limit_type'] ) ? (string) $context['post_title_limit_type'] : 'words';
            $limit_suffix   = isset( $context['post_title_limit_suffix'] ) ? (string) $context['post_title_limit_suffix'] : '...';

            if ( ! empty( $context['enable_post_title_limit'] ) ) {
                $limit_val = isset( $context['post_title_limit']['Desktop'] )
                    ? intval( $context['post_title_limit']['Desktop'] )
                    : ( 'words' === $limit_type ? 10 : 50 );

                if ( 'words' === $limit_type ) {
                    $rendered_title = wp_trim_words( $raw_title, $limit_val, $limit_suffix );
                } elseif ( mb_strlen( $raw_title ) > $limit_val ) {
                    $rendered_title = mb_substr( $raw_title, 0, $limit_val ) . $limit_suffix;
                }
            }

            $title_wrapper_class = 'gslider-post-carousel-title-wrapper' . ( ! empty( $context['show_post_title_divider'] ) ? ' has-divider' : '' );
            $title_class         = 'gslider-post-carousel-title' . ( ! empty( $context['enable_post_title_hover_underline_anim'] ) ? ' hover-underline-anim' : '' );
            $tag                 = isset( $context['post_title_html_tag'] ) ? (string) $context['post_title_html_tag'] : 'h3';
            $enable_link         = ! empty( $context['enable_post_title_link'] );
            $target              = ! empty( $context['post_title_link_target'] );

            $rel_attr = $enable_link
                ? self::build_rel_attribute(
                    $target,
                    ! empty( $context['post_title_link_nofollow'] ),
                    ! empty( $context['post_title_link_sponsored'] )
                )
                : '';

            ob_start();
            ?>
            <div class="<?php echo esc_attr( $title_wrapper_class ); ?>">
                <<?php echo esc_attr( $tag ); ?> class="<?php echo esc_attr( $title_class ); ?>">
                    <?php if ( $enable_link ) : ?>
                        <a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>"<?php echo $target ? ' target="_blank"' : ''; ?><?php echo '' !== $rel_attr ? ' rel="' . esc_attr( $rel_attr ) . '"' : ''; ?>><?php echo esc_html( $rendered_title ); ?></a>
                    <?php else : ?>
                        <?php echo esc_html( $rendered_title ); ?>
                    <?php endif; ?>
                </<?php echo esc_attr( $tag ); ?>>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Renders the card post excerpt wrapper when enabled and non-empty.
         *
         * @since 1.2.3
         *
         * @param string $excerpt Prepared post excerpt string.
         * @param array  $context Compiled block rendering context.
         * @return string Rendered excerpt HTML or empty string.
         */
        private static function render_excerpt( string $excerpt, array $context ): string {
            if ( empty( $context['any_excerpt_enabled'] ) || empty( $excerpt ) ) {
                return '';
            }

            $tag = isset( $context['post_excerpt_html_tag'] ) ? (string) $context['post_excerpt_html_tag'] : 'p';

            return '<div class="gslider-post-carousel-excerpt-wrapper">' . "\n"
                . '    <' . esc_attr( $tag ) . ' class="gslider-post-carousel-excerpt">' . esc_html( $excerpt ) . '</' . esc_attr( $tag ) . '>' . "\n"
                . '</div>';
        }

        /**
         * Renders author avatar/name and published date metadata for the card.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered meta HTML or empty string.
         */
        private static function render_meta( int $post_id, array $context ): string {
            $show_author = ! empty( $context['any_author_enabled'] );
            $show_date   = ! empty( $context['any_date_enabled'] );

            if ( empty( $context['any_meta_enabled'] ) || ( ! $show_author && ! $show_date ) ) {
                return '';
            }

            ob_start();
            ?>
            <div class="gslider-post-carousel-meta">
                <?php if ( $show_author ) : ?>
                <div class="gslider-post-author-wrapper">
                    <?php if ( ! empty( $context['any_avatar_enabled'] ) ) : ?>
                    <div class="gslider-post-author-avatar-wrapper">
                        <?php
                        $author_id  = get_the_author_meta( 'ID' );
                        $avatar_url = get_avatar_url( $author_id, array( 'size' => 96 ) );
                        if ( $avatar_url ) :
                        ?>
                            <img class="gslider-post-author-avatar" src="<?php echo esc_url( $avatar_url ); ?>" alt="<?php echo esc_attr( get_the_author() ); ?>" width="28" height="28" />
                        <?php else : ?>
                            <svg class="gslider-post-author-avatar-placeholder" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <?php endif; ?>
                    </div>
                    <?php endif; ?>
                    <div class="gslider-post-author"><?php the_author(); ?></div>
                </div>
                <?php endif; ?>
                <?php if ( $show_date ) : ?>
                <div class="gslider-post-date-wrapper">
                    <div class="gslider-post-date"><?php echo esc_html( get_the_date( '', $post_id ) ); ?></div>
                </div>
                <?php endif; ?>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Renders the card Read More CTA button with sanitized URL, rel, and icon markup.
         *
         * @since 1.2.3
         *
         * @param int   $post_id Current post ID.
         * @param array $context Compiled block rendering context.
         * @return string Rendered Read More HTML or empty string.
         */
        private static function render_readmore( int $post_id, array $context ): string {
            if ( empty( $context['any_read_more_button_enabled'] ) ) {
                return '';
            }

            $read_more_url = ( 'custom' === ( $context['read_more_button_link_type'] ?? 'post' ) )
                ? ( is_string( $context['read_more_button_link'] ?? null ) ? $context['read_more_button_link'] : '#' )
                : get_permalink( $post_id );

            $target   = ! empty( $context['read_more_button_target_link'] );
            $rel_attr = self::build_rel_attribute(
                $target,
                ! empty( $context['read_more_button_nofollow'] ),
                ! empty( $context['read_more_button_sponsored'] )
            );

            $icon_position            = isset( $context['read_more_button_icon_position'] ) ? (string) $context['read_more_button_icon_position'] : 'right';
            $has_read_more_svg_icon   = ! empty( $context['has_read_more_svg_icon'] );
            $has_read_more_image_icon = ! empty( $context['has_read_more_image_icon'] );
            $svg_icon_html            = isset( $context['read_more_svg_icon_html'] ) ? (string) $context['read_more_svg_icon_html'] : '';
            $img_url                  = isset( $context['read_more_button_icon_img_url'] ) ? (string) $context['read_more_button_icon_img_url'] : '';
            $img_alt                  = isset( $context['read_more_button_icon_img_alt'] ) ? (string) $context['read_more_button_icon_img_alt'] : 'Right Arrow';

            $icon_markup = '';
            if ( $has_read_more_svg_icon ) {
                $icon_markup = '<span class="gslider-readmore-icon-wrap">' . $svg_icon_html . '</span>';
            } elseif ( $has_read_more_image_icon ) {
                $icon_markup = '<span class="gslider-readmore-icon-wrap"><img src="' . esc_url( $img_url ) . '" alt="' . esc_attr( $img_alt ) . '" /></span>';
            }

            ob_start();
            ?>
            <div class="gslider-post-carousel-readmore">
                <a class="gslider-post-carousel-readmore-btn" href="<?php echo esc_url( $read_more_url ); ?>"<?php echo $target ? ' target="_blank"' : ''; ?><?php echo '' !== $rel_attr ? ' rel="' . esc_attr( $rel_attr ) . '"' : ''; ?>>
                    <?php if ( '' !== $icon_markup && 'left' === $icon_position ) : ?>
                        <?php echo $icon_markup; ?>
                    <?php endif; ?>
                    <span class="gslider-readmore-text"><?php echo esc_html( (string) $context['read_more_button_text'] ); ?></span>
                    <?php if ( '' !== $icon_markup && 'right' === $icon_position ) : ?>
                        <?php echo $icon_markup; ?>
                    <?php endif; ?>
                </a>
            </div>
            <?php

            return (string) ob_get_clean();
        }

        /**
         * Compiles the space-separated link `rel` attribute string.
         *
         * @since 1.2.3
         *
         * @param bool $target    Whether link opens in a new tab (`_blank`).
         * @param bool $nofollow  Whether `nofollow` should be included.
         * @param bool $sponsored Whether `sponsored` should be included.
         * @return string Space-separated rel tokens or empty string.
         */
        private static function build_rel_attribute( bool $target, bool $nofollow, bool $sponsored ): string {
            $rel_items = array();
            if ( $target ) {
                $rel_items[] = 'noopener';
                $rel_items[] = 'noreferrer';
            }
            if ( $nofollow ) {
                $rel_items[] = 'nofollow';
            }
            if ( $sponsored ) {
                $rel_items[] = 'sponsored';
            }

            return implode( ' ', $rel_items );
        }
    }
}
