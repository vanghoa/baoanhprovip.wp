<?php

/**
 * The header
 *
 * @package Bathe
 */
defined('ABSPATH') || exit;
get_template_part('template-parts/layout', 'style');
$is_story = is_page('story') || isset($_GET['story']);
?>
<!DOCTYPE html>
<html class="bg-bg text-text mono-400 overflow-hidden" <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php
	wp_body_open();
	global $post; ?>
	<div id="copy"></div>

	<main id="main">
		<nav class="absolute left-0 top-0 w-full z-20 p-4 h-20">
			<ul class="mx-auto w-full max-w-56 <?php outline() ?> p-4 flex justify-between content-center items-center h-full [&_li.active]:text-hilight">
				<li class="<?php echo is_home() || is_page('story') ? 'active' : '' ?>">
					<a class="txt-layer" href=" <?php echo esc_url($is_story ? '/index.php/story' : home_url('/')); ?>">Home</a>
				</li>
				<li class="baoanhbui flex flex-col justify-center text-center">
					<div class="baoanh txt-layer">Bảo<span class="inline-block"></span> Anh</div>
					<div class="hidden txt-layer bui">Bùi</div>
				</li>
				<li class="<?php echo is_page('info') ? 'active' : '' ?>">
					<a class="txt-layer" href=" <?php echo esc_url($is_story ? '/index.php/info/?story=true' : home_url('/index.php/info')); ?>">Info</a>
				</li>
			</ul>
		</nav>
		<div class="absolute left-0 top-0 bottom-0 right-0 bg-black bg-opacity-50 z-10 imgholder"></div>
		<div class="mainbody absolute left-0 top-0 w-full h-full overflow-x-hidden overflow-y-auto">
			<div class="realheight px-8 pb-8 min-h-full">
				<?php get_template_part('template-parts/layout', 'top-padding'); ?>