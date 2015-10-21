payload(function(foo) {
	console.log(foo);
});

payload.define('something', function(money) {
	console.log(money);
});

payload(function(bar) {
	console.log(bar);
});