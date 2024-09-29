<?php
//
/**
 * The header
 *
 * @package Bathe
 */
defined('ABSPATH') || exit;

$mainurl = 'https://bui.baoanhpro.vip';

global $is_story;
$is_story = isset($_GET['story']);
get_template_part('template-parts/layout', 'function');

?>
<!DOCTYPE html>
<html class="bg-bg text-text mono-400 overflow-hidden" <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<meta name="description" content="Bao Anh Bui's personal website">
	<?php wp_head(); ?>
</head>

<body>
	<?php wp_body_open(); ?>
	<div id="copy"></div>

	<main id="main">
		<nav class="absolute left-0 top-0 w-full z-20 p-4 h-20 pointer-events-none">
			<ul class="mx-auto w-full max-w-56 <?php outline() ?> p-4 flex justify-between content-center items-center h-full pointer-events-auto">
				<li>
					<a class="txt-layer no-underline hover:text-hilight" href=" <?= $mainurl . ($is_story ? '/story' : '') ?>">Home</a>
				</li>
				<li class="text-hilight">
					<a class="baoanhbui flex flex-col justify-center text-center w-full h-full no-underline hover:text-hilight" href="<?= home_url('/' . setStoryPerma()) ?>">
						<div class="baoanh txt-layer">Bảo<span class="inline-block"></span> Anh</div>
						<div class="hidden txt-layer bui">Bùi</div>
					</a>
				</li>
				<li>
					<a class="txt-layer no-underline hover:text-hilight" href="<?= $mainurl . '/info' . setStoryPerma() ?>">Info</a>
				</li>
			</ul>
		</nav>
		<div class="absolute left-0 top-0 bottom-0 right-0 pointer-events-none z-10 notebookholder"></div>
		<div class="mainbody absolute left-0 top-0 w-full h-full overflow-x-hidden overflow-y-auto">
			<div class="realheight min-h-full px-4 flex flex-col">
				<div class="grow">
					<?php pods_view('template-parts/layout-top-padding.php', null, YEAR_IN_SECONDS, 'transient'); ?>