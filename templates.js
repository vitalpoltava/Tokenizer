angular.module('tokenizer.templates', ['Tokenizer.input.partials.tmpl.html', 'Tokenizer.token.partials.tmpl.html', 'Tokenizer.tokens.container.partials.tmpl.html', 'Tokenizer.tokens.store.partials.tmpl.html']);

angular.module("Tokenizer.input.partials.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Tokenizer.input.partials.tmpl.html",
    "<input type=\"text\" autofocus class=\"{{ inputClass }}\" ng-model=\"token\" ng-keyup=\"handleInputKeyup($event)\"/>");
}]);

angular.module("Tokenizer.token.partials.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Tokenizer.token.partials.tmpl.html",
    "<span class=\"{{ tokenWrapperClass }}\">\n" +
    "    <span class=\"{{ tokenContentClass }}\">[token]</span>\n" +
    "    <span class=\"{{ tokenCloserClass }}\" ng-click=\"closeToken([index])\"></span>\n" +
    "</span>");
}]);

angular.module("Tokenizer.tokens.container.partials.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Tokenizer.tokens.container.partials.tmpl.html",
    "<span class=\"{{ listWrapperClass }}\"></span>");
}]);

angular.module("Tokenizer.tokens.store.partials.tmpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("Tokenizer.tokens.store.partials.tmpl.html",
    "<input type=\"hidden\" name=\"{{ hiddenDataStoreName }}\" value=\"\"/>");
}]);
