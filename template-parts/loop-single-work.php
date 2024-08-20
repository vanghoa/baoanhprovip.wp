<?php
$pods = pods('work', get_the_ID());
?>

<section class="single-work-head mt-12 mb-12 flex flex-col justify-between items-center gap-4">
	<h1 class="text-2xl text-center mono-500 txt-layer"><?php echo get_the_title(); ?></h1>
	<div class="big-tags text-nowrap whitespace-nowrap desktop">
		<?php $bigtags = $pods->field('bigtag');
		if ($bigtags) :
			foreach ($bigtags as $k => $tag) { ?>
				<p class="txt-layer desktop">
					<a class="hover:underline" href="<?= get_term_link($tag['slug'], 'bigtag') ?>"><?php echo $tag['name']; ?></a>
				</p>
		<?php }
		endif;
		?>
	</div>
	<div class="big-tags text-nowrap whitespace-nowrap txt-layer mobile">
		<?php
		if ($bigtags) :
			foreach ($bigtags as $k => $tag) { ?>
				<?php
				if ($k !== 0) {
					echo " | "; // Add a comma after each item except the last
				} ?>
				<a class="hover:underline" href="<?= get_term_link($tag['slug'], 'bigtag') ?>"><?php echo $tag['name']; ?></a>
		<?php }
		endif;
		?>
	</div>
	<p class="timeframe italic text-center">
		<?php
		$times = $pods->field('timeframe');
		if ($times) :
			foreach ($times as $key => $time) { ?>
				<span class="text-nowrap whitespace-nowrap txt-layer">
					<?php
					if ($key !== 0) {
						echo " — "; // Add a comma after each item except the last
					}
					echo (new DateTime($time))->format('M Y'); ?>
				</span>
		<?php }
		endif; ?>
	</p>
</section>
<section class="single-work-body flex flex-col single-work gap-6">
	<div class="long-description h-fit w-full basis-1/5 min-w-52 flex flex-col gap-4 p-4 <?php outline() ?> shrink-0 txt-layer">
		<?php echo $pods->field('long_description'); ?>
	</div>
	<div class="the-content <?php outline(['singleWork' => true]) ?> shrink grid grid-cols-1 gap-6 h-fit [&>p]:p-4 [&>*]:h-fit [&>*]:w-full txtp-layer">
		<?php the_content(); ?>
	</div>
</section>