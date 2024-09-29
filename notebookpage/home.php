<?php defined('ABSPATH') || exit;

session_start();
global $wpdb;
$submitted = false;
$error = false;
$table_name = $wpdb->prefix . 'notebook';
//
if (isset($_POST['submit_form'])) {
	$input_note = sanitize_text_field($_POST['input_note']);
	$input_responsive = sanitize_text_field($_POST['input_responsive']);

	if ($wpdb->insert($table_name, array(
		'value' => $input_note,
		'responsive' => $input_responsive
	), array('%s', '%s'))) {

		$data = $wpdb->get_results("SELECT * FROM $table_name");
		$json_data = json_encode($data);
		$json_file_path = ABSPATH . 'wp-content/uploads/notebookdata.json';

		if (file_put_contents($json_file_path, $json_data) === false) {
			$_SESSION['error'] = 'file write error';
		}
	} else {
		$_SESSION['error'] = $wpdb->last_error;
	}

	$_SESSION['submitted'] = true;
	wp_redirect($_SERVER['REQUEST_URI']);
	exit; // Stop further execution
}

if (isset($_SESSION['error'])) {
	$error = $_SESSION['error'];
	unset($_SESSION['error']); // Clear the message after displaying it
}

if (isset($_SESSION['submitted'])) {
	$submitted = $_SESSION['submitted'];
	unset($_SESSION['submitted']); // Clear the message after displaying it
}
?>


<?php get_header(); ?>

<form class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col text-center items-center p-4 pb-0 max-w-56 <?php outline() ?>" <?= $submitted ? '' : 'method="post"' ?> action="">
	<label class="txt-layer w-fit mb-2" for="input_note">1. open devtool<br>2. leave me a note</label>
	<?php ?>
	<input class="px-2 mb-2 bg-transparent focus:outline-none max-w-full" type="text" id="input_note" name="input_note" required <?php echo $submitted ? 'disabled' : ''; ?>>
	<?php ?>
	<input type="hidden" id="input_responsive" name="input_responsive" value="0">
	<div style="height: 1px;" class="horizontal-line w-full bg-text"></div>
	<input class="cursor-pointer txt-layer w-full py-4 whitespace-pre-wrap" type="submit" name="submit_form" value="<?php echo $submitted ? ($error ? 'something is wrong :( please try again later' : 'thank you!

(you can find the message inside devtool with the respective screensize at the time it is sent!)') : 'send'; ?>" <?php echo $submitted ? 'disabled' : ''; ?>>
</form>

<?php if ($error) { ?>
	<script>
		console.log(<?= json_encode($error) ?>);
	</script>
<?php }
get_footer();
