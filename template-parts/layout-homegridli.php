<?php global $pods, $term_id, $taxonomy, $taxonomy_name, $is_story, $key, $storymode, $is_designer, $is_developer;
?>
<li class="project flex items-stretch">
	<div class="<?php outline();
				$permalink = $pods->display('permalink') . setStoryPerma(); ?>">
		<div isfirst="true" islast="<?php
									$imgs = $pods->field('featured_images._img');
									echo count($imgs) == 1 ? 'true' : 'false'; ?>" class="imgsec w-full mx-auto">
			<div class="imgwrapper">
				<?php
				foreach ($imgs as $k => $img) { ?>
					<?php echo $liIndex < 2 && $k < 2 ? $img : lazyimg($img, false) ?>
				<?php }
				?>
			</div>
			<div class="flex justify-between items-stretch absolute left-0 top-0 h-full w-full">
				<button class="px-4 lbtn basis-full shrink ">
					<?php pods_view('template-parts/layout-arrow.php', null, YEAR_IN_SECONDS, 'transient'); ?>
				</button>
				<a href="<?= $permalink ?>" class="basis-1/3 shrink-0 flex justify-center items-center group hover-layer">
					<div class="group-hover:opacity-100 hover-child opacity-0 h-fit w-fit <?= outline(['noBgLayer' => true]) ?> flex justify-center items-center p-3 text-center break-all">
						see this <br> project
					</div>
				</a>
				<button class="px-4 rbtn basis-full shrink">
					<?php pods_view('template-parts/layout-arrow.php', null, YEAR_IN_SECONDS, 'transient'); ?>
				</button>
				<div class="w-full absolute bottom-4">
					<ul class="indicator mx-auto w-fit flex gap-2 justify-center">
						<?php foreach ($imgs as $k => $img) { ?>
							<li class="text-bg rounded-lg <?php echo $k == 0 ? '' : 'opacity-50' ?>">●</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
		<div class="text-center m-4 flex flex-col gap-4 justify-center items-center">
			<div class="">
				<h3 class="txt-layer">
					<?= $pods->display('title') ?>
				</h3>
				<p class="txt-layer"><?php outputTaxonomy() ?>
				</p>
			</div>
			<a href="<?= $permalink ?>" class="block max-w-md text-center txt-layer">
				<?php if ($is_designer || $is_developer) { ?>
					<span class="line-clamp-3"><?php echo $pods->field('short_description'); ?>…</span>
					<?php } else {
					echo $pods->field('short_description'); ?>…
					<span class="underline">see more</span>
				<?php } ?>
			</a>
		</div>
	</div>
</li>