;(function(){
    'use strict';

    var app = angular.module('tokenizerApp', ['tokenizer.templates']);

    app.directive('tokenizer', ['$compile', '$templateCache', function($compile, $templateCache) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/Tokenizer.tmpl.html',
            controller: function($scope) {

                function _isEnterPressed(event) {
                    return event && (event.which || event.keyCode) && (event.which === 13 || event.keyCode === 13);
                };

                function isTokenUnique(token) {
                    return $scope.tokensArr.indexOf(token) !== -1 ? false : token;
                };

                $scope.tokensArr = [];
                $scope.tokensStoreDivider = ';';

                // here we starts to handle all inputs
                $scope.handleInputKeyup = function(event) {
                    if (_isEnterPressed(event)) {
                        $scope.addTokenToModel();
                        $scope.renderTokensList();
                        $scope.updateTokensStoreElement();
                    }
                };

                $scope.addTokenToModel = function() {
                    if ($scope.nonUniqueTokensAllowed) {
                        $scope.tokensArr.push($scope.token);
                    } else {
                        $scope.tokensArr.push(isTokenUnique($scope.token));
                    }

                    $scope.token = ''; // clear input
                };

                $scope.closeToken = function(index) {
                    if (angular.isNumber(index) && $scope.tokensArr[index]) {
                        $scope.tokensArr[index] = false;
                        $scope.renderTokensList();
                        $scope.updateTokensStoreElement();
                    }
                };
            },

            link: function(scope, element, attrs) {

                // compile and insert additional elements
                var tokensContainer = $compile(angular.element($templateCache.get('Tokenizer.tokens.container.partials.tmpl.html')))(scope);
                var tokensStoreEl = $compile(angular.element($templateCache.get('Tokenizer.tokens.store.partials.tmpl.html')))(scope);
                var tokensInput = $compile(angular.element($templateCache.get('Tokenizer.input.partials.tmpl.html')))(scope);
                element.append(tokensContainer);
                element.append(tokensStoreEl);
                element.append(tokensInput);

                scope.renderTokensList = function() {
                    var renderList = function(token, index) {
                        if (!token) return;
                        var tokenTmpl = $templateCache.get('Tokenizer.token.partials.tmpl.html')
                            .replace("[token]", token)
                            .replace("[index]", index);
                        scope.tokensHtml += tokenTmpl;
                    };

                    scope.tokensHtml = ''; // init tokens HTML
                    scope.tokensArr.forEach(renderList); // render list
                    tokensContainer.html($compile(angular.element(scope.tokensHtml))(scope)); // add tokens to DOM
                    tokensInput.focus();
                };

                // form a list of selected tokens for outer use
                scope.updateTokensStoreElement = function() {
                    var truthy = function(el) {return el;};
                    tokensStoreEl.val(scope.tokensArr.filter(truthy).join(scope.tokensStoreDivider));
                };

                // Apply initial system values
                // ---------------------------
                // 1. Placeholder
                tokensInput.attr('placeholder', attrs.placeholder || 'Input token');
                // 2. Main wrapper  class
                scope.wrapperClass = attrs.wrapperClass || 'TokenizerWrapper';
                // 3. Tokens area  class
                scope.listWrapperClass = attrs.listWrapperClass || 'TokenizerTokens';
                // 4. Token wrapper  class
                scope.tokenWrapperClass = attrs.tokenWrapperClass || 'TokenizerTokenWrapper';
                // 5. Token content  class
                scope.tokenContentClass = attrs.tokenContentClass || 'TokenizerToken';
                // 6. Token closer  class
                scope.tokenCloserClass = attrs.tokenCloserClass || 'TokenizerTokenCloser';
                // 7. Token closer  class
                scope.inputClass = attrs.inputClass || 'TokenizerInput';
                // 8. Allow non-unique tokens (allows to add several same tokens)
                scope.nonUniqueTokensAllowed = attrs.nonUniqueAllowed === 'true' ? true : false;
                // 9. Add name to tokens store (hidden input element NAME)
                scope.hiddenDataStoreName = attrs.hiddenDataStoreName || 'tokenizer_values';

            }
        };
    }]);
}());