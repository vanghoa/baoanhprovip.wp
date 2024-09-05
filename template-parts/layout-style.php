<?php
global $is_story;

if (!function_exists('outline')) {
	function outline(array $options = [])
	{
		$singleWork = $options['singleWork'] ?? false;
		$noBgLayer = $options['noBgLayer'] ?? false;
		if ($singleWork) {
			echo "[&>*]:bg-bg2 [&>*]:rounded-lg [&>*]:overflow-hidden cp-layer";
			return;
		}
		echo "bg-bg2 rounded-lg overflow-hidden" . ($noBgLayer ? '' : ' bg-layer');
		// echo "outline-[1px] outline-text outline outline-offset-[-.5px]";
	}
}

if (!function_exists('setStoryPerma')) {
	function setStoryPerma(array $options = [])
	{
		global $is_story;
		return ($is_story ? '/?story=' . $is_story : '');
	}
}
