payload(["foo"],function(foo) {
	console.log(foo);
});

payload.define('something', function(money) {
	console.log(money);
});

payload(["bar"],function(bar) {
	console.log(bar);
});