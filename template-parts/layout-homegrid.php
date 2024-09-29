<ul class="homegrid withlist grid grid-cols-1 gap-8 w-fit mx-auto">
	<?php
	mapLi();
	?>
</ul>
<ul class="homelist w-full hidden <?= outline(['listView' => true]) ?>">
	<li class="flex p-3">
		<div class="shrink-0 title flex gap-1 txt-layer italic">title</div>
		<div class="mx-3 invisible">|</div>
		<div class="shrink-0 timeframe txt-layer italic">date</div>
		<div class="mx-3 invisible">|</div>
		<div class="w-full shrink txt-layer italic">categories</div>
	</li>
	<?php mapLi(
		'homelistli'
	); ?>
</ul>