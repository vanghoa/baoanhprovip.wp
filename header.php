<?php

/**
 * The header
 *
 * @package Bathe
 */
defined('ABSPATH') || exit;
global $flowtype, $is_story, $is_designer, $is_developer, $is_storyq, $term_id, $taxonomy, $taxonomy_name, $is_tax;
get_template_part('template-parts/layout', 'function');
$is_storyq = isset($_GET['story']);
$is_designer = is_page('designer');
$is_developer = is_page('developer');
$is_story = is_page('story') || $is_storyq || $is_designer || $is_developer;
$is_work =  is_singular('work');
$taxonomy = 'bigtag';
$flow = null;
$is_tax = is_tax();

$notebookurl = 'https://nguyen.baoanhpro.vip';

if ($is_tax) {
	// For taxonomy pages
	$queried_object = get_queried_object();
	$term_id = esc_sql($queried_object->term_id);
	$taxonomy = esc_sql($queried_object->taxonomy);
	$taxonomy_name = $taxonomy;
	if ($taxonomy == 'designertag') {
		$flowtype = 'designer';
	} else if ($taxonomy == 'developertag') {
		$flowtype = 'developer';
	}
}

$type = null;
/*
if ($is_storyq) {
	// for work page with story params
	$story = get_query_var('story');
	$parts = explode('-', $story);
	$type = $parts[0] ?? null;
	$num = $parts[1] ?? null;
	if (!is_null($type) && !is_null($num) && $is_work) {
		$settings = pods('settings');
		$flow = $settings->field($type . '_flow') ?? false;
	}
$colorscheme = '';
if ($is_designer || ($is_work && $type == 'designer') || ($is_storyq && $taxonomy == 'designertag')) {
	$colorscheme = 'color1';
} else if ($is_developer || ($is_work && $type == 'developer') || ($is_storyq && $taxonomy == 'developertag')) {
	$colorscheme = 'color2';
}
}*/

?>
<!DOCTYPE html>
<html class="bg-bg text-text mono-400 overflow-hidden" <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php
	if ($is_work) {
		global $pods;
		$pods = pods('work', get_the_ID());
		$des = wp_strip_all_tags($pods->field('long_description'), true);
	?>
		<meta name="description" content="<?= $des ?>">
		<meta name="og:description" content="<?= $des ?>">
	<?php
	}
	?>
	<link
		rel="preload"
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		as="style"
		onload="this.onload=null;this.rel='stylesheet'" />
	<noscript>
		<link
			href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
			rel="stylesheet"
			type="text/css" />
	</noscript>
	<?php wp_head(); ?>
</head>

<body <?php body_class(($flowtype ? 'page-' . $flowtype : '') . ' ' . (is_page('story') ? 'page-story' : '') . (is_page('info') ? 'page-info' : '')); ?>>
	<?php
	wp_body_open();
	global $post; ?>
	<div id="copy"></div>

	<main id="main">
		<nav class="absolute left-0 top-0 w-full z-20 p-4 h-20 pointer-events-none">
			<ul class="mx-auto w-full max-w-56 <?php outline() ?> p-4 flex justify-between content-center items-center h-full pointer-events-auto">
				<li class="<?php echo is_home() || is_page('story') ? 'text-hilight' : '' ?>">
					<a class="txt-layer no-underline hover:text-hilight homelink" href=" <?= home_url('/'); ?>">Home</a>
				</li>
				<li class="<?php echo is_page('notebook') ? 'text-hilight' : '' ?>">
					<a class="baoanhbui flex flex-col justify-center text-center w-full h-full no-underline hover:text-hilight" href="<?= $notebookurl ?>">
						<div class="baoanh txt-layer">Bảo<span class="inline-block"></span> Anh</div>
						<div class="hidden txt-layer bui">Bùi</div>
					</a>
				</li>
				<li class="<?php echo is_page('info') ? 'text-hilight' : '' ?>">
					<a class="txt-layer no-underline hover:text-hilight" href="<?= home_url('/info'); ?>">Info</a>
				</li>
			</ul>
			<button id="themebutton" class="<?= outline() ?> absolute right-4 top-4 no-underline px-3 py-2 shrink-0 txt-layer pointer-events-auto" onclick="toggleTheme(this)" aria-label="toggle dark/light mode">☾</button>
			<a id="storymode" href="<?= home_url('/story'); ?>" class="<?= outline() ?> text-center absolute left-4 top-4 no-underline px-3 py-2 shrink-0 txt-layer pointer-events-auto" aria-label="story mode">
				<span>💼</span><span class="hidden">story</span><span class="hidden">mode</span><span class="hidden">&nbsp;(for recruiters)</span>
			</a>
		</nav>
		<?php /*
		if ($flow) {
			$taxonomy = $type . 'tag';
			if ($flow[$num + 1] ?? null) {
				$num++;
			} else {
				$num = 0;
			}
			$podsflow = pods('work', $flow[$num]['ID']);
			$permalink = $podsflow->display('permalink') . '?story=' . $type . '-' . ($num);
		?>
			<section class="storysection absolute pointer-events-none bottom-8 flex flex-row-reverse px-4">
				<a href="<?= $permalink ?>" class="block w-full max-w-56 mx-auto pointer-events-auto <?php outline() ?> overflow-hidden no-underline">
					<div class="imgwrapper hidden">
						<?php echo $podsflow->field('featured_images._img')[0]; ?>
					</div>
					<div class="text-center m-4 flex flex-col gap-4 justify-center items-center">
						<div class="txt-layer"> <span class="underline">Next work -></span>
							<h2><?= $podsflow->display('title') ?></h2>
						</div>
					</div>
				</a>
			</section>
		<?php
		}*/
		if (is_single()) {
			function getNextWork($fl)
			{
				$settings = pods('settings');
				$id = get_the_ID();
				$array = $settings->field($fl);
				foreach ($array as $index => $item) {
					if ($item['ID'] == $id) {
						if (isset($array[$index + 1])) {
							renderStorySection($array[$index + 1]['ID'], $fl);
						} else {
							renderStorySection($array[0]['ID'], $fl);
						}
						return;
					}
				}
			}
			function renderStorySection($id, $class)
			{
				$podsflow = pods('work', $id); ?>
				<section class="storysection absolute pointer-events-none bottom-8 flex flex-row-reverse px-4 <?= $class ?>">
					<a href="<?= $podsflow->display('permalink') ?>" class="block w-full max-w-56 mx-auto pointer-events-auto <?php outline() ?> overflow-hidden no-underline">
						<div class="imgwrapper hidden">
							<?php echo $podsflow->field('featured_images._img')[0]; ?>
						</div>
						<div class="text-center m-4 flex flex-col gap-4 justify-center items-center">
							<div class="txt-layer"> <span class="underline">Next work -></span>
								<h2><?= $podsflow->display('title') ?></h2>
							</div>
						</div>
					</a>
				</section>
		<?php }
			getNextWork('designer_flow');
			getNextWork('developer_flow');
		}
		?>
		<div class="absolute left-0 top-0 bottom-0 right-0 bg-black bg-opacity-70 z-10 imgholder"></div>
		<div class="absolute left-0 top-0 bottom-0 right-0 pointer-events-none z-10 notebookholder"></div>
		<div class="absolute z-20 videolayer pointer-events-none"></div>
		<div class="mainbody absolute left-0 top-0 w-full h-full overflow-x-hidden overflow-y-auto <?= $is_work ? 'isWork' : '' ?>">
			<div class="realheight min-h-full px-4 flex flex-col">
				<div class="grow">
					<?php pods_view('template-parts/layout-top-padding.php', null, YEAR_IN_SECONDS, 'transient'); ?>
