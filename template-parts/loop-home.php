<?php
get_template_part('template-parts/layout', 'style');

// Check if we're on a taxonomy page
$is_tax = is_tax();

// Set up query parameters
$params = array(
	'limit' => -1, // Retrieve all matching items
	'orderby' => 'timeframe DESC', // Replace 'first_timeframe' with your field name
	'groupby' => 'post_id',
	'expires' => null,
	'cache_mode' => null,
);

if ($is_tax) {
	// For taxonomy pages
	global $term_id, $taxonomy;
	$queried_object = get_queried_object();
	$term_id = esc_sql($queried_object->term_id);
	$taxonomy = esc_sql($queried_object->taxonomy);
	$params['where'] = "{$taxonomy}.term_id = {$term_id}";
}

$pods = pods('work', $params);
$settings = pods('settings');
$hometext = $settings->field('hometext');

?>

<div class="max-w-md mx-auto text-center mb-8 mt-4">
	<p class="txt-layer mb-4"><?= $hometext ?></p>
	<p class="txt-layer"> |
		<?php $bigtag = pods('bigtag')->find();
		$length = $bigtag->total_found();
		$cur = 0;
		while ($bigtag->fetch()) : $cur++;
			global $term_id, $taxonomy;
			$bt_term_id = $bigtag->display('term_id') ?>
			<?php if ($cur > 1) {
				echo ' | ';
			} ?>
			<a href="<?= get_term_link($bt_term_id, "bigtag") ?>" class="hover:underline <?php if ($bt_term_id == $term_id && $taxonomy == 'bigtag') {
																								echo 'underline';
																							} ?>"><?= $bigtag->display('name') ?></a>
		<?php endwhile; ?> |
	</p>
</div>

<ul class="homegrid grid grid-cols-1 gap-8 w-fit mx-auto">
	<?php while ($pods->fetch()) : $permalink = $pods->display('permalink') ?>
		<li class="project">
			<div class="max-w-xl <?php outline() ?>">
				<div isfirst="true" islast="<?php
											$imgs = array_slice($pods->field('featured_images._img'), 0, 5);
											echo count($imgs) == 1 ? 'true' : 'false'; ?>" class="imgsec w-full mx-auto max-w-xl ">
					<div class="imgwrapper">
						<?php
						foreach ($imgs as $k => $img) { ?>
							<?php echo $img ?>
						<?php }
						?>
					</div>
					<div class="flex justify-between items-stretch absolute left-0 top-0 h-full w-full">
						<button class="px-4 lbtn basis-full shrink ">
							<?php get_template_part('template-parts/layout', 'arrow') ?>
						</button>
						<a href="<?= $permalink ?>" class="basis-1/5 shrink-0 flex justify-center items-center group hover-layer">
							<div class="group-hover:opacity-100 hover-child opacity-0 h-fit w-fit rounded-xl bg-bg2 flex justify-center items-center p-3 text-center">
								see this <br> project
							</div>
						</a>
						<button class="px-4 rbtn basis-full shrink">
							<?php get_template_part('template-parts/layout', 'arrow') ?>
						</button>
						<div class="w-full absolute bottom-4">
							<ul class="indicator mx-auto w-fit flex gap-2 justify-center">
								<?php $imgs = $pods->field('featured_images._img');
								foreach ($imgs as $k => $img) { ?>
									<li class="bg-bg h-2 w-2 rounded-lg <?php echo $k == 0 ? '' : 'opacity-50' ?>"></li>
								<?php } ?>
							</ul>
						</div>
					</div>
				</div>
				<div class="text-center m-4 flex flex-col gap-4 justify-center items-center">
					<div class="">
						<h3 class="txt-layer">
							<?= $pods->display('title') ?>, <?php $time = ($pods->field('timeframe'))[0];
															echo (new DateTime($time))->format('M Y'); ?>
						</h3>
						<p class="txt-layer"> | <?php
												$bigtags = $pods->field('bigtag');
												if ($bigtags) : foreach ($bigtags as $k => $tag) { ?>
									<a class="hover:underline <?php if ($tag['term_id'] == $term_id && $taxonomy == 'bigtag') {
																	echo 'underline';
																} ?>" href="<?= get_term_link($tag['slug'], 'bigtag') ?>"><?php echo $tag['name']; ?></a> |
							<?php }
												endif; ?>
						</p>
					</div>
					<a href="<?= $permalink ?>" class="block max-w-md text-left txt-layer"><?php echo $pods->field('short_description'); ?>...
						<span class="underline">see more</span>
					</a>
				</div>
			</div>
		</li>
	<?php endwhile; ?>
</ul>