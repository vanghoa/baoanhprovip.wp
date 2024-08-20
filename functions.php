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
		wp_enqueue_style('bathe', get_theme_file_uri('assets/css/main.css'), array(), '3.0.1');
		wp_enqueue_style('tailwind', get_theme_file_uri('assets/css/tailwind.css'), array(), '3.3.2');

		wp_enqueue_script('start_script', get_theme_file_uri('assets/js/start.js'), array(), '3.0.1', false);
		wp_enqueue_script('lodash_script', get_theme_file_uri('assets/unprocessedjs/lodash.custom.min.js'), array(), '3.0.1', false);
		wp_enqueue_script('html2canvas_script', get_theme_file_uri('assets/unprocessedjs/html2canvas.js'), array(), '3.0.1', false);

		wp_enqueue_script('end_script', get_theme_file_uri('assets/js/main.js'), array(), '3.0.1', true);

		if (is_singular() && comments_open() && get_option('thread_comments')) {
			wp_enqueue_script('comment-reply');
		}
	}
);


// UnderStrap's includes directory.
$understrap_inc_dir = 'function-parts';

// Array of files to include.
$understrap_includes = array(
	'/custom-enqueue.php',                   // Enqueue custom scripts & styles
	'/cbf/cbf-setup.php',
	'/widgets.php',                         // Register widget area.
);


// Include files.
foreach ($understrap_includes as $file) {
	require_once get_theme_file_path($understrap_inc_dir . $file);
}

add_filter('nav_menu_css_class', 'add_active_class_to_nav_menu');

function add_active_class_to_nav_menu($classes)
{
	if (in_array('current-menu-item', $classes, true) || in_array('current_page_item', $classes, true)) {
		$classes = array_diff($classes, array('current-menu-item', 'current_page_item', 'active'));
		$classes[] = 'active';
	}
	return $classes;
}
