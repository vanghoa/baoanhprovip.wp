<?php

/**
 * Bathe functions
 *
 * @package Bathe
 */
defined('ABSPATH') || exit;

/**
 * Set up theme defaults and registers support for various WordPress feaures.
 */
add_action(
	'after_setup_theme',
	function () {
		load_theme_textdomain('bathe', get_theme_file_uri('languages'));

		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
			)
		);
		add_theme_support(
			'post-formats',
			array(
				'aside',
				'image',
				'video',
				'quote',
				'link',
			)
		);
		add_theme_support(
			'custom-background',
			apply_filters(
				'bathe_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 200,
				'width'       => 50,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);

		register_nav_menus(
			array(
				'primary' => __('Primary Menu', 'bathe'),
			)
		);
	}
);

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
add_action(
	'after_setup_theme',
	function () {
		$GLOBALS['content_width'] = apply_filters('bathe_content_width', 960);
	},
	0
);

/**
 * Enqueue scripts and styles.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_style('main', get_theme_file_uri('assets/css/main.css'), array(), '4.0.1');
		wp_enqueue_style('tailwind', get_theme_file_uri('assets/css/tailwind.css'), array(), '4.3.2');
		wp_enqueue_script(
			'pako-js',
			'https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js',
			array(),
			null,
			true // Load in footer (set to true to load before </body>)
		);
		wp_enqueue_script('start_script', get_theme_file_uri('assets/js/start.js'), array(), '4.0.1', false);
		wp_enqueue_script('lodash_script', get_theme_file_uri('assets/unprocessedjs/lodash.custom.min.js'), array(), '4.0.1', false);

		wp_enqueue_script('end_script', get_theme_file_uri('assets/js/main.js'), array(), '4.0.1', true);

		if (is_singular() && comments_open() && get_option('thread_comments')) {
			wp_enqueue_script('comment-reply');
		}
	}
);


add_filter('nav_menu_css_class', 'add_active_class_to_nav_menu');

function add_active_class_to_nav_menu($classes)
{
	if (in_array('current-menu-item', $classes, true) || in_array('current_page_item', $classes, true)) {
		$classes = array_diff($classes, array('current-menu-item', 'current_page_item', 'active'));
		$classes[] = 'active';
	}
	return $classes;
}

add_action('init', 'add_get_val');
function add_get_val()
{
	global $wp;
	$wp->add_query_var('story');
}

// Hook onto 'oembed_dataparse' and get 2 parameters
add_filter('oembed_dataparse', 'responsive_wrap_oembed_dataparse', 10, 2);

function responsive_wrap_oembed_dataparse($html, $data)
{
	if (! is_object($data) || empty($data->type))
		return $html;
	if (!($data->type == 'video'))
		return $html;
	// Strip width and height from html
	$html = preg_replace('/(width|height)="\d*"\s/', "", $html);
	// Return code
	return '<div style="--width:' . $data->width . '; --height:' . $data->height . ';" ><img style="--twidth:' . $data->thumbnail_width . '; --theight:' . $data->thumbnail_height . ';" alt="thumbnail" src="' . $data->thumbnail_url . '"/>' . $html . '</div>';
}
function lazyimg($content, $isHome = false, $forceLazy = false, $onlyThumbClass = false)
{
	if (empty($content)) {
		return $isHome ? [] : $content; // Return the original content if it's empty
	}
	$dom = new DOMDocument();
	@$dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));
	$img_count = 0;
	$img_html_array = [];
	$images = [];

	if ($onlyThumbClass) {
		$xpath = new DOMXPath($dom);
		$query = "//figure[contains(@class, 'thumb')]//img";
		$images = $xpath->query($query);
	} else {
		$images = $dom->getElementsByTagName('img');
	}

	foreach ($images as $node) {
		$img_count++;
		$oldsrc = $node->getAttribute('src');
		$oldsrcset = $node->getAttribute('srcset');

		$parent = $node->parentNode;
		if (strpos($parent->getAttribute("class"), "wp-block-image") !== false) {
			$dimensions = get_image_dimensions($oldsrc); // Fetch image dimensions
			$w = $dimensions['width'];
			$h = $dimensions['height'];
			// Check if the image is from Cloudinary
			if (strpos($oldsrc, 'res.cloudinary.com') !== false) {
				if ($dimensions) {
					$node->setAttribute("width", $w);
					$node->setAttribute("height", $h);
				}
			}
			$parent->setAttribute("style", "--width:" . $w . "; --height:" . $h . ";");
			if (($w * 1.8) < $h) {
				$parent->setAttribute("class", $parent->getAttribute("class") . " vertical");
			}
		}
		if (!$forceLazy && $img_count <= ($onlyThumbClass ? 1 : 2)) {
			$node->setAttribute("fetchpriority", "high");
		} else {
			$node->setAttribute("data-src", $oldsrc);
			$node->setAttribute("data-srcset", $oldsrcset);
			$node->setAttribute("src", '');
			$node->setAttribute("srcset", '');
		}
		$img_html_array[] = $dom->saveHTML($node);
		if ($isHome && $img_count >= 3) {
			break; // Stop the loop if the limit is reached
		}
	}

	if ($isHome) {
		return $img_html_array;
	}
	// iframe
	foreach ($dom->getElementsByTagName('iframe') as $node) {
		$oldsrc = $node->getAttribute('src');
		$node->setAttribute("data-src", $oldsrc);
		$node->setAttribute("src", '');
	}

	$newHtml = $dom->saveHTML();
	return $newHtml;
}

function get_image_dimensions($image_url)
{
	// Fetch image dimensions from the image URL
	$image_size = @getimagesize($image_url);

	if ($image_size) {
		$width = $image_size[0];
		$height = $image_size[1];
		return ['width' => $width, 'height' => $height];
	}

	return false; // Return false if fetching fails
}

// Apply the filter to post content and widgets
add_filter('the_content', 'lazyimg', 20);
add_filter('widget_text', 'lazyimg', 20);
add_filter('post_thumbnail_html', 'lazyimg', 20);
add_filter('get_avatar', 'lazyimg', 20);

//Remove Gutenberg Block Library CSS from loading on the frontend
function smartwp_remove_wp_block_library_css()
{
	wp_dequeue_style('wp-block-library');
	wp_dequeue_style('wp-block-library-theme');
	wp_dequeue_style('wc-blocks-style'); // Remove WooCommerce block CSS
}
add_action('wp_enqueue_scripts', 'smartwp_remove_wp_block_library_css', 100);

add_filter('wp_sitemaps_enabled', '__return_false');
