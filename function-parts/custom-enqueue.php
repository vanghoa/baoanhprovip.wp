<?php
/**
 * Custom enqueue setup
 *
 * @package Tusitala
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action('wp_enqueue_scripts', 'tusi_enqueue');
function tusi_enqueue() {
    // wp_register_style( 'tusi-style', get_template_directory_uri() . '/css/style.css');
    // wp_enqueue_style( 'tusi-style' );
}
