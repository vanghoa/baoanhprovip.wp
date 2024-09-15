<?php
global $taxonomy, $pods;
$pods = pods('work', get_the_ID());
?>

<section class="single-work-head mt-12 mb-12 flex flex-col justify-between items-center gap-4">
	<h1 class="text-2xl text-center mono-600 txt-layer"><?php echo get_the_title(); ?></h1>
	<div class="big-tags text-nowrap whitespace-nowrap desktop">
		<?php $tags = $pods->field($taxonomy);
		if ($tags) :
			foreach ($tags as $k => $tag) { ?>
				<p class="txt-layer desktop">
					<a href="<?= get_term_link($tag['slug'], $taxonomy) . setStoryPerma() ?>"><?php echo $tag['name']; ?></a>
				</p>
		<?php }
		endif;
		?>
	</div>
	<div class="big-tags text-center txt-layer mobile">
		<?php
		if ($tags) :
			foreach ($tags as $k => $tag) { ?>
				<?php
				if ($k !== 0) {
					echo " | "; // Add a comma after each item except the last
				} ?>
				<a href="<?= get_term_link($tag['slug'], $taxonomy) . setStoryPerma() ?>"><?php echo $tag['name']; ?></a>
		<?php }
		endif;
		?>
	</div>
	<p class="timeframe text-center">
		<?php formatTimeframe() ?>
	</p>
</section>
<section class="single-work-body flex flex-col single-work gap-6">
	<div class="long-description h-fit w-full basis-1/5 flex flex-col gap-4 p-4 <?php outline() ?> shrink-0 txt-layer">
		<?= $pods->field('long_description'); ?>
	</div>
	<div class="the-content <?php outline(['singleWork' => true]) ?> shrink grid grid-cols-1 gap-6 h-fit [&>p]:p-4 [&>*]:h-fit [&>*]:w-full txtp-layer">
		<?php the_content(); ?>
	</div>
</section>